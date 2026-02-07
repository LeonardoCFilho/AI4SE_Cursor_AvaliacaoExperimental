"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoController = void 0;
const enums_1 = require("../../domain/enums");
const HttpErrorHandler_1 = require("../common/HttpErrorHandler");
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
/**
 * Controller REST para quartos.
 * Responsabilidade única: adaptar HTTP ↔ aplicação.
 */
class QuartoController {
    constructor(service, mapper) {
        this.service = service;
        this.mapper = mapper;
        this.listar = async (_req, res) => {
            try {
                const quartos = await this.service.listar();
                res.json(quartos);
            }
            catch (err) {
                (0, HttpErrorHandler_1.handleDomainError)(err, res);
            }
        };
        this.obterPorId = async (req, res) => {
            try {
                const id = this.parseId(req.params.id, res);
                if (id === null)
                    return;
                const quarto = await this.service.obterPorId(id);
                if (!quarto) {
                    res.status(NOT_FOUND).json({ erro: 'Quarto não encontrado' });
                    return;
                }
                res.json(this.mapper.toDto(quarto));
            }
            catch (err) {
                (0, HttpErrorHandler_1.handleDomainError)(err, res);
            }
        };
        this.cadastrar = async (req, res) => {
            try {
                const dto = req.body;
                const quarto = await this.service.cadastrar(dto);
                res.status(201).json(this.mapper.toDto(quarto));
            }
            catch (err) {
                (0, HttpErrorHandler_1.handleDomainError)(err, res);
            }
        };
        this.editar = async (req, res) => {
            try {
                const id = this.parseId(req.params.id, res);
                if (id === null)
                    return;
                const dto = { ...req.body, id };
                const quarto = await this.service.editar(dto);
                res.json(this.mapper.toDto(quarto));
            }
            catch (err) {
                (0, HttpErrorHandler_1.handleDomainError)(err, res);
            }
        };
        this.alterarStatus = async (req, res) => {
            try {
                const id = this.parseId(req.params.id, res);
                if (id === null)
                    return;
                const { status } = req.body;
                const statusValidado = this.parseStatus(status, res);
                if (!statusValidado)
                    return;
                const quarto = await this.service.alterarStatus(id, statusValidado);
                if (!quarto) {
                    res.status(NOT_FOUND).json({ erro: 'Quarto não encontrado' });
                    return;
                }
                res.json(this.mapper.toDto(quarto));
            }
            catch (err) {
                (0, HttpErrorHandler_1.handleDomainError)(err, res);
            }
        };
    }
    parseId(param, res) {
        const id = parseInt(param, 10);
        if (isNaN(id)) {
            res.status(BAD_REQUEST).json({ erro: 'ID inválido' });
            return null;
        }
        return id;
    }
    parseStatus(status, res) {
        const statuses = Object.values(enums_1.StatusQuarto);
        if (typeof status === 'string' && statuses.includes(status)) {
            return status;
        }
        res.status(BAD_REQUEST).json({ erro: 'Status inválido' });
        return null;
    }
}
exports.QuartoController = QuartoController;
