package com.hotel.common;

/**
 * Exceção quando número do quarto já existe (RF-04.5).
 */
public class NumeroQuartoDuplicadoException extends RuntimeException {

    public NumeroQuartoDuplicadoException(String numero) {
        super("Já existe um quarto com o número " + numero);
    }
}
