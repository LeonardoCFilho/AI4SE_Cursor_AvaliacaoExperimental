"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDomainError = handleDomainError;
const errors_1 = require("../../domain/errors");
/**
 * Mapeia exceções de domínio para respostas HTTP (SRP).
 * Centraliza a lógica de erro, evitando duplicação nos controllers.
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
