import { Request, Response } from 'express';
import { Quarto } from '../../domain/quarto';
import { QuartoService } from './QuartoService';
import { QuartoDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';

export class QuartoController {
  constructor(private readonly service: QuartoService) {}

  listar = async (_req: Request, res: Response): Promise<void> => {
    try {
      const quartos = await this.service.listar();
      res.json(quartos);
    } catch (err) {
      res.status(500).json({ erro: (err as Error).message });
    }
  };

  obterPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ erro: 'ID inválido' });
        return;
      }
      const quarto = await this.service.obterPorId(id);
      if (!quarto) {
        res.status(404).json({ erro: 'Quarto não encontrado' });
        return;
      }
      res.json(this.toResponseDto(quarto));
    } catch (err) {
      res.status(500).json({ erro: (err as Error).message });
    }
  };

  cadastrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = req.body as QuartoDto;
      const quarto = await this.service.cadastrar(dto);
      res.status(201).json(this.toResponseDto(quarto));
    } catch (err) {
      const msg = (err as Error).message;
      if (msg.includes('Já existe') || msg.includes('obrigatório') || msg.includes('deve')) {
        res.status(400).json({ erro: msg });
      } else {
        res.status(500).json({ erro: msg });
      }
    }
  };

  editar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ erro: 'ID inválido' });
        return;
      }
      const dto = { ...req.body, id } as QuartoDto;
      const quarto = await this.service.editar(dto);
      res.json(this.toResponseDto(quarto));
    } catch (err) {
      const msg = (err as Error).message;
      if (msg.includes('não encontrado')) {
        res.status(404).json({ erro: msg });
      } else if (msg.includes('Já existe') || msg.includes('obrigatório') || msg.includes('deve')) {
        res.status(400).json({ erro: msg });
      } else {
        res.status(500).json({ erro: msg });
      }
    }
  };

  alterarStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;
      if (isNaN(id)) {
        res.status(400).json({ erro: 'ID inválido' });
        return;
      }
      if (!Object.values(StatusQuarto).includes(status)) {
        res.status(400).json({ erro: 'Status inválido' });
        return;
      }
      const quarto = await this.service.alterarStatus(id, status);
      if (!quarto) {
        res.status(404).json({ erro: 'Quarto não encontrado' });
        return;
      }
      res.json(this.toResponseDto(quarto));
    } catch (err) {
      res.status(500).json({ erro: (err as Error).message });
    }
  };

  private toResponseDto(quarto: Quarto) {
    return {
      id: quarto.id,
      numero: quarto.numero,
      tipo: quarto.tipo,
      capacidade: quarto.capacidade,
      precoDiaria: quarto.precoDiaria,
      status: quarto.status,
      frigobar: quarto.frigobar,
      cafeManhaIncluso: quarto.cafeManhaIncluso,
      arCondicionado: quarto.arCondicionado,
      tv: quarto.tv,
      camas: quarto.camas.map((c) => ({ id: c.id, tipo: c.tipo })),
    };
  }
}
