import { Quarto } from '../quarto';

/**
 * Porta do repositório de quartos (DIP).
 * A camada de aplicação depende desta abstração, não da implementação.
 */
export interface IQuartoRepository {
  findAll(): Promise<Quarto[]>;
  findById(id: number): Promise<Quarto | null>;
  findByNumero(numero: string, excludeId?: number): Promise<Quarto | null>;
  save(quarto: Quarto): Promise<Quarto>;
  delete(id: number): Promise<boolean>;
}
