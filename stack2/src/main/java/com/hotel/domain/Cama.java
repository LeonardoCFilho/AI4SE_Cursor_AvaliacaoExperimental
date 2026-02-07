package com.hotel.domain;

import com.hotel.domain.enums.TipoCama;
import jakarta.persistence.*;
import java.util.Objects;

/**
 * Representa uma cama em um quarto.
 * RF-01.2: Cadastrar camas com tipo (Solteiro, Casal King, Casal Queen).
 *
 * Decisão: FetchType.LAZY — Quarto não carrega camas até acessar; evita N+1 em listagens quando não precisa.
 * Decisão: ManyToOne com JoinColumn — Cama é dona do relacionamento (possui quarto_id).
 */
@Entity
@Table(name = "cama")
public class Cama {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoCama tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quarto_id", nullable = false)
    private Quarto quarto;

    protected Cama() {
    }

    public Cama(TipoCama tipo, Quarto quarto) {
        this.tipo = tipo;
        this.quarto = quarto;
    }

    public Long getId() {
        return id;
    }

    public TipoCama getTipo() {
        return tipo;
    }

    public void setTipo(TipoCama tipo) {
        this.tipo = tipo;
    }

    public Quarto getQuarto() {
        return quarto;
    }

    public void setQuarto(Quarto quarto) {
        this.quarto = quarto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cama cama = (Cama) o;
        return id != null && Objects.equals(id, cama.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
