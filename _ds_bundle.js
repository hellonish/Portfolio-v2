/* @ds-bundle: {"format":3,"namespace":"NishantSharmaPortfolioDesignSystem_acfe10","components":[{"name":"ProjectCard","sourcePath":"components/cards/ProjectCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"MetricStat","sourcePath":"components/core/MetricStat.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ArchitectureFlow","sourcePath":"components/interactive/ArchitectureFlow.jsx"},{"name":"GlassLens","sourcePath":"components/interactive/GlassLens.jsx"},{"name":"MagneticButton","sourcePath":"components/interactive/MagneticButton.jsx"},{"name":"ParticleField","sourcePath":"components/interactive/ParticleField.jsx"},{"name":"SkillConstellation","sourcePath":"components/interactive/SkillConstellation.jsx"},{"name":"TiltCard","sourcePath":"components/interactive/TiltCard.jsx"}],"sourceHashes":{"components/cards/ProjectCard.jsx":"b5075dd8b3d6","components/core/Button.jsx":"849fdc345429","components/core/MetricStat.jsx":"99e82d055e55","components/core/SectionHeader.jsx":"d73a11334f1d","components/core/Tag.jsx":"65f88fbaa4e6","components/interactive/ArchitectureFlow.jsx":"87234efbbd0c","components/interactive/GlassLens.jsx":"467c90bb72c6","components/interactive/MagneticButton.jsx":"09b6a7a79584","components/interactive/ParticleField.jsx":"c16e89c5ab19","components/interactive/SkillConstellation.jsx":"d8b5fa7f828a","components/interactive/TiltCard.jsx":"5035f725088d","ui_kits/portfolio/About.jsx":"414e8b58ddf7","ui_kits/portfolio/Contact.jsx":"3a4f12ee961b","ui_kits/portfolio/Cursor.jsx":"8c9ccaf6f213","ui_kits/portfolio/Hero.jsx":"50d0f71a19c5","ui_kits/portfolio/Nav.jsx":"33d8173f67c4","ui_kits/portfolio/Pet.jsx":"76a4409774ad","ui_kits/portfolio/Research.jsx":"9f07afafcf6d","ui_kits/portfolio/Skills.jsx":"24573f2826bb","ui_kits/portfolio/Work.jsx":"2a05ba6965b7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NishantSharmaPortfolioDesignSystem_acfe10 = window.NishantSharmaPortfolioDesignSystem_acfe10 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the primary action primitive for the Editorial Terminal system.
 * Square-ish, restrained radius, mono-free label. Works on paper and night
 * (set [data-theme="night"] on an ancestor).
 */
function Button({
  children,
  variant = 'primary',
  // 'primary' | 'outline' | 'ghost'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  icon = null,
  // optional leading node (e.g. an <svg>)
  iconRight = null,
  as = 'button',
  href,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '7px 14px',
      fontSize: 13,
      gap: 7
    },
    md: {
      padding: '10px 20px',
      fontSize: 14,
      gap: 8
    },
    lg: {
      padding: '14px 28px',
      fontSize: 15,
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '-0.005em',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#fff',
      boxShadow: 'var(--shadow-xs)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      borderColor: 'var(--accent)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)'
    }
  };
  const hoverEnter = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-hover)';
    if (variant === 'outline') {
      e.currentTarget.style.background = 'var(--accent-tint)';
    }
    if (variant === 'ghost') e.currentTarget.style.background = 'var(--accent-tint)';
  };
  const hoverLeave = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.background = variants[variant].background;
  };
  const Tag = href ? 'a' : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: href ? undefined : disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: hoverEnter,
    onMouseLeave: hoverLeave
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/MetricStat.jsx
try { (() => {
/**
 * MetricStat — big display numeral + mono label. Use to render the
 * "living infrastructure" stats (LOC, uptime, latency, throughput) as
 * editorial figures rather than buried prose.
 */
function MetricStat({
  value,
  label,
  sub,
  accent = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(32px, 4vw, 44px)',
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: accent ? 'var(--accent)' : 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, sub));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
/**
 * SectionHeader — numbered editorial section header with scramble animation.
 * On viewport entry and on hover, index + kicker + title scramble rapidly
 * through random chars and resolve to the correct text in ~800ms.
 */

// v2 — scramble on viewport entry + hover
const CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
function useScramble(target = '') {
  const [text, setText] = React.useState(target);
  const rafRef = React.useRef(null);
  const run = React.useCallback((delay = 0) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const duration = 780;
    const start = performance.now() + delay;
    const tick = now => {
      if (now < start) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      // ease-out: resolve left-to-right, faster at start
      const resolved = Math.floor(Math.pow(progress, 0.55) * target.length);
      let result = '';
      for (let i = 0; i < target.length; i++) {
        if (i < resolved || target[i] === ' ' || target[i] === '·' || target[i] === '&' || target[i] === '–' || target[i] === '\'') {
          result += target[i];
        } else {
          const pool = target[i] === target[i].toUpperCase() ? CHARS_UPPER : CHARS_LOWER;
          result += pool[Math.floor(Math.random() * pool.length)];
        }
      }
      setText(result);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [target]);
  React.useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);
  return [text, run];
}
function SectionHeader({
  index,
  kicker,
  title,
  align = 'left',
  style = {}
}) {
  const containerRef = React.useRef(null);
  const triggeredRef = React.useRef(false);
  const hoverCooldown = React.useRef(false);
  const [indexText, runIndex] = useScramble(index ?? '');
  const [kickerText, runKicker] = useScramble(kicker ?? '');
  const [titleText, runTitle] = useScramble(title ?? '');
  const trigger = React.useCallback(() => {
    runIndex(0);
    runKicker(35);
    runTitle(70);
  }, [runIndex, runKicker, runTitle]);

  // Viewport entry — fire once
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggeredRef.current) {
        triggeredRef.current = true;
        obs.disconnect();
        trigger();
      }
    }, {
      threshold: 0.25
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);
  const handleMouseEnter = React.useCallback(() => {
    if (hoverCooldown.current) return;
    hoverCooldown.current = true;
    trigger();
    setTimeout(() => {
      hoverCooldown.current = false;
    }, 1200);
  }, [trigger]);
  return /*#__PURE__*/React.createElement("header", {
    ref: containerRef,
    style: {
      textAlign: align,
      ...style
    },
    onMouseEnter: handleMouseEnter
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10
    }
  }, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--accent)',
      letterSpacing: '0.08em'
    }
  }, indexText), kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, kickerText), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-title)',
      color: 'var(--text-strong)',
      margin: 0,
      letterSpacing: 'var(--ls-snug)'
    }
  }, titleText));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — compact label chip for tech-stack items, statuses, and categories.
 * tone drives the colour: 'neutral' (default), 'teal' (build/ship),
 * 'violet' (research/academic), 'solid' (filled ink).
 */
function Tag({
  children,
  tone = 'neutral',
  mono = true,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      color: 'var(--text-muted)',
      background: 'transparent',
      border: '1px solid var(--border)'
    },
    teal: {
      color: 'var(--accent)',
      background: 'var(--accent-tint)',
      border: '1px solid transparent'
    },
    violet: {
      color: 'var(--research)',
      background: 'var(--research-tint)',
      border: '1px solid transparent'
    },
    solid: {
      color: 'var(--bg)',
      background: 'var(--text-strong)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: mono ? '0.01em' : '0',
      lineHeight: 1.3,
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
/**
 * ProjectCard — the marquee work card. Editorial layout: mono meta line,
 * display title, lead description, optional metric row, and a tech-stack tag
 * cloud. Lifts and reveals a teal hairline on hover. tone='violet' badges it
 * as research.
 */
function ProjectCard({
  title,
  meta,
  // e.g. "Solo · ~25,500 LOC · 13 days"
  period,
  // e.g. "Mar 2026 – Apr 2026"
  description,
  metrics = [],
  // [{ value, label }]
  stack = [],
  // string[]
  links = [],
  // [{ label, href }]
  tone = 'teal',
  // 'teal' | 'violet'
  featured = false,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const accentVar = tone === 'violet' ? 'var(--research)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: featured ? '28px 30px' : '24px 26px',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-xs)',
      borderColor: hover ? accentVar : 'var(--border)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: accentVar,
      opacity: hover ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 16,
      marginBottom: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.06em',
      color: accentVar,
      textTransform: 'uppercase'
    }
  }, meta), period && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, period)), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-heading)',
      color: 'var(--text-strong)',
      fontSize: featured ? 26 : 20,
      marginBottom: 10,
      letterSpacing: 'var(--ls-snug)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-muted)',
      maxWidth: 640,
      marginBottom: metrics.length ? 18 : 16
    }
  }, description), metrics.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      marginBottom: 18,
      flexWrap: 'wrap'
    }
  }, metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--text-strong)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, m.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginTop: 4
    }
  }, m.label)))), stack.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      flexWrap: 'wrap',
      marginBottom: links.length ? 16 : 0
    }
  }, stack.map((s, i) => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: i,
    tone: "neutral"
  }, s))), links.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    target: "_blank",
    rel: "noreferrer",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: accentVar,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "["), l.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "]")))));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/interactive/ArchitectureFlow.jsx
try { (() => {
const DEFAULT_STAGES = [{
  label: 'User',
  sub: '10K req/day'
}, {
  label: 'ALB',
  sub: 'CloudFront'
}, {
  label: 'API',
  sub: 'FastAPI'
}, {
  label: 'Queue',
  sub: 'ARQ · Redis'
}, {
  label: 'Workers',
  sub: 'async'
}, {
  label: 'DB',
  sub: 'Postgres 16'
}];

/**
 * ArchitectureFlow — an animated request-pipeline diagram. Stage chips linked by
 * connectors with teal "packets" that flow left→right, turning prose about
 * infrastructure into living diagram. Wraps to a vertical flow on narrow
 * containers. Honours prefers-reduced-motion (packets hold still).
 */
function ArchitectureFlow({
  stages = DEFAULT_STAGES,
  accent = 'var(--accent)',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      flexWrap: 'wrap',
      gap: 0,
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, stages.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '12px 16px',
      minWidth: 92,
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-raised)',
      boxShadow: 'var(--shadow-xs)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '0.02em'
    }
  }, s.label), s.sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--text-faint)',
      marginTop: 3
    }
  }, s.sub)), i < stages.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: '1 1 28px',
      minWidth: 28,
      alignSelf: 'center',
      height: 2,
      background: 'var(--border)',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "af-packet",
    style: {
      position: 'absolute',
      top: -2,
      left: 0,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: accent,
      boxShadow: `0 0 8px ${accent}`,
      animation: `af-flow 2.4s linear ${i * 0.4}s infinite`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      top: -3,
      width: 0,
      height: 0,
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: '5px solid var(--border)'
    }
  })))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes af-flow { 0% { left: 0; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .af-packet { animation: none !important; opacity: 0.6 !important; } }
      `));
}
Object.assign(__ds_scope, { ArchitectureFlow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/ArchitectureFlow.jsx", error: String((e && e.message) || e) }); }

// components/interactive/GlassLens.jsx
try { (() => {
/**
 * GlassLens — a circular "liquid glass" lens that follows the cursor and
 * magnifies the content beneath it, with a refraction ring and specular
 * highlight for a premium optical feel. Wrap any content; the lens renders a
 * scaled duplicate so the point under the cursor stays anchored.
 *
 * Note: children are rendered twice (base + magnified copy) — keep wrapped
 * content presentational.
 */
function GlassLens({
  children,
  size = 180,
  // lens diameter (px)
  zoom = 1.6,
  // magnification factor
  style = {},
  contentStyle = {}
}) {
  const ref = React.useRef(null);
  const [m, setM] = React.useState({
    x: 0,
    y: 0,
    on: false
  });
  const [dims, setDims] = React.useState({
    w: 0,
    h: 0
  });
  const R = size / 2;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setDims({
        w: r.width,
        h: r.height
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    setM({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      on: true
    });
  };
  const onLeave = () => setM(s => ({
    ...s,
    on: false
  }));
  const ox = R - m.x * zoom;
  const oy = R - m.y * zoom;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: {
      position: 'relative',
      cursor: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: contentStyle
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: m.x - R,
      top: m.y - R,
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: m.on ? 1 : 0,
      transition: 'opacity 0.18s ease',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.55), 0 0 0 2px rgba(20,184,166,0.35), 0 16px 40px rgba(10,14,15,0.30), inset 0 0 28px rgba(255,255,255,0.25)',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: ox,
      top: oy,
      width: dims.w,
      height: dims.h,
      transform: `scale(${zoom})`,
      transformOrigin: '0 0',
      ...contentStyle
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.45), rgba(255,255,255,0) 38%), radial-gradient(circle at 70% 78%, rgba(94,234,212,0.18), rgba(94,234,212,0) 50%)',
      boxShadow: 'inset 0 0 22px rgba(10,14,15,0.18)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: m.x - 3,
      top: m.y - 3,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent)',
      pointerEvents: 'none',
      opacity: m.on ? 0.9 : 0,
      zIndex: 31
    }
  }));
}
Object.assign(__ds_scope, { GlassLens });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/GlassLens.jsx", error: String((e && e.message) || e) }); }

// components/interactive/MagneticButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MagneticButton — a control that leans toward the cursor as it approaches,
 * with an inner label that travels slightly further (parallax). Springs back
 * on leave. Wrap any content; renders an <a> when href is set.
 */
function MagneticButton({
  children,
  href,
  strength = 0.35,
  // 0–1, how far the element follows the cursor
  radius = 90,
  // px proximity at which the pull engages
  variant = 'solid',
  // 'solid' | 'outline'
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({
    x: 0,
    y: 0,
    ix: 0,
    iy: 0
  });
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius + Math.max(r.width, r.height) / 2) {
      setT({
        x: dx * strength,
        y: dy * strength,
        ix: dx * strength * 0.5,
        iy: dy * strength * 0.5
      });
    } else {
      setT({
        x: 0,
        y: 0,
        ix: 0,
        iy: 0
      });
    }
  };
  const reset = () => setT({
    x: 0,
    y: 0,
    ix: 0,
    iy: 0
  });
  const Tag = href ? 'a' : 'button';
  const isSolid = variant === 'solid';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    href: href,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '14px 28px',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      textDecoration: 'none',
      border: isSolid ? '1px solid transparent' : '1px solid var(--accent)',
      background: isSolid ? 'var(--accent)' : 'transparent',
      color: isSolid ? '#fff' : 'var(--accent)',
      transform: `translate(${t.x}px, ${t.y}px)`,
      transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s, box-shadow 0.25s',
      boxShadow: t.x || t.y ? '0 10px 30px var(--glow-teal)' : 'none',
      willChange: 'transform',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transform: `translate(${t.ix}px, ${t.iy}px)`,
      transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }, children));
}
Object.assign(__ds_scope, { MagneticButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/MagneticButton.jsx", error: String((e && e.message) || e) }); }

// components/interactive/ParticleField.jsx
try { (() => {
/**
 * ParticleField — the cursor-reactive "dot hive". A canvas of drifting nodes
 * that connect to nearby neighbours with hairlines and repel away from the
 * cursor. The signature hero backdrop of the Editorial Terminal system.
 *
 * Pure Canvas 2D — no WebGL, no deps. Honours prefers-reduced-motion (renders
 * a static field). Sizes to its container; give the parent a height.
 */
function ParticleField({
  density = 0.00011,
  maxNodes = 180,
  color = '#2dd4bf',
  lineColor = 'rgba(45, 212, 191, 0.5)',
  background = 'transparent',
  linkDistance = 130,
  repelRadius = 150,
  speed = 0.35,
  dotSize = 1.6,
  interactive = true,
  style = {},
  className
}) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const stateRef = React.useRef({
    nodes: [],
    mx: -9999,
    my: -9999,
    w: 0,
    h: 0,
    dpr: 1
  });
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const S = stateRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function seed() {
      const count = Math.min(maxNodes, Math.max(24, Math.floor(S.w * S.h * density)));
      S.nodes = Array.from({
        length: count
      }, () => ({
        x: Math.random() * S.w,
        y: Math.random() * S.h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed
      }));
    }
    function resize() {
      const rect = canvas.getBoundingClientRect();
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.w = rect.width;
      S.h = rect.height;
      canvas.width = S.w * S.dpr;
      canvas.height = S.h * S.dpr;
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      seed();
    }
    function step() {
      ctx.clearRect(0, 0, S.w, S.h);
      if (background !== 'transparent') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, S.w, S.h);
      }
      const n = S.nodes;
      for (let i = 0; i < n.length; i++) {
        const p = n[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > S.w) p.vx *= -1;
          if (p.y < 0 || p.y > S.h) p.vy *= -1;
          if (interactive) {
            const dx = p.x - S.mx,
              dy = p.y - S.my;
            const d2 = dx * dx + dy * dy;
            if (d2 < repelRadius * repelRadius && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / repelRadius) * 1.6;
              p.x += dx / d * f;
              p.y += dy / d * f;
            }
          }
        }
        for (let j = i + 1; j < n.length; j++) {
          const q = n[j];
          const dx = p.x - q.x,
            dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const a = 1 - Math.sqrt(d2) / linkDistance;
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = a * 0.7;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      for (let i = 0; i < n.length; i++) {
        const p = n[i];
        let r = dotSize;
        if (interactive) {
          const dx = p.x - S.mx,
            dy = p.y - S.my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < repelRadius) r = dotSize + (1 - d / repelRadius) * 2.2;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(step);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [density, maxNodes, color, lineColor, background, linkDistance, repelRadius, speed, dotSize, interactive]);
  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const S = stateRef.current;
    S.mx = e.clientX - rect.left;
    S.my = e.clientY - rect.top;
  };
  const onLeave = () => {
    const S = stateRef.current;
    S.mx = -9999;
    S.my = -9999;
  };
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: className,
    onMouseMove: interactive ? onMove : undefined,
    onMouseLeave: interactive ? onLeave : undefined,
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      ...style
    }
  });
}
Object.assign(__ds_scope, { ParticleField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/ParticleField.jsx", error: String((e && e.message) || e) }); }

// components/interactive/SkillConstellation.jsx
try { (() => {
const DEFAULT_NODES = [{
  id: 'llm',
  label: 'LLM Systems',
  group: 'ai',
  size: 16
}, {
  id: 'rag',
  label: 'RAG',
  group: 'ai',
  size: 12
}, {
  id: 'agents',
  label: 'Multi-Agent',
  group: 'ai',
  size: 13
}, {
  id: 'finetune',
  label: 'LoRA / QLoRA',
  group: 'ai',
  size: 11
}, {
  id: 'langgraph',
  label: 'LangGraph',
  group: 'ai',
  size: 11
}, {
  id: 'qdrant',
  label: 'Qdrant',
  group: 'ai',
  size: 9
}, {
  id: 'pytorch',
  label: 'PyTorch',
  group: 'research',
  size: 12
}, {
  id: 'research',
  label: 'ML Research',
  group: 'research',
  size: 14
}, {
  id: 'robustness',
  label: 'Robustness',
  group: 'research',
  size: 10
}, {
  id: 'fastapi',
  label: 'FastAPI',
  group: 'backend',
  size: 13
}, {
  id: 'postgres',
  label: 'PostgreSQL',
  group: 'backend',
  size: 11
}, {
  id: 'redis',
  label: 'Redis',
  group: 'backend',
  size: 10
}, {
  id: 'ws',
  label: 'WebSockets',
  group: 'backend',
  size: 9
}, {
  id: 'aws',
  label: 'AWS',
  group: 'infra',
  size: 13
}, {
  id: 'docker',
  label: 'Docker',
  group: 'infra',
  size: 11
}, {
  id: 'k8s',
  label: 'Kubernetes',
  group: 'infra',
  size: 11
}, {
  id: 'terraform',
  label: 'Terraform',
  group: 'infra',
  size: 9
}];
const DEFAULT_LINKS = [['llm', 'rag'], ['llm', 'agents'], ['agents', 'langgraph'], ['rag', 'qdrant'], ['llm', 'finetune'], ['finetune', 'pytorch'], ['pytorch', 'research'], ['research', 'robustness'], ['agents', 'fastapi'], ['rag', 'fastapi'], ['fastapi', 'postgres'], ['fastapi', 'redis'], ['fastapi', 'ws'], ['fastapi', 'docker'], ['docker', 'aws'], ['docker', 'k8s'], ['k8s', 'terraform'], ['aws', 'terraform'], ['langgraph', 'redis'], ['llm', 'fastapi']];
const GROUP_COLOR = {
  ai: '#2dd4bf',
  backend: '#5eead4',
  research: '#8b5cf6',
  infra: '#7e8893'
};

/**
 * SkillConstellation — an interactive knowledge graph of skills. Nodes drift in
 * a gently settling force layout, connected by edges. Hovering a node enlarges
 * it, lights its edges and neighbours, and dims the rest. Click does nothing by
 * default — pass onSelect to wire navigation.
 */
function SkillConstellation({
  nodes = DEFAULT_NODES,
  links = DEFAULT_LINKS,
  background = 'transparent',
  onSelect,
  style = {},
  className,
  zoom = 1
}) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const S = React.useRef({
    n: [],
    w: 0,
    h: 0,
    dpr: 1,
    mx: -1,
    my: -1,
    hover: null
  });
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const st = S.current;
    const idx = new Map(nodes.map((d, i) => [d.id, i]));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function init() {
      const r = canvas.getBoundingClientRect();
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.w = r.width;
      st.h = r.height;
      canvas.width = st.w * st.dpr;
      canvas.height = st.h * st.dpr;
      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
      if (!st.n.length) {
        st.n = nodes.map((d, i) => ({
          ...d,
          x: st.w / 2 + Math.cos(i) * 120 * zoom + (Math.random() - 0.5) * 60,
          y: st.h / 2 + Math.sin(i) * 90 * zoom + (Math.random() - 0.5) * 60,
          vx: 0,
          vy: 0
        }));
      }
    }
    function physics() {
      const n = st.n;
      const cx = st.w / 2,
        cy = st.h / 2;
      for (let i = 0; i < n.length; i++) {
        const a = n[i];
        // mild centering
        a.vx += (cx - a.x) * 0.0009;
        a.vy += (cy - a.y) * 0.0009;
        // repulsion
        for (let j = i + 1; j < n.length; j++) {
          const b = n[j];
          let dx = a.x - b.x,
            dy = a.y - b.y;
          let d2 = dx * dx + dy * dy || 0.01;
          const f = 2400 * zoom * zoom / d2;
          const d = Math.sqrt(d2);
          const ux = dx / d,
            uy = dy / d;
          a.vx += ux * f * 0.02;
          a.vy += uy * f * 0.02;
          b.vx -= ux * f * 0.02;
          b.vy -= uy * f * 0.02;
        }
      }
      // link springs
      for (const [s, t] of links) {
        const a = n[idx.get(s)],
          b = n[idx.get(t)];
        if (!a || !b) continue;
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.01;
        const target = 96 * zoom;
        const f = (d - target) * 0.006;
        const ux = dx / d,
          uy = dy / d;
        a.vx += ux * f;
        a.vy += uy * f;
        b.vx -= ux * f;
        b.vy -= uy * f;
      }
      for (const a of n) {
        a.vx *= 0.86;
        a.vy *= 0.86;
        a.x += a.vx;
        a.y += a.vy;
        a.x = Math.max(30, Math.min(st.w - 30, a.x));
        a.y = Math.max(26, Math.min(st.h - 26, a.y));
      }
    }
    function neighbours(id) {
      const set = new Set([id]);
      for (const [s, t] of links) {
        if (s === id) set.add(t);
        if (t === id) set.add(s);
      }
      return set;
    }
    function draw() {
      if (!reduce) physics();
      ctx.clearRect(0, 0, st.w, st.h);
      if (background !== 'transparent') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, st.w, st.h);
      }
      const n = st.n;

      // hover detection
      st.hover = null;
      if (st.mx >= 0) {
        let best = 22,
          bi = null;
        for (const a of n) {
          const d = Math.hypot(a.x - st.mx, a.y - st.my);
          if (d < a.size + 10 && d < best) {
            best = d;
            bi = a.id;
          }
        }
        st.hover = bi;
      }
      const near = st.hover ? neighbours(st.hover) : null;

      // edges
      for (const [s, t] of links) {
        const a = n[idx.get(s)],
          b = n[idx.get(t)];
        if (!a || !b) continue;
        const active = near && near.has(s) && near.has(t);
        ctx.strokeStyle = active ? 'rgba(45,212,191,0.85)' : 'rgba(126,136,147,0.22)';
        ctx.lineWidth = active ? 1.4 : 1;
        ctx.globalAlpha = near && !active ? 0.25 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // nodes
      for (const a of n) {
        const isHover = st.hover === a.id;
        const dim = near && !near.has(a.id);
        const col = GROUP_COLOR[a.group] || '#7e8893';
        const r = (isHover ? a.size + 4 : a.size) * zoom;
        ctx.globalAlpha = dim ? 0.3 : 1;
        if (isHover) {
          ctx.shadowColor = col;
          ctx.shadowBlur = 18;
        }
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(a.x, a.y, r * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // ring
        ctx.strokeStyle = col;
        ctx.globalAlpha = dim ? 0.2 : 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, r * 0.5 + 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        // label
        if (isHover || a.size >= 13) {
          const fs = Math.round((isHover ? 13 : 11) * zoom);
          ctx.font = `${isHover ? 600 : 500} ${fs}px 'IBM Plex Mono', monospace`;
          ctx.fillStyle = isHover ? '#e8ecec' : 'rgba(232,236,236,0.6)';
          ctx.globalAlpha = dim ? 0.3 : 1;
          ctx.textAlign = 'center';
          ctx.fillText(a.label, a.x, a.y - r * 0.5 - 9);
          ctx.globalAlpha = 1;
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [nodes, links, background]);
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    S.current.mx = e.clientX - r.left;
    S.current.my = e.clientY - r.top;
  };
  const onLeave = () => {
    S.current.mx = -1;
    S.current.my = -1;
  };
  const onClick = () => {
    if (onSelect && S.current.hover) onSelect(S.current.hover);
  };
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick: onClick,
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      ...style
    }
  });
}
Object.assign(__ds_scope, { SkillConstellation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/SkillConstellation.jsx", error: String((e && e.message) || e) }); }

// components/interactive/TiltCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TiltCard — a 3D parallax-tilt surface. Tracks the cursor to rotate the card
 * on X/Y, lifts it toward the viewer, and sweeps a glare highlight across the
 * top. A soft teal sheen tracks the pointer. Great for project tiles.
 */
function TiltCard({
  children,
  max = 10,
  // max tilt in degrees
  glare = true,
  lift = 14,
  // px translateZ on hover
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [tf, setTf] = React.useState({
    rx: 0,
    ry: 0,
    on: false
  });
  const [gl, setGl] = React.useState({
    x: 50,
    y: 0,
    o: 0
  });
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTf({
      rx: (0.5 - py) * 2 * max,
      ry: (px - 0.5) * 2 * max,
      on: true
    });
    setGl({
      x: px * 100,
      y: py * 100,
      o: 0.18
    });
  };
  const onLeave = () => {
    setTf({
      rx: 0,
      ry: 0,
      on: false
    });
    setGl({
      x: 50,
      y: 0,
      o: 0
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      transformStyle: 'preserve-3d',
      transform: `perspective(900px) rotateX(${tf.rx}deg) rotateY(${tf.ry}deg) translateZ(${tf.on ? lift : 0}px)`,
      transition: tf.on ? 'transform 0.08s linear, box-shadow 0.3s var(--ease-out)' : 'transform 0.5s var(--ease-out), box-shadow 0.3s var(--ease-out)',
      boxShadow: tf.on ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      willChange: 'transform',
      ...style
    }
  }, rest), children, glare && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      background: `radial-gradient(420px circle at ${gl.x}% ${gl.y}%, rgba(94,234,212,${gl.o}), transparent 55%)`,
      transition: 'opacity 0.3s var(--ease-out)',
      mixBlendMode: 'screen'
    }
  }));
}
Object.assign(__ds_scope, { TiltCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/TiltCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Portfolio UI kit — About. Dark section with editorial lead,
   three capability pillars, photo, and infrastructure metrics. */
function PortfolioAbout() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const {
    SectionHeader,
    MetricStat,
    ArchitectureFlow,
    Button
  } = DS;
  const pillars = [{
    n: '01',
    title: 'Agentic Orchestration',
    body: 'Built ineedajob.pro (multi-model open-source platform) and Singularity (solo-built multi-agent research platform on AWS for $26/mo). Specialist in stateful graphs and plan-before-retrieve orchestration.',
    tags: ['LangGraph', 'LangChain', 'FastAPI', 'Qdrant', 'Redis']
  }, {
    n: '02',
    title: 'Production Engineering',
    body: 'Solving hard distributed system bottlenecks — from orphan job recovery on OOM-killed background workers to custom group-label-free reweighting for robust ML models.',
    tags: ['ARQ', 'Celery', 'PostgreSQL', 'AWS EC2', 'Docker']
  }, {
    n: '03',
    title: 'Builder Mindset',
    body: 'Wrapping up an M.S. in Computer Engineering at NYU Tandon. Bias toward shipping things real people can trust and act on.',
    tags: ['NYU Tandon', 'M.S. CompEng', '\'26']
  }];
  const Pillar = ({
    n,
    title,
    body,
    tags
  }) => {
    const [hov, setHov] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        padding: '28px 26px 24px',
        border: `1px solid ${hov ? 'rgba(52,184,112,0.28)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        background: hov ? 'rgba(52,184,112,0.03)' : 'var(--surface)',
        transition: 'border-color 0.22s, background 0.22s',
        display: 'flex',
        flexDirection: 'column',
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(52,184,112,0.7)'
      }
    }, n), /*#__PURE__*/React.createElement("svg", {
      width: "9",
      height: "9",
      viewBox: "0 0 9 9",
      fill: "none",
      style: {
        opacity: hov ? 1 : 0,
        transition: 'opacity 0.18s'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1 8L8 1M8 1H2M8 1V7",
      stroke: "rgba(52,184,112,0.8)",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 16,
        color: 'var(--text-strong)',
        letterSpacing: '-0.02em',
        margin: '0 0 10px'
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        lineHeight: 1.7,
        color: 'var(--text-muted)',
        margin: '0 0 18px',
        flex: 1
      }
    }, body), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6
      }
    }, tags.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        padding: '3px 8px',
        border: '1px solid var(--border)',
        borderRadius: 3,
        color: 'var(--text-muted)'
      }
    }, t))));
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    "data-theme": "night",
    style: {
      background: 'var(--night-900)',
      padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,56px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    index: "01",
    kicker: "Profile",
    title: "About"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)',
      gap: 'clamp(28px,5vw,64px)',
      marginTop: 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-lead)',
      color: 'var(--text)',
      marginBottom: 20,
      lineHeight: 1.55
    }
  }, "I build agentic AI frameworks and async backend infrastructure designed to survive real-world data and server limits. No demo-ware \u2014 just systems built for people to actually trust and act on."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "https://raw.githubusercontent.com/hellonish/Portfolio-v2/main/sharma_nishant_portfolio.pdf"
  }, "R\xE9sum\xE9"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    href: "https://linkedin.com/in/nishantsh20/"
  }, "LinkedIn"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      aspectRatio: '1 / 1',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/profile.png",
    alt: "Nishant Sharma",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      filter: 'grayscale(0.12) contrast(1.02)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      marginTop: 'clamp(32px,5vh,56px)'
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(Pillar, _extends({
    key: p.n
  }, p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      padding: 'clamp(20px,3vw,32px) clamp(20px,3vw,36px)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(52,184,112,0.6)',
      marginBottom: 20
    }
  }, "// Running infrastructure \u2014 not a slide deck"), /*#__PURE__*/React.createElement(ArchitectureFlow, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'clamp(24px,5vw,72px)',
      flexWrap: 'wrap',
      borderTop: '1px solid var(--border)',
      paddingTop: 24,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(MetricStat, {
    value: "10K",
    label: "Requests / day",
    accent: true
  }), /*#__PURE__*/React.createElement(MetricStat, {
    value: "500",
    label: "Concurrent users"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    value: "99.9%",
    label: "Uptime"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    value: "44",
    label: "Agent skills \xB7 Singularity"
  })))));
}
Object.assign(window, {
  PortfolioAbout
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Contact.jsx
try { (() => {
/* Portfolio UI kit — Contact footer. Night surface: a compact experience
   timeline, a closing headline, magnetic contact, and social links. */
function PortfolioContact() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const {
    MagneticButton
  } = DS;
  const timeline = [['2025 — now', 'ML Teaching Assistant', 'NYU Tandon · 400+ students'], ['Sep 2023 — Aug 2024', 'Lead Software Engineer', 'Ingelt Study Abroad · 500+ clients'], ['Jul 2022 — Aug 2023', 'Founding Engineer', 'Macverin Technologies · 1K+ DAU']];
  const socials = [['ineedajob.pro', 'https://ineedajob.pro'], ['singularity ↗', 'https://singularity.hellonish.dev'], ['GitHub', 'https://github.com/hellonish'], ['LinkedIn', 'https://linkedin.com/in/nishantsh20/'], ['Résumé', 'https://raw.githubusercontent.com/hellonish/Portfolio-v2/main/sharma_nishant_portfolio.pdf']];
  return /*#__PURE__*/React.createElement("footer", {
    id: "contact",
    "data-theme": "night",
    style: {
      background: 'var(--night-900)',
      padding: 'clamp(56px,9vh,104px) clamp(20px,5vw,56px) 48px',
      borderTop: '1px solid var(--night-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--teal-400)'
    }
  }, "05"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--night-faint)'
    }
  }, "Trajectory"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--night-line)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))',
      gap: 1,
      background: 'var(--night-line)',
      border: '1px solid var(--night-line)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 'clamp(48px,8vh,90px)'
    }
  }, timeline.map(([when, role, where]) => /*#__PURE__*/React.createElement("div", {
    key: role,
    style: {
      background: 'var(--night-800)',
      padding: '22px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--teal-400)',
      marginBottom: 10
    }
  }, when), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 16,
      color: '#fff',
      marginBottom: 4
    }
  }, role), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      fontSize: 13,
      color: 'var(--night-muted)'
    }
  }, where)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(34px,6vw,68px)',
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      color: '#fff',
      margin: '0 0 32px',
      maxWidth: '16ch'
    }
  }, "Let\u2019s build something that actually helps someone."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(MagneticButton, {
    href: "mailto:hellonishantsh@gmail.com"
  }, "hellonishantsh@gmail.com"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      flexWrap: 'wrap'
    }
  }, socials.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: href,
    target: "_blank",
    rel: "noreferrer",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--night-muted)',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      paddingBottom: 2,
      transition: 'color 0.2s, border-color 0.2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--teal-400)';
      e.currentTarget.style.borderColor = 'var(--teal-400)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--night-muted)';
      e.currentTarget.style.borderColor = 'transparent';
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'clamp(48px,8vh,90px)',
      paddingTop: 24,
      borderTop: '1px solid var(--night-line)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--night-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Nishant Sharma"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "Created with \u2764\uFE0F and\xA0", /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 44 44",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  }, Array.from({
    length: 11
  }).map((_, i) => {
    const a = i / 11 * Math.PI * 2 - Math.PI / 2;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 22 + Math.cos(a) * 3.5,
      y1: 22 + Math.sin(a) * 3.5,
      x2: 22 + Math.cos(a) * 20,
      y2: 22 + Math.sin(a) * 20,
      stroke: "rgba(217,119,87,0.7)",
      strokeWidth: "3.2",
      strokeLinecap: "round"
    });
  })), "\xA0Claude \xA0\xB7\xA0 by Nishant \xA0\xB7\xA0 June 2026"))));
}
Object.assign(window, {
  PortfolioContact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Cursor.jsx
try { (() => {
/* Custom cursor — targeting reticle. Center dot + lagged corner-bracket ring.
   Expands + brightens on hover. Fits the dot-matrix / terminal aesthetic. */

function CustomCursor() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const pos = React.useRef({
    x: -200,
    y: -200
  });
  const lag = React.useRef({
    x: -200,
    y: -200
  });
  const hov = React.useRef(false);
  const clicking = React.useRef(false);
  React.useEffect(() => {
    // hide system cursor globally
    const styleEl = document.createElement('style');
    styleEl.id = '__custom-cursor-style';
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleEl);
    let raf;
    const onMove = e => {
      pos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const onDown = () => {
      clicking.current = true;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) scale(1.8)`;
      if (ringRef.current) ringRef.current.dataset.click = '1';
      setTimeout(() => {
        clicking.current = false;
        if (ringRef.current) delete ringRef.current.dataset.click;
      }, 220);
    };
    const onOver = e => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, [tabindex]')) {
        hov.current = true;
      }
    };
    const onOut = e => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, [tabindex]')) {
        hov.current = false;
      }
    };
    const tick = () => {
      const {
        x,
        y
      } = pos.current;
      lag.current.x += (x - lag.current.x) * 0.12;
      lag.current.y += (y - lag.current.y) * 0.12;
      const lx = lag.current.x,
        ly = lag.current.y;
      const isHov = hov.current;
      if (dotRef.current && !clicking.current) {
        dotRef.current.style.transform = `translate(${x}px,${y}px) scale(1)`;
      }
      if (ringRef.current) {
        const sz = isHov ? 32 : 20;
        const off = sz / 2;
        ringRef.current.style.transform = `translate(${lx - off}px,${ly - off}px)`;
        ringRef.current.style.width = sz + 'px';
        ringRef.current.style.height = sz + 'px';
        // corner arm length proportional to ring size
        const arm = Math.round(sz * 0.28);
        ringRef.current.querySelectorAll('span').forEach(s => {
          s.style.width = arm + 'px';
          s.style.height = arm + 'px';
        });
        ringRef.current.style.opacity = isHov ? '1' : '0.72';
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('mousemove', onMove, {
      passive: true
    });
    window.addEventListener('mousedown', onDown, {
      passive: true
    });
    document.addEventListener('mouseover', onOver, {
      passive: true
    });
    document.addEventListener('mouseout', onOut, {
      passive: true
    });
    return () => {
      cancelAnimationFrame(raf);
      styleEl.remove();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);
  const cornerBase = {
    position: 'absolute',
    width: 6,
    height: 6,
    borderColor: 'rgba(52,184,112,0.9)',
    transition: 'width 0.16s ease, height 0.16s ease'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: dotRef,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99999,
      width: 4,
      height: 4,
      marginLeft: -2,
      marginTop: -2,
      borderRadius: '50%',
      background: 'rgba(52,184,112,1)',
      boxShadow: '0 0 6px 1px rgba(52,184,112,0.7)',
      pointerEvents: 'none',
      transition: 'transform 0.08s ease',
      willChange: 'transform'
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: ringRef,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99998,
      width: 20,
      height: 20,
      pointerEvents: 'none',
      transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s',
      willChange: 'transform'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerBase,
      top: 0,
      left: 0,
      borderTop: '1.5px solid',
      borderLeft: '1.5px solid'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerBase,
      top: 0,
      right: 0,
      borderTop: '1.5px solid',
      borderRight: '1.5px solid'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerBase,
      bottom: 0,
      left: 0,
      borderBottom: '1.5px solid',
      borderLeft: '1.5px solid'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerBase,
      bottom: 0,
      right: 0,
      borderBottom: '1.5px solid',
      borderRight: '1.5px solid'
    }
  })));
}
Object.assign(window, {
  CustomCursor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Cursor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Hero.jsx
try { (() => {
/* Portfolio UI kit — hero. Deep night surface with an interactive
   dot-matrix data field, accurate dev-tool marks, sharp CTAs, status strip. */

// ─── Dot-Matrix Data Field ──────────────────────────────────────────────────
// A structured grid of points whose brightness flows on a travelling wave,
// crossed by a slow diagnostic scan band and bloomed under the cursor.
function DotMatrix() {
  const cvRef = React.useRef(null);
  const st = React.useRef({
    mx: -9999,
    my: -9999,
    t: 0
  });
  React.useEffect(() => {
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');
    let W, H, cols, rows, raf, dpr;
    const GAP = 26;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / GAP) + 1;
      rows = Math.ceil(H / GAP) + 1;
    };
    const frame = () => {
      const {
        mx,
        my,
        t
      } = st.current;
      ctx.clearRect(0, 0, W, H);

      // diagonal diagnostic scan position
      const span = W + H + 400;
      const scan = t * 1.4 % span - 200;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP;
          const y = j * GAP;

          // travelling interference wave → base brightness
          let v = 0.5 + 0.5 * Math.sin(x * 0.010 + y * 0.006 + t * 0.020) * Math.cos(y * 0.011 - x * 0.004 - t * 0.014);
          v *= 0.5;

          // scan band highlight
          const sd = Math.abs(x + y - scan);
          if (sd < 100) v += (1 - sd / 100) * 0.28;

          // cursor bloom
          const dx = x - mx,
            dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 175) v += (1 - d / 175) * 0.95;
          v = v < 0 ? 0 : v > 1 ? 1 : v;
          const r = 0.5 + v * 2.2;
          const a = 0.05 + v * 0.55;
          const w = v > 0.6 ? (v - 0.6) / 0.4 : 0; // mix toward white at peaks
          const cr = 52 + w * 200 | 0;
          const cg = 184 + w * 71 | 0;
          const cb = 112 + w * 143 | 0;
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
    const onMouse = e => {
      const rct = cv.getBoundingClientRect();
      st.current.mx = e.clientX - rct.left;
      st.current.my = e.clientY - rct.top;
    };
    const onLeave = () => {
      st.current.mx = -9999;
      st.current.my = -9999;
    };
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
  return /*#__PURE__*/React.createElement("canvas", {
    ref: cvRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      display: 'block'
    }
  });
}

// ─── Sharp CTA Buttons ──────────────────────────────────────────────────────
function SharpCTA({
  children,
  onClick,
  href,
  variant
}) {
  const [hov, setHov] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const isPrimary = !variant || variant === 'primary';
  if (!isPrimary) {
    return /*#__PURE__*/React.createElement(Tag, {
      href: href,
      onClick: onClick,
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: hov ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
        borderBottom: `1px solid ${hov ? 'rgba(255,255,255,0.35)' : 'transparent'}`,
        transition: 'color 0.18s, border-color 0.18s',
        textDecoration: 'none',
        padding: '13px 0'
      }
    }, children, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        transform: hov ? 'translateX(4px)' : 'none',
        transition: 'transform 0.18s'
      }
    }, "\u2192"));
  }
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '13px 26px',
      cursor: 'pointer',
      textDecoration: 'none',
      border: `1px solid ${hov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)'}`,
      borderRadius: 2,
      background: hov ? '#fff' : 'rgba(255,255,255,0.05)',
      color: hov ? '#070a0b' : '#fff',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.09em',
      textTransform: 'uppercase',
      fontWeight: 500,
      transition: 'background 0.22s ease, color 0.22s, border-color 0.22s'
    }
  }, children, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    fill: "none",
    style: {
      transform: hov ? 'translate(2px,-2px)' : 'none',
      transition: 'transform 0.22s'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}

// ─── Dev-Tool Marks ─────────────────────────────────────────────────────────
// Claude — coral radial sunburst
const ClaudeIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 44 44",
  style: {
    display: 'block'
  }
}, Array.from({
  length: 11
}).map((_, i) => {
  const a = i / 11 * Math.PI * 2 - Math.PI / 2;
  const inner = 3.2,
    outer = 20;
  return /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: 22 + Math.cos(a) * inner,
    y1: 22 + Math.sin(a) * inner,
    x2: 22 + Math.cos(a) * outer,
    y2: 22 + Math.sin(a) * outer,
    stroke: "#D97757",
    strokeWidth: "3.2",
    strokeLinecap: "round"
  });
}));

// Cursor — faceted isometric cube
const CursorIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 44 44",
  style: {
    display: 'block'
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M22 4 L38 13 L22 22 L6 13 Z",
  fill: "#eceff1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 13 L22 22 L22 40 L6 31 Z",
  fill: "#878e94"
}), /*#__PURE__*/React.createElement("path", {
  d: "M38 13 L38 31 L22 40 L22 22 Z",
  fill: "#b6bcc0"
}));

// Codex — OpenAI six-fold bloom
const CodexIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 44 44",
  style: {
    display: 'block'
  }
}, /*#__PURE__*/React.createElement("g", {
  transform: "translate(22,22)",
  fill: "rgba(255,255,255,0.85)"
}, [0, 60, 120, 180, 240, 300].map(deg => /*#__PURE__*/React.createElement("rect", {
  key: deg,
  x: "-2.3",
  y: "-19",
  width: "4.6",
  height: "13",
  rx: "2.3",
  transform: `rotate(${deg})`
})), /*#__PURE__*/React.createElement("circle", {
  r: "2.5"
})));

// ─── Hero ────────────────────────────────────────────────────────────────────
function PortfolioHero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      minHeight: '92vh',
      overflow: 'hidden',
      background: 'var(--night-800)'
    }
  }, /*#__PURE__*/React.createElement(DotMatrix, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      background: 'radial-gradient(120% 90% at 50% 0%, transparent 38%, rgba(7,10,11,0.72) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      background: 'linear-gradient(90deg, rgba(7,10,11,0.78) 0%, rgba(7,10,11,0.35) 38%, transparent 64%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 1180,
      margin: '0 auto',
      padding: 'clamp(40px,8vh,100px) clamp(20px,5vw,56px) 160px',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--night-muted)'
    }
  }, "AI Engineer\xA0\xA0/\xA0\xA0New York")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(40px, 8vw, 88px)',
      lineHeight: 0.98,
      letterSpacing: '-0.035em',
      color: '#fff',
      margin: 0,
      maxWidth: '14ch'
    }
  }, "Nishant", /*#__PURE__*/React.createElement("br", null), "Sharma"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'clamp(16px, 2vw, 20px)',
      lineHeight: 1.6,
      color: 'var(--night-fg)',
      margin: '26px 0 0',
      maxWidth: 560
    }
  }, "AI engineer building production multi-agent systems \u2014 and studying exactly where they fail, so they fail less.", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--night-muted)'
    }
  }, "M.S. Computer Engineering, NYU Tandon \u201926.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 38,
      flexWrap: 'wrap',
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(SharpCTA, {
    onClick: () => onNav('work')
  }, "View the work"), /*#__PURE__*/React.createElement(SharpCTA, {
    variant: "ghost",
    onClick: () => onNav('contact')
  }, "Get in touch"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      borderTop: '1px solid var(--night-line)',
      background: 'linear-gradient(180deg, transparent, rgba(7,10,11,0.66))',
      backdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '16px clamp(20px,5vw,56px)',
      display: 'flex',
      gap: 'clamp(18px,5vw,56px)',
      flexWrap: 'wrap',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--night-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--night-faint)'
    }
  }, "Dev tools"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    title: "Claude Code",
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(ClaudeIcon, null)), /*#__PURE__*/React.createElement("span", {
    title: "Cursor",
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(CursorIcon, null)), /*#__PURE__*/React.createElement("span", {
    title: "Codex",
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(CodexIcon, null))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--night-faint)',
      fontSize: 10,
      letterSpacing: '0.06em'
    }
  }, "Claude Code \xB7 Cursor \xB7 Codex")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: '#fff'
    }
  }, "400+"), /*#__PURE__*/React.createElement("span", null, "Students mentored")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: '#fff'
    }
  }, "99.9%"), /*#__PURE__*/React.createElement("span", null, "Uptime shipped")))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes hpulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.8); }
        }
      `));
}
Object.assign(window, {
  PortfolioHero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Nav.jsx
try { (() => {
/* Portfolio UI kit — top navigation. Sticky, minimal, mono links.
   Loaded via browser Babel; exposes itself on window (no ESM export). */
function PortfolioNav({
  onNav,
  active
}) {
  const links = [['about', 'About'], ['work', 'Work'], ['research', 'Research'], ['skills', 'Skills'], ['contact', 'Contact']];
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('[data-scroll]') || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setSolid(y > 80);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(20px, 5vw, 56px)',
      height: 64,
      background: 'rgba(7,10,11,0.92)',
      backdropFilter: 'saturate(140%) blur(12px)',
      borderBottom: solid ? '1px solid var(--night-line)' : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('top'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'none',
      border: 0,
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--teal-400)',
      boxShadow: '0 0 10px var(--teal-400)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: '#fff'
    }
  }, "nishant.sh")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(14px, 2.4vw, 30px)'
    }
  }, links.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => onNav(id),
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      padding: '6px 0',
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      letterSpacing: '0.02em',
      color: active === id ? 'var(--teal-400)' : 'var(--night-muted)',
      transition: 'color 0.2s ease'
    },
    onMouseEnter: e => {
      if (active !== id) e.currentTarget.style.color = '#e8ecec';
    },
    onMouseLeave: e => {
      if (active !== id) e.currentTarget.style.color = 'var(--night-muted)';
    }
  }, label))));
}
Object.assign(window, {
  PortfolioNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Pet.jsx
try { (() => {
/* SitePet — "Bit" v3.
   • Walks floor, climbs walls, traverses ceiling
   • Click near pet → push-jump away from click point
   • Tail: only during walk / jump / wave
   • Arm: only during hover / wave / jump
   • Teal + violet accent. Quirky toast on hover. */

const MESSAGES = ["psst. you found me.", "error 404: social skills not found", "running on coffee + stack traces", "git blame → it was always me", "don't deploy me on fridays", "technically i'm not a feature", "my neural weights are just vibes", "i passed the tests. locally.", "yes i bite. only null refs though.", "compiling feelings... done. empty.", "i've read your resume. impressive.", "agent autonomy level: mostly.", "this site was built in 13 days. i helped.", "singularity is live btw.", "ineedajob.pro helped real humans."];
function SitePet() {
  const cvRef = React.useRef(null);
  const toastRef = React.useRef(null);
  React.useEffect(() => {
    const cv = cvRef.current;
    const toast = toastRef.current;
    if (!cv || !toast) return;
    const ctx = cv.getContext('2d');
    let raf, W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const M = 56;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── state ─────────────────────────────────────────────────────────
    const pet = {
      x: W * 0.28,
      y: 0,
      surface: 'floor',
      sDir: 1,
      speed: 0.78,
      walkCycle: 0,
      mode: 'walk',
      modeTimer: 0,
      idleFor: 0,
      blinkTimer: 110 + Math.random() * 80,
      blinkFrame: -1,
      mx: -9999,
      my: -9999,
      near: false,
      // wave
      waving: false,
      waveFrame: 0,
      waveCooldown: 0,
      // toast
      toastActive: false,
      toastFrame: 0,
      msgIdx: Math.floor(Math.random() * MESSAGES.length),
      // jump (floor only)
      jumping: false,
      jumpVy: 0,
      jumpVx: 0,
      jumpOff: 0
    };
    pet.y = H - M;

    // ── surface helpers ────────────────────────────────────────────────
    const surfaceRot = {
      floor: 0,
      rightWall: -Math.PI / 2,
      ceiling: Math.PI,
      leftWall: Math.PI / 2
    };
    const CLIMB_PROB = 0.38;
    function moveAlongSurface() {
      if (pet.jumping && pet.surface === 'floor') return; // jump handles x
      const spd = pet.mode === 'walk' ? pet.speed : 0;
      if (pet.surface === 'floor') pet.x += spd * pet.sDir;
      if (pet.surface === 'rightWall') pet.y -= spd * pet.sDir;
      if (pet.surface === 'ceiling') pet.x -= spd * pet.sDir;
      if (pet.surface === 'leftWall') pet.y += spd * pet.sDir;
    }
    function handleCorners() {
      const s = pet.surface,
        d = pet.sDir;
      if (s === 'floor') {
        if (d === 1 && pet.x >= W - M) {
          Math.random() < CLIMB_PROB ? (pet.surface = 'rightWall', pet.x = W - M, pet.y = H - M, pet.sDir = 1) : (pet.sDir = -1, pet.x = W - M);
        }
        if (d === -1 && pet.x <= M) {
          Math.random() < CLIMB_PROB ? (pet.surface = 'leftWall', pet.x = M, pet.y = H - M, pet.sDir = -1) : (pet.sDir = 1, pet.x = M);
        }
      } else if (s === 'rightWall') {
        if (d === 1 && pet.y <= M) {
          Math.random() < CLIMB_PROB ? (pet.surface = 'ceiling', pet.y = M, pet.x = W - M, pet.sDir = 1) : (pet.sDir = -1, pet.y = M);
        }
        if (d === -1 && pet.y >= H - M) {
          pet.surface = 'floor';
          pet.y = H - M;
          pet.x = W - M;
          pet.sDir = -1;
        }
      } else if (s === 'ceiling') {
        if (d === 1 && pet.x <= M) {
          Math.random() < CLIMB_PROB ? (pet.surface = 'leftWall', pet.x = M, pet.y = M, pet.sDir = 1) : (pet.sDir = -1, pet.x = M);
        }
        if (d === -1 && pet.x >= W - M) {
          Math.random() < CLIMB_PROB ? (pet.surface = 'rightWall', pet.x = W - M, pet.y = M, pet.sDir = -1) : (pet.sDir = 1, pet.x = W - M);
        }
      } else if (s === 'leftWall') {
        if (d === 1 && pet.y >= H - M) {
          pet.surface = 'floor';
          pet.y = H - M;
          pet.x = M;
          pet.sDir = 1;
        }
        if (d === -1 && pet.y <= M) {
          Math.random() < CLIMB_PROB ? (pet.surface = 'ceiling', pet.y = M, pet.x = M, pet.sDir = -1) : (pet.sDir = 1, pet.y = M);
        }
      }
    }

    // ── draw helpers ──────────────────────────────────────────────────
    function glow(c, b) {
      ctx.shadowColor = c;
      ctx.shadowBlur = b;
    }
    function ng() {
      ctx.shadowBlur = 0;
    }
    function rrect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    // ── draw ──────────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const {
        x,
        y,
        surface,
        sDir,
        walkCycle,
        mode,
        blinkFrame,
        waving,
        waveFrame,
        near,
        jumping,
        jumpOff
      } = pet;
      const rot = surfaceRot[surface];
      const BW = 54,
        BH = 28;

      // jump Y offset perpendicular to surface (negative = away from surface)
      // For floor, perpendicular is upward (negative screen Y)
      let perpOff = surface === 'floor' ? jumpOff : 0; // only floor jumps for now

      // wave bob
      let waveBob = waving ? -Math.abs(Math.sin(waveFrame * 0.22)) * 10 : 0;
      ctx.save();
      ctx.translate(x, y + perpOff + waveBob);
      ctx.rotate(rot);
      ctx.scale(sDir, 1);

      // ── TAIL — only walk / wave / jump ─────────────────────────────
      const showTail = mode === 'walk' || waving || jumping;
      if (showTail) {
        const wag = jumping ? Math.sin(waveFrame * 0.5) * 0.6 : mode === 'walk' ? Math.sin(walkCycle * 1.6) * 0.35 : Math.sin(Date.now() * 0.002) * 0.14;
        ctx.save();
        ctx.translate(BW / 2, 2);
        ctx.rotate(wag);
        ctx.strokeStyle = 'rgba(52,184,112,0.38)';
        ctx.lineWidth = 2.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(14, 6, 20, -3);
        ctx.stroke();
        glow('rgba(52,184,112,0.85)', 9);
        ctx.beginPath();
        ctx.arc(20, -3, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#34b870';
        ctx.fill();
        ng();
        ctx.restore();
      }

      // ── LEGS ──────────────────────────────────────────────────────
      ng();
      [-17, 0, 17].forEach((lx, i) => {
        const phase = i / 3 * Math.PI * 2;
        const waveSwg = waving ? Math.sin(waveFrame * 0.35 + i * 1.2) * 28 : 0;
        const walkSwg = mode === 'walk' ? Math.sin(walkCycle + phase) * 24 : 0;
        // kick out legs on jump
        const jumpSwg = jumping ? (i - 1) * Math.sin(jumpOff * 0.05) * 18 : 0;
        const swing = walkSwg + waveSwg + jumpSwg;
        ctx.save();
        ctx.translate(lx, BH / 2 - 3);
        ctx.rotate(swing * Math.PI / 180);
        // two-segment leg
        const seg = 7;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(2, seg);
        ctx.lineTo(0, seg * 2);
        ctx.strokeStyle = 'rgba(52,184,112,0.58)';
        ctx.lineWidth = 2.6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        glow('rgba(52,184,112,0.35)', 5);
        ctx.beginPath();
        ctx.arc(0, seg * 2, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52,184,112,0.45)';
        ctx.fill();
        ng();
        ctx.restore();
      });

      // ── ANTENNAE ──────────────────────────────────────────────────
      const antSwing = waving ? Math.sin(waveFrame * 0.4) * 0.38 : 0;

      // left → teal
      ctx.save();
      ctx.translate(-13, -BH / 2 + 1);
      ctx.rotate(antSwing);
      ctx.strokeStyle = 'rgba(52,184,112,0.38)';
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-5, -11, -3, -20);
      ctx.stroke();
      glow('rgba(52,184,112,1)', near || waving ? 14 : 7);
      ctx.beginPath();
      ctx.arc(-3, -20, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = near || waving ? '#34b870' : 'rgba(52,184,112,0.8)';
      ctx.fill();
      ng();
      ctx.restore();

      // right → violet
      ctx.save();
      ctx.translate(10, -BH / 2 + 2);
      ctx.rotate(-antSwing);
      ctx.strokeStyle = 'rgba(52,184,112,0.38)';
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(6, -9, 4, -17);
      ctx.stroke();
      glow('rgba(52,184,112,0.9)', near || waving ? 12 : 5);
      ctx.beginPath();
      ctx.arc(4, -17, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = near || waving ? '#34b870' : 'rgba(52,184,112,0.75)';
      ctx.fill();
      ng();
      ctx.restore();

      // ── BODY ──────────────────────────────────────────────────────
      glow('rgba(52,184,112,0.14)', 18);
      rrect(-BW / 2, -BH / 2, BW, BH, 11);
      ctx.fillStyle = '#0a0d11';
      ctx.fill();
      ng();
      ctx.strokeStyle = near || waving || jumping ? 'rgba(52,184,112,0.9)' : 'rgba(52,184,112,0.48)';
      ctx.lineWidth = 1.4;
      rrect(-BW / 2, -BH / 2, BW, BH, 11);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(52,184,112,0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(18, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── EYES ──────────────────────────────────────────────────────
      const blinkY = blinkFrame >= 0 ? Math.sin(blinkFrame / 5 * Math.PI) : 0;
      const eyeR = 9;
      let px = mode === 'walk' ? 2.5 : 0;
      if (near) px = Math.max(-3, Math.min(3, (pet.mx - x) * sDir * 0.04));
      if (jumping) px = pet.jumpVx > 0 ? -2.5 : 2.5; // look back in surprise

      [-15, 7].forEach(ex => {
        ctx.save();
        ctx.translate(ex, -2);
        ctx.scale(1, 1 - blinkY * 0.9);
        ctx.beginPath();
        ctx.arc(0, 0, eyeR, 0, Math.PI * 2);
        ctx.fillStyle = '#111827';
        ctx.fill();
        ctx.strokeStyle = 'rgba(52,184,112,0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        glow('rgba(52,184,112,0.5)', 4);
        ctx.beginPath();
        ctx.arc(px, 0, 5.2, 0, Math.PI * 2);
        ctx.fillStyle = near || waving || jumping ? 'rgba(52,184,112,0.95)' : 'rgba(52,184,112,0.7)';
        ctx.fill();
        ng();
        ctx.beginPath();
        ctx.arc(px, 0, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = '#020408';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px - 1.5, -1.5, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.fill();
        ctx.restore();
      });

      // ── ARM — only when near / waving / jumping ────────────────────
      const showArm = near || waving || jumping;
      if (showArm) {
        const armAngle = waving ? -0.6 - Math.abs(Math.sin(waveFrame * 0.28)) * 1.1 : jumping ? -0.8 - Math.abs(Math.sin(Date.now() * 0.025)) * 0.4 : -0.4 - Math.sin(Date.now() * 0.004) * 0.2;
        ctx.save();
        ctx.translate(-BW / 2 + 4, 2);
        ctx.rotate(armAngle);
        ctx.strokeStyle = 'rgba(52,184,112,0.55)';
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-16, -8);
        ctx.stroke();
        // hand blob
        glow('rgba(52,184,112,0.5)', 7);
        ctx.beginPath();
        ctx.arc(-16, -8, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52,184,112,0.6)';
        ctx.fill();
        ng();
        ctx.restore();
      }

      // ── "Hi!" text while waving ────────────────────────────────────
      if (waving && waveFrame < 55) {
        const a = Math.min(1, waveFrame / 8) * (1 - Math.max(0, (waveFrame - 42) / 13));
        ctx.save();
        ctx.rotate(-rot);
        ctx.scale(sDir, 1);
        ctx.globalAlpha = a;
        ctx.font = "700 13px 'IBM Plex Mono', monospace";
        ctx.fillStyle = '#34b870';
        ctx.textAlign = 'center';
        ctx.fillText('hi!', 0, -BH / 2 - 28);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      ctx.restore();
    }

    // ── toast ─────────────────────────────────────────────────────────
    function showToast(msg) {
      toast.textContent = msg;
      toast.style.opacity = '1';
    }
    function hideToast() {
      toast.style.opacity = '0';
    }
    function posToast() {
      const tw = Math.min(toast.offsetWidth || 180, 220);
      let tx = pet.x - tw / 2,
        ty = pet.y + pet.jumpOff - 96;
      if (tx < 8) tx = 8;
      if (tx + tw > W - 8) tx = W - 8 - tw;
      if (ty < 8) ty = pet.y + 68;
      toast.style.left = tx + 'px';
      toast.style.top = ty + 'px';
    }

    // ── update ────────────────────────────────────────────────────────
    function update() {
      // ── jump physics (floor only) ───────────────────────────────
      if (pet.jumping && pet.surface === 'floor') {
        pet.jumpOff += pet.jumpVy;
        pet.jumpVy += 0.44; // gravity
        pet.x += pet.jumpVx;
        // bounce off sides
        if (pet.x < M) {
          pet.x = M;
          pet.jumpVx = Math.abs(pet.jumpVx);
        }
        if (pet.x > W - M) {
          pet.x = W - M;
          pet.jumpVx = -Math.abs(pet.jumpVx);
        }
        if (pet.jumpOff >= 0) {
          pet.jumpOff = 0;
          pet.jumpVy = 0;
          pet.jumpVx = 0;
          pet.jumping = false;
        }
        pet.walkCycle += 0.22;
      } else {
        // normal walk / idle
        if (pet.mode === 'walk') {
          pet.walkCycle += 0.14;
          moveAlongSurface();
          handleCorners();
          pet.modeTimer++;
          if (pet.surface === 'floor' && pet.modeTimer > 260 + Math.random() * 360) {
            pet.mode = 'idle';
            pet.modeTimer = 0;
            pet.idleFor = 70 + Math.floor(Math.random() * 130);
          }
        } else {
          pet.walkCycle += 0.04;
          pet.modeTimer++;
          if (pet.modeTimer > pet.idleFor) {
            pet.mode = 'walk';
            pet.modeTimer = 0;
            if (Math.random() > 0.45) pet.sDir *= -1;
          }
        }
      }

      // blink
      pet.blinkTimer--;
      if (pet.blinkTimer <= 0) {
        pet.blinkFrame = 0;
        pet.blinkTimer = 130 + Math.random() * 160;
      }
      if (pet.blinkFrame >= 0) {
        pet.blinkFrame++;
        if (pet.blinkFrame > 5) pet.blinkFrame = -1;
      }

      // proximity / hover
      const md = Math.hypot(pet.x - pet.mx, pet.y + pet.jumpOff - pet.my);
      pet.near = md < 90;
      if (pet.waveCooldown > 0) pet.waveCooldown--;
      if (pet.near && !pet.waving && pet.waveCooldown === 0) {
        pet.waving = true;
        pet.waveFrame = 0;
        pet.msgIdx = (pet.msgIdx + 1) % MESSAGES.length;
        showToast(MESSAGES[pet.msgIdx]);
        pet.toastActive = true;
        pet.toastFrame = 0;
      }
      if (pet.waving) {
        pet.waveFrame++;
        if (pet.waveFrame > 68) {
          pet.waving = false;
          pet.waveCooldown = 230;
        }
      }
      if (pet.toastActive) {
        pet.toastFrame++;
        posToast();
        if (pet.toastFrame > 210) {
          hideToast();
          pet.toastActive = false;
        }
      }
      draw();
      raf = requestAnimationFrame(update);
    }
    update();

    // ── events ────────────────────────────────────────────────────────
    const onResize = () => {
      resize();
      if (!pet.jumping) pet.y = H - M;
    };
    const onMouse = e => {
      pet.mx = e.clientX;
      pet.my = e.clientY;
    };
    const onLeave = () => {
      pet.mx = -9999;
      pet.my = -9999;
    };
    const onClick = e => {
      if (pet.surface !== 'floor') return;
      const d = Math.hypot(pet.x - e.clientX, pet.y - e.clientY);
      if (d > 70) return; // only react if click near pet
      e.stopPropagation();
      // push direction: away from click horizontally
      const clickOnRight = e.clientX > pet.x;
      pet.jumping = true;
      pet.jumpVy = -10.5; // upward kick
      pet.jumpVx = clickOnRight ? -2.4 : 2.4; // fly away from click
      pet.jumpOff = 0;
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse, {
      passive: true
    });
    window.addEventListener('click', onClick, {
      capture: true
    });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('click', onClick, {
        capture: true
      });
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("canvas", {
    ref: cvRef,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9991,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: toastRef,
    style: {
      position: 'fixed',
      zIndex: 9992,
      pointerEvents: 'none',
      background: 'rgba(7,10,11,0.93)',
      border: '1px solid rgba(52,184,112,0.26)',
      borderRadius: 4,
      padding: '8px 14px',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'rgba(232,236,236,0.88)',
      opacity: 0,
      transition: 'opacity 0.28s ease',
      maxWidth: 220,
      lineHeight: 1.58,
      boxShadow: '0 4px 24px rgba(52,184,112,0.08)'
    }
  }));
}
Object.assign(window, {
  SitePet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Pet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Research.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Portfolio UI kit — Research. Violet-toned ProjectCards. */
function PortfolioResearch() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const {
    SectionHeader,
    ProjectCard
  } = DS;
  const papers = [{
    title: 'Spectral Gradient Equalization (SGE)',
    meta: 'Advanced ML · NYU Tandon',
    period: 'Spring 2026',
    description: 'A gradient-level intervention for spurious-correlation mitigation in CNNs. Shortcut learning shows up as frequency-dominant gradient energy; SGE applies a 2D FFT over kernel dimensions post-backprop and attenuates the spurious band — without group labels at training time.',
    metrics: [{
      value: '+3.1pp',
      label: 'Worst-group acc'
    }, {
      value: '+2.5pp',
      label: 'Post-DFR gain'
    }],
    stack: ['PyTorch', 'ResNet-18', 'Waterbirds', 'GroupDRO', 'JTT', 'DFR']
  }, {
    title: 'SMOLSolver — Verifier-Guided Reasoning',
    meta: 'Team (5) · NYU Tandon',
    period: 'Sep – Dec 2025',
    description: 'Lightweight dual-model framework for step-level math reasoning verification. I built the Verifier end-to-end: TinyLLaMA fine-tuned on PRM800K via 2-phase LoRA for step-level correctness.',
    metrics: [{
      value: '87.9%',
      label: 'Step accuracy'
    }, {
      value: '64.1%',
      label: 'Generator Pass@1'
    }],
    stack: ['QLoRA', 'TinyLLaMA', 'Phi-2', 'PRM800K', 'GSM8K'],
    links: [{
      label: 'paper ↗',
      href: '#'
    }]
  }, {
    title: 'Cross-Domain Robustness in Super-Resolution',
    meta: 'Team · NYU Tandon',
    period: 'Sep – Dec 2025',
    description: 'Benchmarked EDSR, SwinIR, and Stable Diffusion x4 across natural, scene-text, and astronomical datasets. Introduced the Cross-Domain Drop (CDD) metric; diffusion models exhibit catastrophic CDD on text.',
    stack: ['EDSR', 'SwinIR', 'Stable Diffusion', 'DIV2K', 'TextZoom'],
    links: [{
      label: 'paper ↗',
      href: '#'
    }]
  }, {
    title: 'Jailbreaking Deep Vision Models',
    meta: 'Team · NYU Tandon',
    period: 'May 2025',
    description: 'FGSM, I-FGSM, PGD, and patch attacks on ResNet-34 under a strict L∞ constraint. PGD dropped Top-1 from 76% to 0.2%; confirmed black-box transfer to DenseNet-121.',
    stack: ['PyTorch', 'ResNet-34', 'PGD', 'FGSM', 'DenseNet-121'],
    links: [{
      label: 'paper ↗',
      href: '#'
    }]
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "research",
    "data-theme": "night",
    style: {
      background: 'var(--night-900)',
      padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,56px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    index: "03",
    kicker: "Papers & experiments",
    title: "Research"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
      gap: 22
    }
  }, papers.map((p, i) => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: i,
    tone: "violet"
  }, p))))));
}
Object.assign(window, {
  PortfolioResearch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Research.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Skills.jsx
try { (() => {
/* Portfolio UI kit — Skills. Night surface with the interactive
   SkillConstellation; clicking a node updates a mono readout. */
function PortfolioSkills() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const {
    SkillConstellation
  } = DS;
  const [picked, setPicked] = React.useState(null);
  const groups = [['AI / ML', 'RAG · Multi-agent orchestration · LoRA/QLoRA · RLHF · LangGraph · DSPy · Qdrant · fastembed/ONNX'], ['Backend', 'FastAPI · PostgreSQL · Redis · ARQ · Celery · WebSockets · SSE · gRPC · Node.js'], ['Infra', 'Docker · Kubernetes · AWS (EC2/S3/RDS/CloudFront) · Terraform · Ansible · Prometheus · Grafana'], ['Research', 'PyTorch · HuggingFace PEFT · Robustness · Adversarial ML · MLflow']];
  return /*#__PURE__*/React.createElement("section", {
    id: "skills",
    "data-theme": "night",
    style: {
      background: 'var(--night-800)',
      padding: 'clamp(56px,9vh,104px) clamp(20px,5vw,56px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--teal-400)'
    }
  }, "04"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--night-faint)'
    }
  }, "Knowledge graph"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--night-line)'
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-title)',
      color: '#fff',
      margin: '0 0 6px'
    }
  }, "Skills"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body)',
      color: 'var(--night-muted)',
      maxWidth: 520
    }
  }, "Not progress bars \u2014 a graph. Hover a node to trace what connects to what; the stack is one system, not a list."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)',
      gap: 'clamp(20px,4vw,48px)',
      marginTop: 32,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 440,
      border: '1px solid var(--night-line)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--night-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SkillConstellation, {
    onSelect: setPicked,
    zoom: 1.3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, groups.map(([title, body]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      padding: '16px 18px',
      border: '1px solid var(--night-line)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--night-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--teal-400)',
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body)',
      fontSize: 13,
      color: 'var(--night-muted)',
      lineHeight: 1.7
    }
  }, body)))))));
}
Object.assign(window, {
  PortfolioSkills
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Skills.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Work.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Portfolio UI kit — Selected Work. Agentic systems featured first,
   other projects grid, then professional work experience. */
function PortfolioWork() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const {
    SectionHeader,
    ProjectCard
  } = DS;
  const agenticSystems = [{
    featured: true,
    title: 'Singularity — AI Deep Research Platform',
    meta: 'Solo · ~25,500 LOC · shipped in 13 days',
    period: 'Mar 2026 – Apr 2026',
    description: 'A production multi-agent research platform that plans before it retrieves. Open-ended queries against a vector store produce semantically similar results, not relevant ones — the fix is structural: agents construct a full report plan first, and every query targets a planned section.',
    metrics: [{
      value: '44',
      label: 'Auto-reg skills'
    }, {
      value: '18',
      label: 'Retrieval sources'
    }, {
      value: '10',
      label: 'Models · BYOK'
    }],
    stack: ['FastAPI', 'ARQ', 'LangGraph', 'Qdrant', 'fastembed/ONNX', 'Redis', 'Postgres 16', 'Next.js 16', 'AWS'],
    links: [{
      label: 'open ↗',
      href: 'https://singularity.hellonish.dev'
    }]
  }, {
    title: 'ineedajob.pro — AI Career Intelligence',
    meta: 'Solo',
    period: 'Jan 2026 – May 2026',
    description: 'Most resume-to-job matching tells you how similar two texts are, not whether you actually qualify. A 6-step wave-parallelized LLM pipeline streams each result over WebSocket as it completes — JobLens agent handles user profile matching, resume tailoring, and autonomous outreach in one click.',
    stack: ['FastAPI', 'Celery', 'WebSockets', 'Instructor', 'Pydantic', 'Gemini', 'DeepSeek', 'Next.js', 'AWS EC2'],
    links: [{
      label: 'open ↗',
      href: 'https://ineedajob.pro'
    }]
  }];
  const otherProjects = [{
    title: 'Finassistant — Multi-Agent Financial Research',
    meta: 'Solo',
    period: 'Nov 2025 – Dec 2025',
    description: 'Dual-mode LangGraph system: a fast Chat mode (2–4 calls) and a deliberate Think mode (Planner → Financial Agent → Publisher with self-correction). 18+ financial tools and a SEC-filing RAG pipeline with sub-200ms vector search.',
    stack: ['LangGraph', 'FastAPI', 'ChromaDB', 'MongoDB', 'Gemini', 'AWS'],
    links: [{
      label: 'source ↗',
      href: 'https://github.com/hellonish/Finassistant'
    }]
  }, {
    title: 'Snap2Caption — ML Systems for Captioning',
    meta: 'Team · MLOps',
    period: 'Mar 2025 – May 2025',
    description: 'Fine-tuned LLaVA-1.5/1.6 (7B) with LoRA on 100k urban images. Full IaC stack — Terraform, Ansible, Kubernetes via Kubespray — with a feedback-to-retraining loop and Prometheus/Grafana monitoring.',
    stack: ['LLaVA', 'LoRA', 'PyTorch', 'MLflow', 'Terraform', 'Kubernetes'],
    links: [{
      label: 'source ↗',
      href: 'https://github.com/hellonish/Snap2Caption'
    }]
  }];
  const experience = [{
    company: 'Ingelt Study Abroad',
    url: 'https://ingelt.com',
    role: 'Lead Software Engineer',
    period: 'Sep 2023 — Aug 2024',
    highlights: ['Designed and scaled a unified multi-tenant backend (Node.js, PostgreSQL, Firebase Auth, AWS) serving 500+ clients and ~10K daily requests', 'Implemented automated Jenkins CI/CD pipelines with testing, build, and zero-downtime EC2 deployments; eliminated manual operations'],
    stack: ['Node.js', 'PostgreSQL', 'Firebase', 'AWS', 'REST APIs', 'Jenkins', 'WebSockets', 'Redis']
  }, {
    company: 'Macverin Technologies',
    url: 'https://macverin.io',
    role: 'Founding Engineer',
    period: 'Jul 2022 — Aug 2023',
    highlights: ['Led architecture and delivery of 12 client platforms across transport, visa consulting, and operations domains using Node.js, FastAPI, React, and PostgreSQL', 'Built scalable cloud deployments on AWS EC2 and Docker supporting 1K+ daily active users; integrated Stripe, Firebase Auth, and Google Maps'],
    stack: ['Node.js', 'React', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'Stripe', 'Google Maps']
  }];
  const SubLabel = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '36px 0 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '4px 10px',
      border: '1px solid var(--accent)',
      borderRadius: 2,
      color: 'var(--accent)'
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    "data-theme": "night",
    style: {
      background: 'var(--night-800)',
      padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,56px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    index: "02",
    kicker: "Selected work",
    title: "Projects & Experience"
  }), /*#__PURE__*/React.createElement(SubLabel, null, "Agentic Systems"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, agenticSystems.map((p, i) => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: i
  }, p)))), /*#__PURE__*/React.createElement(SubLabel, null, "Other Projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))',
      gap: 18
    }
  }, otherProjects.map((p, i) => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: i
  }, p)))), /*#__PURE__*/React.createElement(SubLabel, null, "Work Experience"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(440px,1fr))',
      gap: 18
    }
  }, experience.map(({
    company,
    url,
    role,
    period,
    highlights,
    stack
  }) => /*#__PURE__*/React.createElement("div", {
    key: company,
    style: {
      padding: '24px 26px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 17,
      color: 'var(--text-strong)'
    }
  }, company), /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noreferrer",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)',
      textDecoration: 'none',
      opacity: 0.8
    }
  }, "\u2197")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)',
      letterSpacing: '0.02em'
    }
  }, role)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      paddingTop: 2
    }
  }, period)), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 14px',
      paddingLeft: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, highlights.map((h, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.65
    }
  }, h))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, stack.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      padding: '3px 7px',
      border: '1px solid var(--border)',
      borderRadius: 3,
      color: 'var(--text-muted)'
    }
  }, t))))))));
}
Object.assign(window, {
  PortfolioWork
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Work.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ArchitectureFlow = __ds_scope.ArchitectureFlow;

__ds_ns.GlassLens = __ds_scope.GlassLens;

__ds_ns.MagneticButton = __ds_scope.MagneticButton;

__ds_ns.ParticleField = __ds_scope.ParticleField;

__ds_ns.SkillConstellation = __ds_scope.SkillConstellation;

__ds_ns.TiltCard = __ds_scope.TiltCard;

})();
