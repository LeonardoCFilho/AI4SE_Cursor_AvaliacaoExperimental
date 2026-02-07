/**
 * Representa um hóspede cadastrado no sistema.
 */
export declare class Hospede {
    readonly id: number;
    readonly nome: string;
    readonly sobrenome: string;
    readonly cpf: string;
    readonly email: string;
    constructor(id: number, nome: string, sobrenome: string, cpf: string, email: string);
    /**
     * Retorna o nome completo do hóspede.
     */
    getNomeCompleto(): string;
}
//# sourceMappingURL=hospede.d.ts.map