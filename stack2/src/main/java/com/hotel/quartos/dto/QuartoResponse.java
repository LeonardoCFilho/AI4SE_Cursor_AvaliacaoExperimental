package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de resposta completo para quarto (cadastro/edição).
 * Conversão feita por QuartoMapper.
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
}
