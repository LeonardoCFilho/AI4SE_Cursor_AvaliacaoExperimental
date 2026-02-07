# Classes de quarto, hóspede e reserva
_Exported on 2/7/2026 at 20:17:44 GMT-3 from Cursor (2.4.28)_

---

**User**

Na pasta stack1/
Stack 1: TypeScript + Node.js + React
Implemente as classes para: Quarto, Hóspede e Reserva

---

**Cursor**


Implementando as classes Quarto, Hóspede e Reserva em TypeScript conforme a arquitetura do projeto.



Removendo `readonly` de `status` para permitir alterações.



Implementação concluída. Estrutura criada em `stack1/`:

## Estrutura

```
stack1/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   └── domain/
│       ├── index.ts
│       ├── enums.ts      # TipoQuarto, StatusQuarto, TipoCama, StatusReserva
│       ├── cama.ts       # Classe Cama (relacionada ao Quarto)
│       ├── quarto.ts     # Classe Quarto
│       ├── hospede.ts    # Classe Hospede
│       └── reserva.ts    # Classe Reserva
└── dist/                 # Saída da compilação
```

## Classes

### **Quarto**
- Propriedades: `id`, `numero`, `tipo`, `capacidade`, `precoDiaria`, `status`, `frigobar`, `cafeManhaIncluso`, `arCondicionado`, `tv`, `camas`
- Métodos:
  - `estaDisponivel()` – retorna se o status é LIVRE
  - `podeSerReservado()` – RF-04.1: impede reserva para OCUPADO ou MANUTENCAO_LIMPEZA
  - `alterarStatus()` – altera o status do quarto

### **Hospede**
- Propriedades: `id`, `nome`, `sobrenome`, `cpf`, `email`
- Método: `getNomeCompleto()` – retorna nome + sobrenome

### **Reserva**
- Propriedades: `id`, `quartoId`, `hospedeId`, `dataInicio`, `dataFim`, `status`
- Métodos:
  - `estaAtiva()` – retorna se `status === ATIVA`
  - `cancelar()` – altera status para CANCELADA

### **Cama**
- Classe auxiliar com `id`, `tipo` (TipoCama) e `quartoId`.
- Usada na composição 1:N com Quarto.

A compilação TypeScript foi executada com sucesso.

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


Implementando o módulo de Gestão de Quartos: backend (API Express) e frontend (React).



Refatorando: criando DTOs e ajustando o repositório.



Criando o frontend React com Vite:



Implementei o módulo de **Gestão de Quartos**. Resumo:

## Estrutura

### Backend (Node.js + Express)

- **`src/infrastructure/repositories/QuartoRepository.ts`** – repositório em memória
- **`src/application/quartos/QuartoService.ts`** – regras de negócio (validação, unicidade de número)
- **`src/application/quartos/QuartoController.ts`** – controller REST
- **`src/application/quartos/quartos.routes.ts`** – rotas da API
- **`src/server.ts`** – servidor Express

### Frontend (React + Vite + Tailwind)

- **`client/src/pages/QuartosPage.tsx`** – página principal
- **`client/src/components/QuartoForm.tsx`** – formulário de cadastro/edição
- **`client/src/components/StatusChip.tsx`** – chip de status (reutilizável)
- **`client/src/api/quartos.ts`** – chamadas à API

## Funcionalidades

| Funcionalidade | Implementação |
|----------------|---------------|
| **Cadastro de quarto** | Formulário com número, tipo, capacidade, preço por diária, comodidades e camas |
| **Edição de quarto** | Botão de edição na lista abre o formulário com os dados atuais |
| **Listagem** | Tabela com Número, Tipo, Preço por diária, Disponibilidade, Camas |
| **Disponibilidade** | Select na lista para alterar status (Livre, Ocupado, Manutenção e Limpeza) |
| **Múltiplas camas** | Seção “Camas” com adicionar/remover; tipos: Solteiro, Casal King, Casal Queen |

## Como executar

```bash
cd stack1
npm install && cd client && npm install

# Terminal 1 – API
npm run dev

# Terminal 2 – Frontend
cd client && npm run dev
```

- API: http://localhost:3001  
- Frontend: http://localhost:5173 (proxy configurado para a API)

---

**User**

Garanta princípios SOLID e clean code

---

**Cursor**


Analisando o código e aplicando SOLID e clean code. Lendo os arquivos restantes:



Refatorando o código para aplicar SOLID e clean code:



Aplicando princípios SOLID e clean code no frontend:



Resumo das alterações aplicando **SOLID** e **clean code**:

## Backend – SOLID e Clean Code

### 1. **Single Responsibility (SRP)**
- **`QuartoValidator`** – só valida DTOs
- **`QuartoMapper`** – só converte Quarto ↔ DTO
- **`HttpErrorHandler`** – só mapeia exceções para HTTP
- **`QuartoController`** – só adapta HTTP ↔ aplicação

### 2. **Open/Closed (OCP)**
- Novas regras de validação em `QuartoValidator` sem alterar o Service
- Novos tipos de erro em `handleDomainError` sem alterar os controllers

### 3. **Liskov Substitution (LSP)**
- `QuartoRepositoryEmMemoria` implementa `IQuartoRepository` sem quebrar o contrato

### 4. **Interface Segregation (ISP)**
- `IQuartoRepository` expõe apenas o necessário para o domínio

### 5. **Dependency Inversion (DIP)**
- `IQuartoRepository` no domínio (`domain/repositories/`)
- Service depende da interface, não da implementação
- Injeção de dependências no `server.ts` (Mapper, Validator, Repository)

### 6. **Exceções de domínio**
- `ValidationError`, `NotFoundError`, `ConflictError` substituem checagem por strings nos controllers

### 7. **Repositório**
- Usa apenas entidades de domínio (`Quarto`), não DTOs
- Conversão DTO → Quarto feita no Service, via Mapper

---

## Frontend – Clean Code

- **`constants/quartos.ts`** – centraliza labels e opções (DRY)
- **`api/httpClient.ts`** – helper `fetchApi` para tratamento de erro reutilizável
- **`QuartoForm`** e **`QuartosPage`** – usam constantes compartilhadas

---

## Estrutura final

```
src/
├── domain/
│   ├── errors.ts           # Exceções
│   ├── repositories/
│   │   └── IQuartoRepository.ts
│   └── ...
├── application/
│   ├── common/
│   │   └── HttpErrorHandler.ts
│   └── quartos/
│       ├── QuartoController.ts
│       ├── QuartoService.ts
│       ├── QuartoMapper.ts
│       ├── QuartoValidator.ts
│       ├── quartos.dto.ts
│       └── quartos.routes.ts
└── infrastructure/
    └── repositories/
        └── QuartoRepositoryEmMemoria.ts
```

---

**User**

Explique decisões de implementação em comentários

---

**Cursor**


Adicionando comentários explicativos das decisões de implementação em todo o código.



Os comentários foram adicionados em todo o código. Resumo:

## Comentários adicionados

### **Domínio**
- **`errors.ts`** – Por que usar exceções tipadas em vez de strings; mapeamento para HTTP; SRP/OCP
- **`IQuartoRepository`** – DIP; interface no domínio; `save()` recebe entidade, não DTO
- **`quarto.ts`** – Imutabilidade parcial; por que `status` é mutável
- **`cama.ts`** – Valor-objeto; `quartoId` opcional
- **`enums.ts`** – Uso de string enum para JSON

### **Aplicação**
- **`quartos.dto.ts`** – Separação de DTOs; `id` opcional e `QuartoListagemDto`
- **`QuartoValidator`** – SRP; `isUpdate` para cadastro vs edição
- **`QuartoMapper`** – SRP; `toDomain(dto, id)`; `cloneWithStatus`
- **`QuartoService`** – Orquestração; DIP; `ensureNumeroUnico` como regra de negócio
- **`QuartoController`** – Adapter; `handleDomainError`; `parseId`/`parseStatus`
- **`HttpErrorHandler`** – Mapeamento exceção→HTTP; ordem de verificação
- **`quartos.routes`** – Factory para testes

### **Infraestrutura**
- **`QuartoRepositoryEmMemoria`** – Convenção `id=0`; `excludeId` para unicidade na edição

### **Composição**
- **`server.ts`** – Composition Root; ordem de construção

### **Frontend**
- **`httpClient.ts`** – Tratamento de erro centralizado
- **`quartos.ts` (api)** – Uso de `VITE_API_URL`/proxy
- **`constants/quartos`** – DRY; fonte única de labels
- **`QuartoForm`** – Estado controlado; `initial` via `useEffect`
- **`QuartosPage`** – `editingId` + `quartoParaEditar` em paralelo

