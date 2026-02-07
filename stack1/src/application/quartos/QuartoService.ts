import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../infrastructure/repositories/QuartoRepository';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';

export class QuartoService {
  constructor(private readonly repository: IQuartoRepository) {}

  async listar(): Promise<QuartoListagemDto[]> {
    const quartos = await this.repository.findAll();
    return quartos.map((q) => this.toListagemDto(q));
  }

  async obterPorId(id: number): Promise<Quarto | null> {
    return this.repository.findById(id);
  }

  async cadastrar(dto: QuartoDto): Promise<Quarto> {
    await this.validarUnicidadeNumero(dto.numero);
    this.validarDto(dto);
    return this.repository.save({
      ...dto,
      status: dto.status ?? StatusQuarto.LIVRE,
    });
  }

  async editar(dto: QuartoDto): Promise<Quarto> {
    if (!dto.id || dto.id <= 0) {
      throw new Error('ID do quarto é obrigatório para edição');
    }
    const existente = await this.repository.findById(dto.id);
    if (!existente) {
      throw new Error('Quarto não encontrado');
    }
    await this.validarUnicidadeNumero(dto.numero, dto.id);
    this.validarDto(dto);
    return this.repository.save(dto);
  }

  async alterarStatus(id: number, status: StatusQuarto): Promise<Quarto | null> {
    const quarto = await this.repository.findById(id);
    if (!quarto) return null;
    quarto.alterarStatus(status);
    return this.repository.save({
      id: quarto.id,
      numero: quarto.numero,
      tipo: quarto.tipo,
      capacidade: quarto.capacidade,
      precoDiaria: quarto.precoDiaria,
      status: quarto.status,
      frigobar: quarto.frigobar,
      cafeManhaIncluso: quarto.cafeManhaIncluso,
      arCondicionado: quarto.arCondicionado,
      tv: quarto.tv,
      camas: quarto.camas.map((c) => ({ id: c.id, tipo: c.tipo })),
    });
  }

  private async validarUnicidadeNumero(numero: string, excludeId?: number): Promise<void> {
    const existente = await this.repository.findByNumero(numero, excludeId);
    if (existente) {
      throw new Error(`Já existe um quarto com o número ${numero}`);
    }
  }

  private validarDto(dto: QuartoDto): void {
    if (!dto.numero?.trim()) throw new Error('Número do quarto é obrigatório');
    if (!dto.tipo) throw new Error('Tipo do quarto é obrigatório');
    if (dto.capacidade == null || dto.capacidade < 1) {
      throw new Error('Capacidade deve ser maior que zero');
    }
    if (dto.precoDiaria == null || dto.precoDiaria < 0) {
      throw new Error('Preço por diária deve ser maior ou igual a zero');
    }
  }

  private toListagemDto(q: Quarto): QuartoListagemDto {
    return {
      id: q.id,
      numero: q.numero,
      tipo: q.tipo,
      precoDiaria: q.precoDiaria,
      status: q.status,
      camas: q.camas.map((c) => ({ id: c.id, tipo: c.tipo })),
    };
  }
}
