export type TipoQuarto = 'BASICO' | 'MODERNO' | 'LUXO';
export type StatusQuarto = 'LIVRE' | 'OCUPADO' | 'MANUTENCAO_LIMPEZA';
export type TipoCama = 'SOLTEIRO' | 'CASAL_KING' | 'CASAL_QUEEN';

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
