package com.hotel.domain;

import jakarta.persistence.*;
import java.util.Objects;

/**
 * Representa um hóspede cadastrado no sistema.
 * RF-02.1: nome, sobrenome, CPF e e-mail.
 * RF-04.3: Validação de CPF (formato e unicidade).
 * RF-04.4: Validação de e-mail.
 */
@Entity
@Table(name = "hospede", uniqueConstraints = @UniqueConstraint(columnNames = "cpf"))
public class Hospede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sobrenome;

    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(nullable = false)
    private String email;

    protected Hospede() {
    }

    public Hospede(String nome, String sobrenome, String cpf, String email) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.email = email;
    }

    /**
     * Retorna o nome completo do hóspede.
     */
    public String getNomeCompleto() {
        return (nome + " " + sobrenome).trim();
    }

    // getters e setters

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hospede hospede = (Hospede) o;
        return id != null && Objects.equals(id, hospede.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
