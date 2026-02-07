package com.hotel.quartos;

import com.hotel.common.NumeroQuartoDuplicadoException;
import com.hotel.common.QuartoNaoEncontradoException;
import com.hotel.domain.Cama;
import com.hotel.domain.Quarto;
import com.hotel.domain.enums.StatusQuarto;
import com.hotel.domain.enums.TipoCama;
import com.hotel.domain.enums.TipoQuarto;
import com.hotel.quartos.dto.CamaDto;
import com.hotel.quartos.dto.QuartoRequest;
import com.hotel.quartos.dto.QuartoResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Testes unitários para QuartoServiceImpl.
 * Cobre cadastro e edição de quartos conforme RF-01.
 */
@ExtendWith(MockitoExtension.class)
class QuartoServiceImplTest {

    @Mock
    private QuartoRepository repository;

    @Mock
    private QuartoMapper mapper;

    @InjectMocks
    private QuartoServiceImpl service;

    private QuartoRequest requestBasico;
    private Quarto quartoPersistido;
    private QuartoResponse responseEsperado;

    @BeforeEach
    void setUp() {
        requestBasico = new QuartoRequest(
                "101",
                TipoQuarto.BASICO,
                2,
                new BigDecimal("150.00"),
                null,
                false,
                false,
                true,
                true,
                null
        );

        quartoPersistido = new Quarto("101", TipoQuarto.BASICO, 2, new BigDecimal("150.00"));
        quartoPersistido.setStatus(StatusQuarto.LIVRE);
        quartoPersistido.setFrigobar(false);
        quartoPersistido.setCafeManhaIncluso(false);
        quartoPersistido.setArCondicionado(true);
        quartoPersistido.setTv(true);

        responseEsperado = new QuartoResponse(
                1L,
                "101",
                TipoQuarto.BASICO,
                2,
                new BigDecimal("150.00"),
                StatusQuarto.LIVRE,
                false,
                false,
                true,
                true,
                List.of()
        );
    }

    @Nested
    @DisplayName("Cadastro de quarto")
    class CadastroDeQuarto {

        @Test
        @DisplayName("deve cadastrar quarto com sucesso quando número é único")
        void deveCadastrarQuartoComSucessoQuandoNumeroUnico() {
            when(repository.existsByNumero("101")).thenReturn(false);
            when(repository.save(any(Quarto.class))).thenAnswer(inv -> inv.getArgument(0));
            when(mapper.toResponse(any(Quarto.class))).thenReturn(responseEsperado);

            QuartoResponse response = service.cadastrar(requestBasico);

            assertThat(response).isNotNull();
            assertThat(response.id()).isEqualTo(1L);
            assertThat(response.numero()).isEqualTo("101");
            assertThat(response.tipo()).isEqualTo(TipoQuarto.BASICO);
            assertThat(response.capacidade()).isEqualTo(2);
            assertThat(response.precoDiaria()).isEqualByComparingTo("150.00");

            verify(repository).existsByNumero("101");
            verify(repository).save(any(Quarto.class));
            verify(mapper).toResponse(any(Quarto.class));
        }

        @Test
        @DisplayName("deve cadastrar quarto com comodidades e camas quando informados")
        void deveCadastrarQuartoComComodidadesECamas() {
            QuartoRequest requestCompleto = new QuartoRequest(
                    "202",
                    TipoQuarto.LUXO,
                    4,
                    new BigDecimal("450.00"),
                    StatusQuarto.LIVRE,
                    true,
                    true,
                    true,
                    true,
                    List.of(CamaDto.of(TipoCama.CASAL_KING), CamaDto.of(TipoCama.SOLTEIRO))
            );

            when(repository.existsByNumero("202")).thenReturn(false);
            when(repository.save(any(Quarto.class))).thenAnswer(inv -> inv.getArgument(0));
            when(mapper.toResponse(any(Quarto.class))).thenReturn(
                    new QuartoResponse(2L, "202", TipoQuarto.LUXO, 4, new BigDecimal("450.00"),
                            StatusQuarto.LIVRE, true, true, true, true,
                            List.of(CamaDto.of(1L, TipoCama.CASAL_KING), CamaDto.of(2L, TipoCama.SOLTEIRO)))
            );

            QuartoResponse response = service.cadastrar(requestCompleto);

            ArgumentCaptor<Quarto> quartoCaptor = ArgumentCaptor.forClass(Quarto.class);
            verify(repository).save(quartoCaptor.capture());
            Quarto quartoSalvo = quartoCaptor.getValue();

            assertThat(quartoSalvo.getNumero()).isEqualTo("202");
            assertThat(quartoSalvo.getTipo()).isEqualTo(TipoQuarto.LUXO);
            assertThat(quartoSalvo.getCapacidade()).isEqualTo(4);
            assertThat(quartoSalvo.getFrigobar()).isTrue();
            assertThat(quartoSalvo.getCafeManhaIncluso()).isTrue();
            assertThat(quartoSalvo.getCamas()).hasSize(2);
        }

        @Test
        @DisplayName("deve lançar NumeroQuartoDuplicadoException quando número já existe")
        void deveLancarExcecaoQuandoNumeroDuplicado() {
            when(repository.existsByNumero("101")).thenReturn(true);

            assertThatThrownBy(() -> service.cadastrar(requestBasico))
                    .isInstanceOf(NumeroQuartoDuplicadoException.class)
                    .hasMessageContaining("101");

            verify(repository).existsByNumero("101");
            verify(repository, never()).save(any());
        }

        @Test
        @DisplayName("deve fazer trim do número antes de validar")
        void deveFazerTrimDoNumeroAntesDeValidar() {
            QuartoRequest requestComEspacos = new QuartoRequest(
                    "  101  ",
                    TipoQuarto.BASICO,
                    2,
                    new BigDecimal("150.00"),
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
            );

            when(repository.existsByNumero("101")).thenReturn(false);
            when(repository.save(any(Quarto.class))).thenAnswer(inv -> inv.getArgument(0));
            when(mapper.toResponse(any(Quarto.class))).thenReturn(responseEsperado);

            QuartoResponse response = service.cadastrar(requestComEspacos);

            ArgumentCaptor<Quarto> quartoCaptor = ArgumentCaptor.forClass(Quarto.class);
            verify(repository).save(quartoCaptor.capture());
            assertThat(quartoCaptor.getValue().getNumero()).isEqualTo("101");
            verify(repository).existsByNumero("101");
        }
    }

    @Nested
    @DisplayName("Edição de quarto")
    class EdicaoDeQuarto {

        @Test
        @DisplayName("deve editar quarto com sucesso quando quarto existe")
        void deveEditarQuartoComSucessoQuandoExiste() {
            when(repository.findById(1L)).thenReturn(Optional.of(quartoPersistido));
            when(repository.existsByNumeroAndIdNot("102", 1L)).thenReturn(false);
            when(repository.save(any(Quarto.class))).thenAnswer(inv -> inv.getArgument(0));

            QuartoRequest requestEdicao = new QuartoRequest(
                    "102",
                    TipoQuarto.MODERNO,
                    3,
                    new BigDecimal("250.00"),
                    StatusQuarto.LIVRE,
                    true,
                    false,
                    true,
                    true,
                    List.of(CamaDto.of(TipoCama.CASAL_QUEEN))
            );

            QuartoResponse responseEsperado = new QuartoResponse(
                    1L,
                    "102",
                    TipoQuarto.MODERNO,
                    3,
                    new BigDecimal("250.00"),
                    StatusQuarto.LIVRE,
                    true,
                    false,
                    true,
                    true,
                    List.of(CamaDto.of(1L, TipoCama.CASAL_QUEEN))
            );
            when(mapper.toResponse(any(Quarto.class))).thenReturn(responseEsperado);

            QuartoResponse response = service.editar(1L, requestEdicao);

            assertThat(response).isNotNull();
            assertThat(response.id()).isEqualTo(1L);
            assertThat(response.numero()).isEqualTo("102");
            assertThat(response.tipo()).isEqualTo(TipoQuarto.MODERNO);
            assertThat(response.capacidade()).isEqualTo(3);
            assertThat(response.precoDiaria()).isEqualByComparingTo("250.00");

            ArgumentCaptor<Quarto> quartoCaptor = ArgumentCaptor.forClass(Quarto.class);
            verify(repository).save(quartoCaptor.capture());
            Quarto quartoEditado = quartoCaptor.getValue();
            assertThat(quartoEditado.getNumero()).isEqualTo("102");
            assertThat(quartoEditado.getTipo()).isEqualTo(TipoQuarto.MODERNO);
            assertThat(quartoEditado.getCapacidade()).isEqualTo(3);
            assertThat(quartoEditado.getCamas()).hasSize(1);
        }

        @Test
        @DisplayName("deve permitir editar mantendo o mesmo número (excluir id na validação)")
        void devePermitirEditarMantendoMesmoNumero() {
            when(repository.findById(1L)).thenReturn(Optional.of(quartoPersistido));
            when(repository.existsByNumeroAndIdNot("101", 1L)).thenReturn(false);
            when(repository.save(any(Quarto.class))).thenAnswer(inv -> inv.getArgument(0));
            when(mapper.toResponse(any(Quarto.class))).thenReturn(responseEsperado);

            QuartoRequest requestMesmoNumero = new QuartoRequest(
                    "101",
                    TipoQuarto.BASICO,
                    3,
                    new BigDecimal("180.00"),
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
            );

            QuartoResponse response = service.editar(1L, requestMesmoNumero);

            assertThat(response).isNotNull();
            verify(repository).existsByNumeroAndIdNot("101", 1L);
            verify(repository).save(any(Quarto.class));
        }

        @Test
        @DisplayName("deve lançar QuartoNaoEncontradoException quando id não existe")
        void deveLancarExcecaoQuandoQuartoNaoEncontrado() {
            when(repository.findById(999L)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.editar(999L, requestBasico))
                    .isInstanceOf(QuartoNaoEncontradoException.class)
                    .hasMessageContaining("999");

            verify(repository).findById(999L);
            verify(repository, never()).save(any());
        }

        @Test
        @DisplayName("deve lançar NumeroQuartoDuplicadoException ao editar para número de outro quarto")
        void deveLancarExcecaoQuandoNumeroPertenceAOutroQuarto() {
            when(repository.findById(1L)).thenReturn(Optional.of(quartoPersistido));
            when(repository.existsByNumeroAndIdNot("102", 1L)).thenReturn(true);

            QuartoRequest requestNumeroOutro = new QuartoRequest(
                    "102",
                    TipoQuarto.BASICO,
                    2,
                    new BigDecimal("150.00"),
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
            );

            assertThatThrownBy(() -> service.editar(1L, requestNumeroOutro))
                    .isInstanceOf(NumeroQuartoDuplicadoException.class)
                    .hasMessageContaining("102");

            verify(repository).existsByNumeroAndIdNot("102", 1L);
            verify(repository, never()).save(any());
        }

        @Test
        @DisplayName("deve substituir camas ao editar (orphanRemoval)")
        void deveSubstituirCamasAoEditar() {
            quartoPersistido.adicionarCama(new Cama(TipoCama.SOLTEIRO, quartoPersistido));
            when(repository.findById(1L)).thenReturn(Optional.of(quartoPersistido));
            when(repository.existsByNumeroAndIdNot("101", 1L)).thenReturn(false);
            when(repository.save(any(Quarto.class))).thenAnswer(inv -> inv.getArgument(0));
            when(mapper.toResponse(any(Quarto.class))).thenReturn(responseEsperado);

            QuartoRequest requestComNovaCama = new QuartoRequest(
                    "101",
                    TipoQuarto.BASICO,
                    2,
                    new BigDecimal("150.00"),
                    null,
                    null,
                    null,
                    null,
                    null,
                    List.of(CamaDto.of(TipoCama.CASAL_KING))
            );

            service.editar(1L, requestComNovaCama);

            ArgumentCaptor<Quarto> quartoCaptor = ArgumentCaptor.forClass(Quarto.class);
            verify(repository).save(quartoCaptor.capture());
            Quarto quartoSalvo = quartoCaptor.getValue();
            assertThat(quartoSalvo.getCamas()).hasSize(1);
            assertThat(quartoSalvo.getCamas().get(0).getTipo()).isEqualTo(TipoCama.CASAL_KING);
        }
    }
}
