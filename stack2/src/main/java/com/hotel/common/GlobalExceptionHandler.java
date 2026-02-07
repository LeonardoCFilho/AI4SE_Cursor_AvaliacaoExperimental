package com.hotel.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Tratamento global de exceções (SRP).
 * O Controller foca em HTTP; este handler centraliza o mapeamento exceção → resposta.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String CAMPO_ERRO = "erro";

    @ExceptionHandler(QuartoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleQuartoNaoEncontrado(QuartoNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of(CAMPO_ERRO, ex.getMessage()));
    }

    @ExceptionHandler(NumeroQuartoDuplicadoException.class)
    public ResponseEntity<Map<String, String>> handleNumeroDuplicado(NumeroQuartoDuplicadoException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of(CAMPO_ERRO, ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        List<String> erros = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of(CAMPO_ERRO, "Validação falhou", "detalhes", erros));
    }
}
