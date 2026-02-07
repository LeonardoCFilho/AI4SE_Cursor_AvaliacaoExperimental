import { Response } from 'express';
import {
  DomainError,
  ValidationError,
  NotFoundError,
  ConflictError,
} from '../../domain/errors';

/**
 * Mapeia exceções de domínio para respostas HTTP (SRP).
 *
 * Decisão: Função pura em vez de classe — não precisa de estado, apenas de(err, res).
 * Centraliza o mapeamento exceção→status para evitar duplicação nos controllers.
 *
 * Ordem: Verificar subtipos primeiro (NotFound, Validation, Conflict) e depois base (DomainError).
 * Erros não-DomainError caem no 500 (erro inesperado).
 */
export function handleDomainError(err: unknown, res: Response): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({ erro: err.message });
    return;
  }
  if (err instanceof ValidationError || err instanceof ConflictError) {
    res.status(400).json({ erro: err.message });
    return;
  }
  if (err instanceof DomainError) {
    res.status(400).json({ erro: err.message });
    return;
  }
  res.status(500).json({ erro: (err as Error).message });
}
