package com.hotel.quartos;

import com.hotel.domain.Quarto;
import com.hotel.quartos.dto.CamaDto;
import com.hotel.quartos.dto.QuartoListagemResponse;
import com.hotel.quartos.dto.QuartoResponse;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Responsável pela conversão Quarto ↔ DTOs (SRP).
 *
 * Decisão: Mapper centraliza conversão. DTOs permanecem estruturas puras (records).
 * Alterações na API (ex.: snake_case, novos campos) não afetam o domínio.
 *
 * Decisão: mapearCamas extraído — evita duplicação entre toResponse e toListagemResponse.
 */
@Component
public class QuartoMapper {

    public QuartoResponse toResponse(Quarto quarto) {
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
                mapearCamas(quarto)
        );
    }

    public QuartoListagemResponse toListagemResponse(Quarto quarto) {
        return new QuartoListagemResponse(
                quarto.getId(),
                quarto.getNumero(),
                quarto.getTipo(),
                quarto.getPrecoDiaria(),
                quarto.getStatus(),
                mapearCamas(quarto)
        );
    }

    private List<CamaDto> mapearCamas(Quarto quarto) {
        return quarto.getCamas().stream()
                .map(c -> CamaDto.of(c.getId(), c.getTipo()))
                .toList();
    }
}
