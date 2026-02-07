import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../infrastructure/repositories/QuartoRepository';
import { QuartoDto, QuartoListagemDto } from './quartos.dto';
import { StatusQuarto } from '../../domain/enums';
export declare class QuartoService {
    private readonly repository;
    constructor(repository: IQuartoRepository);
    listar(): Promise<QuartoListagemDto[]>;
    obterPorId(id: number): Promise<Quarto | null>;
    cadastrar(dto: QuartoDto): Promise<Quarto>;
    editar(dto: QuartoDto): Promise<Quarto>;
    alterarStatus(id: number, status: StatusQuarto): Promise<Quarto | null>;
    private validarUnicidadeNumero;
    private validarDto;
    private toListagemDto;
}
//# sourceMappingURL=QuartoService.d.ts.map