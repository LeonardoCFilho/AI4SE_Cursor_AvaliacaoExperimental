package com.hotel.domain;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Representa um quarto do hotel.
 * RF-01.1: número, capacidade, tipo, preço por diária, comodidades.
 * RF-04.1: Impedir reserva de quarto ocupado ou em manutenção/limpeza.
 * RF-04.5: Unicidade do número do quarto.
 */
@Entity
@Table(name = "quarto", uniqueConstraints = @UniqueConstraint(columnNames = "numero"))
public class Quarto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoQuarto tipo;

    @Column(nullable = false)
    private Integer capacidade;

    @Column(name = "preco_diaria", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoDiaria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusQuarto status = StatusQuarto.LIVRE;

    @Column(nullable = false)
    private Boolean frigobar = false;

    @Column(name = "cafe_manha_incluso", nullable = false)
    private Boolean cafeManhaIncluso = false;

    @Column(name = "ar_condicionado", nullable = false)
    private Boolean arCondicionado = false;

    @Column(nullable = false)
    private Boolean tv = false;

    @OneToMany(mappedBy = "quarto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cama> camas = new ArrayList<>();

    protected Quarto() {
    }

    public Quarto(String numero, TipoQuarto tipo, Integer capacidade, BigDecimal precoDiaria) {
        this.numero = numero;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.precoDiaria = precoDiaria;
    }

    /**
     * Verifica se o quarto está disponível (status LIVRE).
     */
    public boolean estaDisponivel() {
        return status == StatusQuarto.LIVRE;
    }

    /**
     * Verifica se o quarto pode ser reservado.
     * RF-04.1: Impedir reserva de quarto ocupado ou em manutenção/limpeza.
     */
    public boolean podeSerReservado() {
        return status != StatusQuarto.OCUPADO && status != StatusQuarto.MANUTENCAO_LIMPEZA;
    }

    public void alterarStatus(StatusQuarto novoStatus) {
        this.status = novoStatus;
    }

    public void adicionarCama(Cama cama) {
        camas.add(cama);
        cama.setQuarto(this);
    }

    public void removerCama(Cama cama) {
        camas.remove(cama);
    }

    /**
     * Substitui todas as camas pelas novas (para edição).
     * Usado pelo Service ao editar quarto.
     */
    public void substituirCamas(List<Cama> novasCamas) {
        camas.clear();
        for (Cama c : novasCamas) {
            adicionarCama(c);
        }
    }

    // getters e setters

    public Long getId() {
        return id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public TipoQuarto getTipo() {
        return tipo;
    }

    public void setTipo(TipoQuarto tipo) {
        this.tipo = tipo;
    }

    public Integer getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(Integer capacidade) {
        this.capacidade = capacidade;
    }

    public BigDecimal getPrecoDiaria() {
        return precoDiaria;
    }

    public void setPrecoDiaria(BigDecimal precoDiaria) {
        this.precoDiaria = precoDiaria;
    }

    public StatusQuarto getStatus() {
        return status;
    }

    public void setStatus(StatusQuarto status) {
        this.status = status;
    }

    public Boolean getFrigobar() {
        return frigobar;
    }

    public void setFrigobar(Boolean frigobar) {
        this.frigobar = frigobar;
    }

    public Boolean getCafeManhaIncluso() {
        return cafeManhaIncluso;
    }

    public void setCafeManhaIncluso(Boolean cafeManhaIncluso) {
        this.cafeManhaIncluso = cafeManhaIncluso;
    }

    public Boolean getArCondicionado() {
        return arCondicionado;
    }

    public void setArCondicionado(Boolean arCondicionado) {
        this.arCondicionado = arCondicionado;
    }

    public Boolean getTv() {
        return tv;
    }

    public void setTv(Boolean tv) {
        this.tv = tv;
    }

    public List<Cama> getCamas() {
        return Collections.unmodifiableList(camas);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quarto quarto = (Quarto) o;
        return id != null && Objects.equals(id, quarto.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
