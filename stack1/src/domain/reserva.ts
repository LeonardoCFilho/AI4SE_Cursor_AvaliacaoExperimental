import { StatusReserva } from './enums';

/**
 * Representa uma reserva de quarto associada a um hóspede.
 */
export class Reserva {
  constructor(
    public readonly id: number,
    public readonly quartoId: number,
    public readonly hospedeId: number,
    public readonly dataInicio: Date,
    public readonly dataFim: Date,
    public status: StatusReserva // mutável para cancelar()
  ) {}

  /**
   * Verifica se a reserva está ativa.
   */
  estaAtiva(): boolean {
    return this.status === StatusReserva.ATIVA;
  }

  /**
   * Cancela a reserva.
   */
  cancelar(): void {
    this.status = StatusReserva.CANCELADA;
  }
}
