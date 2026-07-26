# Revisão de segurança e publicação

Varredura inicial executada em 2026-07-26. Nenhum valor potencialmente sensível
é reproduzido neste relatório.

## Achados

### Arquivo `.env`

`challenge-pipz/original/.env` contém uma única variável:
`REACT_APP_API_URL`. O valor tem formato de URL e não contém usuário, senha ou
token embutido. A URL deve ser revisada manualmente para decidir se ainda pode
ser publicada.

### Referências a credenciais

- `challenge-castlabs` lê URL e chaves GraphQL/OMDB de variáveis de ambiente;
- `challenge-fyld-hansecom` monta o header de autorização a partir de um token
  obtido em runtime;
- demais correspondências são modelos de senha ou exemplos comentados.

Não foi encontrada credencial literal nessas ocorrências.

### Dependências versionadas no original

As branches históricas de `challenge-stormtech` e `challenge-jexperts` contêm
`backend/node_modules`. Elas foram mantidas em `original/` para preservar a
árvore exatamente como publicada. Continuam fora do workspace pnpm e não são
executadas, mas aumentam o histórico. Decidir antes da publicação se a
fidelidade histórica prevalece ou se esses caminhos devem ser removidos por uma
reescrita documentada.

### Material de processo seletivo

`challenge-onsign-tv/original/OnSign TV Front End Programming Test 3A (2).pdf`
precisa de revisão manual de confidencialidade e direitos de publicação.

### Arquivos grandes

Não há arquivo individual acima de 5 MiB fora de `node_modules`.

## Bloqueios para publicação

- [ ] Revisar a URL de `challenge-pipz/original/.env`.
- [ ] Revisar o PDF de `challenge-onsign-tv`.
- [ ] Decidir a política para `node_modules` históricos.
- [ ] Executar uma ferramenta dedicada de detecção de segredos no histórico
      completo antes do primeiro push público.

Até esses itens serem resolvidos, o código pode ser trabalhado localmente, mas
não deve ser publicado.

