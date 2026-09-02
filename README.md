# Portfolio — Vue 3 + Vuetify

Minimal portfolio. Sticky left rail, flat content lists, all content loaded from JSON.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Adding content

All content lives in `src/data/`. Edit the JSON, save — no code changes needed.

| File | Drives |
|---|---|
| `about.json` | Name, hero copy, footer profile, socials, and highlights (single object) |
| `projects.json` | `/projects` — software work |
| `research.json` | `/research` — research work, summaries, tags, and links |
| `blog.json` | `/blog` and `/blog/:slug` — structured posts, with tag filtering |

### `projects.json`

```json
{
  "slug": "unique-id",
  "title": "Project name",
  "summary": "One or two sentences.",
  "year": "2025",
  "featured": true,
  "status": "Live | Complete | Archived",
  "tags": ["shown on the homepage"],
  "links": { "repo": "", "demo": "", "blog": "", "archive": "" }
}
```

### `research.json`

Same base fields, plus the research venue:

```json
{
  "venue": "Independent research",
  "links": { "paper": "", "blog": "" }
}
```

### `blog.json`

```json
{
  "slug": "post-slug",
  "title": "Post title",
  "summary": "Shown in the list.",
  "year": "2025",
  "readingTime": "8 min",
  "featured": true,
  "kind": "Research note",
  "tags": ["Agents", "Production"],
  "intro": "The article opener.",
  "content": [{ "type": "section", "title": "Section", "paragraphs": ["Article copy."] }],
  "links": { "report": "/path/to/report.pdf" }
}
```

Tags populate the filter chips automatically. `featured: true` surfaces an item on the homepage
(top 3 per section). The article page uses the structured `content` blocks and optional report or
external link to present each post as more than a rendered Markdown document.

## Design lab

Two exploration pages, linked under "Design lab" in the sidebar. Delete both routes, both
views and `fonts.json` once you've chosen a direction.

- **`/fonts`** — 10 typeface specimens at headline / special / body scale, plus a live pairing
  switcher (Editorial, Technical, Statement, Essay, Current). Candidates are defined in
  `src/data/fonts.json`.
- **`/components`** — 10 layout and alignment variants of the same content: centered, split,
  asymmetric, grid, timeline, numbered index, right-aligned, feature+list, stat band, pull quote.

The specimen fonts are loaded by a second `@import` in `src/styles/main.css`. **Trim that import
to your chosen pairing before shipping** — it currently pulls 8 extra families.

## Notes

- **Post bodies.** Blog content lives in structured entries in `blog.json`; the Markdown source
  documents remain reference material rather than being rendered directly.
- Theme choice persists in `localStorage`. Dark is the default.
- Monospace is used for metadata and tags only, never body copy.
- All text meets WCAG AA contrast in both themes (verified: worst case 4.75:1).
