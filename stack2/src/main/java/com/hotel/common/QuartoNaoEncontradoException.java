package com.hotel.common;

/**
 * Exceção quando quarto não é encontrado.
 * Decisão: RuntimeException — GlobalExceptionHandler mapeia para 404; não exige throws na assinatura.
 */
public class QuartoNaoEncontradoException extends RuntimeException {

    public QuartoNaoEncontradoException(Long id) {
        super("Quarto não encontrado: " + id);
    }

    public QuartoNaoEncontradoException(String message) {
        super(message);
    }
}
