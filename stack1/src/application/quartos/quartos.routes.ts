import { Router } from 'express';
import { QuartoController } from './QuartoController';

/**
 * Factory para rotas de quartos. Injeta controller e retorna Router configurado.
 * Decisão: Função em vez de arquivo estático — permite testar rotas com controller mock.
 */
export function createQuartosRouter(controller: QuartoController): Router {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:id', controller.obterPorId);
  router.post('/', controller.cadastrar);
  router.put('/:id', controller.editar);
  router.patch('/:id/status', controller.alterarStatus);
  return router;
}
