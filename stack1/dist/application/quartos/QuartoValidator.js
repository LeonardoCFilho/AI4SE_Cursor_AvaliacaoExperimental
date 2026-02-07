"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuartoValidator = void 0;
const errors_1 = require("../../domain/errors");
/**
 * Validação de quarto (SRP — Single Responsibility).
 *
 * Decisão: Validator separado do Service para que o Service orquestre fluxos, não
 * regras de validação. Novas regras são adicionadas aqui sem alterar QuartoService.
 *
 * Decisão: isUpdate para diferenciar cadastro (id não obrigatório) de edição (id obrigatório).
 */
class QuartoValidator {
    validate(dto, isUpdate = false) {
        if (isUpdate && (!dto.id || dto.id <= 0)) {
            throw new errors_1.ValidationError('ID do quarto é obrigatório para edição');
        }
        if (!dto.numero?.trim()) {
            throw new errors_1.ValidationError('Número do quarto é obrigatório');
        }
        if (!dto.tipo) {
            throw new errors_1.ValidationError('Tipo do quarto é obrigatório');
        }
        if (dto.capacidade == null || dto.capacidade < 1) {
            throw new errors_1.ValidationError('Capacidade deve ser maior que zero');
        }
        if (dto.precoDiaria == null || dto.precoDiaria < 0) {
            throw new errors_1.ValidationError('Preço por diária deve ser maior ou igual a zero');
        }
    }
}
exports.QuartoValidator = QuartoValidator;
