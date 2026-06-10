# Portfolio UI Kit

An interactive recreation of Nishant Sharma's portfolio, **rebuilt on the Editorial Terminal design system**. This is the flagship surface — a single long-scroll site that swaps the original academic two-column CV for a creative-technologist experience while keeping every fact intact.

## Run it
Open `index.html`. It loads React + the compiled `_ds_bundle.js`, then mounts the screen files below.

## Screens (well-factored, one concern each)
| File | Section | Composes |
|---|---|---|
| `Nav.jsx` | Sticky top nav | mono links, scroll-spy, blur-on-scroll |
| `Hero.jsx` | Full-bleed hero | `ParticleField`, `MagneticButton`, status strip + metric ticker |
| `About.jsx` | Profile | `SectionHeader`, `MetricStat`, `ArchitectureFlow`, `Button`, photo |
| `Work.jsx` | Selected work | `ProjectCard` (featured + grid) |
| `Research.jsx` | Research | `ProjectCard` tone="violet" |
| `Skills.jsx` | Knowledge graph | `SkillConstellation` (night) + group readouts |
| `Contact.jsx` | Trajectory + contact | timeline, `MagneticButton`, social links |

## How it composes the system
- Screens read design-system primitives from `window.NishantSharmaPortfolioDesignSystem_acfe10` (the bundle), so they never re-implement a Button or Card.
- Each screen file exposes itself with `Object.assign(window, { … })` (no ESM export) so the browser-Babel loader can share them across `<script type="text/babel">` blocks.
- Two surface worlds alternate for rhythm: **night** (hero, skills, contact) and **paper** (about, work, research). The night sections carry `data-theme="night"` so paper-built primitives flip automatically.

## Fidelity notes
- All copy, metrics, project descriptions, and links are lifted verbatim from the source repo (`hellonish/Portfolio-v2`).
- The résumé links point at the PDF hosted in that repo; swap for a local copy if you self-host.
- This is a visual/interaction recreation — not production code. Data is inlined, not fetched.
