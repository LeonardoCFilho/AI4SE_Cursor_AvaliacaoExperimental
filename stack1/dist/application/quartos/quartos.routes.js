"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuartosRouter = createQuartosRouter;
const express_1 = require("express");
function createQuartosRouter(controller) {
    const router = (0, express_1.Router)();
    router.get('/', controller.listar);
    router.get('/:id', controller.obterPorId);
    router.post('/', controller.cadastrar);
    router.put('/:id', controller.editar);
    router.patch('/:id/status', controller.alterarStatus);
    return router;
}
