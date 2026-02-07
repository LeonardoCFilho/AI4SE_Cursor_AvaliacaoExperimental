import { Quarto } from '../../domain/quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
/**
 * Implementação em memória do repositório (DIP — implementa a porta).
 *
 * Decisão: Persistência em Map para desenvolvimento e testes. Pode ser substituída
 * por QuartoRepositoryPostgres sem alterar Service (LSP).
 *
 * Decisão: save() — id=0 indica criação; gera novo id e id de camas. Para update,
 * preserva ids existentes e gera novos apenas para camas adicionadas (id=0).
 *
 * Decisão: findByNumero(numero, excludeId) — excludeId usado na edição para
 * permitir manter o mesmo número ao editar (unicidade exclui o próprio registro).
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