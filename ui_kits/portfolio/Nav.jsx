/* Portfolio UI kit — top navigation. Sticky, minimal, mono links.
   Loaded via browser Babel; exposes itself on window (no ESM export). */
function PortfolioNav({ onNav, active }) {
  const links = [
    ['about', 'About'], ['projects', 'Projects'], ['work', 'Work'],
    ['research', 'Research'], ['skills', 'Skills'], ['contact', 'Contact'],
    ['blog', 'Blog']
  ];
  const [solid, setSolid] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const el = document.getElementById('app') || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setSolid(y > 80);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    if (id === 'blog') {
      window.location.href = '/blog.html';
      return;
    }
    onNav(id);
  };

  return (
    <div style={{ position: 'sticky', top: 24, zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <nav style={{
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 48, width: 'min(960px, 100% - 32px)',
        background: 'rgba(7,10,11,0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--accent)',
        borderRadius: '4px',
        boxShadow: 'none',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <button onClick={() => handleNav('top')} style={{
          display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 0,
          cursor: 'pointer', padding: 0,
        }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'none' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: '#fff' }}>nishant.sh</span>
        </button>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.4vw, 30px)' }}>
          {links.map(([id, label]) => (
            id === 'blog' ? (
              <a key={id} href="/blog" style={{
                background: 'none', border: 0, cursor: 'pointer', padding: '6px 0',
                fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.02em',
                color: 'var(--night-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#d8dee9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--night-muted)'; }}
              >{label}</a>
            ) : (
              <button key={id} onClick={() => handleNav(id)} style={{
                background: 'none', border: 0, cursor: 'pointer', padding: '6px 0',
                fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.02em',
                color: active === id ? 'var(--accent)' : 'var(--night-muted)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { if (active !== id) e.currentTarget.style.color = '#d8dee9'; }}
              onMouseLeave={(e) => { if (active !== id) e.currentTarget.style.color = 'var(--night-muted)'; }}
              >{label}</button>
            )
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
            id === 'blog' ? (
              <a key={id} href="/blog" style={{
                background: 'none', border: 0, cursor: 'pointer', padding: '4px 0',
                fontFamily: 'var(--font-mono)', fontSize: 20, letterSpacing: '0.04em',
                color: '#d8dee9', textDecoration: 'none',
              }}>{label}</a>
            ) : (
              <button key={id} onClick={() => handleNav(id)} style={{
                background: 'none', border: 0, cursor: 'pointer', padding: '4px 0',
                fontFamily: 'var(--font-mono)', fontSize: 20, letterSpacing: '0.04em',
                color: active === id ? 'var(--accent)' : '#d8dee9',
              }}>{label}</button>
            )
          ))}
        </div>
      )}
    </nav>
    </div>
  );
}
Object.assign(window, { PortfolioNav });
