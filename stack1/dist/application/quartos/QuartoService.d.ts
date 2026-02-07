import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';
import { QuartoMapper } from './QuartoMapper';
import { QuartoValidator } from './QuartoValidator';
/**
 * Casos de uso do módulo de quartos.
 * Orquestra validação, repositório e mapeamento (SRP por caso de uso).
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