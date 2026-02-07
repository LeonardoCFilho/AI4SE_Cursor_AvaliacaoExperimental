"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cama = void 0;
/**
 * Valor-objeto que representa uma cama. quartoId opcional — útil quando a cama
 * ainda não foi persistida (criação). Após save, o repositório preenche.
 */
class Cama {
    constructor(id, tipo, quartoId) {
        this.id = id;
        this.tipo = tipo;
        this.quartoId = quartoId;
    }
}
exports.Cama = Cama;
