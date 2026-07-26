# Roteiro

Cada fase deve produzir evidência verificável e, quando executada, um commit
próprio.

## Fase 0 — Ambiente

Validar Git, Node, pnpm, Python, `git-filter-repo`, Git LFS e autenticação do
GitHub. Não reescrever histórico sem `git-filter-repo`.

Saída: relatório em `docs/migration/status.md`.

## Fase 1 — Configuração

Manter o manifesto dos 20 repositórios com branch padrão, SHA, uso de LFS e
status. Todos os repositórios precisam estar acessíveis.

## Fase 2 — Backups

Criar, fora deste repositório, mirrors, bundles verificados e metadados. Se
qualquer backup falhar, a importação inteira permanece bloqueada.

## Fase 3 — Base do monorepo

Criar workspace, documentação, scripts e shell Astro.

## Fase 4 — Histórico

Para cada repositório, usar clone temporário novo, mover o histórico para
`challenges/<slug>/original`, prefixar tags e criar um merge commit
`chore(history): import <slug>`.

## Fase 5 — Verificação

Comparar SHA de origem, autores, datas, contagens e conteúdo da árvore. Diferença
inesperada bloqueia a conclusão do challenge.

## Fase 6 — Inventário

Auditar arquivos sem instalar dependências nem executar scripts. Classificar a
estratégia de cada challenge.

## Fase 7 — Catálogo Astro

Disponibilizar as 20 páginas estáticas com metadados e status.

## Fases 8–10 — Demos

Migrar primeiro `challenge-salsify` e `challenge-vue`; seguir depois por ondas:
React/Vite, Vue 3/Vite, React legado, Vue CLI/Vue 2, backends e case studies.

## Fases 11–12 — Qualidade e encerramento

Validar lint, tipos, testes, build, clone limpo, deploy, release e cópia externa
dos backups. A exclusão dos repositórios antigos é manual e só ocorre após todos
os itens do checklist.

