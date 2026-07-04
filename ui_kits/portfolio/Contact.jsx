/* Portfolio UI kit — Contact footer. Night surface: a compact experience
   timeline, a closing headline, magnetic contact, and social links. */
function PortfolioContact() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { Button } = DS;

  const timeline = [
    ['2025 — now', 'ML Teaching Assistant', 'NYU Tandon · 400+ students'],
    ['Sep 2023 — Aug 2024', 'SWE Intern (Backend)', 'Ingelt Study Abroad · 1K+ students'],
    ['Jul 2022 — Aug 2023', 'SWE Intern', 'Macverin Technologies · 10+ clients'],
  ];
  const socials = [
    { type: 'DIR ', path: '/socials/github', href: 'https://github.com/hellonish' },
    { type: 'DIR ', path: '/socials/linkedin', href: 'https://linkedin.com/in/nishantsh20/' },
    { type: 'FILE', path: '/documents/resume.pdf', href: 'https://raw.githubusercontent.com/hellonish/Portfolio-v2/main/sharma_nishant_portfolio.pdf' },
    { type: 'LINK', path: '/projects/ineedajob.pro', href: 'https://ineedajob.pro' },
    { type: 'LINK', path: '/projects/singularity', href: 'https://singularity.hellonish.dev' },
  ];

  return (
    <footer id="contact" className="snap-section" data-theme="night" style={{ 
      background: 'var(--night-900)', 
      display: 'flex', flexDirection: 'column',
      padding: '0 clamp(20px,5vw,56px) 4vh' 
    }}>
      <div style={{ maxWidth: 1180, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '60px', flexWrap: 'wrap', position: 'relative' }}>
          
          {/* Background ASCII Monogram */}
          <div style={{ position: 'absolute', right: '0%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(30px, 4.5vw, 60px)', color: 'rgba(255,255,255,0.015)', pointerEvents: 'none', userSelect: 'none', zIndex: 0, whiteSpace: 'pre', lineHeight: 1.1, fontWeight: 700 }}>
{` _   _  _____ 
| \\ | |/ ____|
|  \\| | (___  
| . \` |\\___ \\ 
| |\\  |____) |
|_| \\_|_____/ `}
          </div>

          {/* Left CTA */}
          <div style={{ zIndex: 1, flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(34px,6vw,68px)', lineHeight: 1.02, letterSpacing: 0, color: '#fff', margin: '0 0 32px', maxWidth: '16ch' }}>
              Let&rsquo;s build something that actually helps someone.
            </h2>
            <Button variant="outline" href="mailto:hellonishantsh@gmail.com">hellonishantsh@gmail.com</Button>
          </div>

          {/* Right Data Table */}
          <div style={{ zIndex: 1, flex: '0 1 460px', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>System Directory</div>
            {socials.map(s => (
              <a key={s.path} href={s.href} target="_blank" rel="noreferrer" style={{ 
                display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', 
                background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border)', borderRadius: 4,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', padding: '2px 6px', background: 'rgba(7,163,161,0.1)', borderRadius: 2 }}>[{s.type}]</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#d8dee9', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.path}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--night-faint)' }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--night-line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-faint)' }}>
          <style>{`@keyframes term-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <span style={{ color: 'var(--teal-400)' }}>nishant@system:~/portfolio$</span>
            <span style={{ 
              display: 'inline-block', width: 6, height: 13, background: 'var(--night-muted)', 
              animation: 'term-blink 1s step-end infinite' 
            }} />
          </div>
          <span>© 2026 Nishant Sharma</span>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { PortfolioContact });
