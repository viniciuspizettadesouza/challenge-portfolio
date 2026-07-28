# ClimateSeed Challenge

The complete sanitized history is preserved under `original/`. That directory is
historical evidence and must not be modified.

## Maintained demo

The Vue 3 demo under `demo/` preserves the original local-data workflow:

- compare employee counts across the three organisations;
- switch the emissions visualisation between donut and bar charts;
- add a categorised emissions result and see the totals update immediately.

The adaptation uses semantic HTML and CSS charts instead of ApexCharts. This
keeps the portfolio island self-contained while retaining the original fixture
data and user-facing behaviour. It does not call an external API and does not
persist submitted values beyond the current browser session.

## Preserved runtime evidence

The original npm dependency installation succeeds. Its production build
currently stops on three existing TypeScript errors involving the ApexCharts
app type, Vite environment typing, and Pinia getter inference. The maintained
demo resolves those integration concerns without rewriting the preserved
source.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
