import { TipoCama } from './enums';

/**
 * Representa uma cama no quarto.
 */
export class Cama {
  constructor(
    public readonly id: number,
    public readonly tipo: TipoCama,
    public readonly quartoId?: number
  ) {}
}
