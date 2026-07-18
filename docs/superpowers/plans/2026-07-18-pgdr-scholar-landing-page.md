# PGDR Scholar Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a crawlable, Scholar-compatible PGDR abstract page with a same-directory PDF, canonical metadata, citation resources, and portfolio discovery links.

**Architecture:** Add a standalone semantic HTML page and focused stylesheet under `research/pgdr/`, with the unchanged paper copied beside it. Root discovery files and the existing Research component will link crawlers and visitors to the canonical page.

**Tech Stack:** Static HTML5, CSS, XML sitemap, robots.txt, existing browser-loaded React portfolio.

## Global Constraints

- Preserve `projects/pdfs/pgdr_final_report_nsharma.pdf` unchanged.
- Use April 30, 2026 as the paper publication/version date.
- Use `https://www.hellonish.dev/research/pgdr/` as the canonical landing-page URL.
- Use `https://www.hellonish.dev/research/pgdr/pgdr.pdf` as the canonical PDF URL.
- Link code to `https://github.com/hellonish/PGDR`.
- Do not imply that NYU published or endorsed the report.
- Keep the complete abstract in the initial HTML without requiring JavaScript or interaction.

---

### Task 1: Canonical Paper Artifact and Landing Page

**Files:**
- Create: `research/pgdr/pgdr.pdf`
- Create: `research/pgdr/index.html`
- Create: `research/pgdr/styles.css`

**Interfaces:**
- Consumes: `projects/pdfs/pgdr_final_report_nsharma.pdf`
- Produces: `/research/pgdr/`, `/research/pgdr/pgdr.pdf`, and crawlable Highwire citation metadata

- [ ] **Step 1: Add the canonical PDF without altering its bytes**

Run:

```bash
mkdir -p research/pgdr
cp projects/pdfs/pgdr_final_report_nsharma.pdf research/pgdr/pgdr.pdf
cmp projects/pdfs/pgdr_final_report_nsharma.pdf research/pgdr/pgdr.pdf
```

Expected: `cmp` exits with status 0 and prints no output.

- [ ] **Step 2: Create the semantic landing page**

Add `research/pgdr/index.html` with an exact `<h1>`, visible author and date, `citation_title`, `citation_author`, `citation_publication_date=2026/04/30`, `citation_pdf_url`, `citation_language`, canonical link, PDF and repository links, recommended citation, and BibTeX. Use this exact author-written abstract:

> Deep learning models can learn rules that are predictive in the training distribution but misaligned with the intended concept. This report studies shortcut learning as an incorrect inductive bias, focusing on cases where models rely on spurious attributes such as image background or shallow lexical overlap. Waterbirds is used as the primary empirical setting: the target label is bird type, but land and water backgrounds are correlated with the label during training. I propose Persistent Gradient Disagreement Reweighting (PGDR), an approach that does not use training group labels to construct its selected set or training loss, and instead uses last-layer gradient geometry to identify examples that may conflict with the learned shortcut. The report evaluates gradient disagreement as a pseudo-group discovery signal, compares PGDR with ERM, JTT, and GroupDRO, and analyzes how warmup quality and refresh affect the reliability of the signal.

The BibTeX must use `@misc{sharma2026pgdr}`, author `Nishant Sharma`, year `2026`, month `apr`, `howpublished = {Technical report}`, and the canonical landing-page URL.

- [ ] **Step 3: Add focused responsive styles**

Create `research/pgdr/styles.css` with the portfolio's dark palette, a centered `min(100% - 40px, 980px)` content shell, readable `70ch` prose, responsive title sizing, keyboard-visible focus outlines, stacked mobile actions, and print rules that remove navigation/actions while using black text on white.

- [ ] **Step 4: Verify the artifact and page contract**

Run:

```bash
cmp projects/pdfs/pgdr_final_report_nsharma.pdf research/pgdr/pgdr.pdf
test "$(wc -c < research/pgdr/pgdr.pdf)" -lt 5242880
rg -n 'citation_title|citation_author|citation_publication_date|citation_pdf_url|citation_language|rel="canonical"|github.com/hellonish/PGDR|Deep learning models can learn rules' research/pgdr/index.html
! rg -n 'noindex' research/pgdr/index.html
```

Expected: byte comparison succeeds, PDF is under 5 MiB, all required strings are found, and `noindex` is absent.

- [ ] **Step 5: Commit the canonical page**

```bash
git add research/pgdr/index.html research/pgdr/styles.css research/pgdr/pgdr.pdf
git commit -m "feat: add PGDR Scholar landing page"
```

### Task 2: Portfolio and Crawler Discovery

**Files:**
- Modify: `ui_kits/portfolio/Research.jsx`
- Create: `robots.txt`
- Create: `sitemap.xml`

**Interfaces:**
- Consumes: `/research/pgdr/` from Task 1
- Produces: a simple homepage link plus crawler directives and sitemap entries

- [ ] **Step 1: Point the PGDR Research action to the canonical page**

In the first `papers` entry in `ui_kits/portfolio/Research.jsx`, replace the direct PDF action with:

```jsx
{ label: 'paper page', href: '/research/pgdr/' },
```

Keep the existing blog action unchanged.

- [ ] **Step 2: Add unrestricted crawler access**

Create `robots.txt` with:

```text
User-agent: *
Allow: /

Sitemap: https://www.hellonish.dev/sitemap.xml
```

- [ ] **Step 3: Add the XML sitemap**

Create `sitemap.xml` as valid Sitemap Protocol XML containing `https://www.hellonish.dev/` and `https://www.hellonish.dev/research/pgdr/`, both with `<lastmod>2026-07-18</lastmod>`.

- [ ] **Step 4: Verify discovery files and links**

Run:

```bash
rg -n "paper page.*'/research/pgdr/'" ui_kits/portfolio/Research.jsx
rg -n 'Allow: /|https://www.hellonish.dev/sitemap.xml' robots.txt
rg -n 'https://www.hellonish.dev/$|https://www.hellonish.dev/research/pgdr/' sitemap.xml
```

Expected: every canonical discovery target is found exactly where intended.

- [ ] **Step 5: Commit discovery changes**

```bash
git add ui_kits/portfolio/Research.jsx robots.txt sitemap.xml
git commit -m "feat: expose PGDR page to crawlers"
```

### Task 3: End-to-End Verification

**Files:**
- Verify: `research/pgdr/index.html`
- Verify: `research/pgdr/styles.css`
- Verify: `research/pgdr/pgdr.pdf`
- Verify: `ui_kits/portfolio/Research.jsx`
- Verify: `robots.txt`
- Verify: `sitemap.xml`

**Interfaces:**
- Consumes: all Task 1 and Task 2 outputs
- Produces: evidence that all static assets resolve and the layout is usable

- [ ] **Step 1: Serve the repository locally**

Run `python3 -m http.server 4173` from the repository root.

Expected: server listens on `http://127.0.0.1:4173`.

- [ ] **Step 2: Verify HTTP routes**

Run:

```bash
curl -I http://127.0.0.1:4173/research/pgdr/
curl -I http://127.0.0.1:4173/research/pgdr/pgdr.pdf
curl -I http://127.0.0.1:4173/robots.txt
curl -I http://127.0.0.1:4173/sitemap.xml
```

Expected: all four requests return `HTTP/1.0 200 OK`.

- [ ] **Step 3: Inspect desktop and mobile rendering**

Open `/research/pgdr/` at approximately 1440×900 and 390×844. Confirm that the title does not clip, the abstract is readable, action links remain visible, code blocks wrap or scroll without widening the page, and keyboard focus is visible.

- [ ] **Step 4: Run final repository checks**

```bash
git diff --check
git status --short
```

Expected: no whitespace errors; only unrelated pre-existing `.DS_Store`, `.next/`, `node_modules/`, and `venv/` changes remain outside the completed commits.
