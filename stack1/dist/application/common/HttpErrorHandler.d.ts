import { Response } from 'express';
/**
 * Mapeia exceções de domínio para respostas HTTP (SRP).
 * Centraliza a lógica de erro, evitando duplicação nos controllers.
 */
export declare function handleDomainError(err: unknown, res: Response): void;
//# sourceMappingURL=HttpErrorHandler.d.ts.map