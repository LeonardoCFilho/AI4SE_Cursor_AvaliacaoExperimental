"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoMapper = void 0;
const quarto_1 = require("../../domain/quarto");
const cama_1 = require("../../domain/cama");
const enums_1 = require("../../domain/enums");
/**
 * Mapeamento entre entidades de domínio e DTOs (SRP).
 * Única responsabilidade: conversão de formato.
 */
class QuartoMapper {
    toDomain(dto, id) {
        const camas = (dto.camas ?? []).map((c) => new cama_1.Cama(c.id ?? 0, c.tipo, id));
        return new quarto_1.Quarto(id, dto.numero.trim(), dto.tipo, dto.capacidade, dto.precoDiaria, dto.status ?? enums_1.StatusQuarto.LIVRE, dto.frigobar ?? false, dto.cafeManhaIncluso ?? false, dto.arCondicionado ?? false, dto.tv ?? false, camas);
    }
    toDto(quarto) {
        return {
            id: quarto.id,
            numero: quarto.numero,
            tipo: quarto.tipo,
            capacidade: quarto.capacidade,
            precoDiaria: quarto.precoDiaria,
            status: quarto.status,
            frigobar: quarto.frigobar,
            cafeManhaIncluso: quarto.cafeManhaIncluso,
            arCondicionado: quarto.arCondicionado,
            tv: quarto.tv,
            camas: quarto.camas.map((c) => this.camaToDto(c)),
        };
    }
    toListagemDto(quarto) {
        return {
            id: quarto.id,
            numero: quarto.numero,
            tipo: quarto.tipo,
            precoDiaria: quarto.precoDiaria,
            status: quarto.status,
            camas: quarto.camas.map((c) => this.camaToDto(c)),
        };
    }
    camaToDto(cama) {
        return { id: cama.id, tipo: cama.tipo };
    }
    /** Cria cópia do quarto com novo status (Quarto é parcialmente imutável). */
    cloneWithStatus(quarto, status) {
        return new quarto_1.Quarto(quarto.id, quarto.numero, quarto.tipo, quarto.capacidade, quarto.precoDiaria, status, quarto.frigobar, quarto.cafeManhaIncluso, quarto.arCondicionado, quarto.tv, quarto.camas);
    }
}
exports.QuartoMapper = QuartoMapper;
