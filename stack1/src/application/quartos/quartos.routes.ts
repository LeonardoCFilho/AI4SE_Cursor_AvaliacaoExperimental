import { Router } from 'express';
import { QuartoController } from './QuartoController';

export function createQuartosRouter(controller: QuartoController): Router {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:id', controller.obterPorId);
  router.post('/', controller.cadastrar);
  router.put('/:id', controller.editar);
  router.patch('/:id/status', controller.alterarStatus);
  return router;
}
