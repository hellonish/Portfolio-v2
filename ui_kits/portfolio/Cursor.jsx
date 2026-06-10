/* Custom cursor — targeting reticle. Center dot + lagged corner-bracket ring.
   Expands + brightens on hover. Fits the dot-matrix / terminal aesthetic. */

function CustomCursor() {
  const dotRef  = React.useRef(null);
  const ringRef = React.useRef(null);
  const pos     = React.useRef({ x: -200, y: -200 });
  const lag     = React.useRef({ x: -200, y: -200 });
  const hov     = React.useRef(false);
  const clicking = React.useRef(false);

  React.useEffect(() => {
    // hide system cursor globally
    const styleEl = document.createElement('style');
    styleEl.id = '__custom-cursor-style';
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleEl);

    let raf;

    const onMove  = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onDown  = () => {
      clicking.current = true;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${pos.current.x}px,${pos.current.y}px) scale(1.8)`;
      if (ringRef.current) ringRef.current.dataset.click = '1';
      setTimeout(() => {
        clicking.current = false;
        if (ringRef.current) delete ringRef.current.dataset.click;
      }, 220);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, [tabindex]')) {
        hov.current = true;
      }
    };
    const onOut  = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, [tabindex]')) {
        hov.current = false;
      }
    };

    const tick = () => {
      const { x, y } = pos.current;
      lag.current.x += (x - lag.current.x) * 0.12;
      lag.current.y += (y - lag.current.y) * 0.12;
      const lx = lag.current.x, ly = lag.current.y;
      const isHov = hov.current;

      if (dotRef.current && !clicking.current) {
        dotRef.current.style.transform  = `translate(${x}px,${y}px) scale(1)`;
      }
      if (ringRef.current) {
        const sz  = isHov ? 32 : 20;
        const off = sz / 2;
        ringRef.current.style.transform = `translate(${lx - off}px,${ly - off}px)`;
        ringRef.current.style.width     = sz + 'px';
        ringRef.current.style.height    = sz + 'px';
        // corner arm length proportional to ring size
        const arm = Math.round(sz * 0.28);
        ringRef.current.querySelectorAll('span').forEach(s => {
          s.style.width  = arm + 'px';
          s.style.height = arm + 'px';
        });
        ringRef.current.style.opacity = isHov ? '1' : '0.72';
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMove,   { passive: true });
    window.addEventListener('mousedown', onDown,   { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout',  onOut,  { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      styleEl.remove();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
    };
  }, []);

  const cornerBase = {
    position: 'absolute',
    width: 6, height: 6,
    borderColor: 'rgba(52,184,112,0.9)',
    transition: 'width 0.16s ease, height 0.16s ease',
  };

  return (
    <>
      {/* center dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 4, height: 4, marginLeft: -2, marginTop: -2,
        borderRadius: '50%',
        background: 'rgba(52,184,112,1)',
        boxShadow: '0 0 6px 1px rgba(52,184,112,0.7)',
        pointerEvents: 'none',
        transition: 'transform 0.08s ease',
        willChange: 'transform',
      }} />

      {/* corner-bracket reticle ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: 20, height: 20,
        pointerEvents: 'none',
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s',
        willChange: 'transform',
      }}>
        {/* top-left */}
        <span style={{ ...cornerBase, top: 0, left: 0,
          borderTop: '1.5px solid', borderLeft: '1.5px solid' }} />
        {/* top-right */}
        <span style={{ ...cornerBase, top: 0, right: 0,
          borderTop: '1.5px solid', borderRight: '1.5px solid' }} />
        {/* bottom-left */}
        <span style={{ ...cornerBase, bottom: 0, left: 0,
          borderBottom: '1.5px solid', borderLeft: '1.5px solid' }} />
        {/* bottom-right */}
        <span style={{ ...cornerBase, bottom: 0, right: 0,
          borderBottom: '1.5px solid', borderRight: '1.5px solid' }} />
      </div>
    </>
  );
}

Object.assign(window, { CustomCursor });
