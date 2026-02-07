package com.hotel.quartos;

import com.hotel.domain.enums.StatusQuarto;
import com.hotel.quartos.dto.*;
import java.util.List;

/**
 * Contrato do serviço de quartos (DIP).
 * Dependências devem depender desta abstração, não da implementação.
 */
public interface QuartoService {

    List<QuartoListagemResponse> listar();

    QuartoResponse obterPorId(Long id);

    QuartoResponse cadastrar(QuartoRequest request);

    QuartoResponse editar(Long id, QuartoRequest request);

    QuartoResponse alterarStatus(Long id, StatusQuarto status);
}
