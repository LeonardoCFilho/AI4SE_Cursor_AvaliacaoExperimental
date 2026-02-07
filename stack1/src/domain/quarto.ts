import { TipoQuarto, StatusQuarto } from './enums';
import { Cama } from './cama';

/**
 * Representa um quarto do hotel.
 */
export class Quarto {
  constructor(
    public readonly id: number,
    public readonly numero: string,
    public readonly tipo: TipoQuarto,
    public readonly capacidade: number,
    public readonly precoDiaria: number,
    public status: StatusQuarto,
    public readonly frigobar: boolean = false,
    public readonly cafeManhaIncluso: boolean = false,
    public readonly arCondicionado: boolean = false,
    public readonly tv: boolean = false,
    public readonly camas: Cama[] = []
  ) {}

  /**
   * Verifica se o quarto está disponível (status LIVRE).
   */
  estaDisponivel(): boolean {
    return this.status === StatusQuarto.LIVRE;
  }

  /**
   * Verifica se o quarto pode ser reservado.
   * RF-04.1: Impedir reserva de quarto ocupado ou em manutenção/limpeza.
   */
  podeSerReservado(): boolean {
    return (
      this.status !== StatusQuarto.OCUPADO &&
      this.status !== StatusQuarto.MANUTENCAO_LIMPEZA
    );
  }

  /**
   * Altera o status do quarto.
   */
  alterarStatus(novoStatus: StatusQuarto): void {
    this.status = novoStatus;
  }
}
