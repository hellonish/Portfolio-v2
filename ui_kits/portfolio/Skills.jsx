/* Portfolio UI kit — Skills. Night surface with the interactive
   SkillConstellation; clicking a node updates a mono readout. */
function PortfolioSkills() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SkillConstellation } = DS;
  const [picked, setPicked] = React.useState(null);

  const groups = [
    ['AI / ML', 'RAG · Multi-agent orchestration · LoRA/QLoRA · RLHF · LangGraph · DSPy · Qdrant · fastembed/ONNX'],
    ['Backend', 'FastAPI · PostgreSQL · Redis · ARQ · Celery · WebSockets · SSE · gRPC · Node.js'],
    ['Infra', 'Docker · Kubernetes · AWS (EC2/S3/RDS/CloudFront) · Terraform · Ansible · Prometheus · Grafana'],
    ['Research', 'PyTorch · HuggingFace PEFT · Robustness · Adversarial ML · MLflow'],
  ];

  return (
    <section id="skills" data-theme="night" style={{ background: 'var(--night-800)', padding: 'clamp(56px,9vh,104px) clamp(20px,5vw,56px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--teal-400)' }}>04</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--night-faint)' }}>Knowledge graph</span>
          <span style={{ flex: 1, height: 1, background: 'var(--night-line)' }} />
        </div>
        <h2 style={{ font: 'var(--text-title)', color: '#fff', margin: '0 0 6px' }}>Skills</h2>
        <p style={{ font: 'var(--text-body)', color: 'var(--night-muted)', maxWidth: 520 }}>
          Not progress bars — a graph. Hover a node to trace what connects to what; the stack is one system, not a list.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 'clamp(20px,4vw,48px)', marginTop: 32, alignItems: 'stretch' }}>
          <div style={{ position: 'relative', height: 440, border: '1px solid var(--night-line)', borderRadius: 'var(--radius-lg)', background: 'var(--night-900)', overflow: 'hidden' }}>
            <SkillConstellation onSelect={setPicked} zoom={1.3} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {groups.map(([title, body]) => (
              <div key={title} style={{ padding: '16px 18px', border: '1px solid var(--night-line)', borderRadius: 'var(--radius-md)', background: 'var(--night-700)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal-400)', marginBottom: 8 }}>{title}</div>
                <div style={{ font: 'var(--text-body)', fontSize: 13, color: 'var(--night-muted)', lineHeight: 1.7 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { PortfolioSkills });
