# Runbook da migração

Execute comandos a partir da raiz de `challenge-portfolio`.

## 1. Preparar o ambiente

```bash
corepack enable
pnpm migration:check
```

Instale `git-filter-repo` pelo gerenciador de pacotes do sistema ou em um
ambiente isolado. Instale Git LFS caso algum repositório use LFS. Autentique o
GitHub CLI com `gh auth login -h github.com` para exportar metadados completos.

## 2. Criar backups

Por padrão, o script usa o diretório irmão
`../challenge-portfolio-backups`. É possível substituí-lo:

```bash
pnpm migration:backup -- --backup-dir /caminho/seguro
```

O script cria mirrors, busca objetos LFS quando necessário, cria bundles e os
verifica. Ele é retomável e não altera repositórios remotos.

## 3. Exportar metadados

```bash
pnpm migration:metadata
```

Revise os JSONs antes de publicá-los para remover dados pessoais desnecessários.

## 4. Importar

Confirme que o worktree está limpo e que todos os backups estão `verified`.
Importe um repositório por vez:

```bash
pnpm migration:import -- --repository challenge-vue
```

O script cria um clone temporário, executa `git-filter-repo`, importa tags,
produz um merge commit e remove o remote temporário.

## 5. Validar e inventariar

```bash
pnpm verify:migration
pnpm inventory
```

Revise `docs/migration/history-report.md` e
`docs/migration/inventory.md`. Nenhuma diferença inesperada é aceitável.

## 6. Desenvolver e validar o portfólio

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

## 7. Encerrar

Siga `docs/migration/deletion-checklist.md`. A ferramenta não implementa
exclusão remota; essa decisão pertence ao proprietário após revisão manual.

