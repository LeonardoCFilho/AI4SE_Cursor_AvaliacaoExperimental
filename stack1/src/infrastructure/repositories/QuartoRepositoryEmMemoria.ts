import { Quarto } from '../../domain/quarto';
import { Cama } from '../../domain/cama';
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
export class QuartoRepositoryEmMemoria implements IQuartoRepository {
  private quartos: Map<number, Quarto> = new Map();
  private nextId = 1;
  private nextCamaId = 1;

  async findAll(): Promise<Quarto[]> {
    return Array.from(this.quartos.values());
  }

  async findById(id: number): Promise<Quarto | null> {
    return this.quartos.get(id) ?? null;
  }

  async findByNumero(numero: string, excludeId?: number): Promise<Quarto | null> {
    const num = numero.trim().toUpperCase();
    for (const q of this.quartos.values()) {
      if (excludeId !== undefined && q.id === excludeId) continue;
      if (q.numero.trim().toUpperCase() === num) return q;
    }
    return null;
  }

  async save(quarto: Quarto): Promise<Quarto> {
    const isNew = quarto.id === 0; // Convenção: id=0 = criação
    const id = isNew ? this.nextId++ : quarto.id;

    const camas = quarto.camas.map((c) => {
      const camaId = c.id > 0 ? c.id : this.nextCamaId++;
      return new Cama(camaId, c.tipo, id);
    });

    const quartoPersistido = new Quarto(
      id,
      quarto.numero,
      quarto.tipo,
      quarto.capacidade,
      quarto.precoDiaria,
      quarto.status,
      quarto.frigobar,
      quarto.cafeManhaIncluso,
      quarto.arCondicionado,
      quarto.tv,
      camas
    );

    this.quartos.set(id, quartoPersistido);
    return quartoPersistido;
  }

  async delete(id: number): Promise<boolean> {
    return this.quartos.delete(id);
  }
}
