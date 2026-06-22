/* Portfolio UI kit — Selected Work. Agentic systems featured first,
   other projects grid, then professional work experience. */
function PortfolioWork() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader, ProjectCard } = DS;

  const agenticSystems = [
    {
      featured: true,
      title: 'Singularity — AI Deep Research Platform',
      meta: 'Solo · ~25,500 LOC · shipped in 13 days',
      period: 'Mar 2026 – Apr 2026',
      description: 'A production multi-agent research platform that plans before it retrieves. Open-ended queries against a vector store produce semantically similar results, not relevant ones — the fix is structural: agents construct a full report plan first, and every query targets a planned section.',
      metrics: [
        { value: '44', label: 'Auto-reg skills' },
        { value: '18', label: 'Retrieval sources' },
        { value: '10', label: 'Models · BYOK' },
      ],
      stack: ['FastAPI', 'ARQ', 'LangGraph', 'Qdrant', 'fastembed/ONNX', 'Redis', 'Postgres 16', 'Next.js 16', 'AWS'],
      links: [{ label: 'open ↗', href: 'https://singularity.hellonish.dev' }],
    },
    {
      title: 'ineedajob.pro — AI Career Intelligence',
      meta: 'Solo',
      period: 'Jan 2026 – May 2026',
      description: 'Most resume-to-job matching tells you how similar two texts are, not whether you actually qualify. A 6-step wave-parallelized LLM pipeline streams each result over WebSocket as it completes — JobLens agent handles user profile matching, resume tailoring, and autonomous outreach in one click.',
      stack: ['FastAPI', 'Celery', 'WebSockets', 'Instructor', 'Pydantic', 'Gemini', 'DeepSeek', 'Next.js', 'AWS EC2'],
      links: [{ label: 'open ↗', href: 'https://ineedajob.pro' }],
    },
  ];

  const otherProjects = [
    {
      title: 'Finassistant — Multi-Agent Financial Research',
      meta: 'Solo',
      period: 'Nov 2025 – Dec 2025',
      description: 'Dual-mode LangGraph system: a fast Chat mode (2–4 calls) and a deliberate Think mode (Planner → Financial Agent → Publisher with self-correction). 18+ financial tools and a SEC-filing RAG pipeline with sub-200ms vector search.',
      stack: ['LangGraph', 'FastAPI', 'ChromaDB', 'MongoDB', 'Gemini', 'AWS'],
      links: [{ label: 'source ↗', href: 'https://github.com/hellonish/Finassistant' }],
    },
    {
      title: 'Snap2Caption — ML Systems for Captioning',
      meta: 'Team · MLOps',
      period: 'Mar 2025 – May 2025',
      description: 'Fine-tuned LLaVA-1.5/1.6 (7B) with LoRA on 100k urban images. Full IaC stack — Terraform, Ansible, Kubernetes via Kubespray — with a feedback-to-retraining loop and Prometheus/Grafana monitoring.',
      stack: ['LLaVA', 'LoRA', 'PyTorch', 'MLflow', 'Terraform', 'Kubernetes'],
      links: [{ label: 'source ↗', href: 'https://github.com/hellonish/Snap2Caption' }],
    },
  ];

  const experience = [
    {
      company: 'Macverin Technologies',
      url: 'https://macverin.io',
      role: 'Software Engineer Intern',
      period: 'Jul 2022 — Aug 2023',
      highlights: [
        'Developed custom authentication systems and integrated Auth0, Google APIs, Stripe, and Twilio in Node.js, Flask, and Django for 10+ clients.',
        'Created technical requirements in client meetings, designed SQL/NoSQL schemas and REST APIs for a cab-booking platform (40% business growth in 12 months), internal management tools, and CRMs/CMSs for solopreneurs and small businesses.',
        'Owned end-to-end API development, third-party integrations, and heavily integrated frontend components in Next.js and Angular for 6 clients.',
        'Introduced Jenkins CI/CD paired with Docker for high-CLV clients on GCP, AWS, and Hostinger, increasing in-house profits by 25% in the first year.',
      ],
      stack: ['Node.js', 'Flask', 'Django', 'Next.js', 'Angular', 'Auth0', 'Stripe', 'Twilio', 'Docker', 'Jenkins', 'GCP', 'AWS'],
    },
    {
      company: 'Ingelt Study Abroad',
      url: 'https://ingelt.com',
      role: 'Software Engineer Intern (Backend)',
      period: 'Sep 2023 — Aug 2024',
      highlights: [
        'Built a multi-tenant EdTech SaaS backend in FastAPI and Node.js serving 1,000+ active students across 50+ organizations, with Postgres row-level security and a membership-based RBAC model.',
        'Built a real-time chat and LLM-assist system over WebSockets with Redis pub/sub fan-out, integrating OpenAI API behind per-org token budgets and rate limits sustaining sub-200ms message delivery.',
        'Designed an append-only financial ledger and Razorpay-backed fee and payout pipeline with idempotent webhook processing, eliminating double-charge errors.',
        'Reduced p95 API latency from 1.2 s to under 600 ms by offloading video uploads to S3 presigned URLs and moving transcoding, notifications, and invoicing to async Celery workers.',
      ],
      stack: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Celery', 'OpenAI API', 'Razorpay', 'AWS S3'],
    },
  ];

  const SubLabel = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '36px 0 18px' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', padding: '4px 10px',
        border: '1px solid var(--accent)', borderRadius: 2,
        color: 'var(--accent)',
      }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  );

  return (
    <section id="work" data-theme="night" style={{ background: 'var(--night-800)', padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,56px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHeader index="02" kicker="Selected work" title="Projects & Experience" />

        {/* ── Agentic Systems ─────────────────────────────── */}
        <SubLabel>Agentic Systems</SubLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {agenticSystems.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>

        {/* ── Other Projects ──────────────────────────────── */}
        <SubLabel>Other Projects</SubLabel>
        <div className="other-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 18 }}>
          {otherProjects.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>

        {/* ── Work Experience ─────────────────────────────── */}
        <SubLabel>Work Experience</SubLabel>
        <div className="experience-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px,1fr))', gap: 18 }}>
          {experience.map(({ company, url, role, period, highlights, stack }) => (
            <div key={company} style={{
              padding: '24px 26px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text-strong)' }}>{company}</span>
                    <a href={url} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', textDecoration: 'none', opacity: 0.8 }}>↗</a>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>{role}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, paddingTop: 2 }}>{period}</span>
              </div>
              <ul style={{ margin: '0 0 14px', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {highlights.map((h, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{h}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {stack.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 7px',
                    border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text-muted)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PortfolioWork });
