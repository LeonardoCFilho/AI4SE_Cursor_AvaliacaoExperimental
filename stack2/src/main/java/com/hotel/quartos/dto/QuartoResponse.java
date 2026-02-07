package com.hotel.quartos.dto;

import com.hotel.domain.Quarto;
import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de resposta completo para quarto (cadastro/edição).
 */
public record QuartoResponse(
        Long id,
        String numero,
        TipoQuarto tipo,
        Integer capacidade,
        BigDecimal precoDiaria,
        StatusQuarto status,
        Boolean frigobar,
        Boolean cafeManhaIncluso,
        Boolean arCondicionado,
        Boolean tv,
        List<CamaDto> camas
) {
    public static QuartoResponse from(Quarto quarto) {
        List<CamaDto> camasDto = quarto.getCamas().stream()
                .map(c -> CamaDto.of(c.getId(), c.getTipo()))
                .toList();
        return new QuartoResponse(
                quarto.getId(),
                quarto.getNumero(),
                quarto.getTipo(),
                quarto.getCapacidade(),
                quarto.getPrecoDiaria(),
                quarto.getStatus(),
                quarto.getFrigobar(),
                quarto.getCafeManhaIncluso(),
                quarto.getArCondicionado(),
                quarto.getTv(),
                camasDto
        );
    }
}
