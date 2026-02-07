import { Quarto } from '../quarto';

/**
 * Porta do repositório de quartos (DIP — Dependency Inversion Principle).
 *
 * Decisão: A interface ficou no domínio para que a camada de aplicação dependa
 * de abstrações, não de implementações. O QuartoService recebe IQuartoRepository
 * via construtor, permitindo trocar QuartoRepositoryEmMemoria por QuartoRepositoryPostgres
 * sem alterar o Service.
 *
 * Decisão: save() recebe e retorna Quarto (entidade de domínio), não DTO. Assim o
 * repositório não conhece a camada de aplicação — a conversão DTO↔Quarto fica no
 * QuartoMapper, no Service.
 */
export interface IQuartoRepository {
  findAll(): Promise<Quarto[]>;
  findById(id: number): Promise<Quarto | null>;
  findByNumero(numero: string, excludeId?: number): Promise<Quarto | null>;
  save(quarto: Quarto): Promise<Quarto>;
  delete(id: number): Promise<boolean>;
}
