# Arquitetura

## Objetivo

Consolidar 20 repositórios públicos em um monorepo navegável, preservando o
código da branch padrão, autores, mensagens e datas dos commits, além de
backups completos das referências Git.

## Estrutura

```text
apps/portfolio/                 shell Astro estático
challenges/<slug>/original/     árvore e histórico preservados
challenges/<slug>/demo/         adaptação executável opcional
challenges/<slug>/challenge.json
challenges/<slug>/README.md
docs/migration/                 evidências e estado da migração
scripts/migration/              automação auditável
```

## Aplicação

- Astro com TypeScript estrito e saída estática;
- integrações oficiais de React e Vue 3;
- CSS compartilhado, sem biblioteca visual;
- rotas `/`, `/challenges`, `/challenges/[slug]` e `/about`;
- registry tipado contendo os 20 challenges;
- páginas disponíveis mesmo quando uma demo ainda estiver pendente.

## Isolamento

Somente `apps/*`, `packages/*` e `challenges/*/demo` pertencem ao workspace
pnpm. `original/` fica fora dele para impedir instalação acidental de
dependências legadas e execução de scripts desconhecidos.

## Estratégias de apresentação

- `native-react`: componente React moderno integrado ao Astro;
- `native-vue3`: componente Vue 3 integrado ao Astro;
- `static-embed`: build estático isolado;
- `upgrade-vue2`: adaptação controlada para Vue 3;
- `upgrade-react`: adaptação de React legado;
- `mock-backend`: frontend executado com fixtures ou mocks;
- `case-study`: documentação completa quando execução não for viável;
- `manual-review`: bloqueia migração automática.

