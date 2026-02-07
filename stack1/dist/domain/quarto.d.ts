import { TipoQuarto, StatusQuarto } from './enums';
import { Cama } from './cama';
/**
 * Representa um quarto do hotel.
 */
export declare class Quarto {
    readonly id: number;
    readonly numero: string;
    readonly tipo: TipoQuarto;
    readonly capacidade: number;
    readonly precoDiaria: number;
    status: StatusQuarto;
    readonly frigobar: boolean;
    readonly cafeManhaIncluso: boolean;
    readonly arCondicionado: boolean;
    readonly tv: boolean;
    readonly camas: Cama[];
    constructor(id: number, numero: string, tipo: TipoQuarto, capacidade: number, precoDiaria: number, status: StatusQuarto, frigobar?: boolean, cafeManhaIncluso?: boolean, arCondicionado?: boolean, tv?: boolean, camas?: Cama[]);
    /**
     * Verifica se o quarto está disponível (status LIVRE).
     */
    estaDisponivel(): boolean;
    /**
     * Verifica se o quarto pode ser reservado.
     * RF-04.1: Impedir reserva de quarto ocupado ou em manutenção/limpeza.
     */
    podeSerReservado(): boolean;
    /**
     * Altera o status do quarto.
     */
    alterarStatus(novoStatus: StatusQuarto): void;
}
//# sourceMappingURL=quarto.d.ts.map