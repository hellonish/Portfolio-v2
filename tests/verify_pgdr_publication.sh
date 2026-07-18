#!/bin/sh

set -eu

page="research/pgdr/index.html"
paper="research/pgdr/pgdr.pdf"
source_paper="projects/pdfs/pgdr_final_report_nsharma.pdf"

test -f "$page"
test -f "$paper"
cmp "$source_paper" "$paper"
test "$(wc -c < "$paper")" -lt 5242880

grep -Fq '<meta name="citation_title" content="Persistent Gradient Disagreement Reweighting: Detecting Shortcut Biases Without Training Group Labels">' "$page"
grep -Fq '<meta name="citation_author" content="Nishant Sharma">' "$page"
grep -Fq '<meta name="citation_publication_date" content="2026/04/30">' "$page"
grep -Fq '<meta name="citation_pdf_url" content="https://www.hellonish.dev/research/pgdr/pgdr.pdf">' "$page"
grep -Fq '<meta name="citation_language" content="en">' "$page"
grep -Fq '<link rel="canonical" href="https://www.hellonish.dev/research/pgdr/">' "$page"
grep -Fq 'Deep learning models can learn rules that are predictive in the training distribution but misaligned with the intended concept.' "$page"
grep -Fq 'https://github.com/hellonish/PGDR' "$page"
grep -Fq '@misc{sharma2026pgdr' "$page"

if grep -Fiq 'noindex' "$page"; then
  echo "PGDR page must remain indexable" >&2
  exit 1
fi

grep -Fq "{ label: 'paper page', href: '/research/pgdr/' }" ui_kits/portfolio/Research.jsx
grep -Fq 'Allow: /' robots.txt
grep -Fq 'Sitemap: https://www.hellonish.dev/sitemap.xml' robots.txt
grep -Fq '<loc>https://www.hellonish.dev/</loc>' sitemap.xml
grep -Fq '<loc>https://www.hellonish.dev/research/pgdr/</loc>' sitemap.xml

echo "PGDR publication contract verified"
