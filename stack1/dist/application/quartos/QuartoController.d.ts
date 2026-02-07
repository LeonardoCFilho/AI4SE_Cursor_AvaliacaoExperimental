import { Request, Response } from 'express';
import { QuartoService } from './QuartoService';
import { QuartoMapper } from './QuartoMapper';
/**
 * Controller REST para quartos (Adapter / Presenter).
 *
 * Decisão: Controller apenas adapta HTTP (req/res) para chamadas ao Service.
 * Não contém regras de negócio — apenas parseia params, chama Service e formata resposta.
 *
 * Decisão: handleDomainError centraliza mapeamento exceção→HTTP. Evita try/catch
 * repetido com lógica de status em cada método.
 *
 * Decisão: parseId e parseStatus retornam null em caso de erro e já enviam resposta.
 * Permite early return (if (id === null) return) e mantém o fluxo linear.
 */
export declare class QuartoController {
    private readonly service;
    private readonly mapper;
    constructor(service: QuartoService, mapper: QuartoMapper);
    listar: (_req: Request, res: Response) => Promise<void>;
    obterPorId: (req: Request, res: Response) => Promise<void>;
    cadastrar: (req: Request, res: Response) => Promise<void>;
    editar: (req: Request, res: Response) => Promise<void>;
    alterarStatus: (req: Request, res: Response) => Promise<void>;
    /** Parseia id da URL; envia 400 e retorna null se inválido */
    private parseId;
    /** Valida e parseia status do body; envia 400 e retorna null se inválido */
    private parseStatus;
}
//# sourceMappingURL=QuartoController.d.ts.map