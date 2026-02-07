package com.hotel.quartos;

import com.hotel.domain.Quarto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositório JPA para Quarto.
 * RF-04.5: Unicidade do número do quarto (verificada no Service).
 */
public interface QuartoRepository extends JpaRepository<Quarto, Long> {

    Optional<Quarto> findByNumero(String numero);

    boolean existsByNumeroAndIdNot(String numero, Long excludeId);

    boolean existsByNumero(String numero);
}
