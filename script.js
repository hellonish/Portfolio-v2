// --- Theme Switcher Widget ---
document.addEventListener('DOMContentLoaded', () => {
  const themes = [
    { id: 'night', label: 'Default Night' },
    { id: 'cyber-neon', label: 'Cyber Neon' },
    { id: 'matrix-phosphor', label: 'Matrix Phosphor' },
    { id: 'solarized-hacker', label: 'Solarized Hacker' },
    { id: 'nord-terminal', label: 'Nord Terminal' },
    { id: 'blood-moon', label: 'Blood Moon' }
  ];

  const widget = document.createElement('div');
  widget.id = 'theme-switcher-widget';
  
  const title = document.createElement('div');
  title.className = 'ts-title';
  title.innerText = 'Select Theme (Preview)';
  widget.appendChild(title);

  themes.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'ts-btn';
    btn.innerText = theme.label;
    btn.onclick = () => {
      document.documentElement.setAttribute('data-theme', theme.id);
    };
    widget.appendChild(btn);
  });

  document.body.appendChild(widget);
});
