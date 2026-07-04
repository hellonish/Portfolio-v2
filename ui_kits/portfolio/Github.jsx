/* Portfolio UI kit — Github. Displays open source stats and contribution graph. */
function PortfolioGithub() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader } = DS;

  // Generate a realistic-looking random contribution heatmap
  const weeks = 52;
  const daysPerWeek = 7;
  const heatmapData = React.useMemo(() => {
    const data = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Higher probability of commits during weekdays (d=1 to 5)
        const isWeekend = d === 0 || d === 6;
        const baseProb = isWeekend ? 0.3 : 0.7;
        
        let level = 0;
        if (Math.random() < baseProb) {
          const intensity = Math.random();
          if (intensity > 0.8) level = 4;
          else if (intensity > 0.5) level = 3;
          else if (intensity > 0.2) level = 2;
          else level = 1;
        }
        week.push(level);
      }
      data.push(week);
    }
    return data;
  }, []);

  const getColor = (level) => {
    switch (level) {
      case 4: return '#4ade80';
      case 3: return 'rgba(74, 222, 128, 0.7)';
      case 2: return 'rgba(74, 222, 128, 0.4)';
      case 1: return 'rgba(74, 222, 128, 0.2)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  const stats = [
    { label: 'Last shipped', value: 'Jul 2026' },
    { label: 'Active repos', value: '38' },
    { label: 'Public systems', value: '14' },
    { label: 'Top languages', value: 'Python / TypeScript / Go' },
    { label: 'OSS signal', value: '342 stars · 54 forks' }
  ];

  return (
    <section id="github" className="snap-section" data-theme="night" style={{ 
      background: 'var(--night-900)', 
      display: 'flex', alignItems: 'center', 
      padding: '0 clamp(20px,5vw,56px)' 
    }}>
      <div style={{ maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '4vh' }}>
          <SectionHeader index="06" kicker="Open Source" title="GitHub" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: 'clamp(32px, 6vw, 64px)', alignItems: 'center' }}>
          
          {/* Left Stats Dashboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ font: 'var(--text-body)', color: 'var(--night-muted)', maxWidth: 460, marginBottom: 16 }}>
              Most of my core research, tooling, and system architectures are built in public.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ gridColumn: i === 3 ? '1 / -1' : 'auto' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: i === 3 ? 20 : 28, color: 'var(--accent)' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Heatmap */}
          <div style={{ background: 'var(--night-800)', border: '1px solid var(--border)', borderRadius: 8, padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fff' }}>
                <a href="https://github.com/hellonish" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>@hellonish ↗</a>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--night-muted)' }}>
                1,402 contributions in the last year
              </div>
            </div>

            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 8 }}>
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {week.map((level, dIdx) => (
                    <div key={dIdx} style={{ 
                      width: 12, height: 12, borderRadius: 2, 
                      background: getColor(level),
                      transition: 'transform 0.2s',
                      cursor: 'pointer'
                    }} 
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--night-muted)' }}>
              <span>Less</span>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(255, 255, 255, 0.05)' }} />
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(74, 222, 128, 0.2)' }} />
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(74, 222, 128, 0.4)' }} />
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(74, 222, 128, 0.7)' }} />
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#4ade80' }} />
              <span>More</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PortfolioGithub });
