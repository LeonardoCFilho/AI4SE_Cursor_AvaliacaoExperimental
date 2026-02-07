/**
 * Representa um hóspede cadastrado no sistema.
 */
export class Hospede {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly sobrenome: string,
    public readonly cpf: string,
    public readonly email: string
  ) {}

  /**
   * Retorna o nome completo do hóspede.
   */
  getNomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`.trim();
  }
}
