/* Portfolio UI kit — Research. Violet-toned ProjectCards. */
function PortfolioResearch() {
  const DS = window.NishantSharmaPortfolioDesignSystem_acfe10;
  const { SectionHeader, ProjectCard } = DS;

  const papers = [
    {
      title: 'Spectral Gradient Equalization (SGE)',
      meta: 'Advanced ML · NYU Tandon',
      period: 'Spring 2026',
      description: 'A gradient-level intervention for spurious-correlation mitigation in CNNs. Shortcut learning shows up as frequency-dominant gradient energy; SGE applies a 2D FFT over kernel dimensions post-backprop and attenuates the spurious band — without group labels at training time.',
      metrics: [{ value: '+3.1pp', label: 'Worst-group acc' }, { value: '+2.5pp', label: 'Post-DFR gain' }],
      stack: ['PyTorch', 'ResNet-18', 'Waterbirds', 'GroupDRO', 'JTT', 'DFR'],
    },
    {
      title: 'SMOLSolver — Verifier-Guided Reasoning',
      meta: 'Team (5) · NYU Tandon',
      period: 'Sep – Dec 2025',
      description: 'Lightweight dual-model framework for step-level math reasoning verification. I built the Verifier end-to-end: TinyLLaMA fine-tuned on PRM800K via 2-phase LoRA for step-level correctness.',
      metrics: [{ value: '87.9%', label: 'Step accuracy' }, { value: '64.1%', label: 'Generator Pass@1' }],
      stack: ['QLoRA', 'TinyLLaMA', 'Phi-2', 'PRM800K', 'GSM8K'],
      links: [{ label: 'paper ↗', href: '#' }],
    },
    {
      title: 'Cross-Domain Robustness in Super-Resolution',
      meta: 'Team · NYU Tandon',
      period: 'Sep – Dec 2025',
      description: 'Benchmarked EDSR, SwinIR, and Stable Diffusion x4 across natural, scene-text, and astronomical datasets. Introduced the Cross-Domain Drop (CDD) metric; diffusion models exhibit catastrophic CDD on text.',
      stack: ['EDSR', 'SwinIR', 'Stable Diffusion', 'DIV2K', 'TextZoom'],
      links: [{ label: 'paper ↗', href: '#' }],
    },
    {
      title: 'Jailbreaking Deep Vision Models',
      meta: 'Team · NYU Tandon',
      period: 'May 2025',
      description: 'FGSM, I-FGSM, PGD, and patch attacks on ResNet-34 under a strict L∞ constraint. PGD dropped Top-1 from 76% to 0.2%; confirmed black-box transfer to DenseNet-121.',
      stack: ['PyTorch', 'ResNet-34', 'PGD', 'FGSM', 'DenseNet-121'],
      links: [{ label: 'paper ↗', href: '#' }],
    },
  ];

  return (
    <section id="research" data-theme="night" style={{ background: 'var(--night-900)', padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,56px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHeader index="03" kicker="Papers & experiments" title="Research" />
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 22 }}>
          {papers.map((p, i) => <ProjectCard key={i} tone="violet" {...p} />)}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { PortfolioResearch });
