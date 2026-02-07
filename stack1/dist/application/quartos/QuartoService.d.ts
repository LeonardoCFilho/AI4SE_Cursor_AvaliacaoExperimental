import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';
import { QuartoMapper } from './QuartoMapper';
import { QuartoValidator } from './QuartoValidator';
/**
 * Casos de uso do módulo de quartos (Application Service / Use Case).
 *
 * Decisão: Service orquestra validação, repositório e mapeamento. Não contém lógica
 * de persistência nem de conversão — delega a Validator, Repository e Mapper.
 *
 * Decisão: Injeção de dependências no construtor (DIP). Facilita testes unitários
 * com mocks de repositório, validator e mapper.
 *
 * Decisão: ensureNumeroUnico() é regra de negócio (RF-04.5) — fica no Service,
 * não no Validator. Validator trata formato; Service trata unicidade (requer I/O).
 */
export declare class QuartoService {
    private readonly repository;
    private readonly mapper;
    private readonly validator;
    constructor(repository: IQuartoRepository, mapper: QuartoMapper, validator: QuartoValidator);
    listar(): Promise<QuartoListagemDto[]>;
    obterPorId(id: number): Promise<Quarto | null>;
    cadastrar(dto: QuartoDto): Promise<Quarto>;
    editar(dto: QuartoDto): Promise<Quarto>;
    alterarStatus(id: number, status: StatusQuarto): Promise<Quarto | null>;
    private ensureNumeroUnico;
}
//# sourceMappingURL=QuartoService.d.ts.map