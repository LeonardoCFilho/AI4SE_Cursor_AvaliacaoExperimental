package com.hotel.quartos;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.quartos.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para Gestão de Quartos.
 * RF-01: Cadastro, edição, listagem, alteração de status.
 */
@RestController
@RequestMapping("/quartos")
public class QuartoController {

    private final QuartoService service;  // DIP: depende da abstração

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
            @Valid @RequestBody StatusAlteracaoRequest request
    ) {
        QuartoResponse response = service.alterarStatus(id, request.status());
        return ResponseEntity.ok(response);
    }
}
