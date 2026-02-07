package com.hotel.common;

/**
 * Exceção quando número do quarto já existe (RF-04.5).
 * Decisão: GlobalExceptionHandler mapeia para 409 Conflict — indica conflito de recurso.
 */
public class NumeroQuartoDuplicadoException extends RuntimeException {

    public NumeroQuartoDuplicadoException(String numero) {
        super("Já existe um quarto com o número " + numero);
    }
}
