import { QuartoDto } from './quartos.dto';
/**
 * Validação de quarto (SRP — Single Responsibility).
 *
 * Decisão: Validator separado do Service para que o Service orquestre fluxos, não
 * regras de validação. Novas regras são adicionadas aqui sem alterar QuartoService.
 *
 * Decisão: isUpdate para diferenciar cadastro (id não obrigatório) de edição (id obrigatório).
 */
export declare class QuartoValidator {
    validate(dto: QuartoDto, isUpdate?: boolean): void;
}
//# sourceMappingURL=QuartoValidator.d.ts.map