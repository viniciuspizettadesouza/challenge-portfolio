# Checklist para exclusão manual

Não execute exclusões enquanto houver qualquer item desmarcado.

- [ ] 20 mirror clones existem fora do novo repositório.
- [ ] 20 bundles foram criados.
- [ ] 20 bundles passaram em `git bundle verify`.
- [ ] Metadados do GitHub foram exportados e revisados.
- [ ] Código original dos 20 projetos está no monorepo.
- [ ] Histórico da branch padrão dos 20 projetos foi importado.
- [ ] Autores, e-mails, mensagens e datas foram comparados.
- [ ] Nenhum segredo ou material confidencial permanece.
- [x] Repositório unificado foi enviado ao GitHub.
- [x] Clone novo do repositório unificado funciona.
- [x] `pnpm install` funciona no clone novo.
- [x] Build passa no clone novo; lint, typecheck e testes passaram no checkout principal.
- [ ] As 20 páginas existem e foram revisadas.
- [ ] Cada challenge possui demo funcional ou case study completa.
- [ ] Aplicação está publicada.
- [ ] Tag e release `migration-complete` foram criadas.
- [ ] Há cópia dos backups em outro disco ou armazenamento.
- [ ] Checklist foi revisado manualmente pelo proprietário.

## Exclusão

A exclusão é feita manualmente, um repositório por vez, pelo proprietário.
Nenhum script deste projeto contém uma operação de exclusão remota.
