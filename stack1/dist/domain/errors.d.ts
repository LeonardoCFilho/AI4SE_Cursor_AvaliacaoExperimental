/**
 * Exceções de domínio para mapeamento correto de erros HTTP.
 * SRP: responsabilidade única de representar falhas de negócio.
 */
export declare class DomainError extends Error {
    constructor(message: string);
}
export declare class ValidationError extends DomainError {
    constructor(message: string);
}
export declare class NotFoundError extends DomainError {
    constructor(message: string);
}
export declare class ConflictError extends DomainError {
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map