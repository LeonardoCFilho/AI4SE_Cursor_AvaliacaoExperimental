"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const QuartoRepository_1 = require("./infrastructure/repositories/QuartoRepository");
const QuartoService_1 = require("./application/quartos/QuartoService");
const QuartoController_1 = require("./application/quartos/QuartoController");
const quartos_routes_1 = require("./application/quartos/quartos.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const quartoRepo = new QuartoRepository_1.QuartoRepositoryEmMemoria();
const quartoService = new QuartoService_1.QuartoService(quartoRepo);
const quartoController = new QuartoController_1.QuartoController(quartoService);
app.use('/api/quartos', (0, quartos_routes_1.createQuartosRouter)(quartoController));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
