/* Portfolio UI kit — hero. Deep night surface with an interactive
   dot-matrix data field, accurate dev-tool marks, sharp CTAs, status strip. */

// ─── Dot-Matrix Data Field ──────────────────────────────────────────────────
// A structured grid of points whose brightness flows on a travelling wave,
// crossed by a slow diagnostic scan band and bloomed under the cursor.
function DotMatrix() {
  const cvRef = React.useRef(null);
  const st = React.useRef({ mx: -9999, my: -9999, t: 0 });

  React.useEffect(() => {
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');
    let W, H, cols, rows, raf, dpr;
    const GAP = 26;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / GAP) + 1;
      rows = Math.ceil(H / GAP) + 1;
    };

    const frame = () => {
      const { mx, my, t } = st.current;
      ctx.clearRect(0, 0, W, H);

      // diagonal diagnostic scan position
      const span = W + H + 400;
      const scan = ((t * 1.4) % span) - 200;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP;
          const y = j * GAP;

          // travelling interference wave → base brightness
          let v = 0.5 + 0.5 * Math.sin(x * 0.010 + y * 0.006 + t * 0.020)
                            * Math.cos(y * 0.011 - x * 0.004 - t * 0.014);
          v *= 0.5;

          // scan band highlight
          const sd = Math.abs((x + y) - scan);
          if (sd < 100) v += (1 - sd / 100) * 0.28;

          // cursor bloom
          const dx = x - mx, dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 175) v += (1 - d / 175) * 0.95;

          v = v < 0 ? 0 : v > 1 ? 1 : v;

          const r = 0.5 + v * 2.2;
          const a = 0.05 + v * 0.55;
          const w = v > 0.6 ? (v - 0.6) / 0.4 : 0;   // mix toward white at peaks
          const cr = (52 + w * 200) | 0;
          const cg = (184 + w * 71) | 0;
          const cb = (112 + w * 143) | 0;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, 6.2832);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
          ctx.fill();
        }
      }

      st.current.t++;
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();

    const parent = cv.parentElement;
    const onResize = () => resize();
    const onMouse = (e) => {
      const rct = cv.getBoundingClientRect();
      st.current.mx = e.clientX - rct.left;
      st.current.my = e.clientY - rct.top;
    };
    const onLeave = () => { st.current.mx = -9999; st.current.my = -9999; };

    window.addEventListener('resize', onResize);
    parent.addEventListener('mousemove', onMouse);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      parent.removeEventListener('mousemove', onMouse);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={cvRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />;
}

// ─── Sharp CTA Buttons ──────────────────────────────────────────────────────
function SharpCTA({ children, onClick, href, variant }) {
  const [hov, setHov] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const isPrimary = !variant || variant === 'primary';

  if (!isPrimary) {
    return (
      <Tag href={href} onClick={onClick}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: hov ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
          borderBottom: `1px solid ${hov ? 'rgba(255,255,255,0.35)' : 'transparent'}`,
          transition: 'color 0.18s, border-color 0.18s',
          textDecoration: 'none', padding: '13px 0',
        }}
      >
        {children}
        <span style={{ display: 'inline-block', transform: hov ? 'translateX(4px)' : 'none', transition: 'transform 0.18s' }}>→</span>
      </Tag>
    );
  }

  return (
    <Tag href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '13px 26px', cursor: 'pointer', textDecoration: 'none',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)'}`,
        borderRadius: 2,
        background: hov ? '#fff' : 'rgba(255,255,255,0.05)',
        color: hov ? '#070a0b' : '#fff',
        fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.09em',
        textTransform: 'uppercase', fontWeight: 500,
        transition: 'background 0.22s ease, color 0.22s, border-color 0.22s',
      }}
    >
      {children}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
        style={{ transform: hov ? 'translate(2px,-2px)' : 'none', transition: 'transform 0.22s' }}>
        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Tag>
  );
}

// ─── Dev-Tool Marks ─────────────────────────────────────────────────────────
// Claude — coral radial sunburst
const ClaudeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 44 44" style={{ display: 'block' }}>
    {Array.from({ length: 11 }).map((_, i) => {
      const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
      const inner = 3.2, outer = 20;
      return (
        <line key={i}
          x1={22 + Math.cos(a) * inner} y1={22 + Math.sin(a) * inner}
          x2={22 + Math.cos(a) * outer} y2={22 + Math.sin(a) * outer}
          stroke="#D97757" strokeWidth="3.2" strokeLinecap="round" />
      );
    })}
  </svg>
);

// Cursor — faceted isometric cube
const CursorIcon = () => (
  <svg width="15" height="15" viewBox="0 0 44 44" style={{ display: 'block' }}>
    <path d="M22 4 L38 13 L22 22 L6 13 Z" fill="#eceff1" />
    <path d="M6 13 L22 22 L22 40 L6 31 Z" fill="#878e94" />
    <path d="M38 13 L38 31 L22 40 L22 22 Z" fill="#b6bcc0" />
  </svg>
);

// Codex — OpenAI six-fold bloom
const CodexIcon = () => (
  <svg width="15" height="15" viewBox="0 0 44 44" style={{ display: 'block' }}>
    <g transform="translate(22,22)" fill="rgba(255,255,255,0.85)">
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <rect key={deg} x="-2.3" y="-19" width="4.6" height="13" rx="2.3" transform={`rotate(${deg})`} />
      ))}
      <circle r="2.5" />
    </g>
  </svg>
);

// ─── Hero ────────────────────────────────────────────────────────────────────
function PortfolioHero({ onNav }) {
  return (
    <header style={{ position: 'relative', minHeight: '92vh', overflow: 'hidden', background: 'var(--night-800)' }}>
      <DotMatrix />
      {/* legibility scrims */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(120% 90% at 50% 0%, transparent 38%, rgba(7,10,11,0.72) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(7,10,11,0.78) 0%, rgba(7,10,11,0.35) 38%, transparent 64%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto',
        padding: 'clamp(40px,8vh,100px) clamp(20px,5vw,56px) 160px',
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--night-muted)' }}>
            AI Engineer&nbsp;&nbsp;/&nbsp;&nbsp;2× Founder&nbsp;&nbsp;/&nbsp;&nbsp;New York
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(40px, 8vw, 88px)', lineHeight: 0.98, letterSpacing: '-0.035em',
          color: '#fff', margin: 0, maxWidth: '14ch',
        }}>
          Nishant<br />Sharma
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6,
          color: 'var(--night-fg)', margin: '26px 0 0', maxWidth: 560,
        }}>
          AI engineer building production multi-agent systems — and studying exactly
          where they fail, so they fail less.{' '}
          <span style={{ color: 'var(--night-muted)' }}>M.S. Computer Engineering, NYU Tandon &rsquo;26.</span>
        </p>

        <div style={{ display: 'flex', gap: 18, marginTop: 38, flexWrap: 'wrap', pointerEvents: 'auto' }}>
          <SharpCTA onClick={() => onNav('work')}>View the work</SharpCTA>
          <SharpCTA variant="ghost" onClick={() => onNav('contact')}>Get in touch</SharpCTA>
        </div>
      </div>

      {/* bottom metric strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        borderTop: '1px solid var(--night-line)',
        background: 'linear-gradient(180deg, transparent, rgba(7,10,11,0.66))',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          padding: '16px clamp(20px,5vw,56px)',
          display: 'flex', gap: 'clamp(18px,5vw,56px)', flexWrap: 'wrap', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--night-muted)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff' }}>2×</span>
            <span>Founder</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--night-faint)' }}>Dev tools</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span title="Claude Code" style={{ display: 'flex', alignItems: 'center' }}><ClaudeIcon /></span>
              <span title="Cursor"       style={{ display: 'flex', alignItems: 'center' }}><CursorIcon /></span>
              <span title="Codex"        style={{ display: 'flex', alignItems: 'center' }}><CodexIcon /></span>
            </div>
            <span style={{ color: 'var(--night-faint)', fontSize: 10, letterSpacing: '0.06em' }}>
              Claude Code · Cursor · Codex
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff' }}>400+</span>
            <span>Students mentored</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff' }}>99.9%</span>
            <span>Uptime shipped</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hpulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.8); }
        }
      `}</style>
    </header>
  );
}

Object.assign(window, { PortfolioHero });
