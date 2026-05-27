# Copilot Instructions

## Ambiente de execucao

- Este projeto roda em Docker Compose no servico `mimojs`.
- Nao assumir Node.js ou npm instalados no host.
- Sempre executar comandos Node/npm dentro do container.

## Como executar comandos

Use preferencialmente:

- `docker compose exec mimojs sh -lc "<comando>"`

Exemplos:

- Instalar dependencias: `docker compose exec mimojs sh -lc "npm install"`
- Rodar dev server: `docker compose exec mimojs sh -lc "npm run dev -- --host 0.0.0.0"`
- Rodar build: `docker compose exec mimojs sh -lc "npm run build"`
- Rodar testes: `docker compose exec mimojs sh -lc "npm test"`

## Boot do ambiente

- Subir servico: `docker compose up -d mimojs`
- Porta publicada: `5173:5173`

## Regra para agentes

- Quando precisar validar compilacao, lint, testes ou scripts do package.json, executar no container `mimojs`.
- Evitar comandos diretos `npm ...` no host para nao gerar falhas de ambiente.
