/* Portfolio UI kit — About. Dark section with editorial lead,
   career timeline, photo, and infrastructure metrics. */
function PortfolioAbout() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader, Button } = DS;

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 860);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const timeline = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px 10px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 36 }}>
       <span style={{ border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 4, color: 'var(--text-muted)' }}>Software Engineer</span>
       <span style={{ color: 'var(--accent)', opacity: 0.6 }}>❯</span>
       <span style={{ border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 4, color: 'var(--text-muted)' }}>Backend Software Engineer</span>
       <span style={{ color: 'var(--accent)' }}>❯</span>
       <span style={{ border: '1px solid var(--accent)', background: 'rgba(191,97,106,0.15)', color: 'var(--accent)', padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>AI Engineering + ML Research</span>
    </div>
  );

  const whatIStartedAs = (
    <div style={{ marginBottom: 28, paddingLeft: 16, borderLeft: '1px solid var(--border)' }}>
       <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-strong)', marginBottom: 12 }}>What I started as:</h3>
       <p style={{ font: 'var(--text-body)', color: 'var(--text-muted)' }}>
          My foundation is in shipping scalable, data-intensive software. From high-throughput EdTech SaaS platforms to AI-driven internal CRMs, I have architected and deployed 10+ production-grade products for small-to-medium businesses.
       </p>
    </div>
  );

  const whatIDoNow = (
    <div style={{ marginBottom: 32, paddingLeft: 16, borderLeft: '1px solid var(--accent)' }}>
       <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-strong)', marginBottom: 12 }}>What I do now:</h3>
       <div style={{ font: 'var(--text-body)', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 12 }}>
         <div style={{ display: 'flex', gap: 10 }}>
           <span style={{ color: 'var(--accent)', marginTop: 2 }}>—</span>
           <span><strong>Applied ML Research:</strong> Exploring the frontiers of Language Modeling, Agentic Reinforcement Learning, highly reliable RAG architectures, and complex Multi-Agent systems.</span>
         </div>
         <div style={{ display: 'flex', gap: 10 }}>
           <span style={{ color: 'var(--accent)', marginTop: 2 }}>—</span>
           <span><strong>Production AI Engineering:</strong> Translating bleeding-edge research into fault-tolerant, scalable AI platforms and autonomous agentic workflows designed to survive the real world.</span>
         </div>
       </div>
    </div>
  );

  const buttons = (
    <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
      <Button variant="primary" href="https://raw.githubusercontent.com/hellonish/Portfolio-v2/main/sharma_nishant_portfolio.pdf">Resume</Button>
      <Button variant="outline" href="https://linkedin.com/in/nishantsh20/">LinkedIn</Button>
    </div>
  );

  const photo = (
    <div className="about-photo" style={{
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      border: 'none',
      aspectRatio: '1 / 1', background: 'transparent',
    }}>
      <img src="avatar.png" alt="Nishant Sharma Avatar"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }} />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <section id="about" className="snap-section" data-theme="night" style={{ 
          background: 'var(--night-900)', display: 'flex', alignItems: 'center', 
          padding: '0 clamp(20px,5vw,56px)', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SectionHeader index="01" kicker="Profile" title="About" />
            <div style={{ marginTop: 40 }}>
              {timeline}
              {whatIStartedAs}
              {buttons}
            </div>
          </div>
        </section>
        
        <section className="snap-section" data-theme="night" style={{ 
          background: 'var(--night-900)', display: 'flex', alignItems: 'center', 
          padding: '0 clamp(20px,5vw,56px)', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%',
            backgroundImage: 'url("./manhattan.jpg")',
            backgroundSize: 'contain', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat',
            mixBlendMode: 'screen', opacity: 0.1, pointerEvents: 'none', zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
            {whatIDoNow}
            {photo}
          </div>
        </section>
      </>
    );
  }

  return (
    <section id="about" className="snap-section" data-theme="night" style={{ 
      background: 'var(--night-900)', 
      display: 'flex', alignItems: 'center', 
      padding: '0 clamp(20px,5vw,56px)',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%',
        backgroundImage: 'url("./manhattan.jpg")',
        backgroundSize: 'contain', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat',
        mixBlendMode: 'screen', opacity: 0.1, pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, width: '100%', margin: '0 auto', maxHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <SectionHeader index="01" kicker="Profile" title="About" />

        <div className="about-lead-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 'clamp(28px,5vw,64px)', marginTop: 40, alignItems: 'start' }}>
          <div>
            {timeline}
            {whatIStartedAs}
            {whatIDoNow}
            {buttons}
          </div>
          {photo}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { PortfolioAbout });
