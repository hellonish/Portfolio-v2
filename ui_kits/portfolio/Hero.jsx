/* Portfolio UI kit — hero. Deep night surface with ML-visualisation background:
   Mixture of Gaussian bell curves (drifting, glowing) + interactive softmax
   temperature panel whose τ is driven by cursor Y. */

// ─── ML Background ───────────────────────────────────────────────────────────
// Layer 1: 6 Gaussian bell curves — cursor X attracts them, cursor Y near a
//          curve boosts its amplitude. Hover a curve → equation tooltip.
// Layer 2: Softmax panel — cursor Y tunes temperature τ.
function MLBackground() {
  const cvRef = React.useRef(null);
  const st    = React.useRef({ mx: -9999, my: -9999, t: 0 });

  React.useEffect(() => {
    const cv  = cvRef.current;
    const ctx = cv.getContext('2d');
    let W, H, raf, dpr;

    // ── Gaussian definitions ─────────────────────────────────────────────────
    // Each object carries live state: muA (actual μ), sigA (actual σ), ampA (actual amp)
    const GS = [
      { cy:0.18, sx:0.14, amp:0.72, ph:0.0,  spd: 0.00016, c:[45,212,191],  muA:0.50, sigA:0.14, ampA:0.72 },
      { cy:0.40, sx:0.20, amp:0.48, ph:2.1,  spd:-0.00013, c:[139,92,246],  muA:0.55, sigA:0.20, ampA:0.48 },
      { cy:0.60, sx:0.11, amp:0.82, ph:4.3,  spd: 0.00021, c:[45,212,191],  muA:0.45, sigA:0.11, ampA:0.82 },
      { cy:0.28, sx:0.24, amp:0.38, ph:1.5,  spd:-0.00017, c:[94,234,212],  muA:0.60, sigA:0.24, ampA:0.38 },
      { cy:0.74, sx:0.16, amp:0.60, ph:3.7,  spd: 0.00014, c:[139,92,246],  muA:0.40, sigA:0.16, ampA:0.60 },
      { cy:0.50, sx:0.18, amp:0.44, ph:5.0,  spd:-0.00020, c:[45,212,191],  muA:0.50, sigA:0.18, ampA:0.44 },
    ];

    // ── Softmax state ────────────────────────────────────────────────────────
    const logits  = [1.8, 2.4, 0.9, 3.0, 1.5, 2.1];
    const ltarget = [...logits];

    // ── Helpers ──────────────────────────────────────────────────────────────
    const gauss = (x, mu, sig) => Math.exp(-0.5 * ((x - mu) / sig) ** 2);

    function softmax(z, tau) {
      const s  = z.map(v => v / tau);
      const m  = Math.max(...s);
      const ex = s.map(v => Math.exp(v - m));
      const sm = ex.reduce((a, b) => a + b, 0);
      return ex.map(e => e / sm);
    }

    function rrect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
      ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
      ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
      ctx.closePath();
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W   = cv.offsetWidth;  H = cv.offsetHeight;
      cv.width  = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const STEPS = 200;

    const frame = () => {
      const { mx, my, t } = st.current;
      ctx.clearRect(0, 0, W, H);

      const inHero   = mx > 0 && mx < W && my > 0 && my < H;
      const cxNorm   = inHero ? mx / W : -1;
      const cyNorm   = inHero ? my / H : -1;

      // ── Update Gaussian live state + find hover ───────────────────────────
      let hovIdx  = -1;
      let hovDist = 28;  // px threshold to "hit" a curve

      GS.forEach((g, gi) => {
        // Natural drift targets
        const muNat  = 0.5 + 0.38 * Math.sin(t * g.spd + g.ph);
        const sigNat = g.sx * (1 + 0.12 * Math.sin(t * g.spd * 1.9 + g.ph + 1));

        // Cursor attraction: pull μ gently toward cursor X
        // Influence fades with distance so only the nearest curves react most
        let muTarget = muNat;
        if (inHero) {
          const pull = Math.max(0, 1 - Math.abs(g.muA - cxNorm) / 0.55);
          muTarget   = muNat + (cxNorm - muNat) * pull * 0.38;
        }
        g.muA  += (muTarget  - g.muA)  * 0.032;
        g.sigA += (sigNat    - g.sigA) * 0.07;

        // Amplitude boost: curve near cursor Y blooms taller
        const cyDelta  = inHero ? Math.abs(cyNorm - g.cy) : 1;
        const ampBoost = cyDelta < 0.18 ? (1 - cyDelta / 0.18) * 0.35 : 0;
        g.ampA += (g.amp * (1 + ampBoost) - g.ampA) * 0.06;

        // Hover detection: is the cursor sitting on this curve?
        if (inHero) {
          const baseY = g.cy * H;
          const maxH  = H * 0.26 * g.ampA;
          const gVal  = gauss(cxNorm, g.muA, g.sigA);
          const curveY = baseY - gVal * maxH;
          const dist   = Math.abs(my - curveY);
          if (dist < hovDist && gVal > 0.12) { hovDist = dist; hovIdx = gi; }
        }
      });

      // ── LAYER 1 — Draw Gaussian bell curves ──────────────────────────────
      GS.forEach((g, gi) => {
        const isHov  = gi === hovIdx;
        const [r, gv, b] = g.c;
        const baseY  = g.cy * H;
        const maxH   = H * 0.26 * g.ampA;

        const pts = [];
        for (let i = 0; i <= STEPS; i++) {
          const xn = i / STEPS;
          pts.push({ x: xn * W, y: baseY - gauss(xn, g.muA, g.sigA) * maxH });
        }

        // filled area
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.lineTo(W, baseY); ctx.lineTo(0, baseY); ctx.closePath();
        const fill = ctx.createLinearGradient(0, baseY - maxH, 0, baseY);
        fill.addColorStop(0, `rgba(${r},${gv},${b},${isHov ? 0.20 : 0.11})`);
        fill.addColorStop(1, `rgba(${r},${gv},${b},0.00)`);
        ctx.fillStyle = fill;
        ctx.fill();

        // glowing stroke
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.shadowColor = `rgba(${r},${gv},${b},0.75)`;
        ctx.shadowBlur  = isHov ? 16 : 7;
        ctx.strokeStyle = `rgba(${r},${gv},${b},${isHov ? 0.80 : 0.42})`;
        ctx.lineWidth   = isHov ? 2.0 : 1.3;
        ctx.stroke();
        ctx.shadowBlur  = 0;

        // μ peak dot — pulses larger on hover
        const peakX = g.muA * W;
        const peakY = baseY - maxH;
        ctx.shadowColor = `rgba(${r},${gv},${b},0.9)`;
        ctx.shadowBlur  = isHov ? 20 : 12;
        ctx.beginPath();
        ctx.arc(peakX, peakY, isHov ? 4.0 : 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${gv},${b},${isHov ? 1 : 0.9})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // μ label (right half only, away from text content)
        if (g.muA > 0.44) {
          ctx.font         = `${isHov ? 500 : 400} 9px 'IBM Plex Mono', monospace`;
          ctx.fillStyle    = `rgba(${r},${gv},${b},${isHov ? 0.75 : 0.35})`;
          ctx.textAlign    = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText('μ', peakX, peakY - 6);
        }
      });

      // ── Equation tooltip for hovered curve ───────────────────────────────
      if (hovIdx >= 0 && inHero) {
        const g    = GS[hovIdx];
        const [r, gv, b] = g.c;
        const fVal = gauss(cxNorm, g.muA, g.sigA);
        const line1 = `\u{1D4A9}(μ = ${g.muA.toFixed(2)}, σ = ${g.sigA.toFixed(2)})`;
        const line2 = `f(x) = ${fVal.toFixed(3)}`;

        const TW = 172, TH = 48;
        let tx = mx + 18, ty = my - 58;
        if (tx + TW > W - 12) tx = mx - TW - 12;
        if (ty < 12)          ty = my + 18;

        // bg panel
        rrect(tx, ty, TW, TH, 5);
        ctx.fillStyle   = 'rgba(7,10,11,0.90)';
        ctx.fill();
        ctx.strokeStyle = `rgba(${r},${gv},${b},0.38)`;
        ctx.lineWidth   = 1;
        rrect(tx, ty, TW, TH, 5);
        ctx.stroke();

        // left accent bar
        ctx.fillStyle = `rgba(${r},${gv},${b},0.6)`;
        ctx.fillRect(tx, ty + 6, 2, TH - 12);

        ctx.textAlign    = 'left';
        ctx.textBaseline = 'top';

        // equation line
        ctx.font      = `600 10px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = `rgba(${r},${gv},${b},0.95)`;
        ctx.fillText(line1, tx + 12, ty + 10);

        // f(x) value line
        ctx.font      = `400 9.5px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = 'rgba(232,236,236,0.55)';
        ctx.fillText(line2, tx + 12, ty + 27);
      }

      // ── LAYER 2 — Softmax panel ───────────────────────────────────────────
      const yNorm = inHero ? Math.min(1, Math.max(0, my / H)) : 0.5;
      const tau   = 0.2 + yNorm * 2.6;

      for (let i = 0; i < logits.length; i++) {
        ltarget[i] = 0.5 + 2.8 * (0.5 + 0.5 * Math.sin(t * 0.0009 + i * 1.47));
        logits[i] += (ltarget[i] - logits[i]) * 0.012;
      }
      const probs = softmax(logits, tau);
      const maxP  = Math.max(...probs);

      const BW = 20, BH = 76, GAP_B = 7;
      const TW2 = logits.length * BW + (logits.length - 1) * GAP_B;
      const PX  = W - TW2 - 56;
      const PY  = H * 0.30;

      rrect(PX - 18, PY - 44, TW2 + 36, BH + 78, 7);
      ctx.fillStyle = 'rgba(7,10,11,0.58)'; ctx.fill();
      ctx.strokeStyle = 'rgba(45,212,191,0.11)'; ctx.lineWidth = 1;
      rrect(PX - 18, PY - 44, TW2 + 36, BH + 78, 7); ctx.stroke();

      ctx.textBaseline = 'alphabetic';
      ctx.font         = "500 9.5px 'IBM Plex Mono', monospace";
      ctx.fillStyle    = 'rgba(45,212,191,0.60)';
      ctx.textAlign    = 'left';
      ctx.fillText('softmax(z / τ)', PX, PY - 26);

      const desc = tau < 0.55 ? ' → sharp' : tau > 2.1 ? ' → flat' : '';
      ctx.fillStyle = 'rgba(232,236,236,0.32)';
      ctx.fillText(`τ = ${tau.toFixed(2)}${desc}`, PX, PY - 13);

      probs.forEach((p, i) => {
        const bx = PX + i * (BW + GAP_B);
        const bh = p * BH;
        const by = PY + BH - bh;
        const hi = p === maxP;
        const alp = 0.22 + p * 0.68;

        if (hi) { ctx.shadowColor = 'rgba(45,212,191,0.55)'; ctx.shadowBlur = 10; }
        ctx.fillStyle = hi ? `rgba(45,212,191,${alp})` : `rgba(45,212,191,${alp * 0.42})`;
        ctx.fillRect(bx, by, BW, bh);
        ctx.shadowBlur = 0;

        ctx.font = "500 8px 'IBM Plex Mono', monospace";
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillStyle = hi ? 'rgba(45,212,191,0.90)' : 'rgba(232,236,236,0.28)';
        ctx.fillText((p * 100).toFixed(0) + '%', bx + BW / 2, PY + BH + 6);
        ctx.fillStyle = 'rgba(232,236,236,0.20)';
        ctx.fillText('z' + (i + 1), bx + BW / 2, PY + BH + 18);
      });

      if (!inHero) {
        ctx.font = "400 9px 'IBM Plex Mono', monospace";
        ctx.fillStyle = 'rgba(232,236,236,0.16)';
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText('move cursor ↕ to tune τ', PX, PY + BH + 34);
      }

      st.current.t++;
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();

    const parent   = cv.parentElement;
    const onResize = () => resize();
    const onMouse  = e => {
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

  return (
    <canvas ref={cvRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
  );
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
      <MLBackground />
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
