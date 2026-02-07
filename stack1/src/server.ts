import express from 'express';
import cors from 'cors';
import { QuartoRepositoryEmMemoria } from './infrastructure/repositories/QuartoRepositoryEmMemoria';
import { QuartoService } from './application/quartos/QuartoService';
import { QuartoController } from './application/quartos/QuartoController';
import { QuartoMapper } from './application/quartos/QuartoMapper';
import { QuartoValidator } from './application/quartos/QuartoValidator';
import { createQuartosRouter } from './application/quartos/quartos.routes';

const app = express();
app.use(cors());
app.use(express.json());

/*
 * Composição de raiz (Composition Root) — DIP.
 * Decisão: Construção manual aqui. Para projetos maiores, considerar container IoC.
 * Ordem: Infra → Application (Repository → Service → Controller).
 */
const quartoRepo = new QuartoRepositoryEmMemoria();
const quartoMapper = new QuartoMapper();
const quartoValidator = new QuartoValidator();
const quartoService = new QuartoService(quartoRepo, quartoMapper, quartoValidator);
const quartoController = new QuartoController(quartoService, quartoMapper);

app.use('/api/quartos', createQuartosRouter(quartoController));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
