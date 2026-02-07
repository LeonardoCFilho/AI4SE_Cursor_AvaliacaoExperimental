# Proposta de arquitetura de sistema
_Exported on 2/7/2026 at 19:56:05 GMT-3 from Cursor (2.4.28)_

---

**User**

Proponha uma arquitetura para este sistema (ex.: camadas, microserviços, ou monolito modular).

---

**Cursor**


Propondo uma arquitetura adequada ao sistema de reserva de hotel e criando um documento de proposta.



Criei a proposta de arquitetura em `docs/02.arquitetura_proposta.md`. Segue um resumo:

## Proposta: **Monolito modular em camadas**

A arquitetura recomendada é um monolito modular, em 4 camadas:

### Camadas

1. **Apresentação** – Interface web responsiva (paleta verde/azul), formulários e listagens  
2. **Aplicação** – API REST ou SSR, validação de entrada, rotas  
3. **Domínio** – Lógica de negócio em 3 módulos: Quartos, Hóspedes, Reservas  
4. **Infraestrutura** – Repositórios, banco de dados, validações (CPF, e-mail)

### Motivação

- **RNF-02.2**: uso em um único hotel, sem necessidade de alta escalabilidade  
- **RNF-05.2**: modularidade para manutenção e evolução  
- Custo operacional menor que microserviços  
- Transações ACID para consistência ao criar/alterar reservas (RNF-06.1)

### Estrutura de módulos

```
src/
├── presentation/     # Páginas e componentes UI
├── application/      # Controllers, DTOs, rotas
├── domain/           # Entidades, serviços, regras de negócio
│   ├── quartos/
│   ├── hospedes/
│   └── reservas/
└── infrastructure/   # Banco de dados, repositórios, validadores
```

### Evolução futura

Se o sistema passar a atender vários hotéis ou crescer em complexidade, a modularidade permite evoluir para microserviços por domínio (Quartos, Hóspedes, Reservas) com menor retrabalho.

O documento em `docs/02.arquitetura_proposta.md` inclui diagramas, modelo de dados simplificado e alinhamento com os requisitos.

---

**User**

Justifique a escolha considerando desempenho, escalabilidade e manutenção.

---

**Cursor**


Adicionei a justificativa ao documento. Segue o resumo:

## Desempenho
- **Chamadas locais**: Comunicação entre módulos em memória, sem latência de rede.
- **Transações ACID**: Operações atômicas (quarto + reserva) em uma única transação.
- **Um único banco**: Menos conexões e round-trips; adequado para RNF-02.1 (resposta em até 3 segundos).

## Escalabilidade
- **Escopo (RNF-02.2)**: Uso em um único hotel; escala vertical atende ao cenário.
- **Padrão de carga**: Dezenas a centenas de requisições/hora (recepção), não milhares/segundo.
- **Crescimento futuro**: Possibilidade de múltiplas instâncias do monolito atrás de load balancer; microserviços só se o sistema passar a múltiplos hotéis ou escala muito maior.

## Manutenção
- **Modularidade (RNF-05.2)**: Domínios separados facilitam localizar bugs e evoluir funcionalidades.
- **Deploy simples**: Um único artefato, menos variáveis, rollback mais direto.
- **Debug e observabilidade**: Stack traces contínuos, logs em um único fluxo.
- **Onboarding**: Um único repositório e fluxo de execução.
- **Evolução futura**: A modularidade permite migrar módulos para serviços independentes sem reescrever tudo.

A seção completa está em `docs/02.arquitetura_proposta.md`.

---

**User**

Gere o diagrama de componentes (texto ou UML)

---

**Cursor**


Incluí o diagrama de componentes no documento. Resumo do que foi adicionado:

## Diagrama de componentes

### 1. Diagrama UML (PlantUML)
Diagrama com:
- **4 camadas**: Apresentação, Aplicação, Domínio, Infraestrutura
- **Componentes**: Web UI (3 módulos), Controllers (3), Services (3), Repositories (3) e banco de dados
- **Relações**: HTTP (UI → Controllers), uso (Controllers → Services), persistência (Services → Repositories), SQL (Repositories → DB)
- **Interações específicas**: `ReservaController` usa `QuartoService` e `HospedeService` para validar disponibilidade e hóspede

### 2. Diagrama em ASCII
Versão textual equivalente para uso em editores sem renderização de PlantUML.

### 3. Tabela de interfaces e dependências
Resumo das interfaces e das dependências entre componentes.

Para visualizar o PlantUML, use:
- extensão PlantUML no VS Code/Cursor
- [plantuml.com](https://www.plantuml.com/plantuml)
- ferramentas que suportem PlantUML

---

**User**

Gere o diagrama de classes principal (Quarto, Hóspede, Reserva.).

---

**Cursor**


Adicionei o diagrama de classes principal no documento. Resumo:

## Diagrama de classes principal

### Entidades

**Quarto**
- Atributos: `id`, `numero`, `tipo` (BASICO | MODERNO | LUXO), `capacidade`, `precoDiaria`, `status` (LIVRE | OCUPADO | MANUTENCAO_LIMPEZA), comodidades (`frigobar`, `cafeManhaIncluso`, `arCondicionado`, `tv`)
- Métodos de domínio: `estaDisponivel()`, `podeSerReservado()`

**Cama**
- Atributos: `id`, `tipo` (SOLTEIRO | CASAL_KING | CASAL_QUEEN)
- Associação: composição 1 Quarto → 0..* Cama

**Hospede**
- Atributos: `id`, `nome`, `sobrenome`, `cpf`, `email`
- Método: `getNomeCompleto()`

**Reserva**
- Atributos: `id`, `dataInicio`, `dataFim`, `status` (ATIVA | CANCELADA)
- Método: `estaAtiva()`
- Associações: muitos-para-um com Quarto e com Hospede

### Relacionamentos
- Quarto 1 —— * Cama (composição)
- Reserva * —— 1 Quarto
- Reserva * —— 1 Hospede

O documento traz as versões em PlantUML e ASCII. Para gerar a imagem a partir do PlantUML, use a extensão do VS Code/Cursor ou [plantuml.com](https://www.plantuml.com/plantuml).

---

**User**

Sugira padrões de projeto aplicáveis ao sistema e justifique

---

**Cursor**


Adicionei a seção de padrões de projeto ao documento. Resumo:

## Padrões de Projeto Aplicáveis

| Padrão | Aplicação | Justificativa |
|--------|-----------|---------------|
| **Repository** | Interfaces `IQuartoRepository`, `IHospedeRepository`, `IReservaRepository` | Separa domínio da persistência, facilita testes e troca de implementação |
| **Service Layer** | `QuartoService`, `HospedeService`, `ReservaService` | Centraliza regras (RF-04), orquestra fluxos como criar reserva |
| **DTO** | `QuartoDTO`, `HospedeDTO`, `ReservaDTO` | Desacopla API do domínio; permite omitir e-mail (RF-02.2) e CPF sensível (RNF-03.1) |
| **Unit of Work** | Transação na criação/edição de reserva | Garante atomicidade Reserva + atualização de Quarto (RF-04.2, RNF-06.1) |
| **Dependency Injection** | Controllers → Services → Repositories via construtor | Reduz acoplamento e melhora testabilidade (RNF-05.2) |
| **Strategy** | `CpfValidator`, `EmailValidator` implementam `IValidator` | Encapsula validações (RF-04.3, RF-04.4, RNF-06.2) e permite extensão |
| **Builder** | `QuartoBuilder` | Simplifica criação de Quarto com muitos atributos (RF-01.1, RF-01.2) |
| **Specification** | `QuartoPodeSerReservadoSpecification` | Encapsula regra RF-04.1 em objeto reutilizável e combinável |

Cada padrão está ligado a requisitos funcionais e não funcionais específicos. A seção 8 do documento traz os detalhes e a tabela de mapeamento padrão × requisito.

