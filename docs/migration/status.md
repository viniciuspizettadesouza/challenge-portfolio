# Estado da migração

Atualizado em 2026-07-26.

| Fase | Estado | Evidência / bloqueio |
| --- | --- | --- |
| Ambiente | Concluída | Git, Node, pnpm, Python, `git-filter-repo` e GitHub disponíveis |
| Configuração | Concluída | 20 repositórios confirmados via GitHub |
| Backups | Concluída | 20 mirrors e 20 bundles verificados no diretório externo |
| Metadados | Concluída | exportados no diretório externo; revisão antes de publicação ainda necessária |
| Importação | Pronta | backups verificados e `git-filter-repo` disponível |
| Inventário | Bloqueado | depende das árvores `original/` |
| Shell Astro | Em andamento | catálogo estático em construção |
| Demos piloto | Pendente | depende do inventário |
| Ondas restantes | Pendente | depende dos pilotos |
| Deploy/limpeza | Pendente | depende de todas as fases anteriores |

## Ambiente observado

- `pnpm`: 10.13.1;
- `git-filter-repo`: 2.47.0, instalação local ignorada pelo Git;
- Git LFS: ausente;
- Git LFS não é necessário para as branches padrão auditadas (`usesLfs=false`);
- `gh`: autenticado;
- remote do novo repositório: configurado;
- branch local: `main`, ainda sem commits no início desta execução.

Os repositórios remotos originais não foram alterados. Backups e metadados ficam
em `../challenge-portfolio-backups/` e não são versionados.
