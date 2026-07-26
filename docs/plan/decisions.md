# Decisões e restrições

## Decisões

1. Astro é o shell estático e pode hospedar componentes React e Vue 3.
2. `original/` é arquivo permanente; `demo/` é a versão adaptável.
3. A branch padrão e tags relevantes entram no monorepo; referências extras
   permanecem nos mirrors e bundles.
4. Os hashes mudam ao reescrever caminhos, mas autoria, mensagens e datas devem
   permanecer.
5. Um merge commit separado identifica cada origem.
6. Projetos desconhecidos não são modernizados antes do inventário.
7. Backends indisponíveis devem preferir fixtures e mocks a infraestrutura
   permanente.

## Restrições de segurança

- não apagar, arquivar, renomear ou alterar repositórios remotos;
- não usar `--force` fora de clones temporários;
- não versionar backups, builds, dependências ou segredos;
- não executar scripts dos projetos antigos durante a auditoria;
- parar e reportar credenciais, sem imprimir o valor completo;
- não importar enquanto qualquer backup estiver incompleto;
- tratar a exclusão final como manual e irreversível.

