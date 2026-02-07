"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoService = void 0;
const enums_1 = require("../../domain/enums");
class QuartoService {
    constructor(repository) {
        this.repository = repository;
    }
    async listar() {
        const quartos = await this.repository.findAll();
        return quartos.map((q) => this.toListagemDto(q));
    }
    async obterPorId(id) {
        return this.repository.findById(id);
    }
    async cadastrar(dto) {
        await this.validarUnicidadeNumero(dto.numero);
        this.validarDto(dto);
        return this.repository.save({
            ...dto,
            status: dto.status ?? enums_1.StatusQuarto.LIVRE,
        });
    }
    async editar(dto) {
        if (!dto.id || dto.id <= 0) {
            throw new Error('ID do quarto é obrigatório para edição');
        }
        const existente = await this.repository.findById(dto.id);
        if (!existente) {
            throw new Error('Quarto não encontrado');
        }
        await this.validarUnicidadeNumero(dto.numero, dto.id);
        this.validarDto(dto);
        return this.repository.save(dto);
    }
    async alterarStatus(id, status) {
        const quarto = await this.repository.findById(id);
        if (!quarto)
            return null;
        quarto.alterarStatus(status);
        return this.repository.save({
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
            camas: quarto.camas.map((c) => ({ id: c.id, tipo: c.tipo })),
        });
    }
    async validarUnicidadeNumero(numero, excludeId) {
        const existente = await this.repository.findByNumero(numero, excludeId);
        if (existente) {
            throw new Error(`Já existe um quarto com o número ${numero}`);
        }
    }
    validarDto(dto) {
        if (!dto.numero?.trim())
            throw new Error('Número do quarto é obrigatório');
        if (!dto.tipo)
            throw new Error('Tipo do quarto é obrigatório');
        if (dto.capacidade == null || dto.capacidade < 1) {
            throw new Error('Capacidade deve ser maior que zero');
        }
        if (dto.precoDiaria == null || dto.precoDiaria < 0) {
            throw new Error('Preço por diária deve ser maior ou igual a zero');
        }
    }
    toListagemDto(q) {
        return {
            id: q.id,
            numero: q.numero,
            tipo: q.tipo,
            precoDiaria: q.precoDiaria,
            status: q.status,
            camas: q.camas.map((c) => ({ id: c.id, tipo: c.tipo })),
        };
    }
}
exports.QuartoService = QuartoService;
