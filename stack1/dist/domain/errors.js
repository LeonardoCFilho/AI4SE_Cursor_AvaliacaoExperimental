"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.ValidationError = exports.DomainError = void 0;
/**
 * Exceções de domínio para mapeamento correto de erros HTTP.
 *
 * Decisão: Usar exceções tipadas em vez de strings permite mapear erros de negócio
 * para códigos HTTP corretos (404, 400, 409) sem acoplamento. O controller não precisa
 * interpretar mensagens via includes() — frágil e propenso a falsos positivos.
 *
 * SRP: Responsabilidade única de representar falhas de negócio.
 * OCP: Novos tipos de erro podem ser adicionados sem alterar HttpErrorHandler.
 */
class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainError';
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}
exports.DomainError = DomainError;
/** Erro de validação de entrada → HTTP 400 */
class ValidationError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
/** Recurso não encontrado → HTTP 404 */
class NotFoundError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
/** Conflito (ex.: unicidade violada) → HTTP 400 */
class ConflictError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.ConflictError = ConflictError;
