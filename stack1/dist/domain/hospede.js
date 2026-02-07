"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hospede = void 0;
/**
 * Representa um hóspede cadastrado no sistema.
 */
class Hospede {
    constructor(id, nome, sobrenome, cpf, email) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.email = email;
    }
    /**
     * Retorna o nome completo do hóspede.
     */
    getNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`.trim();
    }
}
exports.Hospede = Hospede;
