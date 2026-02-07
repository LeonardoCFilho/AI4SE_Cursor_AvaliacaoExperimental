import { Request, Response } from 'express';
import { QuartoService } from './QuartoService';
import { QuartoMapper } from './QuartoMapper';
/**
 * Controller REST para quartos.
 * Responsabilidade única: adaptar HTTP ↔ aplicação.
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
    private parseId;
    private parseStatus;
}
//# sourceMappingURL=QuartoController.d.ts.map