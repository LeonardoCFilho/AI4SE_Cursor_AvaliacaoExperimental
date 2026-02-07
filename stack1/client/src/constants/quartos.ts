import type { TipoQuarto, StatusQuarto, TipoCama } from '../types/quartos';

/**
 * Constantes centralizadas para labels e opções de select (DRY).
 * Decisão: TIPO_QUARTO_LABELS é fonte única; TIPOS_QUARTO_OPTIONS deriva para formulários.
 */
export const TIPO_QUARTO_LABELS: Record<TipoQuarto, string> = {
  BASICO: 'Básico',
  MODERNO: 'Moderno',
  LUXO: 'Luxo',
};

export const STATUS_QUARTO_LABELS: Record<StatusQuarto, string> = {
  LIVRE: 'Livre',
  OCUPADO: 'Ocupado',
  MANUTENCAO_LIMPEZA: 'Manutenção e Limpeza',
};

export const TIPO_CAMA_LABELS: Record<TipoCama, string> = {
  SOLTEIRO: 'Solteiro',
  CASAL_KING: 'Casal King',
  CASAL_QUEEN: 'Casal Queen',
};

export const TIPOS_QUARTO_OPTIONS: { value: TipoQuarto; label: string }[] = [
  { value: 'BASICO', label: TIPO_QUARTO_LABELS.BASICO },
  { value: 'MODERNO', label: TIPO_QUARTO_LABELS.MODERNO },
  { value: 'LUXO', label: TIPO_QUARTO_LABELS.LUXO },
];

export const STATUS_QUARTO_OPTIONS: { value: StatusQuarto; label: string }[] = [
  { value: 'LIVRE', label: STATUS_QUARTO_LABELS.LIVRE },
  { value: 'OCUPADO', label: STATUS_QUARTO_LABELS.OCUPADO },
  { value: 'MANUTENCAO_LIMPEZA', label: STATUS_QUARTO_LABELS.MANUTENCAO_LIMPEZA },
];

export const TIPOS_CAMA_OPTIONS: { value: TipoCama; label: string }[] = [
  { value: 'SOLTEIRO', label: TIPO_CAMA_LABELS.SOLTEIRO },
  { value: 'CASAL_KING', label: TIPO_CAMA_LABELS.CASAL_KING },
  { value: 'CASAL_QUEEN', label: TIPO_CAMA_LABELS.CASAL_QUEEN },
];
