"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuartosRouter = createQuartosRouter;
const express_1 = require("express");
/**
 * Factory para rotas de quartos. Injeta controller e retorna Router configurado.
 * Decisão: Função em vez de arquivo estático — permite testar rotas com controller mock.
 */
function createQuartosRouter(controller) {
    const router = (0, express_1.Router)();
    router.get('/', controller.listar);
    router.get('/:id', controller.obterPorId);
    router.post('/', controller.cadastrar);
    router.put('/:id', controller.editar);
    router.patch('/:id/status', controller.alterarStatus);
    return router;
}
