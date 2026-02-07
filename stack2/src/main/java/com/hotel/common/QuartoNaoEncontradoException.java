package com.hotel.common;

/**
 * Exceção quando quarto não é encontrado.
 */
public class QuartoNaoEncontradoException extends RuntimeException {

    public QuartoNaoEncontradoException(Long id) {
        super("Quarto não encontrado: " + id);
    }

    public QuartoNaoEncontradoException(String message) {
        super(message);
    }
}
