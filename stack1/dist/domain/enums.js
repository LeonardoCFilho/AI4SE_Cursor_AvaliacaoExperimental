"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusReserva = exports.TipoCama = exports.StatusQuarto = exports.TipoQuarto = void 0;
/**
 * Tipos de quarto disponíveis no hotel.
 */
var TipoQuarto;
(function (TipoQuarto) {
    TipoQuarto["BASICO"] = "BASICO";
    TipoQuarto["MODERNO"] = "MODERNO";
    TipoQuarto["LUXO"] = "LUXO";
})(TipoQuarto || (exports.TipoQuarto = TipoQuarto = {}));
/**
 * Status de disponibilidade do quarto.
 */
var StatusQuarto;
(function (StatusQuarto) {
    StatusQuarto["LIVRE"] = "LIVRE";
    StatusQuarto["OCUPADO"] = "OCUPADO";
    StatusQuarto["MANUTENCAO_LIMPEZA"] = "MANUTENCAO_LIMPEZA";
})(StatusQuarto || (exports.StatusQuarto = StatusQuarto = {}));
/**
 * Tipos de cama disponíveis nos quartos.
 */
var TipoCama;
(function (TipoCama) {
    TipoCama["SOLTEIRO"] = "SOLTEIRO";
    TipoCama["CASAL_KING"] = "CASAL_KING";
    TipoCama["CASAL_QUEEN"] = "CASAL_QUEEN";
})(TipoCama || (exports.TipoCama = TipoCama = {}));
/**
 * Status da reserva.
 */
var StatusReserva;
(function (StatusReserva) {
    StatusReserva["ATIVA"] = "ATIVA";
    StatusReserva["CANCELADA"] = "CANCELADA";
})(StatusReserva || (exports.StatusReserva = StatusReserva = {}));
