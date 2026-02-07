import { Request, Response } from 'express';
import { QuartoService } from './QuartoService';
import { QuartoMapper } from './QuartoMapper';
import { QuartoDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';
import { handleDomainError } from '../common/HttpErrorHandler';

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

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
export class QuartoController {
  constructor(
    private readonly service: QuartoService,
    private readonly mapper: QuartoMapper
  ) {}

  listar = async (_req: Request, res: Response): Promise<void> => {
    try {
      const quartos = await this.service.listar();
      res.json(quartos);
    } catch (err) {
      handleDomainError(err, res);
    }
  };

  obterPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = this.parseId(req.params.id, res);
      if (id === null) return;

      const quarto = await this.service.obterPorId(id);
      if (!quarto) {
        res.status(NOT_FOUND).json({ erro: 'Quarto não encontrado' });
        return;
      }
      res.json(this.mapper.toDto(quarto));
    } catch (err) {
      handleDomainError(err, res);
    }
  };

  cadastrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as QuartoDto;
      const quarto = await this.service.cadastrar(dto);
      res.status(201).json(this.mapper.toDto(quarto));
    } catch (err) {
      handleDomainError(err, res);
    }
  };

  editar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = this.parseId(req.params.id, res);
      if (id === null) return;

      const dto = { ...req.body, id } as QuartoDto;
      const quarto = await this.service.editar(dto);
      res.json(this.mapper.toDto(quarto));
    } catch (err) {
      handleDomainError(err, res);
    }
  };

  alterarStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = this.parseId(req.params.id, res);
      if (id === null) return;

      const { status } = req.body;
      const statusValidado = this.parseStatus(status, res);
      if (!statusValidado) return;

      const quarto = await this.service.alterarStatus(id, statusValidado);
      if (!quarto) {
        res.status(NOT_FOUND).json({ erro: 'Quarto não encontrado' });
        return;
      }
      res.json(this.mapper.toDto(quarto));
    } catch (err) {
      handleDomainError(err, res);
    }
  };

  /** Parseia id da URL; envia 400 e retorna null se inválido */
  private parseId(param: string, res: Response): number | null {
    const id = parseInt(param, 10);
    if (isNaN(id)) {
      res.status(BAD_REQUEST).json({ erro: 'ID inválido' });
      return null;
    }
    return id;
  }

  /** Valida e parseia status do body; envia 400 e retorna null se inválido */
  private parseStatus(status: unknown, res: Response): StatusQuarto | null {
    const statuses = Object.values(StatusQuarto) as string[];
    if (typeof status === 'string' && statuses.includes(status)) {
      return status as StatusQuarto;
    }
    res.status(BAD_REQUEST).json({ erro: 'Status inválido' });
    return null;
  }
}
