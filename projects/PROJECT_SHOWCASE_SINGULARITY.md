Agentic Deep Search and Research Platform. With Multi-Agent Orchestration. Citation grounded research outputs, with less than 10% hallucination rate.

- BYOK Inference - Supporting Gemini, xAI, Deepseek
- Chat on Research Report
- Real-Time SSE based streaming
- Usage Emitter - Fire and Forget Analytics
- Sliding Window Rate Limiting
- JWT + Google OAuth
- ARQ workers with Orphan Job Recovery on worker startup
- CLI and GUI support
- Hosting Stack: Docker Containers architecture hosted at AWS for $7 effective
- NextJS + FastAPI
- PostgreSQL + Redis
- Caddy Reverse Proxy and Auto SSL

Agents Present in the workflow:

1. Planner Agents
    1. Plan Managers
    2. Plan Workers

Planner Worker Agents propose plans from 3 different perspectives, and provide to the Plan Manager. Then Plan Manager compares each component of the research plan taking best of the three worlds to create final research plan.

1. Research Agents 

Spawn N number of researcher agents with skill equipment algorithm proposed by Planner Manager from total available number of 18 Retrieval Skills and 18 Analysis skills triggering targeted query fanout per section with a later pass through source credibility gating algorithm.

1. Writer Agents and Publisher Agent

Spawn multiple Writer Agents and Publisher Agents equipping from 8 output skills to write the report via bottom-up traversal then passed through refine phase. 

---

## Skills

### Tier 1 — Retrieval (18 skills)

| Skill | Data Source |
| --- | --- |
| `web_search` | DuckDuckGo + Tavily |
| `academic_search` | Semantic Scholar + ArXiv |
| `pdf_deep_extract` | pdfplumber + PyMuPDF |
| `video_search` | YouTube transcript extraction |
| `code_search` | GitHub API |
| `dataset_search` | HuggingFace Hub |
| `clinical_search` | ClinicalTrials.gov |
| `legal_search` | CourtListener |
| `financial_search` | SEC EDGAR filings |
| `patent_search` | Patent databases |
| `gov_search` | Government portals |
| `news_archive` | News archive |
| `book_search` | Google Books API |
| `social_search` | Social media sources |
| `forum_search` | Forum / thread search |
| `standards_search` | ISO, IEEE, standards bodies |
| `multimedia_search` | Multimedia content |
| `data_extraction` | Structured data extraction |

### Tier 2 — Analysis (18 skills)

`causal_analysis` · `citation_graph` · `claim_verification` · `comparative_analysis` ·
`contradiction_detect` · `credibility_score` · `entity_extraction` · `fallback_router` ·
`gap_analysis` · `hypothesis_gen` · `meta_analysis` · `quality_check` ·
`sentiment_cluster` · `statistical_analysis` · `synthesis` · `timeline_construct` ·
`translation` · `trend_analysis`

### Tier 3 — Output (8 skills)

`annotation_gen` · `bibliography_gen` · `decision_matrix` · `exec_summary` ·
`explainer` · `knowledge_delta` · `report_generator` · `visualization_spec`

---

### Engineering Decisions

**Bottom-up Tree Traversal for Writer Agent -**  leaf sections are written first. Parents
receive their children's completed content as context and summarize real work, not
stubs. Coherence holds at every level of the tree.

**Cosine Similarity with Topic Cache** — Qdrant uses cosine distance on 384-dim
embeddings. Cross-run topic cache reuses chunks from prior runs at ≥ 0.92 similarity
within a 7-day TTL. Reduces redundant retrieval on related queries.

**SHA-256 Hashing** — two distinct uses: content integrity (`content_hash` on every
`ReportVersion`) and refresh token storage (raw tokens never at rest, only their hash).

**Producer-Consumer via Message Broker** - API enqueues to Redis (ARQ), worker
consumes. HTTP response is instant regardless of job complexity. Producer and consumer
scale independently.

**Pub/Sub for Real-Time Streaming** — worker publishes to `job:{id}:events` Redis
channel at every phase transition. SSE endpoint subscribes and forwards to the browser.
Worker and API are fully decoupled in lifecycle.

**Short-lived SSE Tokens** — `EventSource` can't send headers. Long-lived tokens in
query params leak into logs and browser history. `/sse-token` issues a 30-second
single-use JWT with `type=sse` validated independently.

**Token Family Rotation with Reuse Detection** — refresh tokens belong to a family.
On use, old token revoked, new one issued. Presenting a revoked token (replay after
theft) revokes the entire family and forces re-auth. No blocklist scan needed.

**Idempotency via Partial Unique Index** — PostgreSQL `WHERE idempotency_key IS NOT NULL`
partial unique index on `(user_id, idempotency_key)`. Duplicate job submissions within
24 hours return the existing job, not a new one.

**Immutable Versioning** — `ReportVersion` rows are append-only with monotonically
increasing `version_num`. Patches create new versions; nothing is mutated in place.
Free audit history, safe concurrent reads.

**Orphan Recovery** — workers crash mid-job (OOM, deploy restart, timeout). On startup,
`_recover_orphaned_jobs()` scans for stale `running`/`pending` jobs, marks them failed,
and publishes SSE errors. Without this, crashed jobs spin forever on the frontend.

**Fail-Open Rate Limiter** — Redis outage shouldn't 500 every API call. The limiter
catches connection errors and lets requests through with a logged warning. Degraded
rate limiting beats a full outage.

**Blob Storage Threshold** — reports under 500 KB stored inline in `content_inline`.
Larger reports offload to S3/R2/MinIO via a `LocalStorage`/`S3BlobStore` interface
selected by env var. Common case is fast (no external calls); edge cases handled
transparently.

**Layered Middleware** — `Auth → RateLimit → UsageEmitter → CORS`. Auth first so
unauthenticated requests are rejected before hitting the rate limiter. UsageEmitter
is fire-and-forget, never blocking the response path.

## 1. NextJS

- **Dashboard** — lists your past research reports
- **Report Viewer** — renders the final Markdown report with citations
- **Chat Panel** — per-report Q&A chat interface
- **Profile** — where users enter their own API keys (BYOK)

It connects to FastAPI over REST and **SSE (Server-Sent Events)** for real-time streaming of pipeline progress. Runs in its own Docker container (128 MB cap) as a standalone production build.

---

## 2. FastAPI

- Handles **JWT auth + Google OAuth** via `AuthMiddleware`
- Enforces **rate limits** via `RateLimitMiddleware`
- Fires **analytics** via `UsageEmitter`
- Exposes **31 REST + SSE endpoints**
- **Enqueues jobs** to ARQ (the worker queue) via `enqueue_job()`
- Does **not** run the research pipeline itself — it delegates to the worker

---

## 3. PostgreSQL

- **Users** — accounts, Google OAuth identities
- **Jobs** — research job state (`pending` → `running` → `done`/`failed`)
- **Reports** — final report content and metadata
- **BYOK keys** — Fernet-encrypted API keys per user/provider
- **Usage records** — analytics events

8 tables, 12 indexes, managed via **Alembic** migrations.

---

## 4. Redis

| Job | What's stored | Why |
| --- | --- | --- |
| **Rate limiting** | Sorted sets of request timestamps per user | Powers the sliding-window counter |
| **ARQ job queue broker** | Pending/active job queues | ARQ uses Redis as its message bus |

---

## 5. Docker

| Container | Memory Cap |
| --- | --- |
| Caddy | 64 MB |
| PostgreSQL | 256 MB |
| Redis | 128 MB |
| FastAPI | 256 MB |
| ARQ Worker | 1 GB |
| Next.js | 128 MB |

---

## 6. ARQ

1. FastAPI calls `enqueue_job()` → writes job to Redis
2. The ARQ worker **picks it up** and executes the full Phase B→A→C→D pipeline
3. Progress is streamed back via SSE events published to Redis

The worker has a **1 GB memory cap** because it holds the ONNX embedding model (~90 MB) and has headroom for concurrent LLM calls. It also runs `_recover_orphaned_jobs()` on startup (the orphan recovery algorithm from before).

---

## 7. Caddy (Reverse Proxy + AutoSSL)

- Routes `/api/*` → FastAPI
- Routes `/*` → Next.js
- **Auto-provisions and renews TLS certificates** from Let's Encrypt with zero config
- Absorbs SSL termination so neither FastAPI nor Next.js needs to handle HTTPS directly

## 8. Qdrant (Vector Database)

Singularity uses **Qdrant Cloud** (free tier) as a vector store. After retrieval, source text is chunked, embedded (via `fastembed` + ONNX), and upserted into a per-run Qdrant collection (`run_<id>`). The writing agents then do **semantic search** against this collection to pull relevant evidence for each report section. Without Qdrant, the RAG (Retrieval-Augmented Generation) loop has no memory.

## 9. fastembed / ONNX Runtime (Embedding)

Converts retrieved text chunks into 384-dim vectors for Qdrant. Runs the `all-MiniLM-L6-v2` model via ONNX instead of PyTorch — this is why the worker fits in 1 GB instead of OOM-ing (the previous PyTorch version needed ~1.4 GB alone).

## 10. LLM Router (`llm/router.py`)

A thin routing layer that dispatches LLM calls to the right provider client based on model ID prefix: `grok-*` → xAI, `deepseek-*` → DeepSeek, otherwise → Gemini. Every call uses the **user's own BYOK key**, so the platform pays $0 for inference.