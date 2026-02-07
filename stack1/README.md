# Sistema de Reserva de Hotel - Stack 1

TypeScript + Node.js + React

## Gestão de Quartos

- **Cadastro de quarto**: número, tipo, capacidade, preço por diária, comodidades, camas (Solteiro, King, Queen)
- **Edição de quarto**: alterar dados e camas
- **Listagem**: Número, Tipo, Preço por diária, Disponibilidade (Livre, Ocupado, Manutenção e Limpeza), Camas
- **Suporte a múltiplas camas** por quarto

## Executar

```bash
# Instalar dependências (raiz e client)
npm install && cd client && npm install

# Backend (API) - terminal 1
npm run dev

# Frontend - terminal 2
cd client && npm run dev
```

- API: http://localhost:3001
- Frontend: http://localhost:5173 (com proxy para API)
