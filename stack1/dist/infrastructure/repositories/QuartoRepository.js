"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoRepositoryEmMemoria = void 0;
const quarto_1 = require("../../domain/quarto");
const cama_1 = require("../../domain/cama");
const enums_1 = require("../../domain/enums");
class QuartoRepositoryEmMemoria {
    constructor() {
        this.quartos = new Map();
        this.nextId = 1;
        this.nextCamaId = 1;
    }
    dtoToQuarto(dto, id) {
        const camas = (dto.camas || []).map((c, idx) => {
            const camaId = c.id && c.id > 0 ? c.id : this.nextCamaId++;
            return new cama_1.Cama(camaId, c.tipo, id);
        });
        return new quarto_1.Quarto(id, dto.numero.trim(), dto.tipo, dto.capacidade, dto.precoDiaria, dto.status ?? enums_1.StatusQuarto.LIVRE, dto.frigobar ?? false, dto.cafeManhaIncluso ?? false, dto.arCondicionado ?? false, dto.tv ?? false, camas);
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
    async save(dto) {
        const isUpdate = dto.id !== undefined && dto.id > 0;
        const id = isUpdate ? dto.id : this.nextId++;
        const quarto = this.dtoToQuarto(dto, id);
        this.quartos.set(id, quarto);
        return quarto;
    }
    async delete(id) {
        return this.quartos.delete(id);
    }
}
exports.QuartoRepositoryEmMemoria = QuartoRepositoryEmMemoria;
