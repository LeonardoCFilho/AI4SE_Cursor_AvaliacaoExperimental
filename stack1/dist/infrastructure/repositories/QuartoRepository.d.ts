import { Quarto } from '../../domain/quarto';
import { QuartoDto } from '../../application/quartos/quartos.dto';
export interface IQuartoRepository {
    findAll(): Promise<Quarto[]>;
    findById(id: number): Promise<Quarto | null>;
    findByNumero(numero: string, excludeId?: number): Promise<Quarto | null>;
    save(dto: QuartoDto): Promise<Quarto>;
    delete(id: number): Promise<boolean>;
}
export declare class QuartoRepositoryEmMemoria implements IQuartoRepository {
    private quartos;
    private nextId;
    private nextCamaId;
    private dtoToQuarto;
    findAll(): Promise<Quarto[]>;
    findById(id: number): Promise<Quarto | null>;
    findByNumero(numero: string, excludeId?: number): Promise<Quarto | null>;
    save(dto: QuartoDto): Promise<Quarto>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=QuartoRepository.d.ts.map