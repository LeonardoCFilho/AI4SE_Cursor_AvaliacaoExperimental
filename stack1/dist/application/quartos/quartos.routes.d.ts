import { Router } from 'express';
import { QuartoController } from './QuartoController';
/**
 * Factory para rotas de quartos. Injeta controller e retorna Router configurado.
 * Decisão: Função em vez de arquivo estático — permite testar rotas com controller mock.
 */
export declare function createQuartosRouter(controller: QuartoController): Router;
//# sourceMappingURL=quartos.routes.d.ts.map