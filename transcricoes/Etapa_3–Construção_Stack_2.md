# Classes Java Spring para hotel
_Exported on 2/7/2026 at 20:34:37 GMT-3 from Cursor (2.4.28)_

---

**User**

Na pasta stack2/
Stack 2: Java + Spring
Implemente as classes para: Quarto, Hóspede e Reserva.

---

**Cursor**


Consultando a implementação do stack1 para manter consistência:



Criando a estrutura do projeto Spring Boot e as entidades de domínio.



Criando primeiro a entidade Quarto (Cama referencia Quarto):



Maven não está instalado no ambiente. Adicionando um README com instruções e verificando a estrutura:



Corrigindo o método `removerCama`: não definir `quarto` como null, pois a coluna é obrigatória.



Implementei o projeto **Stack 2 (Java + Spring)** com as entidades solicitadas. Resumo:

## Estrutura criada

### Entidades de domínio

1. **Quarto** (`com.hotel.domain.Quarto`)
   - Campos: id, numero, tipo, capacidade, precoDiaria, status, frigobar, cafeManhaIncluso, arCondicionado, tv
   - Relação: 1:N com Cama
   - Métodos: `estaDisponivel()`, `podeSerReservado()`, `alterarStatus()`, `adicionarCama()`, `removerCama()`

2. **Hóspede** (`com.hotel.domain.Hospede`)
   - Campos: id, nome, sobrenome, cpf, email
   - Método: `getNomeCompleto()`

3. **Reserva** (`com.hotel.domain.Reserva`)
   - Campos: id, quarto, hospede, dataInicio, dataFim, status
   - Relações: N:1 com Quarto e N:1 com Hóspede
   - Métodos: `estaAtiva()`, `cancelar()`

### Entidade auxiliar

4. **Cama** (`com.hotel.domain.Cama`) – referenciada em Quarto
   - Campos: id, tipo, quarto

### Enums

- `TipoQuarto`: BASICO, MODERNO, LUXO
- `StatusQuarto`: LIVRE, OCUPADO, MANUTENCAO_LIMPEZA
- `TipoCama`: SOLTEIRO, CASAL_KING, CASAL_QUEEN
- `StatusReserva`: ATIVA, CANCELADA

As entidades usam JPA com anotações e seguem o modelo do documento de arquitetura. O projeto inclui um `pom.xml` com Spring Boot 3.2, Spring Data JPA e H2 para desenvolvimento.

Para compilar e executar (com Maven instalado):

```bash
cd stack2
mvn compile
mvn spring-boot:run
```

---

**User**

        ◦ Considerando o módulo de Gestão de Quartos, implemente:
            ▪ Cadastro de quarto
            ▪ Edição de quarto
            ▪ Listagem de quartos com:
                • Número
                • Tipo
                • Preço por hora
                • Disponibilidade (Ocupado, Livre, Manutenção, Limpeza)
            ▪ Suporte a múltiplas camas por quarto (Solteiro, King, Queen).

---

**Cursor**


Corrigindo o acesso à lista de camas em `Quarto`:



Implementei o **módulo de Gestão de Quartos** no stack2. Resumo:

## Implementação

### Cadastro de quarto
- **POST /quartos** – recebe JSON com número, tipo, capacidade, preço por diária, comodidades e camas
- Validação via Bean Validation (`@Valid`)
- Unicidade de número (RF-04.5)
- Suporte a múltiplas camas: SOLTEIRO, CASAL_KING, CASAL_QUEEN

### Edição de quarto
- **PUT /quartos/{id}** – atualiza número, tipo, capacidade, preço, comodidades e camas
- Camas anteriores são removidas e substituídas pelas novas

### Listagem de quartos
- **GET /quartos** – retorna:
  - Número
  - Tipo (BASICO, MODERNO, LUXO)
  - Preço por diária
  - Disponibilidade: LIVRE, OCUPADO, MANUTENCAO_LIMPEZA
  - Camas (Solteiro, King, Queen)

### Alteração de status
- **PATCH /quartos/{id}/status** – body: `{"status": "OCUPADO"}` (ou LIVRE, MANUTENCAO_LIMPEZA)

### Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `QuartoRepository.java` | Repositório JPA |
| `QuartoService.java` | Regras de negócio (cadastro, edição, listagem, status) |
| `QuartoController.java` | REST API |
| `dto/QuartoRequest.java` | DTO de entrada com validação |
| `dto/QuartoResponse.java` | DTO de resposta completa |
| `dto/QuartoListagemResponse.java` | DTO de listagem |
| `dto/CamaDto.java` | DTO para camas |

### Exemplo de requisição

```json
POST /quartos
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

**Nota:** O requisito original menciona “preço por hora”, mas o desenho do sistema usa “preço por diária” (padrão em hotéis). Mantive o campo `precoDiaria`; se quiser “preço por hora”, posso ajustar o modelo.

---

**User**

Garanta princípios SOLID e clean code

---

**Cursor**


Resumo das alterações aplicadas para atender aos princípios SOLID e clean code:

## SOLID

### Single Responsibility (SRP)
- **GlobalExceptionHandler**: tratamento de exceções em um único ponto; o Controller foca apenas em HTTP.
- **QuartoMapper**: responsável só por mapear Quarto ↔ DTOs (antes estava nos DTOs).
- **StatusAlteracaoRequest**: DTO dedicado para o PATCH de status (antes havia parsing no controller).
- **QuartoServiceImpl**: métodos `buscarOuFalhar`, `aplicarComodidades`, `adicionarCamas` separam responsabilidades.

### Open/Closed (OCP)
- DTOs são records imutáveis; novas regras de validação entram sem alterar o domínio.
- **GlobalExceptionHandler**: novas exceções são tratadas sem mudar controllers.

### Liskov (LSP)
- Implementação atual segue o contrato dos DTOs e da interface de serviço.

### Interface Segregation (ISP)
- **QuartoService** expõe apenas os métodos necessários aos controllers.

### Dependency Inversion (DIP)
- **QuartoService** interface: Controller depende da abstração, não da implementação.
- **QuartoServiceImpl** recebe `QuartoRepository` e `QuartoMapper` via interface/contrato.

## Clean Code

| Aspecto | Alteração |
|---------|-----------|
| **Métodos curtos** | `aplicarComodidades`, `adicionarCamas`, `buscarOuFalhar` extraídos em métodos menores. |
| **Sem duplicação** | `aplicarComodidades` usado em cadastro e edição. |
| **Boolean nulo** | `Boolean.TRUE.equals(x)` em vez de `x != null && x`. |
| **Nomes claros** | `buscarOuFalhar`, `validarNumeroUnico`, `mapearCamas`. |
| **DTOs sem domínio** | `QuartoResponse` e `QuartoListagemResponse` sem a lógica `from()`; conversão no Mapper. |
| **Validação centralizada** | `@Valid` em `StatusAlteracaoRequest`; erros de validação tratados no `GlobalExceptionHandler`. |

## Estrutura após refatoração

```
quartos/
├── QuartoController.java      # HTTP apenas
├── QuartoService.java         # Interface (contrato)
├── QuartoServiceImpl.java     # Regras de negócio
├── QuartoMapper.java          # Conversão Quarto ↔ DTO
├── QuartoRepository.java
└── dto/
    ├── QuartoRequest.java
    ├── QuartoResponse.java
    ├── QuartoListagemResponse.java
    ├── StatusAlteracaoRequest.java  # Novo
    └── CamaDto.java

common/
├── GlobalExceptionHandler.java  # Novo
├── QuartoNaoEncontradoException.java
└── NumeroQuartoDuplicadoException.java
```

---

**User**

Explique decisões de implementação em comentários

---

**Cursor**


Adicionando comentários que explicam as decisões de implementação.



Comentários foram adicionados em todo o código explicando as decisões de implementação. Resumo:

## Onde foram adicionados comentários

### Controller
- **QuartoController**: DIP, responsabilidade somente de adaptar HTTP, uso de `GlobalExceptionHandler`, uso de `@Valid`, criação de `StatusAlteracaoRequest`

### Service
- **QuartoService**: interface para permitir DIP e mocks nos testes
- **QuartoServiceImpl**: injeção de dependência, `@Transactional(readOnly)`, `validarNumeroUnico` com `excludeId`, `substituirCamas` com `orphanRemoval`, `aplicarComodidades` para evitar duplicação

### Mapper e Repository
- **QuartoMapper**: SRP, DTOs como estruturas puras, extração de `mapearCamas`
- **QuartoRepository**: uso de `existsByNumeroAndIdNot` na edição

### Exceções
- **GlobalExceptionHandler**: SRP, `@RestControllerAdvice`, formatação de erros de validação
- **QuartoNaoEncontradoException** e **NumeroQuartoDuplicadoException**: uso de `RuntimeException` e mapeamento para 404/409

### Domínio
- **Quarto**: `EnumType.STRING`, `orphanRemoval`, `unmodifiableList` em `getCamas`, construtor protegido para JPA, `equals/hashCode` por id
- **Cama**: `FetchType.LAZY`, `ManyToOne` com `JoinColumn`

### DTOs
- **QuartoRequest**: campos opcionais, `Boolean.TRUE.equals`, validação em cascata, `getCamasOrDefault`
- **QuartoResponse** e **QuartoListagemResponse**: records imutáveis, DTO específico para listagem
- **StatusAlteracaoRequest**: uso de record com `@NotNull` em vez de `Map`
- **CamaDto**: id opcional e factories `of()`

