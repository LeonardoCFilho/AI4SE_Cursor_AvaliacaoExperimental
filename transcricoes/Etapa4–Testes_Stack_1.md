# Testes unitários de gerenciamento de quartos
_Exported on 2/10/2026 at 02:36:31 GMT-3 from Cursor (2.4.28)_

---

**User**

@stack1         ◦ Crie testes unitários para:
            ▪ Cadastro de quarto
            ▪ Edição de quarto

---

**Cursor**

Criando testes unitários para cadastro e edição de quartos: configurando Jest e criando o arquivo de testes.


Criei os testes unitários para cadastro e edição de quarto. Resumo:

## Configuração

- **Jest** e **ts-jest** adicionados em `devDependencies`
- `jest.config.js` criado para rodar testes TypeScript
- Scripts `test` e `test:watch` adicionados em `package.json`

## Arquivo de teste

`src/application/quartos/QuartoService.test.ts` — testes do `QuartoService` com mocks do repositório.

### Cadastro de quarto

| Teste | Descrição |
|-------|-----------|
| Sucesso | Cadastro com dados válidos |
| Status padrão | Uso de `LIVRE` quando `status` não é informado |
| Número vazio | `ValidationError` quando número está em branco |
| Tipo ausente | `ValidationError` quando tipo não é informado |
| Capacidade inválida | `ValidationError` quando capacidade &lt; 1 |
| Preço negativo | `ValidationError` quando preço diária &lt; 0 |
| Número duplicado | `ConflictError` quando número do quarto já existe |

### Edição de quarto

| Teste | Descrição |
|-------|-----------|
| Sucesso | Edição com dados válidos |
| Mesmo número | Permite manter o número ao editar (unicidade exclui o próprio registro) |
| ID ausente | `ValidationError` quando ID não é informado |
| ID inválido | `ValidationError` quando ID é 0 ou negativo |
| Quarto inexistente | `NotFoundError` quando quarto não existe |
| Número duplicado | `ConflictError` quando o novo número já existe em outro quarto |
| Número vazio | `ValidationError` quando número está vazio na edição |

Para executar os testes:

```bash
cd stack1 && npm test
```

---

**User**

Proponha testes de integração para fluxo:
Cadastro de hóspede → Criação de reserva → Atualização de disponibilidade do quarto.

---

**Cursor**

Verificando se existe algum suporte a testes de integração e como a API é acessada:


Criando proposta de testes de integração. O Stack 1 só tem o módulo de quartos implementado; Hospede e Reserva existem apenas no domínio. A proposta será aplicável quando esses módulos forem implementados.


Criei a proposta de testes de integração em `docs/proposta-testes-integracao-fluxo-reserva.md`. Resumo:

---

## Proposta de testes de integração

### Fluxo: Cadastro de hóspede → Criação de reserva → Atualização de disponibilidade

#### 1. Casos de teste propostos (10 cenários)

| Categoria | ID | Descrição |
|-----------|----|-----------|
| **Fluxo feliz** | IT-01 | Cadastrar hóspede → criar reserva → quarto fica OCUPADO |
| **Regras RF-04** | IT-02 | Bloquear reserva de quarto OCUPADO |
| | IT-03 | Bloquear reserva de quarto em MANUTENCAO_LIMPEZA |
| | IT-04 | Quarto volta a LIVRE após cancelar reserva |
| **Validações** | IT-05 | Quarto inexistente → 404 |
| | IT-06 | Hóspede inexistente → 404 |
| | IT-07 | Dados de hóspede inválidos (CPF, e-mail) → 400 |
| | IT-08 | Data fim &lt; data início → 400 |
| **Consistência** | IT-09 | Reserva referencia quarto e hóspede corretos |
| | IT-10 | Reservas em quartos distintos não interferem entre si |

#### 2. Estratégia técnica

- **supertest** para chamadas HTTP à API Express
- **Jest** como runner (já configurado)
- Sequência sugerida: `POST quarto` → `POST hospede` → `POST reserva` → `GET quarto` (checar status OCUPADO)

#### 3. Pré-requisitos

Hoje só existe o módulo de **Quartos**. Para rodar os testes, ainda faltam:

- HospedeController/Service/Repository
- ReservaController/Service/Repository
- Alteração em `server.ts` para exportar o `app` (sem `listen`) e permitir uso pelo supertest

O documento detalha estrutura do arquivo de teste, template de pseudo-código e ordem sugerida de implementação.

---

**User**

Explique a estratégia de cobertura de testes definida

---

**Cursor**

A estratégia de cobertura de testes combina dois níveis (unitário e integração) e segue uma organização clara dos cenários.

---

## Estratégia de cobertura de testes

### 1. Pirâmide de testes (dois níveis)

| Nível            | Tipo        | Escopo                        | Ferramenta    | Estado        |
|------------------|------------|-------------------------------|---------------|---------------|
| **Unitário**     | Testes de unidade | Camada de aplicação (Services) | Jest + mocks  | Implementado  |
| **Integração**   | Testes de integração | API REST completa (vários módulos) | Jest + supertest | Proposto      |

A base da pirâmide é unitária; no topo, testes de integração cobrem o fluxo completo via API.

---

### 2. Cobertura unitária (QuartoService)

**Abordagem**: testar a lógica de negócio isolada, mockando `IQuartoRepository`.

**Organização por operação**:
- **`cadastrar`** – 7 cenários
- **`editar`** – 7 cenários

**Classes de cenário**:

| Categoria     | Exemplos |
|---------------|----------|
| Caminho feliz | Sucesso com dados válidos, valores padrão (ex.: status LIVRE) |
| Validação     | Número vazio, tipo ausente, capacidade inválida, preço negativo |
| Regras de negócio | Número duplicado (ConflictError), quarto inexistente (NotFoundError) |
| Casos de borda | ID obrigatório na edição, manter mesmo número ao editar |

**Rastreamento de requisitos**:
- RF-04.5 (unicidade do número) → conflito em cadastro e edição
- RF-01.1 / RF-01.4 → validações de formato (número, tipo, capacidade, preço)

---

### 3. Cobertura de integração (proposta)

**Abordagem**: exercitar todo o fluxo **Hóspede → Reserva → Quarto** via HTTP, sem mocks nas rotas.

**Categorias de cenários** (10 casos):

| Categoria       | Quantidade | Objetivo |
|-----------------|------------|----------|
| Fluxo feliz     | 1 (IT-01)  | Garantir que o fluxo completo funciona de ponta a ponta |
| Regras RF-04    | 3 (IT-02–04) | Cobrir RF-04.1 e RF-04.2 (disponibilidade e bloqueios) |
| Validações/erros| 4 (IT-05–08) | Quarto/hóspede inexistentes, dados inválidos, datas incorretas |
| Consistência    | 2 (IT-09–10) | Integridade entre módulos e isolamento entre reservas |

**Cobertura horizontal**:
- API REST (Controllers e rotas)
- Services (Quarto, Hospede, Reserva)
- Repositórios em memória (dados compartilhados)
- Fluxo transacional entre os três módulos

---

### 4. Critérios de cobertura por tipo de teste

| Aspecto             | Unitário                          | Integração                  |
|---------------------|-----------------------------------|-----------------------------|
| **Granularidade**   | Método/operação                   | Cenário de negócio completo |
| **Dependências**    | Mockadas (Repository)             | Reais (em memória)          |
| **Entrada**         | DTOs e entidades                  | HTTP (JSON)                 |
| **Saída**           | Entidades e exceções              | Status HTTP e corpo JSON    |
| **Foco**            | Regras isoladas                   | Fluxos e integração entre módulos |

---

### 5. Configuração Jest

`collectCoverageFrom` em `jest.config.js`:
- Inclui: `src/**/*.ts`
- Exclui: `*.d.ts` (declarações)
- Não há meta de percentual definida (thresholds)

---

### 6. Visão geral da estratégia

1. **Unitário primeiro**: regras críticas de QuartoService cobertas com mocks e asserções claras.
2. **Integração depois**: o fluxo Reserva/Hóspede/Quarto é validado via API, garantindo que os módulos funcionem em conjunto.
3. **Categorização**: fluxo feliz, regras RF-04, validações e consistência.
4. **Rastreabilidade**: cada cenário está ligado a requisitos funcionais (RF-02, RF-03, RF-04).
5. **Sem redundância desnecessária**: unitários cobrem lógica interna; integração cobre fluxos e contratos da API.

