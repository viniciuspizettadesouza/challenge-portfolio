# Plano de consolidação

Este diretório é a fonte permanente de contexto para a consolidação. Ele foi
organizado para que uma pessoa ou uma nova sessão do Codex possa retomar o
trabalho sem depender do texto original da conversa.

## Ordem de leitura

1. [Objetivo e arquitetura](architecture.md)
2. [Roteiro e critérios de saída](roadmap.md)
3. [Runbook operacional](runbook.md)
4. [Decisões e restrições](decisions.md)
5. [Estado real da execução](../migration/status.md)
6. [Checklist de exclusão](../migration/deletion-checklist.md)

## Regra central

O código histórico vive em `challenges/<slug>/original` e não deve ser
modernizado. A versão executável vive em `challenges/<slug>/demo`. Repositórios
originais nunca serão apagados automaticamente.

## Escopo

O escopo inclui exatamente os 20 repositórios registrados em
[`scripts/migration/repositories.json`](../../scripts/migration/repositories.json).
`nuxt-challenge` está fora da migração inicial.

