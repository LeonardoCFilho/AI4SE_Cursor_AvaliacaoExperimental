"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.ValidationError = exports.DomainError = void 0;
/**
 * Exceções de domínio para mapeamento correto de erros HTTP.
 * SRP: responsabilidade única de representar falhas de negócio.
 */
class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainError';
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}
exports.DomainError = DomainError;
class ValidationError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.ConflictError = ConflictError;
