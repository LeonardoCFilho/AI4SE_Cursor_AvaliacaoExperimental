package com.hotel.quartos.dto;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoQuarto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * DTO para cadastro e edição de quarto.
 *
 * Decisão: Campos opcionais (status, comodidades, camas) — cadastro pode omitir; getXOrDefault aplica padrão.
 * Decisão: Boolean.TRUE.equals(x) para comodidades — trata null como false sem NPE.
 * Decisão: List<@Valid CamaDto> — validação em cascata; cada cama é validada.
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

    /** Decisão: status null → LIVRE (padrão para novo quarto). */
    public StatusQuarto getStatusOrDefault() {
        return Optional.ofNullable(status).orElse(StatusQuarto.LIVRE);
    }

    /** Decisão: Boolean.TRUE.equals evita NPE quando frigobar é null. */
    public boolean getFrigobarOrDefault() {
        return Boolean.TRUE.equals(frigobar);
    }

    public boolean getCafeManhaInclusoOrDefault() {
        return Boolean.TRUE.equals(cafeManhaIncluso);
    }

    public boolean getArCondicionadoOrDefault() {
        return Boolean.TRUE.equals(arCondicionado);
    }

    public boolean getTvOrDefault() {
        return Boolean.TRUE.equals(tv);
    }

    /** Decisão: camas null ou omitido → lista vazia; evita tratamento especial no Service. */
    public List<CamaDto> getCamasOrDefault() {
        return Optional.ofNullable(camas).orElse(List.of());
    }
}
