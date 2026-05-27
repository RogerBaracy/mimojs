# Instrucoes para Agentes

Este projeto roda via Docker Compose no servico `mimojs`.

## Regra principal

- Nao assumir Node.js ou npm no host.
- Executar comandos de projeto dentro do container `mimojs`.

## Fonte principal das instrucoes

As instrucoes operacionais detalhadas para o Copilot e outros fluxos assistidos ficam em [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Atalho util

- Subir ambiente: `docker compose up -d mimojs`
