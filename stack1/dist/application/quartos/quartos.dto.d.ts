import { TipoQuarto, StatusQuarto, TipoCama } from '../../domain/enums';
/**
 * DTOs desacoplam o contrato da API das entidades de domínio.
 * Decisão: id opcional em CamaDto/QuartoDto — create não envia id; update envia.
 * Decisão: QuartoListagemDto é subset de QuartoDto — lista não precisa de comodidades.
 */
export interface CamaDto {
    id?: number;
    tipo: TipoCama;
}
export interface QuartoDto {
    id?: number;
    numero: string;
    tipo: TipoQuarto;
    capacidade: number;
    precoDiaria: number;
    status: StatusQuarto;
    frigobar?: boolean;
    cafeManhaIncluso?: boolean;
    arCondicionado?: boolean;
    tv?: boolean;
    camas?: CamaDto[];
}
export interface QuartoListagemDto {
    id: number;
    numero: string;
    tipo: TipoQuarto;
    precoDiaria: number;
    status: StatusQuarto;
    camas: CamaDto[];
}
//# sourceMappingURL=quartos.dto.d.ts.map