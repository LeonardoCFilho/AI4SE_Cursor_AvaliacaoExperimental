import { Quarto } from '../../domain/quarto';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';
/**
 * Mapeamento entre entidades de domínio e DTOs (SRP).
 * Única responsabilidade: conversão de formato.
 */
export declare class QuartoMapper {
    toDomain(dto: QuartoDto, id: number): Quarto;
    toDto(quarto: Quarto): QuartoDto;
    toListagemDto(quarto: Quarto): QuartoListagemDto;
    private camaToDto;
    /** Cria cópia do quarto com novo status (Quarto é parcialmente imutável). */
    cloneWithStatus(quarto: Quarto, status: StatusQuarto): Quarto;
}
//# sourceMappingURL=QuartoMapper.d.ts.map