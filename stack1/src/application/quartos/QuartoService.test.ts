import { QuartoService } from './QuartoService';
import { QuartoMapper } from './QuartoMapper';
import { QuartoValidator } from './QuartoValidator';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { Quarto } from '../../domain/quarto';
import { QuartoDto } from './quartos.dto';
import { TipoQuarto, StatusQuarto, TipoCama } from '../../domain/enums';
import { ValidationError, NotFoundError, ConflictError } from '../../domain/errors';

describe('QuartoService', () => {
  let service: QuartoService;
  let mockRepository: jest.Mocked<IQuartoRepository>;
  let mapper: QuartoMapper;
  let validator: QuartoValidator;

  const quartoDtoValido: QuartoDto = {
    numero: '101',
    tipo: TipoQuarto.BASICO,
    capacidade: 2,
    precoDiaria: 150,
    status: StatusQuarto.LIVRE,
    frigobar: false,
    cafeManhaIncluso: false,
    arCondicionado: true,
    tv: true,
    camas: [{ tipo: TipoCama.SOLTEIRO }],
  };

  const quartoPersistido = new Quarto(
    1,
    '101',
    TipoQuarto.BASICO,
    2,
    150,
    StatusQuarto.LIVRE,
    false,
    false,
    true,
    true,
    []
  );

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByNumero: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
    mapper = new QuartoMapper();
    validator = new QuartoValidator();
    service = new QuartoService(mockRepository, mapper, validator);
  });

  describe('cadastrar', () => {
    it('deve cadastrar um quarto com sucesso quando dados são válidos', async () => {
      mockRepository.findByNumero.mockResolvedValue(null);
      mockRepository.save.mockResolvedValue(quartoPersistido);

      const resultado = await service.cadastrar(quartoDtoValido);

      expect(resultado).toEqual(quartoPersistido);
      expect(mockRepository.findByNumero).toHaveBeenCalledWith('101', undefined);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve usar status LIVRE por padrão quando não informado', async () => {
      const dtoSemStatus = { ...quartoDtoValido, status: undefined } as unknown as QuartoDto;
      mockRepository.findByNumero.mockResolvedValue(null);
      mockRepository.save.mockImplementation(async (q) => q);

      const resultado = await service.cadastrar(dtoSemStatus);

      expect(resultado.status).toBe(StatusQuarto.LIVRE);
    });

    it('deve lançar ValidationError quando número está vazio', async () => {
      const dtoInvalido = { ...quartoDtoValido, numero: '   ' };

      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow(ValidationError);
      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow('Número do quarto é obrigatório');
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ValidationError quando tipo não é informado', async () => {
      const dtoInvalido = { ...quartoDtoValido, tipo: undefined } as unknown as QuartoDto;

      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow(ValidationError);
      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow('Tipo do quarto é obrigatório');
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ValidationError quando capacidade é menor que 1', async () => {
      const dtoInvalido = { ...quartoDtoValido, capacidade: 0 };

      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow(ValidationError);
      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow(
        'Capacidade deve ser maior que zero'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ValidationError quando preço diária é negativo', async () => {
      const dtoInvalido = { ...quartoDtoValido, precoDiaria: -10 };

      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow(ValidationError);
      await expect(service.cadastrar(dtoInvalido)).rejects.toThrow(
        'Preço por diária deve ser maior ou igual a zero'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ConflictError quando número do quarto já existe', async () => {
      mockRepository.findByNumero.mockResolvedValue(quartoPersistido);

      await expect(service.cadastrar(quartoDtoValido)).rejects.toThrow(ConflictError);
      await expect(service.cadastrar(quartoDtoValido)).rejects.toThrow(
        'Já existe um quarto com o número 101'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('editar', () => {
    it('deve editar um quarto com sucesso quando dados são válidos', async () => {
      const dtoEdicao: QuartoDto = {
        ...quartoDtoValido,
        id: 1,
        numero: '102',
        precoDiaria: 180,
      };
      mockRepository.findById.mockResolvedValue(quartoPersistido);
      mockRepository.findByNumero.mockResolvedValue(null);
      mockRepository.save.mockImplementation(async (q) => q);

      const resultado = await service.editar(dtoEdicao);

      expect(resultado).toBeDefined();
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.findByNumero).toHaveBeenCalledWith('102', 1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve permitir manter o mesmo número ao editar', async () => {
      const dtoEdicao: QuartoDto = {
        ...quartoDtoValido,
        id: 1,
        numero: '101',
        precoDiaria: 200,
      };
      mockRepository.findById.mockResolvedValue(quartoPersistido);
      mockRepository.findByNumero.mockResolvedValue(null); // excludeId garante que o próprio quarto não conta
      mockRepository.save.mockImplementation(async (q) => q);

      const resultado = await service.editar(dtoEdicao);

      expect(resultado).toBeDefined();
      expect(mockRepository.findByNumero).toHaveBeenCalledWith('101', 1);
    });

    it('deve lançar ValidationError quando ID não é informado', async () => {
      const dtoSemId = { ...quartoDtoValido };

      await expect(service.editar(dtoSemId)).rejects.toThrow(ValidationError);
      await expect(service.editar(dtoSemId)).rejects.toThrow(
        'ID do quarto é obrigatório para edição'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ValidationError quando ID é zero ou negativo', async () => {
      const dtoIdInvalido = { ...quartoDtoValido, id: 0 };

      await expect(service.editar(dtoIdInvalido)).rejects.toThrow(ValidationError);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar NotFoundError quando quarto não existe', async () => {
      const dtoEdicao: QuartoDto = { ...quartoDtoValido, id: 999 };
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.editar(dtoEdicao)).rejects.toThrow(NotFoundError);
      await expect(service.editar(dtoEdicao)).rejects.toThrow('Quarto não encontrado');
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ConflictError quando novo número já existe em outro quarto', async () => {
      const outroQuarto = new Quarto(2, '201', TipoQuarto.BASICO, 2, 150, StatusQuarto.LIVRE);
      const dtoEdicao: QuartoDto = { ...quartoDtoValido, id: 1, numero: '201' };
      mockRepository.findById.mockResolvedValue(quartoPersistido);
      mockRepository.findByNumero.mockResolvedValue(outroQuarto);

      await expect(service.editar(dtoEdicao)).rejects.toThrow(ConflictError);
      await expect(service.editar(dtoEdicao)).rejects.toThrow(
        'Já existe um quarto com o número 201'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar ValidationError quando número está vazio na edição', async () => {
      const dtoInvalido = { ...quartoDtoValido, id: 1, numero: '' };

      await expect(service.editar(dtoInvalido)).rejects.toThrow(ValidationError);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
});
