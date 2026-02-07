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
 * Implementação do serviço de quartos.
 * SRP: Orquestra validação, repositório e mapeamento.
 * RF-01: Cadastro, edição, listagem, alteração de status.
 * RF-04.5: Unicidade do número do quarto.
 */
@Service
public class QuartoServiceImpl implements QuartoService {

    private final QuartoRepository repository;
    private final QuartoMapper mapper;

    public QuartoServiceImpl(QuartoRepository repository, QuartoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuartoListagemResponse> listar() {
        return repository.findAll().stream()
                .map(mapper::toListagemResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public QuartoResponse obterPorId(Long id) {
        Quarto quarto = buscarOuFalhar(id);
        return mapper.toResponse(quarto);
    }

    @Override
    @Transactional
    public QuartoResponse cadastrar(QuartoRequest request) {
        validarNumeroUnico(request.numero().trim(), null);
        Quarto quarto = criarQuarto(request);
        return mapper.toResponse(repository.save(quarto));
    }

    @Override
    @Transactional
    public QuartoResponse editar(Long id, QuartoRequest request) {
        Quarto quarto = buscarOuFalhar(id);
        validarNumeroUnico(request.numero().trim(), id);
        atualizarQuarto(quarto, request);
        return mapper.toResponse(repository.save(quarto));
    }

    @Override
    @Transactional
    public QuartoResponse alterarStatus(Long id, StatusQuarto status) {
        Quarto quarto = buscarOuFalhar(id);
        quarto.alterarStatus(status);
        return mapper.toResponse(repository.save(quarto));
    }

    private Quarto buscarOuFalhar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new QuartoNaoEncontradoException(id));
    }

    private void validarNumeroUnico(String numero, Long excludeId) {
        boolean existe = excludeId != null
                ? repository.existsByNumeroAndIdNot(numero, excludeId)
                : repository.existsByNumero(numero);
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
        aplicarComodidades(quarto, request);
        adicionarCamas(quarto, request.getCamasOrDefault());
        return quarto;
    }

    private void atualizarQuarto(Quarto quarto, QuartoRequest request) {
        quarto.setNumero(request.numero().trim());
        quarto.setTipo(request.tipo());
        quarto.setCapacidade(request.capacidade());
        quarto.setPrecoDiaria(request.precoDiaria());
        aplicarComodidades(quarto, request);
        quarto.substituirCamas(
                request.getCamasOrDefault().stream()
                        .map(c -> new Cama(c.tipo(), quarto))
                        .toList()
        );
    }

    private void aplicarComodidades(Quarto quarto, QuartoRequest request) {
        quarto.setStatus(request.getStatusOrDefault());
        quarto.setFrigobar(request.getFrigobarOrDefault());
        quarto.setCafeManhaIncluso(request.getCafeManhaInclusoOrDefault());
        quarto.setArCondicionado(request.getArCondicionadoOrDefault());
        quarto.setTv(request.getTvOrDefault());
    }

    private void adicionarCamas(Quarto quarto, List<CamaDto> camasDto) {
        for (CamaDto c : camasDto) {
            quarto.adicionarCama(new Cama(c.tipo(), quarto));
        }
    }
}
