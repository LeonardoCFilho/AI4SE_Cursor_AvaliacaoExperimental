import { Quarto } from '../../domain/quarto';
import { Cama } from '../../domain/cama';
import { QuartoDto } from '../../application/quartos/quartos.dto';
import { StatusQuarto } from '../../domain/enums';

export interface IQuartoRepository {
  findAll(): Promise<Quarto[]>;
  findById(id: number): Promise<Quarto | null>;
  findByNumero(numero: string, excludeId?: number): Promise<Quarto | null>;
  save(dto: QuartoDto): Promise<Quarto>;
  delete(id: number): Promise<boolean>;
}

export class QuartoRepositoryEmMemoria implements IQuartoRepository {
  private quartos: Map<number, Quarto> = new Map();
  private nextId = 1;
  private nextCamaId = 1;

  private dtoToQuarto(dto: QuartoDto, id: number): Quarto {
    const camas = (dto.camas || []).map((c, idx) => {
      const camaId = c.id && c.id > 0 ? c.id : this.nextCamaId++;
      return new Cama(camaId, c.tipo, id);
    });
    return new Quarto(
      id,
      dto.numero.trim(),
      dto.tipo,
      dto.capacidade,
      dto.precoDiaria,
      dto.status ?? StatusQuarto.LIVRE,
      dto.frigobar ?? false,
      dto.cafeManhaIncluso ?? false,
      dto.arCondicionado ?? false,
      dto.tv ?? false,
      camas
    );
  }

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

  async save(dto: QuartoDto): Promise<Quarto> {
    const isUpdate = dto.id !== undefined && dto.id > 0;
    const id = isUpdate ? dto.id! : this.nextId++;

    const quarto = this.dtoToQuarto(dto, id);
    this.quartos.set(id, quarto);
    return quarto;
  }

  async delete(id: number): Promise<boolean> {
    return this.quartos.delete(id);
  }
}
