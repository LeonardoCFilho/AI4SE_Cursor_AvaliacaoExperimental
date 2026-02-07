import { Response } from 'express';
/**
 * Mapeia exceções de domínio para respostas HTTP (SRP).
 *
 * Decisão: Função pura em vez de classe — não precisa de estado, apenas de(err, res).
 * Centraliza o mapeamento exceção→status para evitar duplicação nos controllers.
 *
 * Ordem: Verificar subtipos primeiro (NotFound, Validation, Conflict) e depois base (DomainError).
 * Erros não-DomainError caem no 500 (erro inesperado).
 */
export declare function handleDomainError(err: unknown, res: Response): void;
//# sourceMappingURL=HttpErrorHandler.d.ts.map