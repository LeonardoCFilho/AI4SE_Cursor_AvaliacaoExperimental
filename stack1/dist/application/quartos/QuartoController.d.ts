import { Request, Response } from 'express';
import { QuartoService } from './QuartoService';
export declare class QuartoController {
    private readonly service;
    constructor(service: QuartoService);
    listar: (_req: Request, res: Response) => Promise<void>;
    obterPorId: (req: Request, res: Response) => Promise<void>;
    cadastrar: (req: Request, res: Response) => Promise<void>;
    editar: (req: Request, res: Response) => Promise<void>;
    alterarStatus: (req: Request, res: Response) => Promise<void>;
    private toResponseDto;
}
//# sourceMappingURL=QuartoController.d.ts.map