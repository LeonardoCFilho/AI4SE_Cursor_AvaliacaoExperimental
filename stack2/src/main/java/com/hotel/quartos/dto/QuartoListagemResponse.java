package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de listagem: número, tipo, preço por diária, disponibilidade, camas.
 * Conversão feita por QuartoMapper.
 */
public record QuartoListagemResponse(
        Long id,
        String numero,
        TipoQuarto tipo,
        BigDecimal precoDiaria,
        StatusQuarto status,
        List<CamaDto> camas
) {
}
