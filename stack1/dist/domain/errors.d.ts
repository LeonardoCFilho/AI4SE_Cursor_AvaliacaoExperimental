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
export declare class DomainError extends Error {
    constructor(message: string);
}
/** Erro de validação de entrada → HTTP 400 */
export declare class ValidationError extends DomainError {
    constructor(message: string);
}
/** Recurso não encontrado → HTTP 404 */
export declare class NotFoundError extends DomainError {
    constructor(message: string);
}
/** Conflito (ex.: unicidade violada) → HTTP 400 */
export declare class ConflictError extends DomainError {
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map