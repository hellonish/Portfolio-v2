/* Portfolio UI kit — Skills. Agentic Terminal replacing the Knowledge Graph. */
function AgenticTerminal({ activeCategory, groups }) {
  const [logs, setLogs] = React.useState([]);
  const termRef = React.useRef(null);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    let timeoutIds = [];
    const pushLog = (msg, delay) => {
      const id = setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, delay);
      timeoutIds.push(id);
    };

    if (isFirstRender.current) {
       isFirstRender.current = false;
       setLogs([]);
       pushLog({ type: 'system', text: '[SYSTEM] Booting interactive shell...' }, 100);
       pushLog({ type: 'system', text: '[OK] Establishing secure connection' }, 400);
       pushLog({ type: 'system', text: '[OK] Loading neural pathways' }, 700);
       pushLog({ type: 'info', text: 'Type a command or select a category to inspect the stack.' }, 1200);
       pushLog({ type: 'prompt', text: '_' }, 1300);
       return () => timeoutIds.forEach(clearTimeout);
    }

    if (activeCategory !== null) {
       const [title, body] = groups[activeCategory];
       
       setLogs(prev => {
         const filtered = prev.filter(l => l.text !== '_');
         return [...filtered, { type: 'command', text: `> fetch stack --layer="${title}"` }];
       });
       
       pushLog({ type: 'system', text: `[EXEC] Querying knowledge base for ${title}...` }, 400);
       
       const skills = body.split('·').map(s => s.trim());
       
       skills.forEach((skill, idx) => {
         pushLog({ type: 'data', text: `  ↳ ${skill}` }, 800 + (idx * 150));
       });

       pushLog({ type: 'success', text: `[OK] 200 OK — ${skills.length} nodes loaded.` }, 800 + (skills.length * 150) + 300);
       pushLog({ type: 'prompt', text: '_' }, 800 + (skills.length * 150) + 600);
    }

    return () => timeoutIds.forEach(clearTimeout);
  }, [activeCategory, groups]);

  React.useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTo({ top: termRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6,
      color: '#a9b1d6', padding: '24px 0',
      background: '#1a1b26', border: '1px solid var(--night-line)',
      borderRadius: 'var(--radius-lg)', height: '100%',
      display: 'flex', flexDirection: 'column',
      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, padding: '0 28px', flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      
      <div ref={termRef} className="term-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', padding: '0 28px' }}>
        {logs.map((log, i) => {
          let color = '#a9b1d6'; 
          if (log.type === 'system') color = '#9ece6a'; 
          if (log.type === 'command') color = '#7aa2f7'; 
          if (log.type === 'success') color = '#7dcfff'; 
          if (log.type === 'prompt') color = '#bb9af7'; 
          
          return (
            <div key={i} style={{ color, opacity: log.type === 'prompt' ? 0.8 : 1, animation: log.type === 'prompt' ? 'blink 1s step-end infinite' : 'none' }}>
              {log.text}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

function PortfolioSkills() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader } = DS;
  const { CustomSelect } = window;
  const [activeCategory, setActiveCategory] = React.useState(null);

  const groups = [
    ['Languages', 'Python · Go · Java · Typescript · C++'],
    ['Core ML', 'LoRA · Quantization · RLHF · RLVR · PEFT · SLMs · Transformers'],
    ['Agentic AI', 'RAG · Langchain · Fastembed · Vector Store · Huggingface'],
    ['Backend', 'FastAPI · NodeJS · REST · Websockets · SSE · gRPC · Redis · Celery · ARQ'],
    ['Frontend', 'NextJS · Tailwind · FramerMotion · ThreeJS'],
    ['Security', 'OAuth2 · JWT · Threat Modeling · Rate Limiting · SSRF · Fernet Encryption'],
    ['Databases', 'PostgreSQL · MySQL · MongoDB · GraphQL · Supabase'],
    ['Infrastructure', 'Prometheus · MLFlow · Kubernetes · Docker · Linux · Terraform · Ansible · Jenkins · Github Actions · Caddy/Nginx'],
    ['Cloud', 'AWS · GCP · Hostinger'],
    ['Dev Tools', 'Cursor · Codex · OpenCode · Claude Code'],
  ];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 860);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <section id="skills" className="snap-section" data-theme="night" style={{ 
        background: 'var(--night-800)', 
        display: 'flex', alignItems: 'center', 
        padding: '80px clamp(20px,5vw,56px) 20px',
        position: 'relative'
      }}><div style={{ maxWidth: 1180, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '4vh', whiteSpace: 'nowrap' }}>
          <SectionHeader index="05" kicker="Stack Output" title="Skills" />
        </div>
        <p style={{ font: 'var(--text-body)', color: 'var(--night-muted)', maxWidth: 520 }}>
          Interactive terminal session. Select a subsystem to execute a diagnostic fetch across the stack.
        </p>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.5fr) minmax(0,1fr)', gap: 'clamp(20px,4vw,48px)', marginTop: 32, alignItems: 'stretch' }}>
          {isMobile && (
            <CustomSelect
              value={activeCategory}
              onChange={v => setActiveCategory(v)}
              options={groups.map(([title], i) => ({ value: i, label: title }))}
              placeholder="-- Select Subsystem --"
            />
          )}
          <div style={{ position: 'relative', height: isMobile ? '40vh' : '55vh' }}>
            <AgenticTerminal activeCategory={activeCategory} groups={groups} />
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', height: '55vh', paddingRight: 12 }}>
              {groups.map(([title, body], i) => (
                <div key={title} onClick={() => setActiveCategory(i)} style={{ 
                  padding: '12px 16px', 
                  border: `1px solid ${i === activeCategory ? 'var(--accent)' : 'var(--night-line)'}`, 
                  borderRadius: 'var(--radius-md)', 
                  background: i === activeCategory ? 'rgba(255,255,255,0.04)' : 'var(--night-700)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s'
                }}
                onMouseEnter={(e) => { if (i !== activeCategory) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={(e) => { if (i !== activeCategory) e.currentTarget.style.background = 'var(--night-700)'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: i === activeCategory ? 'var(--accent)' : 'var(--night-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>$</span>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === activeCategory ? '#fff' : 'var(--night-fg)' }}>
                      {title}
                    </div>
                  </div>
                  <div style={{ font: 'var(--text-body)', fontSize: 13, color: 'var(--night-muted)', lineHeight: 1.7 }}>
                    {body.split('·').slice(0, 3).join('·')} {body.split('·').length > 3 ? '...' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PortfolioSkills });
