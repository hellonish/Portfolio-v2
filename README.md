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
| `about.json` | Name, bio, skills, socials (single object) |
| `projects.json` | `/projects` — software work |
| `research.json` | `/research` — AI Work, with abstracts and results |
| `blog.json` | `/blog` — posts, with tag filtering |

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
  "stack": ["shown as chips on the project page"],
  "highlights": ["bulleted list"],
  "links": { "repo": "", "demo": "" }
}
```

### `research.json`

Same base fields, plus the research treatment:

```json
{
  "venue": "Independent research",
  "abstract": "Longer prose than summary.",
  "results": [{ "metric": "Worst-group accuracy", "value": "81.52%" }],
  "links": { "paper": "", "page": "", "repo": "" }
}
```

`results` renders as a two-column table. Add as many rows as you like.

### `blog.json`

```json
{
  "slug": "post-slug",
  "title": "Post title",
  "summary": "Shown in the list.",
  "date": "2025-11-18",
  "readingTime": "8 min",
  "featured": true,
  "tags": ["Agents", "Production"]
}
```

Tags populate the filter chips automatically. `featured: true` surfaces an item on the homepage
(top 3 per section).

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

- **Placeholder data.** Projects and research are drawn from your existing markdown reports.
  Blog posts are invented placeholders — replace them.
- **Post bodies.** `blog.json` holds metadata only; rows are not yet linked to full articles.
  When you want post pages, add markdown files and a `/blog/:slug` route.
- Theme choice persists in `localStorage`. Dark is the default.
- Monospace is used for metadata and tags only, never body copy.
- All text meets WCAG AA contrast in both themes (verified: worst case 4.75:1).
