"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const enums_1 = require("./enums");
/**
 * Representa uma reserva de quarto associada a um hóspede.
 */
class Reserva {
    constructor(id, quartoId, hospedeId, dataInicio, dataFim, status // mutável para cancelar()
    ) {
        this.id = id;
        this.quartoId = quartoId;
        this.hospedeId = hospedeId;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = status;
    }
    /**
     * Verifica se a reserva está ativa.
     */
    estaAtiva() {
        return this.status === enums_1.StatusReserva.ATIVA;
    }
    /**
     * Cancela a reserva.
     */
    cancelar() {
        this.status = enums_1.StatusReserva.CANCELADA;
    }
}
exports.Reserva = Reserva;
