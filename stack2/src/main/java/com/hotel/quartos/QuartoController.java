package com.hotel.quartos;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.quartos.dto.*;
import com.hotel.common.NumeroQuartoDuplicadoException;
import com.hotel.common.QuartoNaoEncontradoException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller REST para Gestão de Quartos.
 * RF-01: Cadastro, edição, listagem, alteração de status.
 */
@RestController
@RequestMapping("/quartos")
public class QuartoController {

    private final QuartoService service;

    public QuartoController(QuartoService service) {
        this.service = service;
    }

    /**
     * Lista todos os quartos com número, tipo, preço por diária, disponibilidade e camas.
     */
    @GetMapping
    public List<QuartoListagemResponse> listar() {
        return service.listar();
    }

    /**
     * Obtém um quarto por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuartoResponse> obterPorId(@PathVariable Long id) {
        QuartoResponse response = service.obterPorId(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Cadastra um novo quarto.
     */
    @PostMapping
    public ResponseEntity<QuartoResponse> cadastrar(@Valid @RequestBody QuartoRequest request) {
        QuartoResponse response = service.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Edita um quarto existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuartoResponse> editar(
            @PathVariable Long id,
            @Valid @RequestBody QuartoRequest request
    ) {
        QuartoResponse response = service.editar(id, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Altera o status de disponibilidade do quarto.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<QuartoResponse> alterarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String statusStr = body.get("status");
        if (statusStr == null || statusStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        StatusQuarto status;
        try {
            status = StatusQuarto.valueOf(statusStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        QuartoResponse response = service.alterarStatus(id, status);
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(QuartoNaoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleQuartoNaoEncontrado(QuartoNaoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", ex.getMessage()));
    }

    @ExceptionHandler(NumeroQuartoDuplicadoException.class)
    public ResponseEntity<Map<String, String>> handleNumeroDuplicado(NumeroQuartoDuplicadoException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("erro", ex.getMessage()));
    }
}
