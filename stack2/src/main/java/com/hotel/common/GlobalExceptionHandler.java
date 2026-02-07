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
 *
 * Decisão: Controller foca em HTTP; este handler centraliza exceção → status HTTP + body.
 * Evita try/catch repetido em cada controller e garante formato consistente de erro.
 *
 * Decisão: @RestControllerAdvice — aplica-se a todos os controllers sem configuração extra.
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

    /** Decisão: formata erros de Bean Validation (@Valid) em lista legível para o cliente. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        List<String> erros = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of(CAMPO_ERRO, "Validação falhou", "detalhes", erros));
    }
}
