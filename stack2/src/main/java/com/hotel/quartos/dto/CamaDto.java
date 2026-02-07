package com.hotel.quartos.dto;

import com.hotel.domain.enums.TipoCama;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para cama (request/response).
 *
 * Decisão: id opcional — no cadastro a cama ainda não existe; na resposta o id vem do banco.
 * Decisão: factory of() — CamaDto.of(tipo) para request; CamaDto.of(id, tipo) para response.
 */
public record CamaDto(
        Long id,
        @NotNull(message = "Tipo da cama é obrigatório")
        TipoCama tipo
) {
    public static CamaDto of(Long id, TipoCama tipo) {
        return new CamaDto(id, tipo);
    }

    public static CamaDto of(TipoCama tipo) {
        return new CamaDto(null, tipo);
    }
}
