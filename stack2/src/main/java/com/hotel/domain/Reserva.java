package com.hotel.domain;

import com.hotel.domain.enums.StatusReserva;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Representa uma reserva de quarto associada a um hóspede.
 * RF-03.2: Criar reservas associando quarto e hóspede.
 * RF-04.2: Atualizar disponibilidade ao criar/alterar/cancelar reserva.
 */
@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quarto_id", nullable = false)
    private Quarto quarto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospede_id", nullable = false)
    private Hospede hospede;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_fim", nullable = false)
    private LocalDate dataFim;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusReserva status = StatusReserva.ATIVA;

    protected Reserva() {
    }

    public Reserva(Quarto quarto, Hospede hospede, LocalDate dataInicio, LocalDate dataFim) {
        this.quarto = quarto;
        this.hospede = hospede;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    /**
     * Verifica se a reserva está ativa.
     */
    public boolean estaAtiva() {
        return status == StatusReserva.ATIVA;
    }

    /**
     * Cancela a reserva.
     */
    public void cancelar() {
        this.status = StatusReserva.CANCELADA;
    }

    // getters e setters

    public Long getId() {
        return id;
    }

    public Quarto getQuarto() {
        return quarto;
    }

    public void setQuarto(Quarto quarto) {
        this.quarto = quarto;
    }

    public Hospede getHospede() {
        return hospede;
    }

    public void setHospede(Hospede hospede) {
        this.hospede = hospede;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public StatusReserva getStatus() {
        return status;
    }

    public void setStatus(StatusReserva status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reserva reserva = (Reserva) o;
        return id != null && Objects.equals(id, reserva.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
