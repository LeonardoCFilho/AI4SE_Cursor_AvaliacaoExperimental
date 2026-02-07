import { TipoCama } from './enums';

/**
 * Valor-objeto que representa uma cama. quartoId opcional — útil quando a cama
 * ainda não foi persistida (criação). Após save, o repositório preenche.
 */
export class Cama {
  constructor(
    public readonly id: number,
    public readonly tipo: TipoCama,
    public readonly quartoId?: number
  ) {}
}
