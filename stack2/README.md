# Stack 2: Java + Spring - Sistema de Reserva de Hotel

Implementação do sistema de reservas utilizando Java e Spring Boot.

## Estrutura do Projeto

```
stack2/
├── src/main/java/com/hotel/
│   ├── ReservaHotelApplication.java
│   ├── common/                 # Exceções compartilhadas
│   ├── domain/                 # Entidades JPA
│   ├── quartos/                # Módulo Gestão de Quartos
│   │   ├── QuartoController.java
│   │   ├── QuartoService.java
│   │   ├── QuartoRepository.java
│   │   └── dto/
│   └── ...
└── pom.xml
```

## API REST - Gestão de Quartos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/quartos` | Lista quartos (número, tipo, preço, disponibilidade, camas) |
| GET | `/quartos/{id}` | Obtém quarto por ID |
| POST | `/quartos` | Cadastra quarto |
| PUT | `/quartos/{id}` | Edita quarto |
| PATCH | `/quartos/{id}/status` | Altera status (LIVRE, OCUPADO, MANUTENCAO_LIMPEZA) |

**Exemplo cadastro (POST /quartos):**
```json
{
  "numero": "101",
  "tipo": "BASICO",
  "capacidade": 2,
  "precoDiaria": 150.00,
  "frigobar": true,
  "camas": [
    {"tipo": "SOLTEIRO"},
    {"tipo": "CASAL_KING"}
  ]
}
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
