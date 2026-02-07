import express from 'express';
import cors from 'cors';
import { QuartoRepositoryEmMemoria } from './infrastructure/repositories/QuartoRepository';
import { QuartoService } from './application/quartos/QuartoService';
import { QuartoController } from './application/quartos/QuartoController';
import { createQuartosRouter } from './application/quartos/quartos.routes';

const app = express();
app.use(cors());
app.use(express.json());

const quartoRepo = new QuartoRepositoryEmMemoria();
const quartoService = new QuartoService(quartoRepo);
const quartoController = new QuartoController(quartoService);

app.use('/api/quartos', createQuartosRouter(quartoController));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
