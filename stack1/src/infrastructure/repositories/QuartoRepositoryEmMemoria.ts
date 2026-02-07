import { Quarto } from '../../domain/quarto';
import { Cama } from '../../domain/cama';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';

/**
 * Implementação em memória do repositório de quartos.
 * Depende apenas da interface IQuartoRepository (DIP).
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
    const isNew = quarto.id === 0;
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
