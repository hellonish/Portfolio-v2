# ineedajob.pro — AI Job Application Intelligence Platform

With structured LLM pipelines, BYOK inference, real-time JobLens analysis, resume-grounded tailoring, company research, reachout discovery, cover letters, application tracking, and a Chrome extension.

- **BYOK Inference** across Anthropic, OpenAI, Gemini, xAI/Grok, and DeepSeek
- **JobLens Pipeline**: profile synthesis, JD breakdown, company intel, match scoring, resume actions, and reachout discovery
- **Typed Structured Outputs** everywhere via Pydantic response models
- **Multi-Document Profile Ingestion** from PDF, DOCX, TXT, and local storage/Supabase storage backends
- **Resume Parsing** with long-form section extraction, link capture, SHA-256 file identity, and deterministic deduplication
- **Match Scoring** with evidence, hard-constraint checks, gap analysis, and match-band summaries
- **Resume Action Generation** against the user's actual uploaded resume text
- **Cover Letter Engine** with Regular, Storyline, Disruptive, Auto, and Custom modes
- **Company Intelligence** from official websites and public pages, with SSRF-safe fetching
- **Reachout Discovery** from LinkedIn-targeted public search, alumni queries, and deterministic result gating
- **Application Tracker** with dashboard, Kanban board, notes, statuses, archived jobs, and per-job detail views
- **Hopper Chrome Extension** for ATS/job-site detection, job capture, dashboard sync, and resume-based form filling
- **Usage Emitter** for per-task token accounting and raw provider cost visibility
- **Sliding-Window API Rate Limiting** with automatic temporary IP blocking
- **Local-First Development Branch** with a single dev user and SQLite; production path documented for Supabase/Postgres, Google OAuth, and Nginx/TLS
- **Stack**: Next.js + FastAPI + SQLAlchemy + Python AI engine

---

## Modules Present In The Workflow

### 1. Profile Intelligence Modules

1. **Document Ingestor**
    - Reads PDF, DOCX, and TXT profile files.
    - Captures visible text, embedded PDF links, DOCX relationships, URLs, and email addresses.
    - Computes SHA-256 hashes and marks duplicate uploaded content.
2. **Profile Extractor**
    - Runs broad structured extraction into normalized profile components.
    - Runs a focused long-form extraction pass for projects, experience, publications, certifications, honors, volunteer work, and recommendations.
    - Merges long-form variants so rich LinkedIn/resume details are not lost.
3. **Unified Profile Builder**
    - Merges multiple resumes, LinkedIn exports, and supporting documents into one master profile.
    - Accepts global user context plus per-file context.
    - Applies a deterministic dedup safety net after the LLM merge so duplicate companies, schools, skills, and dynamic sections collapse reliably.

### 2. JobLens Analysis Modules

1. **Job Description Breakdown**
    - Converts raw JD text into metadata, role classification, primary skills, secondary skills, responsibilities, constraints, keywords, seniority, work mode, and employment type.
    - Caches breakdowns by MD5 hash of the JD text to avoid re-running identical analyses.
2. **Company Intelligence**
    - Resolves company websites from direct input or search.
    - Fetches homepage plus useful pages such as about, careers, team, culture, and product pages.
    - Extracts structured company context through an LLM and stores a slimmed result for the UI.
3. **Match Analysis**
    - Scores the unified profile against the normalized JD.
    - Produces a total score, match band, strongest matches, biggest gaps, evidence, warnings, and hard-constraint summary.
    - Keeps scoring separate from resume rewriting so the recommendation step is grounded in prior evidence.
4. **Resume Actions**
    - Extracts text from every uploaded file tagged as `resume`.
    - Lets the model choose the best source resume when multiple candidates exist.
    - Returns targeted Add / Update / Remove actions and attaches the selected resume text so the UI can render precise mappings.
5. **Reachout Discovery**
    - Builds a query plan for high-signal contacts.
    - Adds deterministic alumni queries from the user's schools and the job location.
    - Runs public search providers in parallel, pre-gates for LinkedIn `/in/` profiles, validates candidates with an LLM, and reconciles every accepted candidate back to a real search result.

### 3. Writing Modules

1. **JD Tone Analyzer**
    - Classifies the job posting tone and recommends a cover-letter style.
2. **Prompt Enhancer**
    - Turns rough custom user instructions into a stricter generation prompt.
3. **Cover Letter Writer**
    - Produces editable structured letters with greeting, body paragraphs, closing, sign-off, and full formatted text.
    - Can include company news or company intelligence context.

---

## JobLens Runtime Flow

1. User uploads profile documents.
2. The API stores the file immediately, then parses it in the background.
3. User pastes a job description or captures a job through Hopper.
4. FastAPI creates a `Job` plus a `JobLensSession`.
5. Wave 1 runs profile synthesis and JD breakdown concurrently.
6. Wave 2 runs company intel, match scoring, and reachout discovery concurrently.
7. Wave 3 starts resume actions as soon as match scoring completes.
8. Each step persists into its own `joblens_sessions` JSON column.
9. Per-step events stream to the frontend through the WebSocket event manager.
10. Failed downstream steps can be retried without re-running the whole analysis.

---

## Engineering Decisions

**Central Inference Registry** - every LLM call flows through `engine/inference.py`. Prompt builders, response models, temperatures, token budgets, and step names are visible in one place instead of scattered across route handlers.

**Provider Adapter Layer** - provider-specific behavior lives in `engine/providers.py`. xAI uses Instructor JSON mode, DeepSeek uses plain OpenAI-compatible JSON mode with manual schema injection to avoid Instructor retry loops, and OpenAI/Anthropic/Gemini each have their own client wrapper.

**BYOK Resolution Per Task Group** - users store encrypted keys for Anthropic, OpenAI, Gemini, xAI, or DeepSeek. `engine/model_registry.py` maps internal tasks to user-facing groups: Cover Letter, JobLens Job Analysis, and Profile Management. If the user does not pick a model, the system resolves a recommended provider based on task tier.

**Fernet-Encrypted API Keys** - user provider keys are stored as Fernet ciphertext with only `key_last4` displayed. Keys are decrypted only at inference time. Provider-key prefix checks catch obvious cross-provider paste mistakes before saving.

**Live Key Verification Without Inference** - the LLM settings router verifies keys through provider list-models endpoints where possible. That confirms authentication without spending tokens.

**Usage Collector Instead Of Credit Billing** - each provider client records token usage and per-step latency into a `UsageCollector`. The billing gateway writes `UsageEvent` rows with raw provider cost and zero platform credits, matching the BYOK model.

**Structured Outputs Everywhere** - profile parsing, JD breakdown, company intel, match scoring, resume actions, reachout planning, candidate validation, tone analysis, and cover-letter generation all return Pydantic models. The UI receives predictable shapes instead of free-form prose.

**Two-Phase Profile Extraction** - the profile pipeline does broad extraction first, then a long-form pass for sections that are easy to truncate or flatten. This preserves projects, publications, certifications, honors, volunteer work, and recommendation-style content.

**Deterministic Dedup Safety Net** - after LLM profile unification, deterministic normalization collapses duplicate companies, roles, schools, skills, and dynamic sections. The model can write the merge, but deterministic code enforces entity hygiene.

**Parallel Pipeline Waves** - the job analysis pipeline avoids a single long serial chain. Profile and JD parsing run together; company intel, match scoring, and reachout run together; resume actions begin immediately after match scoring rather than waiting for reachout.

**Step-Level Persistence** - `JobLensSession` stores profile snapshot, JD breakdown, company intel, match analysis, resume actions, and reachout in separate columns. The UI can render partial progress, and retry logic can re-run only failed modules.

**JD Hash Cache** - job descriptions are hashed with MD5 and previously parsed JD breakdowns are reused for the same user. This saves a full LLM call when users re-run or duplicate a posting.

**Company Cache With TTLs** - company intel is cached by normalized company/domain for 14 days, reachout is cached by company plus target-role hash for 7 days, and search-result cache entries live for 3 days.

**Slimmed Storage Payloads** - fetched company pages include raw text, headings, and links during extraction, but the stored/transmitted company-intel payload strips heavyweight page content. The frontend keeps source counts and summaries without bloating DB rows or responses.

**SSRF-Safe Fetching** - server-side company fetching uses `safe_get()`, which allows only HTTP/HTTPS, rejects private/loopback/link-local/reserved/multicast/unspecified DNS results, disables automatic redirects, and re-validates up to three redirect hops.

**Reachout Reconciliation Gate** - the LLM cannot invent final contact URLs. Accepted reachout candidates must reconcile to a deterministic pre-gated search result by source ID or canonical LinkedIn profile URL.

**Search Provider Fallback Chain** - reachout search tries configured providers in order: `ddgs`, DuckDuckGo HTML, then Google Programmable Search when configured. If automated search is blocked, the result includes LinkedIn fallback search URLs.

**Resume Actions Use Real Resume Text** - resume tailoring is not generated only from the unified profile. The backend re-downloads the tagged resume files, extracts plain text, passes actual resume candidates to the model, and attaches the selected resume text for UI mapping.

**Magic-Byte File Validation** - profile uploads validate extension plus leading file signatures for PDF, DOC, and DOCX. HTML uploads are explicitly blocked at the API boundary.

**Local Schema Upgrades For SQLite** - local development uses SQLite with WAL mode and lightweight `ALTER TABLE` upgrades for columns added after the database was created. This keeps self-hosted/dev setups from breaking on old local DB files.

**Fail-Fast Security Config** - API startup requires a strong `APP_ENCRYPTION_KEY` and refuses wildcard CORS. Security headers are added to every response.

**Rate Limit Auto-Blocking** - SlowAPI provides global per-IP limits, route-specific burst limits, and repeated 429 violations trigger a temporary in-process IP block. The limiter trusts Nginx-set `X-Real-IP` instead of attacker-controlled forwarded headers.

**Global Frontend WebSocket Subscriber** - the Next.js app opens one WebSocket, sends heartbeat pings, reconnects with exponential backoff, and routes JobLens events to page-level subscribers by session ID.

**Local-First Auth Boundary** - this checked-out `main` branch intentionally creates a single local `dev@local` user and skips login for development. The README documents the production branch separately for Google OAuth and hosted usage.

**Chrome Extension Two-Phase Capture** - Hopper captures job data on listing pages before the user clicks Apply, then carries that pending application data into ATS forms where the original JD may no longer be visible.

**ATS Selector Library** - the extension has site-specific selectors for Greenhouse, Lever, Workday, Ashby, iCIMS, Taleo, SmartRecruiters, BambooHR, LinkedIn, Indeed, Glassdoor, Jobvite, Google Careers, and Apple Jobs.

**Resume JSON Autofill** - the extension can load parsed resume files from the API, extract contact/profile fields from the normalized JSON, and fill matching fields on supported application forms.

---

## 1. Next.js Frontend

- Dashboard with active jobs, processing strip, stats, archived jobs, and Kanban board
- Jobs table/list and per-job detail page
- Per-job JobLens timeline with profile, JD, company intel, match analysis, resume actions, and reachout modules
- Retry controls for failed pipeline steps
- Profile page for document upload, file management, unified profile building, and additional context
- Cover-letter workspace with generation, tone selection, editing, download/share flows, and history
- Settings page for profile, theme, AI provider keys, model selection, and usage history
- Local cache helpers for profile and pipeline data
- Zustand store for theme, filters, current user, and upload queue

**Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Zustand, Framer Motion, Tiptap, jsPDF, React Markdown.

---

## 2. FastAPI API

- **Routers**: auth, jobs, profile, cover letters, LLM settings, analytics, news, and WebSocket
- **SQLAlchemy Models**: users, jobs, resume history, cover letters, user profiles, profile files, JobLens sessions, company cache, usage events, LLM keys, analytics events, page hits, and LLM config
- **BackgroundTasks**: for profile parsing and long-running JobLens analysis
- **SlowAPI**: rate limiting with global and route-level limits
- **Security**: CORS allowlist, security headers, and fail-fast secret validation
- **Auth**: Local dev auth through a single auto-created user
- **Storage**: abstraction for local filesystem or Supabase Storage

---

## 3. Python AI Engine

| Module | Responsibility |
| --- | --- |
| `engine/profile` | File ingestion, profile extraction, long-form parsing, and unified profile merging |
| `engine/joblens/job_description` | Typed JD breakdown |
| `engine/joblens/company_intel` | Official-site discovery, SSRF-safe fetching, and company summary extraction |
| `engine/joblens/job_match` | Match scoring, evidence, gap analysis, and resume action models |
| `engine/joblens/reachout` | Query planning, public search, LinkedIn gating, candidate validation, and fallback URLs |
| `engine/cover_letter` | Tone analysis, prompt enhancement, and letter writing |
| `engine/providers.py` | LLM provider adapters |
| `engine/inference.py` | Central call registry for every structured LLM step |
| `engine/usage.py` | Token and cost accounting |

---

## 4. Database

Local development defaults to SQLite. Production is documented for PostgreSQL/Supabase.

| Table | Purpose |
| --- | --- |
| `users` | Account/user records |
| `jobs` | Tracked applications and durable summary fields |
| `joblens_sessions` | Per-step AI outputs and pipeline progress |
| `profile_files` | Uploaded resume/LinkedIn/other files |
| `user_profiles` | Legacy profile fields, unified profile, context, build status |
| `cover_letters` | Generated and edited cover letters |
| `resume_history` | Resume versions tied to jobs |
| `company_cache` | TTL cache for company intel, reachout, and search results |
| `user_llm_keys` | Encrypted BYOK provider keys |
| `user_llm_config` | Saved model selections by task group |
| `usage_events` | LLM token/cost records |
| `analytics_events` | Product events |
| `page_hits` | Page-view analytics |

---

## 5. Real-Time Layer

The backend emits JobLens events for:

- `joblens_step_started`
- `joblens_step_complete`
- `joblens_step_failed`
- `joblens_pipeline_complete`
- `joblens_pipeline_failed`

The frontend has a single global WebSocket hook that keeps one connection alive with heartbeat pings, reconnects with exponential backoff, ignores heartbeat `pong` messages, and dispatches JobLens events to subscribers keyed by `session_id`.

---

## 6. Hopper Chrome Extension

Hopper is a Manifest V3 extension that extends the web app into the job application flow.

- Detects supported ATS/job pages
- Extracts title, company, location, description, URL, ATS type, confidence, and debug metadata
- Captures listing data before navigating into application forms
- Saves jobs through either full JobLens analysis or quick tracking
- Syncs existing jobs from `/api/jobs`
- Updates application status and deletes jobs through the API
- Lists uploaded resumes from `/api/profile/files?type=resume`
- Opens signed URLs for uploaded resume files
- Fills application forms from parsed resume JSON
- Exports application data as CSV
- Provides settings, onboarding, popup UI, floating page widget, and notification support

---

## 7. Deployment Stack

- `Dockerfile` builds the FastAPI API container on Python 3.11 slim
- `docker-compose.yml` runs `wand-api` behind Nginx
- Nginx terminates TLS for `wandapi.ineedajob.pro`
- Nginx sets `X-Real-IP`, which the limiter uses as the trusted client IP
- Local backend runs with Uvicorn
- Local frontend runs with Next.js dev server
- Local storage writes under the repository root; production storage uses Supabase buckets

---

## 8. Test Coverage

The project includes 16 first-party Python test files across:

- API integration and route behavior
- Job description breakdown
- JobLens no-LLM and with-LLM flows
- Pipeline regression tests
- Company intelligence
- Reachout discovery and provider fallback behavior
- Job matching and resume selection
- Profile ingestion, extraction, service behavior, and fixture outputs
- Cover-letter generation
