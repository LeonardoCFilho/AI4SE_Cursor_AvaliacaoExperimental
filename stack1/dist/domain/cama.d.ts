import { TipoCama } from './enums';
/**
 * Representa uma cama no quarto.
 */
export declare class Cama {
    readonly id: number;
    readonly tipo: TipoCama;
    readonly quartoId?: number | undefined;
    constructor(id: number, tipo: TipoCama, quartoId?: number | undefined);
}
//# sourceMappingURL=cama.d.ts.map