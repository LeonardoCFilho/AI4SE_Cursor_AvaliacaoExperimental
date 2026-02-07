"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDomainError = handleDomainError;
const errors_1 = require("../../domain/errors");
/**
 * Mapeia exceções de domínio para respostas HTTP (SRP).
 *
 * Decisão: Função pura em vez de classe — não precisa de estado, apenas de(err, res).
 * Centraliza o mapeamento exceção→status para evitar duplicação nos controllers.
 *
 * Ordem: Verificar subtipos primeiro (NotFound, Validation, Conflict) e depois base (DomainError).
 * Erros não-DomainError caem no 500 (erro inesperado).
 */
function handleDomainError(err, res) {
    if (err instanceof errors_1.NotFoundError) {
        res.status(404).json({ erro: err.message });
        return;
    }
    if (err instanceof errors_1.ValidationError || err instanceof errors_1.ConflictError) {
        res.status(400).json({ erro: err.message });
        return;
    }
    if (err instanceof errors_1.DomainError) {
        res.status(400).json({ erro: err.message });
        return;
    }
    res.status(500).json({ erro: err.message });
}
