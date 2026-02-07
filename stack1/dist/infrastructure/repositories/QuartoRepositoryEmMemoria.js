"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoRepositoryEmMemoria = void 0;
const quarto_1 = require("../../domain/quarto");
const cama_1 = require("../../domain/cama");
/**
 * Implementação em memória do repositório (DIP — implementa a porta).
 *
 * Decisão: Persistência em Map para desenvolvimento e testes. Pode ser substituída
 * por QuartoRepositoryPostgres sem alterar Service (LSP).
 *
 * Decisão: save() — id=0 indica criação; gera novo id e id de camas. Para update,
 * preserva ids existentes e gera novos apenas para camas adicionadas (id=0).
 *
 * Decisão: findByNumero(numero, excludeId) — excludeId usado na edição para
 * permitir manter o mesmo número ao editar (unicidade exclui o próprio registro).
 */
class QuartoRepositoryEmMemoria {
    constructor() {
        this.quartos = new Map();
        this.nextId = 1;
        this.nextCamaId = 1;
    }
    async findAll() {
        return Array.from(this.quartos.values());
    }
    async findById(id) {
        return this.quartos.get(id) ?? null;
    }
    async findByNumero(numero, excludeId) {
        const num = numero.trim().toUpperCase();
        for (const q of this.quartos.values()) {
            if (excludeId !== undefined && q.id === excludeId)
                continue;
            if (q.numero.trim().toUpperCase() === num)
                return q;
        }
        return null;
    }
    async save(quarto) {
        const isNew = quarto.id === 0; // Convenção: id=0 = criação
        const id = isNew ? this.nextId++ : quarto.id;
        const camas = quarto.camas.map((c) => {
            const camaId = c.id > 0 ? c.id : this.nextCamaId++;
            return new cama_1.Cama(camaId, c.tipo, id);
        });
        const quartoPersistido = new quarto_1.Quarto(id, quarto.numero, quarto.tipo, quarto.capacidade, quarto.precoDiaria, quarto.status, quarto.frigobar, quarto.cafeManhaIncluso, quarto.arCondicionado, quarto.tv, camas);
        this.quartos.set(id, quartoPersistido);
        return quartoPersistido;
    }
    async delete(id) {
        return this.quartos.delete(id);
    }
}
exports.QuartoRepositoryEmMemoria = QuartoRepositoryEmMemoria;
