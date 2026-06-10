/* Portfolio UI kit — Contact footer. Night surface: a compact experience
   timeline, a closing headline, magnetic contact, and social links. */
function PortfolioContact() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { MagneticButton } = DS;

  const timeline = [
    ['2025 — now', 'ML Teaching Assistant', 'NYU Tandon · 400+ students'],
    ['Sep 2023 — Aug 2024', 'Lead Software Engineer', 'Ingelt Study Abroad · 500+ clients'],
    ['Jul 2022 — Aug 2023', 'Founding Engineer', 'Macverin Technologies · 1K+ DAU'],
  ];
  const socials = [
    ['ineedajob.pro', 'https://ineedajob.pro'],
    ['singularity ↗', 'https://singularity.hellonish.dev'],
    ['GitHub', 'https://github.com/hellonish'],
    ['LinkedIn', 'https://linkedin.com/in/nishantsh20/'],
    ['Résumé', 'https://raw.githubusercontent.com/hellonish/Portfolio-v2/main/sharma_nishant_portfolio.pdf'],
  ];

  return (
    <footer id="contact" data-theme="night" style={{ background: 'var(--night-900)', padding: 'clamp(56px,9vh,104px) clamp(20px,5vw,56px) 48px', borderTop: '1px solid var(--night-line)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* experience timeline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--teal-400)' }}>05</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--night-faint)' }}>Trajectory</span>
          <span style={{ flex: 1, height: 1, background: 'var(--night-line)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 1, background: 'var(--night-line)', border: '1px solid var(--night-line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'clamp(48px,8vh,90px)' }}>
          {timeline.map(([when, role, where]) => (
            <div key={role} style={{ background: 'var(--night-800)', padding: '22px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal-400)', marginBottom: 10 }}>{when}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: '#fff', marginBottom: 4 }}>{role}</div>
              <div style={{ font: 'var(--text-body)', fontSize: 13, color: 'var(--night-muted)' }}>{where}</div>
            </div>
          ))}
        </div>

        {/* closing CTA */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(34px,6vw,68px)', lineHeight: 1.02, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 32px', maxWidth: '16ch' }}>
          Let&rsquo;s build something that actually helps someone.
        </h2>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <MagneticButton href="mailto:hellonishantsh@gmail.com">hellonishantsh@gmail.com</MagneticButton>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {socials.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--night-muted)', textDecoration: 'none', borderBottom: '1px solid transparent', paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--teal-400)'; e.currentTarget.style.borderColor = 'var(--teal-400)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--night-muted)'; e.currentTarget.style.borderColor = 'transparent'; }}
              >{label}</a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'clamp(48px,8vh,90px)', paddingTop: 24, borderTop: '1px solid var(--night-line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-faint)' }}>
          <span>© 2026 Nishant Sharma</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Created with ❤️ and&nbsp;
            <svg width="11" height="11" viewBox="0 0 44 44" style={{ display:'inline-block', verticalAlign:'middle' }}>
              {Array.from({ length: 11 }).map((_, i) => {
                const a = (i/11)*Math.PI*2 - Math.PI/2;
                return <line key={i} x1={22 + Math.cos(a)*3.5} y1={22 + Math.sin(a)*3.5} x2={22 + Math.cos(a)*20} y2={22 + Math.sin(a)*20} stroke="rgba(217,119,87,0.7)" strokeWidth="3.2" strokeLinecap="round"/>;
              })}
            </svg>
            &nbsp;Claude &nbsp;·&nbsp; by Nishant &nbsp;·&nbsp; June 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { PortfolioContact });
