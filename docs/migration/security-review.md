# Revisão de segurança e publicação

Sanitização concluída em 2026-07-26. Nenhum valor sensível é reproduzido neste
relatório.

## Itens removidos de todo o histórico publicável

- `challenge-pipz/original/.env`;
- PDF do processo seletivo em `challenge-onsign-tv/original`;
- `node_modules` históricos de `challenge-stormtech`;
- `node_modules` históricos de `challenge-jexperts`;
- `node_modules` históricos de `challenge-meetime`.

Os conteúdos integrais anteriores à sanitização continuam recuperáveis nos
mirrors, bundles individuais e no bundle externo
`pre-sanitization-challenge-portfolio.bundle`.

## Valores redigidos

O Gitleaks 8.30.1 encontrou três valores únicos compatíveis com chaves de API
em históricos de `challenge-blueticket`, `challenge-fyld-hansecom` e
`challenge-onsign-tv`. Os valores foram substituídos por `[REDACTED]` em todos
os commits alcançáveis da branch publicável.

## Validação

- Gitleaks 8.30.1;
- 268 commits examinados;
- aproximadamente 12,77 MB analisados;
- nenhuma ocorrência após a sanitização;
- arquivos temporários contendo os valores originais apagados com segurança.

## Resultado

A branch `main` está liberada para a publicação inicial. Os repositórios
originais não foram alterados e não devem ser apagados até a conclusão do
checklist geral.

