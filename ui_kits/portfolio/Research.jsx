/* Portfolio UI kit — Research. 100vh interactive typographic ledger. */
function PortfolioResearch() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader, Button } = DS;
  const { CustomSelect } = window;

  const papers = [
    {
      title: 'PGDR: Persistent Gradient Disagreement Reweighting',
      meta: 'Advanced ML · NYU Tandon',
      period: 'Spring 2026',
      description: 'A gradient-level intervention for spurious-correlation mitigation in CNNs. Shortcut learning shows up as frequency-dominant gradient energy; PGDR persistently reweights conflicting gradients during backprop to mitigate bias.',
      metrics: [{ value: '+3.1pp', label: 'Worst-group acc' }, { value: '+2.5pp', label: 'Post-DFR gain' }],
      stack: ['PyTorch', 'ResNet-18', 'Waterbirds', 'GroupDRO', 'JTT', 'DFR'],
      links: [
        { label: 'paper page', href: '/research/pgdr/' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_PGDR' }
      ],
    },
    {
      title: 'SMOLSolver — Verifier-Guided Reasoning',
      meta: 'Team (5) · NYU Tandon',
      period: 'Sep – Dec 2025',
      description: 'Lightweight dual-model framework for step-level math reasoning verification. I built the Verifier end-to-end: TinyLLaMA fine-tuned on PRM800K via 2-phase LoRA for step-level correctness.',
      metrics: [{ value: '87.9%', label: 'Step accuracy' }, { value: '64.1%', label: 'Generator Pass@1' }],
      stack: ['QLoRA', 'TinyLLaMA', 'Phi-2', 'PRM800K', 'GSM8K'],
      links: [
        { label: 'read paper', href: '/projects/pdfs/smolsolver.pdf' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_SMOLSolver' },
        { label: 'view poster', href: '/projects/pdfs/smolsolver_poster.pdf' }
      ],
    },
    {
      title: 'Cross-Domain Robustness in Super-Resolution',
      meta: 'Team · NYU Tandon',
      period: 'Sep – Dec 2025',
      description: 'Benchmarked EDSR, SwinIR, and Stable Diffusion x4 across natural, scene-text, and astronomical datasets. Introduced the Cross-Domain Drop (CDD) metric; diffusion models exhibit catastrophic CDD on text.',
      metrics: [],
      stack: ['EDSR', 'SwinIR', 'Stable Diffusion', 'DIV2K', 'TextZoom'],
      links: [
        { label: 'read paper', href: '/projects/pdfs/atcv.pdf' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_CrossDomainSuperResolution' }
      ],
    },
    {
      title: 'Jailbreaking Deep Vision Models',
      meta: 'Team · NYU Tandon',
      period: 'May 2025',
      description: 'FGSM, I-FGSM, PGD, and patch attacks on ResNet-34 under a strict L∞ constraint. PGD dropped Top-1 from 76% to 0.2%; confirmed black-box transfer to DenseNet-121.',
      metrics: [],
      stack: ['PyTorch', 'ResNet-34', 'PGD', 'FGSM', 'DenseNet-121'],
      links: [
        { label: 'read paper', href: '/projects/pdfs/jailbreaking-deep-models.pdf' },
        { label: 'read blog', href: '/blog.html?post=PROJECT_SHOWCASE_JailbreakingDeepModels' }
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const activePaper = papers[activeIndex];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 860);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="research" className="snap-section" data-theme="night" style={{ 
      background: 'var(--night-900)', 
      display: 'flex', alignItems: 'center', 
      padding: '80px clamp(20px,5vw,56px) 20px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background Topographic Wireframe */}
      <svg style={{ position: 'absolute', bottom: '-10%', right: '0%', width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', transform: 'rotate(-2deg)' }} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">
        {Array.from({ length: 50 }).map((_, i) => {
          const d = `M -50,${i * 15} ` + Array.from({ length: 40 }).map((_, j) => {
            const x = j * 30 - 50;
            // Create a mathematical mountain landscape
            const mountain = Math.exp(-Math.pow(x - 600, 2) / 80000) * 150;
            const wave = Math.sin(x * 0.02 + i * 0.15) * 25 * Math.sin(i * 0.08);
            const y = i * 12 - mountain + wave + 250;
            return `L ${x},${y}`;
          }).join(' ');
          return <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />;
        })}
      </svg>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '4vh', whiteSpace: 'nowrap' }}>
          <SectionHeader index="04" kicker="Publications" title="Research" />
        </div>

        <div className="ledger-layout" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1.5fr)', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
          {/* Left Ledger */}
          {isMobile ? (
            <CustomSelect
              value={activeIndex}
              onChange={v => setActiveIndex(Number(v))}
              options={papers.map((p, i) => ({ value: i, label: p.title.split('—')[0].trim() }))}
            />
          ) : (
            <div className="ledger-list">
              {papers.map((p, i) => (
                <div key={i} onClick={() => setActiveIndex(i)} style={{
                  padding: '20px 24px', cursor: 'pointer',
                  borderLeft: `2px solid ${i === activeIndex ? 'var(--accent)' : 'transparent'}`,
                  background: i === activeIndex ? 'rgba(255,255,255,0.03)' : 'transparent',
                  transition: 'background 0.2s, border-color 0.2s'
                }}
                onMouseEnter={(e) => { if (i !== activeIndex) e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
                onMouseLeave={(e) => { if (i !== activeIndex) e.currentTarget.style.background = 'transparent'; }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: i === activeIndex ? '#fff' : 'var(--night-fg)', marginBottom: 6 }}>{p.title.split('—')[0].trim()}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-muted)' }}>{p.meta}</div>
                </div>
              ))}
            </div>
          )}

          {/* Right Details */}
          <div className="ledger-details">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>{activePaper.period}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 36px)', color: '#fff', margin: '0 0 16px 0', lineHeight: 1.1 }}>{activePaper.title}</h3>
            
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--night-fg)', maxWidth: 640, marginBottom: 20 }}>
              {activePaper.description}
            </p>
            
            {activePaper.metrics && activePaper.metrics.length > 0 && (
              <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                {activePaper.metrics.map(m => (
                  <div key={m.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>{m.value}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--night-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, marginTop: 'auto' }}>
              {activePaper.stack.map(s => (
                <span key={s} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                  border: '1px solid var(--border)', borderRadius: 2, color: 'var(--night-muted)',
                }}>{s}</span>
              ))}
            </div>

            {activePaper.links && activePaper.links.length > 0 && (
              <div style={{ display: 'flex', gap: 12, paddingBottom: 8 }}>
                {activePaper.links.map(l => (
                   <Button key={l.label} variant="outline" href={l.href}>{l.label}</Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { PortfolioResearch });
