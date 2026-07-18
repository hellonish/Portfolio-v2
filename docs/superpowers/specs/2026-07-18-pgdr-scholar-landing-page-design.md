# PGDR Scholar Landing Page Design

## Goal

Publish a crawlable, Google Scholar-compatible landing page for “Persistent Gradient Disagreement Reweighting: Detecting Shortcut Biases Without Training Group Labels” at `https://www.hellonish.dev/research/pgdr/` while preserving the existing PDF unchanged.

## Architecture

- Add a static, server-rendered HTML document at `research/pgdr/index.html`.
- Copy the existing paper to `research/pgdr/pgdr.pdf` so the abstract page and its full text share a URL directory.
- Keep the existing PDF at `projects/pdfs/pgdr_final_report_nsharma.pdf` to avoid breaking existing links.
- Point the PGDR entry in the homepage Research section to the new landing page.
- Add `sitemap.xml` and `robots.txt` at the site root for crawler discovery.

## Bibliographic Metadata

The landing page will include:

- Exact title: “Persistent Gradient Disagreement Reweighting: Detecting Shortcut Biases Without Training Group Labels”
- Author: Nishant Sharma
- Publication/version date: April 30, 2026, based on the existing PDF metadata
- Document type: Technical Report
- Language: English
- Canonical URL: `https://www.hellonish.dev/research/pgdr/`
- PDF URL: `https://www.hellonish.dev/research/pgdr/pgdr.pdf`

Highwire Press citation tags will provide the title, author, publication date, language, and PDF URL. The page will not imply that NYU published or endorsed the report.

## Visible Content

The page will use the portfolio's dark, terminal-inspired visual language while remaining restrained and publication-focused. It will contain:

- The exact paper title as the largest heading
- Nishant Sharma and “Technical Report — April 30, 2026” immediately below the title
- Links to download the PDF and open `https://github.com/hellonish/PGDR`
- The complete author-written abstract in the initial HTML, with no JavaScript or interaction required
- A recommended plain-text citation
- A copyable BibTeX entry
- A link back to the portfolio

The layout will use semantic HTML, visible focus states, sufficient color contrast, and responsive styles for desktop and mobile screens.

## Crawl and Failure Handling

- The page and PDF will not include `noindex` directives.
- `robots.txt` will allow all crawlers and identify the sitemap.
- `sitemap.xml` will include the homepage and PGDR landing page.
- All essential content will remain available if JavaScript is unavailable.
- The legacy PDF URL will remain intact if external pages already link to it.

## Verification

- Confirm the exact citation metadata and canonical/PDF URLs in the generated HTML.
- Confirm the full abstract is present in the initial HTML.
- Confirm the page contains no `noindex` directive.
- Confirm the canonical PDF is below Google Scholar's 5 MB file limit.
- Serve the site locally and verify the landing page, PDF, homepage link, robots file, and sitemap return successfully.
- Inspect the page at desktop and mobile widths for layout and readability.
- Confirm the public GitHub link resolves to the user-provided PGDR repository URL.
