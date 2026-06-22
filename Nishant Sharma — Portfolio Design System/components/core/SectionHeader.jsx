import React from 'react';

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

    const tick = (now) => {
      if (now < start) { rafRef.current = requestAnimationFrame(tick); return; }
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

  React.useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return [text, run];
}

export function SectionHeader({ index, kicker, title, align = 'left', style = {} }) {
  const containerRef = React.useRef(null);
  const triggeredRef = React.useRef(false);
  const hoverCooldown = React.useRef(false);

  const [indexText, runIndex]   = useScramble(index  ?? '');
  const [kickerText, runKicker] = useScramble(kicker ?? '');
  const [titleText,  runTitle]  = useScramble(title  ?? '');

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
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const handleMouseEnter = React.useCallback(() => {
    if (hoverCooldown.current) return;
    hoverCooldown.current = true;
    trigger();
    setTimeout(() => { hoverCooldown.current = false; }, 1200);
  }, [trigger]);

  return (
    <header ref={containerRef} style={{ textAlign: align, ...style }}
      onMouseEnter={handleMouseEnter}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        {index != null && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.08em',
          }}>{indexText}</span>
        )}
        {kicker && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)',
          }}>{kickerText}</span>
        )}
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <h2 style={{
        font: 'var(--text-title)', color: 'var(--text-strong)', margin: 0,
        letterSpacing: 'var(--ls-snug)',
      }}>{titleText}</h2>
    </header>
  );
}
