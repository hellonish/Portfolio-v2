/* Portfolio UI kit — hero. Deep night surface with an interactive
   WebGL particle sphere rendered in Three.js. */

// ─── Interactive Particle Sphere ─────────────────────────────────────────────
function ParticleSphereBackground() {
  const mountRef = React.useRef(null);
  const pointer = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const THREE = window.THREE;
    const mount = mountRef.current;
    if (!THREE || !mount) return;

    let W = 1, H = 1, raf = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const count = 1800;
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const colorA = new THREE.Color(0x5eead4);
    const colorB = new THREE.Color(0x8b5cf6);
    const colorC = new THREE.Color(0xe8ecec);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = 1 - 2 * t;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963229728653;
      const shell = 1.55 + Math.sin(i * 12.9898) * 0.08;
      const x = Math.cos(theta) * radius * shell;
      const z = Math.sin(theta) * radius * shell;
      const iy = y * shell;
      basePositions[i * 3] = positions[i * 3] = x;
      basePositions[i * 3 + 1] = positions[i * 3 + 1] = iy;
      basePositions[i * 3 + 2] = positions[i * 3 + 2] = z;
      phases[i] = Math.sin(i * 78.233) * Math.PI;

      const color = t < 0.55 ? colorA.clone().lerp(colorB, t / 0.55) : colorB.clone().lerp(colorC, (t - 0.55) / 0.45);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.026,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particleSphere = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particleSphere);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.58, 2),
      new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    root.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const rings = [];
    [
      { radius: 1.86, tube: 0.006, x: Math.PI / 2.7, y: 0.2, z: -0.2 },
      { radius: 1.7, tube: 0.005, x: Math.PI / 2, y: 0.65, z: 0.35 },
      { radius: 1.46, tube: 0.004, x: Math.PI / 1.9, y: -0.55, z: -0.1 },
    ].forEach(spec => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(spec.radius, spec.tube, 8, 180), ringMaterial.clone());
      ring.rotation.set(spec.x, spec.y, spec.z);
      root.add(ring);
      rings.push(ring);
    });

    const linkMaterial = new THREE.LineBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const linkGeometry = new THREE.BufferGeometry();
    const linkPositions = [];
    for (let i = 0; i < 190; i += 2) {
      const a = i * 7;
      const b = (a + 37 + (i % 11)) % count;
      linkPositions.push(
        basePositions[a * 3], basePositions[a * 3 + 1], basePositions[a * 3 + 2],
        basePositions[b * 3], basePositions[b * 3 + 1], basePositions[b * 3 + 2]
      );
    }
    linkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
    const links = new THREE.LineSegments(linkGeometry, linkMaterial);
    root.add(links);

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      const mobile = W < 760;
      root.position.set(mobile ? 1.0 : 1.62, mobile ? -0.8 : -0.05, 0);
      root.scale.setScalar(mobile ? 0.8 : 1.06);
    };

    const onPointer = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width - 0.5) || 0;
      pointer.current.y = ((e.clientY - rect.top) / rect.height - 0.5) || 0;
    };

    const clock = new THREE.Clock();
    const frame = () => {
      const elapsed = clock.getElapsedTime();
      const px = pointer.current.x;
      const py = pointer.current.y;
      const attr = particleGeometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const bx = basePositions[ix];
        const by = basePositions[ix + 1];
        const bz = basePositions[ix + 2];
        const side = bx * px - by * py;
        const pulse = 1 + Math.sin(elapsed * 1.6 + phases[i] + side * 1.7) * 0.035;
        const cursorPush = Math.max(0, 1 - Math.hypot(bx / 1.8 - px * 1.2, by / 1.8 + py * 1.2)) * 0.12;
        const scale = pulse + cursorPush;
        positions[ix] = bx * scale;
        positions[ix + 1] = by * scale;
        positions[ix + 2] = bz * scale;
      }
      attr.needsUpdate = true;

      root.rotation.x = -0.1 - py * 0.16 + Math.sin(elapsed * 0.25) * 0.025;
      root.rotation.y = elapsed * 0.12 + px * 0.32;
      root.rotation.z = Math.sin(elapsed * 0.18) * 0.04;
      core.rotation.x = elapsed * 0.18;
      core.rotation.y = -elapsed * 0.24;
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.0015 + i * 0.0006;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach(mat => {
            if (mat.map) mat.map.dispose();
            mat.dispose();
          });
        }
        if (obj.userData && obj.userData.dispose) obj.userData.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-particle-sphere
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
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
        color: hov ? '#000000' : '#fff',
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
    <section id="top" className="snap-section" data-theme="night" style={{ 
      position: 'relative', height: '100vh', overflow: 'hidden', 
      background: 'var(--night-900)',
      display: 'flex', flexDirection: 'column'
    }}>
      <ParticleSphereBackground />
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
        position: 'relative', zIndex: 2, maxWidth: 1240, width: '100%', margin: '0 auto',
        padding: '0 clamp(20px,4vw,40px)',
        pointerEvents: 'none',
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--night-muted)' }}>
            AI Engineer&nbsp;&nbsp;/&nbsp;&nbsp;New York
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(40px, 8.8vw, 96px)', lineHeight: 0.98, letterSpacing: 0,
          color: '#fff', margin: 0, maxWidth: '15ch',
          display: 'inline-block', transform: 'scaleX(1.08)', transformOrigin: 'left center',
        }}>
          Nishant<br />Sharma
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6,
          color: 'var(--night-fg)', margin: '26px 0 0', maxWidth: 560,
        }}>
          AI Engineer developing Production agent systems, grounded in ML Research.
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
        <div className="hero-metrics" style={{
          maxWidth: 1180, margin: '0 auto',
          padding: '16px clamp(20px,5vw,56px)',
          display: 'flex', gap: 'clamp(18px,5vw,56px)', flexWrap: 'wrap', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--night-muted)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="devtools-label" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--night-faint)' }}>Dev tools</span>
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
        </div>
      </div>

      <style>{`
        @keyframes hpulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.8); }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { PortfolioHero });
