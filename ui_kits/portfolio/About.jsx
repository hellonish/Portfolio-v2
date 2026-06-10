/* Portfolio UI kit — About. Dark section with editorial lead,
   three capability pillars, photo, and infrastructure metrics. */
function PortfolioAbout() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader, MetricStat, ArchitectureFlow, Button } = DS;

  const pillars = [
    {
      n: '01',
      title: 'Agentic Orchestration',
      body: 'Built ineedajob.pro (multi-model open-source platform) and Singularity (solo-built multi-agent research platform on AWS for $26/mo). Specialist in stateful graphs and plan-before-retrieve orchestration.',
      tags: ['LangGraph', 'LangChain', 'FastAPI', 'Qdrant', 'Redis'],
    },
    {
      n: '02',
      title: 'Production Engineering',
      body: 'Solving hard distributed system bottlenecks — from orphan job recovery on OOM-killed background workers to custom group-label-free reweighting for robust ML models.',
      tags: ['ARQ', 'Celery', 'PostgreSQL', 'AWS EC2', 'Docker'],
    },
    {
      n: '03',
      title: 'Founder Mindset',
      body: 'Two-time founder (Macverin Tech, Wort.AI) wrapping up an M.S. in Computer Engineering at NYU Tandon. Bias toward shipping things real people can trust and act on.',
      tags: ['2× Founder', 'NYU Tandon', 'M.S. CompEng', '\'26'],
    },
  ];

  const Pillar = ({ n, title, body, tags }) => {
    const [hov, setHov] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: '28px 26px 24px',
          border: `1px solid ${hov ? 'rgba(52,184,112,0.28)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-lg)',
          background: hov ? 'rgba(52,184,112,0.03)' : 'var(--surface)',
          transition: 'border-color 0.22s, background 0.22s',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(52,184,112,0.7)',
          }}>{n}</span>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
            style={{ opacity: hov ? 1 : 0, transition: 'opacity 0.18s' }}>
            <path d="M1 8L8 1M8 1H2M8 1V7" stroke="rgba(52,184,112,0.8)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
          color: 'var(--text-strong)', letterSpacing: '-0.02em', margin: '0 0 10px',
        }}>{title}</h3>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.7,
          color: 'var(--text-muted)', margin: '0 0 18px', flex: 1,
        }}>{body}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
              border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text-muted)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="about" data-theme="night" style={{ background: 'var(--night-900)', padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,56px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHeader index="01" kicker="Profile" title="About" />

        {/* lead + photo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 'clamp(28px,5vw,64px)', marginTop: 40, alignItems: 'start' }}>
          <div>
            <p style={{ font: 'var(--text-lead)', color: 'var(--text)', marginBottom: 20, lineHeight: 1.55 }}>
              I build agentic AI frameworks and async backend infrastructure designed to
              survive real-world data and server limits. No demo-ware — just systems
              built for people to actually trust and act on.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
              <Button variant="primary" href="https://raw.githubusercontent.com/hellonish/Portfolio-v2/main/sharma_nishant_portfolio.pdf">Résumé</Button>
              <Button variant="outline" href="https://linkedin.com/in/nishantsh20/">LinkedIn</Button>
            </div>
          </div>

          <div style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            border: '1px solid var(--border)',
            aspectRatio: '1 / 1', background: 'var(--surface)',
          }}>
            <img src="profile.png" alt="Nishant Sharma"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.12) contrast(1.02)' }} />
          </div>
        </div>

        {/* capability pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 'clamp(32px,5vh,56px)' }}>
          {pillars.map(p => <Pillar key={p.n} {...p} />)}
        </div>

        {/* infrastructure bar */}
        <div style={{
          marginTop: 20, padding: 'clamp(20px,3vw,32px) clamp(20px,3vw,36px)',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(52,184,112,0.6)', marginBottom: 20 }}>
            // Running infrastructure — not a slide deck
          </div>
          <ArchitectureFlow />
          <div style={{ display: 'flex', gap: 'clamp(24px,5vw,72px)', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: 24, marginTop: 28 }}>
            <MetricStat value="10K" label="Requests / day" accent />
            <MetricStat value="500" label="Concurrent users" />
            <MetricStat value="99.9%" label="Uptime" />
            <MetricStat value="44" label="Agent skills · Singularity" />
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { PortfolioAbout });
