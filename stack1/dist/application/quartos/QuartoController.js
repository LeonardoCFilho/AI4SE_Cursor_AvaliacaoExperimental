"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoController = void 0;
const enums_1 = require("../../domain/enums");
class QuartoController {
    constructor(service) {
        this.service = service;
        this.listar = async (_req, res) => {
            try {
                const quartos = await this.service.listar();
                res.json(quartos);
            }
            catch (err) {
                res.status(500).json({ erro: err.message });
            }
        };
        this.obterPorId = async (req, res) => {
            try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ erro: 'ID inválido' });
                    return;
                }
                const quarto = await this.service.obterPorId(id);
                if (!quarto) {
                    res.status(404).json({ erro: 'Quarto não encontrado' });
                    return;
                }
                res.json(this.toResponseDto(quarto));
            }
            catch (err) {
                res.status(500).json({ erro: err.message });
            }
        };
        this.cadastrar = async (req, res) => {
            try {
                const dto = req.body;
                const quarto = await this.service.cadastrar(dto);
                res.status(201).json(this.toResponseDto(quarto));
            }
            catch (err) {
                const msg = err.message;
                if (msg.includes('Já existe') || msg.includes('obrigatório') || msg.includes('deve')) {
                    res.status(400).json({ erro: msg });
                }
                else {
                    res.status(500).json({ erro: msg });
                }
            }
        };
        this.editar = async (req, res) => {
            try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ erro: 'ID inválido' });
                    return;
                }
                const dto = { ...req.body, id };
                const quarto = await this.service.editar(dto);
                res.json(this.toResponseDto(quarto));
            }
            catch (err) {
                const msg = err.message;
                if (msg.includes('não encontrado')) {
                    res.status(404).json({ erro: msg });
                }
                else if (msg.includes('Já existe') || msg.includes('obrigatório') || msg.includes('deve')) {
                    res.status(400).json({ erro: msg });
                }
                else {
                    res.status(500).json({ erro: msg });
                }
            }
        };
        this.alterarStatus = async (req, res) => {
            try {
                const id = parseInt(req.params.id, 10);
                const { status } = req.body;
                if (isNaN(id)) {
                    res.status(400).json({ erro: 'ID inválido' });
                    return;
                }
                if (!Object.values(enums_1.StatusQuarto).includes(status)) {
                    res.status(400).json({ erro: 'Status inválido' });
                    return;
                }
                const quarto = await this.service.alterarStatus(id, status);
                if (!quarto) {
                    res.status(404).json({ erro: 'Quarto não encontrado' });
                    return;
                }
                res.json(this.toResponseDto(quarto));
            }
            catch (err) {
                res.status(500).json({ erro: err.message });
            }
        };
    }
    toResponseDto(quarto) {
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
            camas: quarto.camas.map((c) => ({ id: c.id, tipo: c.tipo })),
        };
    }
}
exports.QuartoController = QuartoController;
