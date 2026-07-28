# PropertiaG Challenge

History imported, sanitized, and verified.

## Preserved runtime evidence

The original Next.js 12.2.5 project installs and builds under Node 18 with Yarn
1. Its heading test passes. Its snapshot test fails because the committed
snapshot still represents the untouched Next.js starter instead of the
implemented calculator; the historical test and snapshot remain unchanged.

## Portfolio presentation

The integer-to-Roman-numeral calculator is available as an interactive React
island. It preserves the original 1–1000 requirement and adds explicit
validation, example values, and direct conversion tests.

The historical Next.js source remains unchanged under `original/`. The
maintained portfolio adaptation lives under `demo/`.

## Status

The demo is integrated, tested, and was approved by the repository owner on
2026-07-28.
