# Estado da migração

Atualizado em 2026-07-26.

| Fase | Estado | Evidência / bloqueio |
| --- | --- | --- |
| Ambiente | Concluída | Git, Node, pnpm, Python, `git-filter-repo` e GitHub disponíveis |
| Configuração | Concluída | 20 repositórios confirmados via GitHub |
| Backups | Concluída | 20 mirrors e 20 bundles verificados no diretório externo |
| Metadados | Concluída | exportados no diretório externo; revisão antes de publicação ainda necessária |
| Importação | Concluída | 20 branches padrão importadas com merge individual |
| Verificação | Concluída | 20 árvores e conjuntos de autores conferidos |
| Inventário | Em andamento | inventário automático gerado; revisão manual pendente |
| Segurança | Concluída | histórico sanitizado e Gitleaks sem ocorrências |
| Shell Astro | Concluída | 20 rotas de challenge e build estático validados |
| Demos piloto | Em andamento | Salsify e Vue integrados e testados; screenshots pendentes |
| Ondas restantes | Pendente | depende dos pilotos |
| Publicação inicial | Pronta | branch `main` validada para o primeiro push |
| Deploy/limpeza | Pendente | demos restantes e checklist final ainda necessários |

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
