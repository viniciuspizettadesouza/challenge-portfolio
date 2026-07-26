# Challenge Portfolio

Portfólio unificado para preservar e apresentar 20 desafios técnicos antigos.

O projeto mantém duas representações separadas por challenge:

- `original/`: código e histórico preservados do repositório de origem;
- `demo/`: versão executável, modernizada ou adaptada para o portfólio.

## Estado atual

A infraestrutura do monorepo e o catálogo das 20 páginas estão em construção. O
estado auditável da migração fica em
[`docs/migration/status.md`](docs/migration/status.md).

## Referências

- [Índice do plano](docs/plan/README.md)
- [Arquitetura](docs/plan/architecture.md)
- [Roteiro por fases](docs/plan/roadmap.md)
- [Runbook operacional](docs/plan/runbook.md)
- [Decisões e restrições](docs/plan/decisions.md)
- [Checklist de exclusão](docs/migration/deletion-checklist.md)

## Comandos

```bash
corepack enable
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Os comandos de migração são intencionalmente separados do build:

```bash
pnpm migration:check
pnpm migration:backup
pnpm migration:metadata
pnpm migration:import -- --repository challenge-vue
pnpm verify:migration
pnpm inventory
```

Leia o [runbook](docs/plan/runbook.md) antes de executar operações de histórico.
Nenhum script deste repositório apaga, arquiva ou altera repositórios remotos.

