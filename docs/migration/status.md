# Estado da migração

Atualizado em 2026-07-26.

| Fase | Estado | Evidência / bloqueio |
| --- | --- | --- |
| Ambiente | Em andamento | Git 2.43.0, Node 24.18.0 e Python 3.12.3 disponíveis |
| Configuração | Em andamento | 20 repositórios confirmados via GitHub |
| Backups | Pendente | Diretório externo ainda não criado |
| Importação | Bloqueada | depende de backups verificados e `git-filter-repo` |
| Inventário | Bloqueado | depende das árvores `original/` |
| Shell Astro | Em andamento | catálogo estático em construção |
| Demos piloto | Pendente | depende do inventário |
| Ondas restantes | Pendente | depende dos pilotos |
| Deploy/limpeza | Pendente | depende de todas as fases anteriores |

## Ambiente observado

- `pnpm`: ausente;
- `git-filter-repo`: ausente;
- Git LFS: ausente;
- `gh`: instalado, mas a credencial local está inválida;
- remote do novo repositório: configurado;
- branch local: `main`, ainda sem commits no início desta execução.

Os repositórios remotos originais não foram alterados.

