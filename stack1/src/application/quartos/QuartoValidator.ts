import { QuartoDto } from './quartos.dto';
import { ValidationError } from '../../domain/errors';

/**
 * Validação de quarto (SRP — Single Responsibility).
 *
 * Decisão: Validator separado do Service para que o Service orquestre fluxos, não
 * regras de validação. Novas regras são adicionadas aqui sem alterar QuartoService.
 *
 * Decisão: isUpdate para diferenciar cadastro (id não obrigatório) de edição (id obrigatório).
 */
export class QuartoValidator {
  validate(dto: QuartoDto, isUpdate = false): void {
    if (isUpdate && (!dto.id || dto.id <= 0)) {
      throw new ValidationError('ID do quarto é obrigatório para edição');
    }
    if (!dto.numero?.trim()) {
      throw new ValidationError('Número do quarto é obrigatório');
    }
    if (!dto.tipo) {
      throw new ValidationError('Tipo do quarto é obrigatório');
    }
    if (dto.capacidade == null || dto.capacidade < 1) {
      throw new ValidationError('Capacidade deve ser maior que zero');
    }
    if (dto.precoDiaria == null || dto.precoDiaria < 0) {
      throw new ValidationError('Preço por diária deve ser maior ou igual a zero');
    }
  }
}
