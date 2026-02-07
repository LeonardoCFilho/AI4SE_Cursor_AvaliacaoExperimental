import { StatusReserva } from './enums';
/**
 * Representa uma reserva de quarto associada a um hóspede.
 */
export declare class Reserva {
    readonly id: number;
    readonly quartoId: number;
    readonly hospedeId: number;
    readonly dataInicio: Date;
    readonly dataFim: Date;
    status: StatusReserva;
    constructor(id: number, quartoId: number, hospedeId: number, dataInicio: Date, dataFim: Date, status: StatusReserva);
    /**
     * Verifica se a reserva está ativa.
     */
    estaAtiva(): boolean;
    /**
     * Cancela a reserva.
     */
    cancelar(): void;
}
//# sourceMappingURL=reserva.d.ts.map