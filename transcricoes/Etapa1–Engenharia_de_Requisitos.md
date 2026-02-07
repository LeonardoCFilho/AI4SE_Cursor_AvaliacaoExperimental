# Requisitos do sistema de reserva de hotel
_Exported on 2/7/2026 at 19:44:30 GMT-3 from Cursor (2.4.28)_

---

**User**

Contexto:
Você é um Engenheiro de Software e deve considerar o seguinte domínio de aplicação:
Um sistema de reserva, para um único hotel. Este sistema é composto por alguns módulos
e regras de negócios, a saber:
-Gestão de quartos:
    -Cadastro de quarto, com os campos sendo:
        -Número do quarto (Input)
        -Capacidade (Input)
        -Tipo do quarto (Básico, Moderno, Luxo) (Select)
        -Preço por diária (Input)
        -Há Frigobar (Checkbox)
        -Há café da manhã incluso (Checkbox)
        -Há Ar-condicionado (Checkbox)
        -Há TV (Checkbox)
        -Uma sessão "Camas" sendo:
            - Tipo de cama (Solteiro, Casal King, Casal Queen) (Select)
    -Lista dos quartos, com as colunas:
        -Número do quarto (Número)
        -Tipo do quarto (Texto)
        -Preço por diária (Número)
        -Disponibilidade (Ocupado, Livre, Manutenção e Limpeza) (Select)
        -Botão para editar o quarto (ícone de lápis) (Botão)
-Gestão de Hospedes:
    -Cadastro de hóspede, sendo os campos:
        -Nome (Input)
        -Sobrenome (Input)
        -CPF (Input)
        -Email (Input)
    -Lista de hóspedes, contendo todos os 3 campos, exceto e-mail.
Gestão de reserva:
    -Lista de quartos, sendo:
        -Número do quarto (Número)
        -Tipo do quarto (Texto)
        -Nome do Hospede (Texto)
        -Disponibilidade (Ocupado, Livre, Manutenção e Limpeza) (Chip)
        -Botão para editar a reserva (ícone de lápis) (Botão)
O sistema terá interface web, com paleta de cores verde e azul e utilizará componentes
modernos.



Objetivo:
Liste requisitos funcionais (RF) e não funcionais (RNF) para este sistema.

---

**Cursor**


# Requisitos do Sistema de Reserva de Hotel

## Requisitos Funcionais (RF)

### RF-01 – Gestão de Quartos

| ID | Descrição |
|----|-----------|
| RF-01.1 | O sistema deve permitir cadastrar quarto com número, capacidade, tipo (Básico, Moderno, Luxo), preço por diária e comodidades (Frigobar, café da manhã incluso, ar-condicionado, TV). |
| RF-01.2 | O sistema deve permitir cadastrar camas dos quartos, informando tipo (Solteiro, Casal King, Casal Queen). |
| RF-01.3 | O sistema deve listar quartos com as colunas: número, tipo, preço por diária e disponibilidade (Ocupado, Livre, Manutenção e Limpeza). |
| RF-01.4 | O sistema deve permitir editar quartos cadastrados a partir de um botão de edição na lista. |
| RF-01.5 | O sistema deve permitir alterar o status de disponibilidade do quarto (Ocupado, Livre, Manutenção e Limpeza). |

### RF-02 – Gestão de Hóspedes

| ID | Descrição |
|----|-----------|
| RF-02.1 | O sistema deve permitir cadastrar hóspede com nome, sobrenome, CPF e e-mail. |
| RF-02.2 | O sistema deve listar hóspedes com colunas: nome, sobrenome e CPF (sem e-mail). |
| RF-02.3 | O sistema deve permitir editar hóspedes cadastrados. |

### RF-03 – Gestão de Reservas

| ID | Descrição |
|----|-----------|
| RF-03.1 | O sistema deve listar reservas com número do quarto, tipo do quarto, nome do hóspede e disponibilidade em formato de chip. |
| RF-03.2 | O sistema deve permitir criar reservas associando quarto e hóspede. |
| RF-03.3 | O sistema deve permitir editar reservas existentes por meio de um botão de edição. |
| RF-03.4 | O sistema deve exibir disponibilidade do quarto na visualização de reservas (Ocupado, Livre, Manutenção e Limpeza). |

### RF-04 – Regras de Negócio

| ID | Descrição |
|----|-----------|
| RF-04.1 | O sistema deve impedir reserva de quarto ocupado ou em manutenção/limpeza. |
| RF-04.2 | O sistema deve atualizar a disponibilidade do quarto ao criar ou cancelar/alterar reserva. |
| RF-04.3 | O sistema deve validar CPF (formato e unicidade). |
| RF-04.4 | O sistema deve validar e-mail. |
| RF-04.5 | O sistema deve garantir unicidade do número do quarto. |

---

## Requisitos Não Funcionais (RNF)

### RNF-01 – Interface e Usabilidade

| ID | Descrição |
|----|-----------|
| RNF-01.1 | O sistema deve ter interface web responsiva. |
| RNF-01.2 | O sistema deve usar paleta de cores verde e azul. |
| RNF-01.3 | O sistema deve utilizar componentes visuais modernos. |
| RNF-01.4 | O sistema deve manter consistência visual nas telas e fluxos. |

### RNF-02 – Performance

| ID | Descrição |
|----|-----------|
| RNF-02.1 | O sistema deve responder às ações do usuário em até 3 segundos em condições normais. |
| RNF-02.2 | O sistema deve suportar o uso em um único hotel, sem necessidade de alta escalabilidade. |

### RNF-03 – Segurança

| ID | Descrição |
|----|-----------|
| RNF-03.1 | O sistema deve tratar dados sensíveis (CPF) de forma adequada. |
| RNF-03.2 | O sistema deve garantir a integridade dos dados inseridos e alterados. |

### RNF-04 – Tecnologia

| ID | Descrição |
|----|-----------|
| RNF-04.1 | O sistema deve ser implementado como aplicação web. |
| RNF-04.2 | O sistema deve funcionar em navegadores modernos (Chrome, Firefox, Edge, Safari). |

### RNF-05 – Manutenibilidade

| ID | Descrição |
|----|-----------|
| RNF-05.1 | O código deve seguir boas práticas e padrões de projeto. |
| RNF-05.2 | O sistema deve ser desenvolvido de forma modular, facilitando manutenção e evolução. |

### RNF-06 – Confiabilidade

| ID | Descrição |
|----|-----------|
| RNF-06.1 | O sistema deve evitar perda de dados em operações críticas. |
| RNF-06.2 | O sistema deve validar entradas antes de gravar (client-side e server-side). |

---

## Resumo

| Categoria | Quantidade |
|-----------|------------|
| **Requisitos Funcionais** | 17 |
| **Requisitos Não Funcionais** | 11 |
| **Total** | 28 |

Esse conjunto cobre Gestão de Quartos, Gestão de Hóspedes, Gestão de Reservas e aspectos de interface, performance, segurança, tecnologia e manutenção do sistema.

---

**User**

Classifique-os por prioridade (MoSCoW).

---

**Cursor**


Adicionando a classificação MoSCoW ao documento.



Atualizei o documento com a classificação MoSCoW. Resumo da priorização:

## Critérios usados

- **Must have (M)** – Essencial para o sistema funcionar: cadastro e listagem básica, criação de reservas, regras de negócio críticas, interface web (verde/azul), confiabilidade e unicidade de dados.
- **Should have (S)** – Importante para o dia a dia: edição de quartos, hóspedes e reservas; cadastro de camas; validações (CPF, e-mail); performance, segurança e compatibilidade de navegadores.
- **Could have (C)** – Desejável: suporte a um único hotel (restrição de escopo), boas práticas e arquitetura modular.
- **Won't have (W)** – Nenhum requisito classificado como fora de escopo nesta release.

## Distribuição

| Prioridade | Quantidade | Exemplos |
|------------|------------|----------|
| **M** | 17 | RF-01.1, RF-02.1, RF-03.2, RF-04.1, RF-04.2, RNF-01.1, RNF-01.2 |
| **S** | 11 | RF-01.4, RF-02.3, RF-03.3, RF-04.3, RF-04.4, RNF-01.3, RNF-02.1 |
| **C** | 2 | RNF-02.2, RNF-05.1, RNF-05.2 |

A tabela de priorização MoSCoW está no início do documento e a coluna "Prioridade" foi adicionada em todas as tabelas de requisitos.

---

**User**

Crie as histórias de usuário no formato padrão (Como [tipo de usuário], eu quero…, para que…).

---

**Cursor**


Foram adicionadas 16 histórias de usuário no documento, todas no formato “Como [tipo de usuário], eu quero…, para que…”.

**Persona:** Optei por **funcionário do hotel** como persona principal, pois é quem executa o cadastro de quartos, hóspedes e reservas.

**Organização:**
- **US-01 a US-05** – Gestão de Quartos  
- **US-06 a US-08** – Gestão de Hóspedes  
- **US-09 a US-11** – Gestão de Reservas  
- **US-12 a US-16** – Regras de negócio (RF-04), escritas como histórias para deixar explícitas as restrições e o valor de negócio

Cada história está ligada aos requisitos originais (RF) na coluna “Requisito” para facilitar o rastreamento.

---

**User**

Inclua critérios de aceitação no formato padrão (Given-When-Then).

---

**Cursor**


Os critérios de aceitação em formato Given-When-Then foram incluídos para todas as 16 histórias de usuário. Resumo:

## Estrutura adotada

- **Given (Dado)** – contexto ou précondição
- **When (Quando)** – ação do usuário
- **Then (Então)** – resultado esperado

## Cenários por história

| História | Cenários | Exemplos |
|----------|----------|----------|
| US-01 | 3 | Cadastro com sucesso, campos obrigatórios, unicidade do número |
| US-02 | 2 | Adicionar cama, múltiplas camas |
| US-03 | 2 | Exibir colunas, exibir status |
| US-04 | 2 | Editar pelo botão, salvar alterações |
| US-05 | 2 | Alterar status, status refletido na lista |
| US-06 | 4 | Cadastro válido, CPF inválido, CPF duplicado, e-mail inválido |
| US-07 | 1 | Exibir colunas (sem e-mail) |
| US-08 | 2 | Editar e salvar alterações |
| US-09 | 2 | Colunas e chips de disponibilidade |
| US-10 | 3 | Criar reserva, quarto indisponível, exibir na lista |
| US-11 | 2 | Editar reserva e atualizar disponibilidade |
| US-12 | 1 | Impedir reserva de quarto ocupado |
| US-13 | 2 | Atualizar ao criar e ao cancelar |
| US-14 | 2 | CPF inválido, CPF duplicado |
| US-15 | 1 | E-mail inválido |
| US-16 | 2 | Cadastro duplicado, edição duplicada |

Os critérios cobrem fluxos principais e casos de erro (validações, regras de negócio e unicidade).

---

**User**

Defina os casos de uso principais com atores, pré-condições e pós-condições.

---

**Cursor**


Incluí a seção de casos de uso no documento. Resumo:

## Atores

| Ator | Descrição |
|------|-----------|
| **Funcionário do hotel** | Ator principal – faz cadastros e operações do dia a dia |
| **Sistema** | Ator secundário – validações e regras de negócio |

## Casos de uso definidos

| ID | Caso de uso | Pré-condições principais | Pós-condições (sucesso) |
|----|-------------|---------------------------|---------------------------|
| **UC-01** | Cadastrar quarto | Autenticado; número único | Quarto salvo; status Livre; disponível para reserva |
| **UC-02** | Editar quarto | Autenticado; quarto existe; número único (se alterado) | Dados atualizados |
| **UC-03** | Listar quartos | Autenticado | Lista exibida com colunas e botão de editar |
| **UC-04** | Cadastrar hóspede | Autenticado; CPF único e válido; e-mail válido | Hóspede salvo; disponível para reserva |
| **UC-05** | Editar hóspede | Autenticado; hóspede existe; CPF único (se alterado) | Dados atualizados |
| **UC-06** | Listar hóspedes | Autenticado | Lista exibida com colunas |
| **UC-07** | Criar reserva | Autenticado; quarto Livre; hóspede cadastrado | Reserva criada; quarto Ocupado |
| **UC-08** | Editar reserva | Autenticado; reserva existe; novo quarto Livre (se alterado) | Reserva atualizada; status dos quartos ajustados |
| **UC-09** | Listar reservas | Autenticado | Lista exibida com chips de disponibilidade |

Cada caso de uso inclui também **pós-condições de falha** (ex.: dados não alterados, mensagem de erro exibida). As regras de negócio (RF-04) aparecem como pré-condições e pós-condições dentro dos casos de uso relevantes.

---

**User**

Vincule requisitos às histórias de usuário correspondentes

---

**Cursor**


Adicionando a coluna "Histórias" nas tabelas de requisitos e criando a matriz de rastreabilidade.



Adicionando a matriz de rastreabilidade e a seção "Requisitos vinculados" em cada história de usuário.



Adicionei o vínculo entre requisitos e histórias de usuário. Resumo:

## Alterações realizadas

### 1. Coluna "Histórias" nas tabelas de requisitos
- **RF-01 a RF-04**: cada requisito funcional passou a indicar a(s) história(s) relacionada(s).
- **RNF-01 a RNF-06**: cada requisito não funcional passou a indicar as histórias às quais se aplica (ou "—" quando aplicável ao sistema em geral).

### 2. Matriz de rastreabilidade
Foram criadas três vistas:

| Vista | Descrição |
|-------|-----------|
| **RF → Histórias** | Requisitos funcionais e histórias correspondentes |
| **RNF → Histórias** | Requisitos não funcionais e histórias correspondentes |
| **Histórias → RF/RNF** | Para cada história, os requisitos funcionais e não funcionais vinculados |

### 3. Alguns vínculos importantes

- **RF-03.1 e RF-03.4** → US-09 (ambos tratam da listagem de reservas).
- **RNF-01, RNF-04** → US-01 a US-16 (interface e tecnologia para todas as telas).
- **RNF-03.1** → US-06, US-08 (tratamento de CPF em cadastro e edição de hóspedes).
- **RNF-06** → histórias com persistência (cadastro/edição de quartos, hóspedes e reservas).
- **RNF-02.2, RNF-05** → "—" (constraint ou decisão de arquitetura, não ligada a histórias específicas).

