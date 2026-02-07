package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO de resposta completo para quarto (cadastro/edição).
 *
 * Decisão: Record imutável — garante consistência; conversão delegada ao QuartoMapper.
 * Decisão: Inclui todas as comodidades — resposta completa para tela de edição.
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
