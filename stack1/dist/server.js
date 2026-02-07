"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const QuartoRepositoryEmMemoria_1 = require("./infrastructure/repositories/QuartoRepositoryEmMemoria");
const QuartoService_1 = require("./application/quartos/QuartoService");
const QuartoController_1 = require("./application/quartos/QuartoController");
const QuartoMapper_1 = require("./application/quartos/QuartoMapper");
const QuartoValidator_1 = require("./application/quartos/QuartoValidator");
const quartos_routes_1 = require("./application/quartos/quartos.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Composição de dependências (DIP)
const quartoRepo = new QuartoRepositoryEmMemoria_1.QuartoRepositoryEmMemoria();
const quartoMapper = new QuartoMapper_1.QuartoMapper();
const quartoValidator = new QuartoValidator_1.QuartoValidator();
const quartoService = new QuartoService_1.QuartoService(quartoRepo, quartoMapper, quartoValidator);
const quartoController = new QuartoController_1.QuartoController(quartoService, quartoMapper);
app.use('/api/quartos', (0, quartos_routes_1.createQuartosRouter)(quartoController));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
