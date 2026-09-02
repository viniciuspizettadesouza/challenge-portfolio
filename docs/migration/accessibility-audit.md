# Accessibility baseline

Baseline established: 2026-09-02.

## Automated coverage

The Playwright suite runs axe checks for the shared home, catalog, challenge
detail, and about shell routes. Every one of the 23 fullscreen demo routes is
checked against WCAG 2.0 A/AA, WCAG 2.1 A/AA, and applicable WCAG 2.2 AA rules
for landmarks, names, roles, keyboard-operable structure, and other
machine-testable semantics.

Full automated color-contrast checks also run for a representative set of
maintained implementations: Conaz and Devlandia (Astro), Pipz and Salsify
(React), and Vue.js (Vue 3). The shared shell is checked for contrast on all
four representative shell routes.

The catalog skip link is exercised from the keyboard, its target receives
focus, and every demo route must expose a visible solid focus indicator on its
first keyboard target. The shared stylesheet supplies a consistent
three-pixel focus ring.

## All-demo review

The 2026-09-02 full audit reviewed keyboard entry, focus visibility,
landmarks, accessible names, and computed color contrast on every demo route.
Seven demos passed every selected automated rule: Vue.js, Conaz, Zygo,
Salsify, Devlandia, Pipz, and PropertiaG. The remaining findings are retained
as explicit demo-level follow-up rather than suppressed globally:

| Demo            | Finding                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Stormtech       | Muted labels and ordering text do not meet AA contrast                                                 |
| Vue             | Four checkboxes inherited from the preserved source lack individual labels                             |
| Castlabs        | Brand, supporting copy, and action colors do not meet AA contrast                                      |
| JExperts        | Buttons, inputs, supporting text, and footer do not meet AA contrast                                   |
| ClimateSeed     | Eyebrows, inactive toggle, and submit action do not meet AA contrast                                   |
| Lagoasoft       | Supporting post metadata does not meet AA contrast                                                     |
| Meetime         | Supporting copy and primary action do not meet AA contrast                                             |
| Instruct        | Result metadata and contact details do not meet AA contrast                                            |
| Blueticket      | Supporting copy and table headings do not meet AA contrast; the table region is now keyboard-focusable |
| Sword Health    | Article supporting copy does not meet AA contrast                                                      |
| FYLD / HanseCom | Search hint and metadata do not meet AA contrast                                                       |
| OnSign TV       | Supporting copy, table headings, and about copy do not meet AA contrast                                |
| Ingenious Build | Metadata, inactive tab, panel label, and empty states do not meet AA contrast                          |
| Leafwell        | Directory result count does not meet AA contrast                                                       |
| 3cket           | Navigation and event-list supporting copy do not meet AA contrast                                      |
| User Management | Authentication eyebrow and inactive tab do not meet AA contrast                                        |

The Vue checkbox exception is limited in the automated test to the four known
controls rendered directly by the immutable historical component. No source
under `challenges/*/original/` was modified. All other rules continue to run
on that route.

## Deferred remediation

Contrast remediation for the listed demos is deferred because those colors are
part of the fidelity-preserving visual adaptations and require an owner visual
review alongside regenerated screenshots. The Vue checkbox names require a
maintained wrapper around the historical component rather than an edit to the
protected source. These follow-ups do not weaken the shared-shell or
representative-route baseline and remain visible for a future accessibility
polish pass.
