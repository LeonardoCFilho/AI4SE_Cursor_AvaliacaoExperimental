import { TipoCama } from './enums';
/**
 * Valor-objeto que representa uma cama. quartoId opcional — útil quando a cama
 * ainda não foi persistida (criação). Após save, o repositório preenche.
 */
export declare class Cama {
    readonly id: number;
    readonly tipo: TipoCama;
    readonly quartoId?: number | undefined;
    constructor(id: number, tipo: TipoCama, quartoId?: number | undefined);
}
//# sourceMappingURL=cama.d.ts.map