"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quarto = void 0;
const enums_1 = require("./enums");
/**
 * Representa um quarto do hotel.
 *
 * Decisão: "status" é mutável (não readonly) porque alterarStatus() modifica o estado.
 * Os demais campos são readonly — imutabilidade parcial ajuda a evitar efeitos colaterais.
 *
 * Decisão: alterarStatus() modifica in-place; o repositório persiste o objeto.
 * Alternativa seria retornar novo Quarto (imutável total), mas exigiria mais overhead.
 */
class Quarto {
    constructor(id, numero, tipo, capacidade, precoDiaria, status, frigobar = false, cafeManhaIncluso = false, arCondicionado = false, tv = false, camas = []) {
        this.id = id;
        this.numero = numero;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.precoDiaria = precoDiaria;
        this.status = status;
        this.frigobar = frigobar;
        this.cafeManhaIncluso = cafeManhaIncluso;
        this.arCondicionado = arCondicionado;
        this.tv = tv;
        this.camas = camas;
    }
    /**
     * Verifica se o quarto está disponível (status LIVRE).
     */
    estaDisponivel() {
        return this.status === enums_1.StatusQuarto.LIVRE;
    }
    /**
     * Verifica se o quarto pode ser reservado.
     * RF-04.1: Impedir reserva de quarto ocupado ou em manutenção/limpeza.
     */
    podeSerReservado() {
        return (this.status !== enums_1.StatusQuarto.OCUPADO &&
            this.status !== enums_1.StatusQuarto.MANUTENCAO_LIMPEZA);
    }
    /**
     * Altera o status do quarto.
     */
    alterarStatus(novoStatus) {
        this.status = novoStatus;
    }
}
exports.Quarto = Quarto;
