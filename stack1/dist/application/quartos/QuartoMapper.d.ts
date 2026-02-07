import { Quarto } from '../../domain/quarto';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
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
export declare class QuartoMapper {
    toDomain(dto: QuartoDto, id: number): Quarto;
    toDto(quarto: Quarto): QuartoDto;
    toListagemDto(quarto: Quarto): QuartoListagemDto;
    private camaToDto;
    /**
     * Cria cópia do quarto com novo status.
     * Decisão: Quarto.status é mutável in-place, mas alterarStatus no Service alteraria
     * o objeto antes de persistir. Criar novo Quarto garante que o repositório receba
     * o estado correto (evita efeitos colaterais em alterarStatus do domínio).
     */
    cloneWithStatus(quarto: Quarto, status: StatusQuarto): Quarto;
}
//# sourceMappingURL=QuartoMapper.d.ts.map