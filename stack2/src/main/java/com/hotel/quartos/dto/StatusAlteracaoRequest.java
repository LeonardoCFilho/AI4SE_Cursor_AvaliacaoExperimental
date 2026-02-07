package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para alteração de status do quarto.
 */
public record StatusAlteracaoRequest(
        @NotNull(message = "Status é obrigatório")
        StatusQuarto status
) {
}
