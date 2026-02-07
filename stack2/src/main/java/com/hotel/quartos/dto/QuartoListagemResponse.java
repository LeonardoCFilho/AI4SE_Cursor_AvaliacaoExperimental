package com.hotel.quartos.dto;

import com.hotel.domain.Quarto;
import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de listagem: número, tipo, preço por diária, disponibilidade, camas.
 */
public record QuartoListagemResponse(
        Long id,
        String numero,
        TipoQuarto tipo,
        BigDecimal precoDiaria,
        StatusQuarto status,
        List<CamaDto> camas
) {
    public static QuartoListagemResponse from(Quarto quarto) {
        List<CamaDto> camasDto = quarto.getCamas().stream()
                .map(c -> CamaDto.of(c.getId(), c.getTipo()))
                .toList();
        return new QuartoListagemResponse(
                quarto.getId(),
                quarto.getNumero(),
                quarto.getTipo(),
                quarto.getPrecoDiaria(),
                quarto.getStatus(),
                camasDto
        );
    }
}
