/**
 * Enums definem valores conhecidos em tempo de compilação.
 * Decisão: string enum (BASICO = 'BASICO') para serialização JSON/API sem conversão.
 */
export enum TipoQuarto {
  BASICO = 'BASICO',
  MODERNO = 'MODERNO',
  LUXO = 'LUXO',
}

/**
 * Status de disponibilidade do quarto.
 */
export enum StatusQuarto {
  LIVRE = 'LIVRE',
  OCUPADO = 'OCUPADO',
  MANUTENCAO_LIMPEZA = 'MANUTENCAO_LIMPEZA',
}

/**
 * Tipos de cama disponíveis nos quartos.
 */
export enum TipoCama {
  SOLTEIRO = 'SOLTEIRO',
  CASAL_KING = 'CASAL_KING',
  CASAL_QUEEN = 'CASAL_QUEEN',
}

/**
 * Status da reserva.
 */
export enum StatusReserva {
  ATIVA = 'ATIVA',
  CANCELADA = 'CANCELADA',
}
