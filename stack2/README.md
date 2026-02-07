# Stack 2: Java + Spring - Sistema de Reserva de Hotel

Implementação do sistema de reservas utilizando Java e Spring Boot.

## Estrutura do Projeto

```
stack2/
├── src/main/java/com/hotel/
│   ├── ReservaHotelApplication.java
│   └── domain/
│       ├── Cama.java          # Entidade para camas do quarto
│       ├── Hospede.java       # Entidade Hóspede
│       ├── Quarto.java        # Entidade Quarto
│       ├── Reserva.java       # Entidade Reserva
│       └── enums/
│           ├── StatusQuarto.java
│           ├── StatusReserva.java
│           ├── TipoCama.java
│           └── TipoQuarto.java
└── pom.xml
```

## Entidades Implementadas

### Quarto
- **Atributos**: id, numero, tipo, capacidade, precoDiaria, status, frigobar, cafeManhaIncluso, arCondicionado, tv
- **Relação**: 1:N com Cama
- **Métodos**: `estaDisponivel()`, `podeSerReservado()`, `alterarStatus()`, `adicionarCama()`, `removerCama()`

### Hóspede
- **Atributos**: id, nome, sobrenome, cpf, email
- **Método**: `getNomeCompleto()`

### Reserva
- **Atributos**: id, quarto, hospede, dataInicio, dataFim, status
- **Relação**: N:1 com Quarto e N:1 com Hóspede
- **Métodos**: `estaAtiva()`, `cancelar()`

## Como executar

```bash
# Compilar
mvn compile

# Executar
mvn spring-boot:run
```

Requisitos: Java 17+, Maven 3.6+
