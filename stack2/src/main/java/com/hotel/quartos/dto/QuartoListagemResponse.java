package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de listagem: número, tipo, preço por diária, disponibilidade, camas.
 *
 * Decisão: DTO dedicado para listagem — não inclui capacidade nem comodidades (RF-01.3).
 * Subset de QuartoResponse; evita expor dados desnecessários na tabela.
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
