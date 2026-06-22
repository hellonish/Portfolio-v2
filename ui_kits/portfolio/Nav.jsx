/* Portfolio UI kit — top navigation. Sticky, minimal, mono links.
   Loaded via browser Babel; exposes itself on window (no ESM export). */
function PortfolioNav({ onNav, active }) {
  const links = [
    ['about', 'About'], ['work', 'Work'], ['research', 'Research'],
    ['skills', 'Skills'], ['contact', 'Contact'],
  ];
  const [solid, setSolid] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const el = document.querySelector('[data-scroll]') || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setSolid(y > 80);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    onNav(id);
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(20px, 5vw, 56px)', height: 64,
      background: (solid || menuOpen) ? 'rgba(7,10,11,0.95)' : 'transparent',
      backdropFilter: (solid || menuOpen) ? 'saturate(140%) blur(12px)' : 'none',
      borderBottom: (solid || menuOpen) ? '1px solid var(--night-line)' : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <button onClick={() => handleNav('top')} style={{
        display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 0,
        cursor: 'pointer', padding: 0,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--teal-400)', boxShadow: '0 0 10px var(--teal-400)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: '#fff' }}>nishant.sh</span>
      </button>

      {/* Desktop links */}
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.4vw, 30px)' }}>
        {links.map(([id, label]) => (
          <button key={id} onClick={() => handleNav(id)} style={{
            background: 'none', border: 0, cursor: 'pointer', padding: '6px 0',
            fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.02em',
            color: active === id ? 'var(--teal-400)' : 'var(--night-muted)',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => { if (active !== id) e.currentTarget.style.color = '#e8ecec'; }}
          onMouseLeave={(e) => { if (active !== id) e.currentTarget.style.color = 'var(--night-muted)'; }}
          >{label}</button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} style={{
        display: 'none', background: 'none', border: 0, cursor: 'pointer',
        padding: 8, color: '#fff',
      }}>
        {menuOpen
          ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        }
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: 'rgba(7,10,11,0.97)', backdropFilter: 'blur(16px)',
          padding: '40px 32px', display: 'flex', flexDirection: 'column',
          gap: 32, zIndex: 99, alignItems: 'flex-start',
        }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => handleNav(id)} style={{
              background: 'none', border: 0, cursor: 'pointer', padding: '4px 0',
              fontFamily: 'var(--font-mono)', fontSize: 20, letterSpacing: '0.04em',
              color: active === id ? 'var(--teal-400)' : '#e8ecec',
            }}>{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
Object.assign(window, { PortfolioNav });
