import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';
import { QuartoMapper } from './QuartoMapper';
import { QuartoValidator } from './QuartoValidator';
import { NotFoundError, ConflictError } from '../../domain/errors';

/**
 * Casos de uso do módulo de quartos.
 * Orquestra validação, repositório e mapeamento (SRP por caso de uso).
 */
export class QuartoService {
  constructor(
    private readonly repository: IQuartoRepository,
    private readonly mapper: QuartoMapper,
    private readonly validator: QuartoValidator
  ) {}

  async listar(): Promise<QuartoListagemDto[]> {
    const quartos = await this.repository.findAll();
    return quartos.map((q) => this.mapper.toListagemDto(q));
  }

  async obterPorId(id: number): Promise<Quarto | null> {
    return this.repository.findById(id);
  }

  async cadastrar(dto: QuartoDto): Promise<Quarto> {
    this.validator.validate(dto, false);
    await this.ensureNumeroUnico(dto.numero);

    const quarto = this.mapper.toDomain(
      { ...dto, status: dto.status ?? StatusQuarto.LIVRE },
      0
    );
    return this.repository.save(quarto);
  }

  async editar(dto: QuartoDto): Promise<Quarto> {
    this.validator.validate(dto, true);

    const existente = await this.repository.findById(dto.id!);
    if (!existente) {
      throw new NotFoundError('Quarto não encontrado');
    }
    await this.ensureNumeroUnico(dto.numero, dto.id);

    const quarto = this.mapper.toDomain(dto, dto.id!);
    return this.repository.save(quarto);
  }

  async alterarStatus(id: number, status: StatusQuarto): Promise<Quarto | null> {
    const quarto = await this.repository.findById(id);
    if (!quarto) return null;

    const atualizado = this.mapper.cloneWithStatus(quarto, status);
    return this.repository.save(atualizado);
  }

  private async ensureNumeroUnico(numero: string, excludeId?: number): Promise<void> {
    const existente = await this.repository.findByNumero(numero, excludeId);
    if (existente) {
      throw new ConflictError(`Já existe um quarto com o número ${numero}`);
    }
  }
}
