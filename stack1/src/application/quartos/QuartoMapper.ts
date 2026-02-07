import { Quarto } from '../../domain/quarto';
import { Cama } from '../../domain/cama';
import { QuartoDto, QuartoListagemDto, CamaDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';

/**
 * Mapeamento entre entidades de domínio e DTOs (SRP).
 *
 * Decisão: Mapper centraliza conversão. Evita que Controller e Service conheçam
 * a estrutura interna de Quarto/Cama. Se a API mudar (ex.: snake_case), altera só aqui.
 *
 * Decisão: toDomain(dto, id) — id vem do Service (0 para create, dto.id para update).
 * O repositório usa id=0 para detectar criação e gerar novo id.
 */
export class QuartoMapper {
  toDomain(dto: QuartoDto, id: number): Quarto {
    const camas = (dto.camas ?? []).map((c) => new Cama(c.id ?? 0, c.tipo, id));
    return new Quarto(
      id,
      dto.numero.trim(),
      dto.tipo,
      dto.capacidade,
      dto.precoDiaria,
      dto.status ?? StatusQuarto.LIVRE,
      dto.frigobar ?? false,
      dto.cafeManhaIncluso ?? false,
      dto.arCondicionado ?? false,
      dto.tv ?? false,
      camas
    );
  }

  toDto(quarto: Quarto): QuartoDto {
    return {
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
      camas: quarto.camas.map((c) => this.camaToDto(c)),
    };
  }

  toListagemDto(quarto: Quarto): QuartoListagemDto {
    return {
      id: quarto.id,
      numero: quarto.numero,
      tipo: quarto.tipo,
      precoDiaria: quarto.precoDiaria,
      status: quarto.status,
      camas: quarto.camas.map((c) => this.camaToDto(c)),
    };
  }

  private camaToDto(cama: Cama): CamaDto {
    return { id: cama.id, tipo: cama.tipo };
  }

  /**
   * Cria cópia do quarto com novo status.
   * Decisão: Quarto.status é mutável in-place, mas alterarStatus no Service alteraria
   * o objeto antes de persistir. Criar novo Quarto garante que o repositório receba
   * o estado correto (evita efeitos colaterais em alterarStatus do domínio).
   */
  cloneWithStatus(quarto: Quarto, status: StatusQuarto): Quarto {
    return new Quarto(
      quarto.id,
      quarto.numero,
      quarto.tipo,
      quarto.capacidade,
      quarto.precoDiaria,
      status,
      quarto.frigobar,
      quarto.cafeManhaIncluso,
      quarto.arCondicionado,
      quarto.tv,
      quarto.camas
    );
  }
}
