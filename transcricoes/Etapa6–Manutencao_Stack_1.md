# Problemas de qualidade em QuartoService.ts
_Exported on 2/7/2026 at 21:36:03 GMT-3 from Cursor (2.4.28)_

---

**User**

@QuartoService.ts Identifique problemas de qualidade no código e sugira refatorações, se necessário.

---

**Cursor**

---

## Análise de qualidade do `QuartoService.ts`

### Pontos positivos

- **Responsabilidades bem definidas**: Service orquestra validação, repositório e mapeamento, sem lógica de persistência ou conversão.
- **Injeção de dependências**: Facilita testes e segue o princípio de inversão de dependência.
- **Documentação**: Decisões arquiteturais documentadas.
- **Uso de `ensureNumeroUnico`**: Regra de unicidade centralizada e encapsulada.

---

### Problemas identificados

#### 1. Inconsistência no tratamento de “não encontrado”

- `editar()` lança `NotFoundError` quando o quarto não existe.
- `alterarStatus()` retorna `null` quando o quarto não existe.

Isso obriga o consumidor da API a tratar dois padrões diferentes.

**Sugestão**: Padronizar para lançar `NotFoundError` em `alterarStatus()` quando o quarto não existir, alinhando com `editar()` e com o comportamento esperado pelo Controller.

```typescript
async alterarStatus(id: number, status: StatusQuarto): Promise<Quarto> {
  const quarto = await this.repository.findById(id);
  if (!quarto) {
    throw new NotFoundError('Quarto não encontrado');
  }
  const atualizado = this.mapper.cloneWithStatus(quarto, status);
  return this.repository.save(atualizado);
}
```

---

#### 2. Uso de non-null assertion (`dto.id!`)

Em `editar()` o `dto.id` é usado com `!`. Mesmo que o validator garanta o `id` em edição, essa asserção torna o código frágil se o fluxo de validação mudar.

**Sugestão**: Garantir o tipo após a validação ou extrair o `id` de forma segura:

```typescript
async editar(dto: QuartoDto): Promise<Quarto> {
  this.validator.validate(dto, true);
  const id = dto.id;
  if (id == null) {
    throw new Error('ID é obrigatório para edição');
  }
  const existente = await this.repository.findById(id);
  if (!existente) {
    throw new NotFoundError('Quarto não encontrado');
  }
  await this.ensureNumeroUnico(dto.numero, id);
  const quarto = this.mapper.toDomain(dto, id);
  return this.repository.save(quarto);
}
```

---

#### 3. Inconsistência de tipo de retorno (`obterPorId`)

- `listar()` retorna DTOs.
- `obterPorId()` retorna entidade de domínio `Quarto | null`.

Se o Controller expõe isso diretamente na API, a resposta pode quebrar ou expor detalhes internos. Vale avaliar se o retorno deve ser um DTO (por exemplo `QuartoDto` ou `QuartoListagemDto`) para manter consistência com `listar()`.

---

#### 4. Redundância no `cadastrar` quanto ao status

O `status` já é tratado no mapper:

```typescript
// QuartoMapper.ts linha 23
dto.status ?? StatusQuarto.LIVRE
```

E no service:

```typescript
{ ...dto, status: dto.status ?? StatusQuarto.LIVRE }
```

O spread com `status` é redundante: o mapper já aplica o default. Pode simplificar para:

```typescript
const quarto = this.mapper.toDomain(dto, 0);
```

---

#### 5. Possível race condition em `ensureNumeroUnico`

Entre `findByNumero` e `save`, outro processo pode criar um quarto com o mesmo número. O ideal é garantir unicidade no banco (constraint UNIQUE) e tratar o erro de violação para converter em `ConflictError` mais amigável. O service pode continuar usando `ensureNumeroUnico` como checagem antecipada, mas a integridade final deve vir do banco e da camada de persistência.

---

### Resumo das refatorações sugeridas

| Prioridade | Problema                         | Sugestão                                         |
|-----------|-----------------------------------|--------------------------------------------------|
| Alta      | Tratamento inconsistente de “não encontrado” | Padronizar `alterarStatus` para lançar `NotFoundError` |
| Média     | Non-null assertion (`dto.id!`)   | Validar ou extrair `id` de forma explícita       |
| Média     | Retorno de `obterPorId`          | Avaliar retorno em DTO em vez de entidade        |
| Baixa     | Redundância de `status` em `cadastrar` | Remover o spread de `status` e confiar no mapper |

Se quiser, posso aplicar essas alterações diretamente no arquivo.

---

**User**

Forneça uma versão melhorada do código

---

**Cursor**

Aplicando as refatorações identificadas em `QuartoService.ts` e ajustando o `QuartoController.ts` para o novo comportamento.


Todas as alterações foram aplicadas e os testes passaram. Resumo da versão melhorada:

---

## Alterações realizadas

### `QuartoService.ts`

| Mudança | Antes | Depois |
|--------|--------|--------|
| **obterPorId** | Retornava `Quarto \| null` | Retorna `Quarto` e lança `NotFoundError` quando não encontra |
| **cadastrar** | Spread com `status: dto.status ?? StatusQuarto.LIVRE` | Passa `dto` direto; o mapper já trata o default |
| **editar** | Uso de `dto.id!` (non-null assertion) | Extrai `id` com checagem explícita e lança `ValidationError` se ausente |
| **alterarStatus** | Retornava `Quarto \| null` | Retorna `Quarto` e lança `NotFoundError` quando não encontra |

### `QuartoController.ts`

- Removidas as checagens `if (!quarto)` em `obterPorId` e `alterarStatus`
- Tratamento de “não encontrado” passou a ser feito via `handleDomainError` (exceções → HTTP 404)

---

## Trecho final do `QuartoService.ts`

```33:76:stack1/src/application/quartos/QuartoService.ts
  async obterPorId(id: number): Promise<Quarto> {
    const quarto = await this.repository.findById(id);
    if (!quarto) {
      throw new NotFoundError('Quarto não encontrado');
    }
    return quarto;
  }

  async cadastrar(dto: QuartoDto): Promise<Quarto> {
    this.validator.validate(dto, false);
    await this.ensureNumeroUnico(dto.numero);

    // id=0 indica criação; repositório gera id e persiste
    const quarto = this.mapper.toDomain(dto, 0);
    return this.repository.save(quarto);
  }

  async editar(dto: QuartoDto): Promise<Quarto> {
    this.validator.validate(dto, true);

    const id = dto.id;
    if (id == null) {
      throw new ValidationError('ID do quarto é obrigatório para edição');
    }

    const existente = await this.repository.findById(id);
    if (!existente) {
      throw new NotFoundError('Quarto não encontrado');
    }
    await this.ensureNumeroUnico(dto.numero, id);

    const quarto = this.mapper.toDomain(dto, id);
    return this.repository.save(quarto);
  }

  async alterarStatus(id: number, status: StatusQuarto): Promise<Quarto> {
    const quarto = await this.repository.findById(id);
    if (!quarto) {
      throw new NotFoundError('Quarto não encontrado');
    }

    const atualizado = this.mapper.cloneWithStatus(quarto, status);
    return this.repository.save(atualizado);
  }
```

---

Todos os 14 testes do `QuartoService` continuam passando.

---

**User**

Explique como isso reduz dívida técnica

---

**Cursor**


## Como a refatoração reduz dívida técnica

A dívida técnica é o custo futuro de manter e evoluir o código. As mudanças feitas diminuem esse custo de várias formas:

---

### 1. **Tratamento consistente de erros**

**Antes:** `obterPorId` e `alterarStatus` retornavam `null`; `editar` lançava `NotFoundError`. O consumidor precisava tratar dois padrões.  

**Depois:** Todos lançam `NotFoundError` quando o recurso não existe.

**Redução de dívida:**  
- Um único padrão: “não encontrado” sempre via exceção.  
- Menos condicionais (`if (!quarto)`) no Controller.  
- Menos risco de esquecer a checagem de `null` em novos fluxos.  
- Mais fácil de mudar o tratamento de erro em um só lugar (`handleDomainError`).

---

### 2. **Remoção de non-null assertion (`dto.id!`)**

**Antes:** Uso de `dto.id!` assumindo que o `Validator` sempre garantia o `id`.  

**Depois:** Checagem explícita `if (id == null)` e lançamento de `ValidationError`.

**Redução de dívida:**  
- Evita que mudanças no `Validator` quebrem o código silenciosamente.  
- O TypeScript consegue inferir o tipo após a validação, sem `!`.  
- A intenção fica explícita: “quem chama editar precisa passar id, senão é erro”.

---

### 3. **Remoção de redundância**

**Antes:** `cadastrar` fazia `{ ...dto, status: dto.status ?? StatusQuarto.LIVRE }` mesmo com o `Mapper` já aplicando esse default.  

**Depois:** `cadastrar` passa `dto` diretamente para o Mapper.

**Redução de dívida:**  
- Uma única fonte de verdade para o default de `status`.  
- Menos duplicação e menos risco de divergência se a regra mudar.  
- Código mais simples e fácil de manter.

---

### 4. **Assinaturas mais previsíveis**

**Antes:** `obterPorId` e `alterarStatus` retornavam `Quarto | null`, exigindo checagem em todo lugar.  

**Depois:** Retornam `Quarto`; “não encontrado” vira exceção.

**Redução de dívida:**  
- Menos branches e condições espalhadas.  
- O contrato dos métodos fica claro: “o retorno é sempre um quarto válido”.  
- Menos risco de não tratar `null` e causar `TypeError`.

---

### 5. **Controller mais simples**

**Antes:** Verificações manuais de `null` e envio de 404 em vários pontos.  

**Depois:** O fluxo normal segue até o retorno; erros são tratados em `handleDomainError`.

**Redução de dívida:**  
- Menos repetição de lógica de erro no Controller.  
- Fluxo principal mais linear e legível.  
- Mudanças no tratamento de erros concentradas em um único handler.

---

### Resumo do impacto

| Aspecto | Efeito na dívida técnica |
|--------|---------------------------|
| **Consistência** | Um padrão para erros → menos confusão e menos bugs |
| **Confiança no tipo** | Menos `!` e checagens implícitas → TypeScript mais útil |
| **DRY** | Sem duplicação de regras → menos pontos para atualizar |
| **Contratos** | Métodos retornam só o que prometem → menos acoplamento |
| **Manutenibilidade** | Código mais simples → menor custo para futuras mudanças |

O resultado é um código mais previsível, fácil de testar e de evoluir sem gerar novos ajustes em vários pontos.

