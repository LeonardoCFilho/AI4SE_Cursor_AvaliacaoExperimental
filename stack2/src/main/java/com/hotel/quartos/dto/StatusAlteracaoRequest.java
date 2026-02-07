package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para alteração de status do quarto.
 *
 * Decisão: Record com @NotNull no enum — Spring deserializa JSON (ex: {"status":"OCUPADO"}) e valida.
 * Alternativa rejeitada: Map<String,String> — parsing manual no controller e sem validação declarativa.
 */
public record StatusAlteracaoRequest(
        @NotNull(message = "Status é obrigatório")
        StatusQuarto status
) {
}
