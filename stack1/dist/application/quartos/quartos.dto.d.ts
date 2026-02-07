import { TipoQuarto, StatusQuarto, TipoCama } from '../../domain/enums';
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