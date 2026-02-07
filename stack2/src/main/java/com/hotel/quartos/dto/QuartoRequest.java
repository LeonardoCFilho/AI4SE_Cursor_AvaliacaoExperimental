package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para cadastro e edição de quarto.
 */
public record QuartoRequest(
        @NotBlank(message = "Número do quarto é obrigatório")
        String numero,

        @NotNull(message = "Tipo do quarto é obrigatório")
        TipoQuarto tipo,

        @NotNull(message = "Capacidade é obrigatória")
        @Min(value = 1, message = "Capacidade deve ser maior que zero")
        Integer capacidade,

        @NotNull(message = "Preço por diária é obrigatório")
        @DecimalMin(value = "0", message = "Preço por diária deve ser maior ou igual a zero")
        BigDecimal precoDiaria,

        StatusQuarto status,

        Boolean frigobar,
        Boolean cafeManhaIncluso,
        Boolean arCondicionado,
        Boolean tv,

        List<@Valid CamaDto> camas
) {
    public StatusQuarto getStatusOrDefault() {
        return status != null ? status : StatusQuarto.LIVRE;
    }

    public boolean getFrigobarOrDefault() {
        return frigobar != null && frigobar;
    }

    public boolean getCafeManhaInclusoOrDefault() {
        return cafeManhaIncluso != null && cafeManhaIncluso;
    }

    public boolean getArCondicionadoOrDefault() {
        return arCondicionado != null && arCondicionado;
    }

    public boolean getTvOrDefault() {
        return tv != null && tv;
    }

    public List<CamaDto> getCamasOrDefault() {
        return camas != null ? camas : List.of();
    }
}
