package com.hotel.quartos;

import com.hotel.domain.Cama;
import com.hotel.domain.Quarto;
import com.hotel.domain.enums.StatusQuarto;
import com.hotel.quartos.dto.*;
import com.hotel.common.NumeroQuartoDuplicadoException;
import com.hotel.common.QuartoNaoEncontradoException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Serviço de aplicação para Gestão de Quartos.
 * RF-01: Cadastro, edição, listagem, alteração de status.
 * RF-04.5: Unicidade do número do quarto.
 */
@Service
public class QuartoService {

    private final QuartoRepository repository;

    public QuartoService(QuartoRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<QuartoListagemResponse> listar() {
        return repository.findAll().stream()
                .map(QuartoListagemResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public QuartoResponse obterPorId(Long id) {
        Quarto quarto = repository.findById(id)
                .orElseThrow(() -> new QuartoNaoEncontradoException(id));
        return QuartoResponse.from(quarto);
    }

    @Transactional
    public QuartoResponse cadastrar(QuartoRequest request) {
        validarNumeroUnico(request.numero().trim(), null);

        Quarto quarto = criarQuarto(request);
        Quarto salvo = repository.save(quarto);
        return QuartoResponse.from(salvo);
    }

    @Transactional
    public QuartoResponse editar(Long id, QuartoRequest request) {
        Quarto quarto = repository.findById(id)
                .orElseThrow(() -> new QuartoNaoEncontradoException(id));

        validarNumeroUnico(request.numero().trim(), id);

        atualizarQuarto(quarto, request);
        Quarto salvo = repository.save(quarto);
        return QuartoResponse.from(salvo);
    }

    @Transactional
    public QuartoResponse alterarStatus(Long id, StatusQuarto status) {
        Quarto quarto = repository.findById(id)
                .orElseThrow(() -> new QuartoNaoEncontradoException(id));
        quarto.alterarStatus(status);
        Quarto salvo = repository.save(quarto);
        return QuartoResponse.from(salvo);
    }

    private void validarNumeroUnico(String numero, Long excludeId) {
        boolean existe;
        if (excludeId != null) {
            existe = repository.existsByNumeroAndIdNot(numero, excludeId);
        } else {
            existe = repository.existsByNumero(numero);
        }
        if (existe) {
            throw new NumeroQuartoDuplicadoException(numero);
        }
    }

    private Quarto criarQuarto(QuartoRequest request) {
        Quarto quarto = new Quarto(
                request.numero().trim(),
                request.tipo(),
                request.capacidade(),
                request.precoDiaria()
        );
        quarto.setStatus(request.getStatusOrDefault());
        quarto.setFrigobar(request.getFrigobarOrDefault());
        quarto.setCafeManhaIncluso(request.getCafeManhaInclusoOrDefault());
        quarto.setArCondicionado(request.getArCondicionadoOrDefault());
        quarto.setTv(request.getTvOrDefault());

        for (CamaDto camaDto : request.getCamasOrDefault()) {
            Cama cama = new Cama(camaDto.tipo(), quarto);
            quarto.adicionarCama(cama);
        }
        return quarto;
    }

    private void atualizarQuarto(Quarto quarto, QuartoRequest request) {
        quarto.setNumero(request.numero().trim());
        quarto.setTipo(request.tipo());
        quarto.setCapacidade(request.capacidade());
        quarto.setPrecoDiaria(request.precoDiaria());
        quarto.setFrigobar(request.getFrigobarOrDefault());
        quarto.setCafeManhaIncluso(request.getCafeManhaInclusoOrDefault());
        quarto.setArCondicionado(request.getArCondicionadoOrDefault());
        quarto.setTv(request.getTvOrDefault());

        // Substituir camas: remove todas e adiciona as novas
        List<Cama> novasCamas = request.getCamasOrDefault().stream()
                .map(c -> new Cama(c.tipo(), quarto))
                .toList();
        quarto.substituirCamas(novasCamas);
    }
}
