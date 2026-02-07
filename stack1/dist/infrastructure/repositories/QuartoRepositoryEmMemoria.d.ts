import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
/**
 * Implementação em memória do repositório de quartos.
 * Depende apenas da interface IQuartoRepository (DIP).
 */
export declare class QuartoRepositoryEmMemoria implements IQuartoRepository {
    private quartos;
    private nextId;
    private nextCamaId;
    findAll(): Promise<Quarto[]>;
    findById(id: number): Promise<Quarto | null>;
    findByNumero(numero: string, excludeId?: number): Promise<Quarto | null>;
    save(quarto: Quarto): Promise<Quarto>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=QuartoRepositoryEmMemoria.d.ts.map