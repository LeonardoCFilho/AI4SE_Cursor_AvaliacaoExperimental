# Room management unit tests
_Exported on 2/10/2026 at 02:37:07 GMT-3 from Cursor (2.4.28)_

---

**User**

@stack2         ◦ Crie testes unitários para:
            ▪ Cadastro de quarto
            ▪ Edição de quarto

---

**Cursor**

Criando testes unitários para cadastro e edição de quartos.


Verificando se a entidade `Quarto` possui `setId` e corrigindo o teste.


Os testes unitários foram criados e estão passando. Resumo:

## Testes criados em `stack2/src/test/java/com/hotel/quartos/QuartoServiceImplTest.java`

### Cadastro de quarto
- **deve cadastrar quarto com sucesso quando número é único** – fluxo de cadastro com número novo
- **deve cadastrar quarto com comodidades e camas quando informados** – comodidades (frigobar, café da manhã, ar, TV) e camas
- **deve lançar NumeroQuartoDuplicadoException quando número já existe** – validação RF-04.5
- **deve fazer trim do número antes de validar** – números com espaços

### Edição de quarto
- **deve editar quarto com sucesso quando quarto existe** – alteração de número, tipo, capacidade, preço e camas
- **deve permitir editar mantendo o mesmo número** – exclusão do próprio id na verificação de duplicidade
- **deve lançar QuartoNaoEncontradoException quando id não existe** – quarto inexistente
- **deve lançar NumeroQuartoDuplicadoException ao editar para número de outro quarto** – número de outro quarto
- **deve substituir camas ao editar** – substituição de camas (orphanRemoval)

Os testes usam **Mockito** e **JUnit 5**, sem contexto Spring, e cobrem os fluxos principais e exceções de `QuartoServiceImpl`.

---

**User**

Proponha testes de integração para fluxo:
Cadastro de hóspede → Criação de reserva → Atualização de disponibilidade do quarto.

---

**Cursor**

Criando proposta de testes de integração para Stack 2 (Java + Spring):


Criei a proposta de testes de integração em `docs/04_2.Stack2_proposta-testes-integracao-fluxo-reserva.md`. Resumo:

## Proposta de Testes de Integração – Fluxo Reserva (Stack 2)

### Objetivo
Cobrir o fluxo completo via API REST:
**Cadastro de hóspede → Criação de reserva → Atualização de disponibilidade do quarto**

### Tecnicas
- **@SpringBootTest** – contexto completo da aplicação
- **MockMvc** – chamadas HTTP sem levantar servidor
- **H2 in-memory** – banco em memória (perfil `test`)
- **@Transactional** – rollback por teste para isolamento

### Casos de teste (10 cenários)

| Categoria | IDs | Foco |
|-----------|-----|------|
| Fluxo feliz | IT-01 | Cadastrar hóspede → criar reserva → quarto OCUPADO |
| Regras RF-04 | IT-02 a IT-04 | Quarto OCUPADO/MANUTENCAO_LIMPEZA bloqueia reserva; cancelar libera quarto |
| Validações | IT-05 a IT-08 | Quarto/hóspede inexistentes, dados inválidos, datas incorretas |
| Consistência | IT-09 a IT-10 | Referências corretas; reservas isoladas |

### Pré-requisitos
Os módulos **Hospede** e **Reserva** (controllers, services, repositories, DTOs) ainda precisam ser implementados. O módulo **Quartos** já está pronto.

### Ordem sugerida
1. Implementar módulo Hospede  
2. Implementar módulo Reserva (incluindo RF-04.1 e RF-04.2)  
3. Criar `application-test.properties`  
4. Criar `FluxoReservaIntegrationTest` com os 10 casos

O documento traz um template de teste em JUnit 5 + MockMvc e a estrutura de pastas sugerida.

---

**User**

Explique a estratégia de cobertura de testes definida

---

**Cursor**

Segue a explicação da estratégia de cobertura de testes definida:

---

## Estratégia de cobertura de testes

A estratégia usa **dois níveis de testes** (pirâmide) e está descrita em `docs/04_2.Stack1_Estrategia_cobertura_testes.md`.

---

### 1. Pirâmide de testes (dois níveis)

| Nível | Tipo | Escopo | Ferramenta |
|-------|------|--------|------------|
| **Unitário** | Testes de unidade | Camada de aplicação (Services) | Jest + mocks (Stack 1) / JUnit + mocks (Stack 2) |
| **Integração** | Testes de integração | API REST completa (vários módulos) | Jest + supertest (Stack 1) / JUnit + MockMvc (Stack 2) |

A base é unitária (mais testes, mais rápidos); o topo é integração (menos testes, fluxos completos).

---

### 2. Cobertura unitária

**Objetivo**: Validar regras de negócio isoladas, sem rede nem banco.

**Abordagem**:
- Testar Services com dependências mockadas (ex.: Repository).
- Foco em operações como `cadastrar`, `editar`.

**Cenários**:
- **Caminho feliz**: sucesso com dados válidos, valores padrão.
- **Validação**: campos obrigatórios, formatos inválidos (número vazio, preço negativo).
- **Regras de negócio**: número duplicado, quarto inexistente.
- **Bordas**: ID obrigatório na edição, manter mesmo número ao editar.

**Rastreamento**:
- RF-04.5 (unicidade do número) → conflito em cadastro e edição.
- RF-01.1 / RF-01.4 → validações de formato.

---

### 3. Cobertura de integração

**Objetivo**: Validar o fluxo **Hóspede → Reserva → Quarto** via HTTP, sem mocks nas rotas.

**Abordagem**:
- Usar API REST real (Controllers, Services, Repositories).
- Banco em memória (H2 para Stack 2).
- Entrada e saída via HTTP (JSON).

**10 cenários**:
- **Fluxo feliz (1)**: IT-01 – fluxo completo funcionando.
- **Regras RF-04 (3)**: IT-02 a IT-04 – quarto indisponível, cancelamento libera quarto.
- **Validações/erros (4)**: IT-05 a IT-08 – recursos inexistentes, dados inválidos.
- **Consistência (2)**: IT-09 a IT-10 – referências corretas, isolamento entre reservas.

**Cobertura horizontal**:
- API REST (Controllers e rotas).
- Services (Quarto, Hospede, Reserva).
- Repositories (persistência).
- Fluxo transacional entre os módulos.

---

### 4. Critérios unitário vs integração

| Aspecto | Unitário | Integração |
|---------|----------|------------|
| **Granularidade** | Método/operação | Cenário completo |
| **Dependências** | Mockadas | Reais |
| **Entrada** | DTOs e entidades | HTTP (JSON) |
| **Saída** | Entidades e exceções | Status HTTP e corpo JSON |
| **Foco** | Regras isoladas | Fluxos e integração entre módulos |

---

### 5. Princípios da estratégia

1. **Unitário primeiro**: regras críticas cobertas com mocks e asserções claras.
2. **Integração depois**: fluxo Reserva/Hospede/Quarto validado via API.
3. **Categorização**: fluxo feliz, regras RF-04, validações e consistência.
4. **Rastreabilidade**: cenários ligados a RF-02, RF-03, RF-04.
5. **Sem redundância**: unitários cobrem lógica interna; integração cobrem fluxos e contrato da API.

