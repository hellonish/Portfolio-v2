/* Portfolio UI kit — Work. Split-screen interactive ledger for Projects and Experience (100vh each). */
function PortfolioWork() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader, Button } = DS;
  const { CustomSelect } = window;

  const projects = [
    {
      title: 'ineedajob.pro — AI Career Intelligence',
      meta: 'SWE / AI Engineering',
      period: 'Jan 2026 – May 2026',
      description: 'Most resume-to-job matching tells you how similar two texts are, not whether you actually qualify. A 6-step wave-parallelized LLM pipeline streams each result over WebSocket as it completes.',
      stack: ['FastAPI', 'Celery', 'WebSockets', 'Instructor', 'Pydantic', 'Gemini', 'DeepSeek', 'Next.js', 'AWS EC2'],
      links: [{ label: 'open ↗', href: 'https://ineedajob.pro' }],
    },
    {
      title: 'Singularity — Multi-Agent Research Framework',
      meta: 'SWE / AI Engineering',
      period: 'Feb 2026 – Present',
      description: 'A production-grade multi-agent orchestration framework built on LangGraph. Introduces graph-based fault recovery and asynchronous event-driven LLM chains via Redis Streams.',
      stack: ['FastAPI', 'ARQ', 'LangGraph', 'Qdrant', 'fastembed/ONNX', 'Redis', 'Postgres 16', 'Next.js 16', 'AWS'],
      links: [
        { label: 'open ↗', href: 'https://singularity.hellonish.dev' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_SINGULARITY' }
      ],
    },
    {
      title: 'Snap2Caption — ML Systems for Captioning',
      meta: 'ML Engineering',
      period: 'Mar 2025 – May 2025',
      description: 'Fine-tuned LLaVA-1.5/1.6 (7B) with LoRA on 100k urban images. Full IaC stack — Terraform, Ansible, Kubernetes via Kubespray — with a feedback-to-retraining loop and Prometheus/Grafana monitoring.',
      stack: ['LLaVA', 'LoRA', 'PyTorch', 'MLflow', 'Terraform', 'Kubernetes'],
      links: [
        { label: 'source ↗', href: 'https://github.com/hellonish/Snap2Caption' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_Snap2Caption' }
      ],
    },
    {
      title: 'Parameter-Efficient Fine-Tuning of RoBERTa with LoRA',
      meta: 'ML Engineering',
      period: 'Fall 2025',
      description: 'Applied Low-Rank Adaptation (LoRA) to RoBERTa for text classification on AG News, drastically reducing trainable parameters while maintaining accuracy.',
      stack: ['RoBERTa', 'LoRA', 'PyTorch', 'HuggingFace', 'Transformers'],
      links: [
        { label: 'read paper', href: '/projects/pdfs/roberta_agnews.pdf' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_RoBERTa_AGNews_LoRA' }
      ],
    },
    {
      title: 'Improved ResNet for CIFAR-10 Image Classification',
      meta: 'ML Engineering',
      period: 'Fall 2025',
      description: 'Built an optimized ResNet architecture for CIFAR-10 classification, employing advanced data augmentation and learning rate scheduling to achieve high accuracy.',
      stack: ['ResNet', 'PyTorch', 'Torchvision', 'CIFAR-10'],
      links: [
        { label: 'read paper', href: '/projects/pdfs/cifar-10-resnet.pdf' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_CIFAR10_ResNet' }
      ],
    },
  ];

  const experience = [
    {
      company: 'NYU Tandon',
      url: '#',
      role: 'ML Teaching Assistant',
      period: '2025 — now',
      highlights: [
        'Teaching Assistant for Machine Learning courses serving 400+ students.',
        'Conducted office hours, graded assignments, and guided students through PyTorch, Scikit-learn, and Deep Learning concepts.',
      ],
      stack: ['PyTorch', 'Scikit-learn', 'Deep Learning', 'Teaching'],
    },
    {
      company: 'Ingelt Study Abroad',
      url: 'https://ingelt.com',
      role: 'Software Engineer (Backend)',
      period: 'Sep 2023 — Aug 2024',
      highlights: [
        'Built a multi-tenant EdTech SaaS backend in FastAPI and Node.js serving 1,000+ active students across 50+ organizations, with Postgres row-level security and a membership-based RBAC model.',
        'Built a real-time chat and LLM-assist system over WebSockets with Redis pub/sub fan-out, integrating OpenAI API behind per-org token budgets and rate limits sustaining sub-200ms message delivery.',
        'Designed an append-only financial ledger and Razorpay-backed fee and payout pipeline with idempotent webhook processing, eliminating double-charge errors.',
        'Reduced p95 API latency from 1.2 s to under 600 ms by offloading video uploads to S3 presigned URLs and moving transcoding, notifications, and invoicing to async Celery workers.',
      ],
      stack: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Celery', 'OpenAI API', 'Razorpay', 'AWS S3'],
    },
    {
      company: 'Macverin Technologies',
      url: 'https://macverin.io',
      role: 'Software Engineer',
      period: 'Jul 2022 — Aug 2023',
      highlights: [
        'Developed custom authentication systems and integrated Auth0, Google APIs, Stripe, and Twilio in Node.js, Flask, and Django for 10+ clients.',
        'Created technical requirements in client meetings, designed SQL/NoSQL schemas and REST APIs for a cab-booking platform (40% business growth in 12 months), internal management tools, and CRMs/CMSs for solopreneurs and small businesses.',
        'Owned end-to-end API development, third-party integrations, and heavily integrated frontend components in Next.js and Angular for 6 clients.',
        'Introduced Jenkins CI/CD paired with Docker for high-CLV clients on GCP, AWS, and Hostinger, increasing in-house profits by 25% in the first year.',
      ],
      stack: ['Node.js', 'Flask', 'Django', 'Next.js', 'Angular', 'Auth0', 'Stripe', 'Twilio', 'Docker', 'Jenkins', 'GCP', 'AWS'],
    }
  ];

  const [activeProjIdx, setActiveProjIdx] = React.useState(0);
  const activeProj = projects[activeProjIdx];

  const [activeExpIdx, setActiveExpIdx] = React.useState(0);
  const activeExp = experience[activeExpIdx];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 860);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* ── PROJECTS ───────────────────────────────────────── */}
      <section id="projects" className="snap-section" data-theme="night" style={{ 
        background: 'var(--night-800)', 
        display: 'flex', alignItems: 'center', 
        padding: '0 clamp(20px,5vw,56px)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background Git Diff */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) rotateX(50deg) rotateZ(-20deg)',
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(20px, 3.5vw, 40px)',
          color: 'rgba(255,255,255,0.015)', whiteSpace: 'pre',
          pointerEvents: 'none', userSelect: 'none', zIndex: 0, lineHeight: 1.15,
          fontWeight: 600, letterSpacing: '-0.02em', width: '200vw', textAlign: 'center'
        }}>
{`@@ -124,6 +124,11 @@
       }
     })();
   </script>
+
+  <!-- INITIALIZING MULTI-AGENT ORCHESTRATION -->
+  <div class="agent-overlay">
+    <div class="stream-sweep"></div>
+  </div>
 </body>
 </html>
 
@@ -348,4 +348,71 @@
   background-color: #fff;
   color: #000;
 }`}
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '4vh' }}>
            <SectionHeader index="02" kicker="Selected work" title="Projects" />
          </div>

          <div className="ledger-layout" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1.5fr)', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
            {/* Left Ledger */}
            {isMobile ? (
              <CustomSelect
                value={activeProjIdx}
                onChange={v => setActiveProjIdx(Number(v))}
                options={projects.map((p, i) => ({ value: i, label: p.title.split('—')[0].trim() }))}
              />
            ) : (
              <div className="ledger-list">
                {projects.map((p, i) => (
                  <div key={i} onClick={() => setActiveProjIdx(i)} style={{
                    padding: '20px 24px', cursor: 'pointer',
                    borderLeft: `2px solid ${i === activeProjIdx ? 'var(--accent)' : 'transparent'}`,
                    background: i === activeProjIdx ? 'rgba(255,255,255,0.03)' : 'transparent',
                    transition: 'background 0.2s, border-color 0.2s'
                  }}
                  onMouseEnter={(e) => { if (i !== activeProjIdx) e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
                  onMouseLeave={(e) => { if (i !== activeProjIdx) e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: i === activeProjIdx ? '#fff' : 'var(--night-fg)', marginBottom: 6 }}>{p.title.split('—')[0].trim()}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-muted)' }}>{p.meta}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Right Details */}
            <div className="ledger-details">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>{activeProj.period}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 36px)', color: '#fff', margin: '0 0 16px 0', lineHeight: 1.1 }}>{activeProj.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--night-fg)', maxWidth: 640, marginBottom: 20 }}>
                {activeProj.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                {activeProj.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                    border: '1px solid var(--border)', borderRadius: 2, color: 'var(--night-muted)',
                  }}>{s}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingBottom: 8 }}>
                {activeProj.links.map(l => (
                   <Button key={l.label} variant="outline" href={l.href}>{l.label}</Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK EXPERIENCE ─────────────────────────────────── */}
      <section id="work" className="snap-section" data-theme="night" style={{ 
        background: 'var(--night-900)', 
        display: 'flex', alignItems: 'center', 
        padding: '0 clamp(20px,5vw,56px)' 
      }}>
        <div style={{ maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '4vh' }}>
            <SectionHeader index="03" kicker="Trajectory" title="Work Experience" />
          </div>

          <div className="ledger-layout" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1.5fr)', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
            {/* Left Ledger */}
            {isMobile ? (
              <CustomSelect
                value={activeExpIdx}
                onChange={v => setActiveExpIdx(Number(v))}
                options={experience.map((e, i) => ({ value: i, label: e.company }))}
              />
            ) : (
              <div className="ledger-list">
                {experience.map((e, i) => (
                  <div key={i} onClick={() => setActiveExpIdx(i)} style={{
                    padding: '20px 24px', cursor: 'pointer',
                    borderLeft: `2px solid ${i === activeExpIdx ? 'var(--accent)' : 'transparent'}`,
                    background: i === activeExpIdx ? 'rgba(255,255,255,0.03)' : 'transparent',
                    transition: 'background 0.2s, border-color 0.2s'
                  }}
                  onMouseEnter={(e) => { if (i !== activeExpIdx) e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
                  onMouseLeave={(e) => { if (i !== activeExpIdx) e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: i === activeExpIdx ? '#fff' : 'var(--night-fg)', marginBottom: 6 }}>{e.company}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-muted)' }}>{e.period}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Right Details */}
            <div className="ledger-details">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 32px)', color: '#fff', margin: '0 0 4px 0', lineHeight: 1.1 }}>{activeExp.role}</h3>
                  <a href={activeExp.url} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>{activeExp.company} ↗</a>
                </div>
              </div>
              
              <ul style={{ margin: '0 0 20px 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeExp.highlights.map((h, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--night-fg)', lineHeight: 1.5 }}>{h}</li>
                ))}
              </ul>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingBottom: 8 }}>
                {activeExp.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                    border: '1px solid var(--border)', borderRadius: 2, color: 'var(--night-muted)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { PortfolioWork });
