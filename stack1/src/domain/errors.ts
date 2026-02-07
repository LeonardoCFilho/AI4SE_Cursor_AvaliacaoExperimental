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
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

/** Erro de validação de entrada → HTTP 400 */
export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/** Recurso não encontrado → HTTP 404 */
export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/** Conflito (ex.: unicidade violada) → HTTP 400 */
export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
