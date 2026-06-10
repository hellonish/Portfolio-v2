/* SitePet — "Bit" v3.
   • Walks floor, climbs walls, traverses ceiling
   • Click near pet → push-jump away from click point
   • Tail: only during walk / jump / wave
   • Arm: only during hover / wave / jump
   • Teal + violet accent. Quirky toast on hover. */

const MESSAGES = [
  "psst. you found me.",
  "error 404: social skills not found",
  "running on coffee + stack traces",
  "git blame → it was always me",
  "don't deploy me on fridays",
  "technically i'm not a feature",
  "my neural weights are just vibes",
  "i passed the tests. locally.",
  "yes i bite. only null refs though.",
  "compiling feelings... done. empty.",
  "i've read your resume. impressive.",
  "agent autonomy level: mostly.",
  "singularity is live btw.",
  "ineedajob.pro helped real humans.",
];

function SitePet() {
  const cvRef    = React.useRef(null);
  const toastRef = React.useRef(null);

  React.useEffect(() => {
    const cv    = cvRef.current;
    const toast = toastRef.current;
    if (!cv || !toast) return;
    const ctx = cv.getContext('2d');
    let raf, W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const M   = 56;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      cv.width  = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── state ─────────────────────────────────────────────────────────
    const pet = {
      x: W * 0.28, y: 0,
      surface: 'floor',
      sDir: 1,
      speed: 0.78,
      walkCycle: 0,
      mode: 'walk',
      modeTimer: 0, idleFor: 0,
      blinkTimer: 110 + Math.random() * 80, blinkFrame: -1,
      mx: -9999, my: -9999,
      near: false,
      // wave
      waving: false, waveFrame: 0, waveCooldown: 0,
      // toast
      toastActive: false, toastFrame: 0,
      msgIdx: Math.floor(Math.random() * MESSAGES.length),
      // jump (floor only)
      jumping: false, jumpVy: 0, jumpVx: 0, jumpOff: 0,
    };
    pet.y = H - M;

    // ── surface helpers ────────────────────────────────────────────────
    const surfaceRot = { floor: 0, rightWall: -Math.PI/2, ceiling: Math.PI, leftWall: Math.PI/2 };
    const CLIMB_PROB = 0.38;

    function moveAlongSurface() {
      if (pet.jumping && pet.surface === 'floor') return; // jump handles x
      const spd = pet.mode === 'walk' ? pet.speed : 0;
      if (pet.surface === 'floor')     pet.x += spd * pet.sDir;
      if (pet.surface === 'rightWall') pet.y -= spd * pet.sDir;
      if (pet.surface === 'ceiling')   pet.x -= spd * pet.sDir;
      if (pet.surface === 'leftWall')  pet.y += spd * pet.sDir;
    }

    function handleCorners() {
      const s = pet.surface, d = pet.sDir;
      if (s === 'floor') {
        if (d === 1 && pet.x >= W-M)  { Math.random() < CLIMB_PROB ? (pet.surface='rightWall', pet.x=W-M, pet.y=H-M, pet.sDir=1) : (pet.sDir=-1, pet.x=W-M); }
        if (d === -1 && pet.x <= M)   { Math.random() < CLIMB_PROB ? (pet.surface='leftWall',  pet.x=M,   pet.y=H-M, pet.sDir=-1): (pet.sDir=1,  pet.x=M);   }
      } else if (s === 'rightWall') {
        if (d === 1  && pet.y <= M)   { Math.random() < CLIMB_PROB ? (pet.surface='ceiling', pet.y=M, pet.x=W-M, pet.sDir=1) : (pet.sDir=-1, pet.y=M); }
        if (d === -1 && pet.y >= H-M) { pet.surface='floor'; pet.y=H-M; pet.x=W-M; pet.sDir=-1; }
      } else if (s === 'ceiling') {
        if (d === 1  && pet.x <= M)   { Math.random() < CLIMB_PROB ? (pet.surface='leftWall', pet.x=M, pet.y=M, pet.sDir=1) : (pet.sDir=-1, pet.x=M); }
        if (d === -1 && pet.x >= W-M) { Math.random() < CLIMB_PROB ? (pet.surface='rightWall', pet.x=W-M, pet.y=M, pet.sDir=-1) : (pet.sDir=1, pet.x=W-M); }
      } else if (s === 'leftWall') {
        if (d === 1  && pet.y >= H-M) { pet.surface='floor'; pet.y=H-M; pet.x=M; pet.sDir=1; }
        if (d === -1 && pet.y <= M)   { Math.random() < CLIMB_PROB ? (pet.surface='ceiling', pet.y=M, pet.x=M, pet.sDir=-1) : (pet.sDir=1, pet.y=M); }
      }
    }

    // ── draw helpers ──────────────────────────────────────────────────
    function glow(c, b) { ctx.shadowColor = c; ctx.shadowBlur = b; }
    function ng()       { ctx.shadowBlur  = 0; }
    function rrect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
      ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
      ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
      ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
      ctx.closePath();
    }

    // ── draw ──────────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const { x, y, surface, sDir, walkCycle, mode, blinkFrame,
              waving, waveFrame, near, jumping, jumpOff } = pet;

      const rot = surfaceRot[surface];
      const BW = 54, BH = 28;

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
        const wag = jumping
          ? Math.sin(waveFrame * 0.5) * 0.6
          : mode === 'walk' ? Math.sin(walkCycle * 1.6) * 0.35
          : Math.sin(Date.now() * 0.002) * 0.14;
        ctx.save();
        ctx.translate(BW/2, 2);
        ctx.rotate(wag);
        ctx.strokeStyle = 'rgba(52,184,112,0.38)';
        ctx.lineWidth = 2.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(14,6,20,-3); ctx.stroke();
        glow('rgba(52,184,112,0.85)', 9);
        ctx.beginPath(); ctx.arc(20,-3, 2.2, 0, Math.PI*2);
        ctx.fillStyle = '#34b870'; ctx.fill(); ng();
        ctx.restore();
      }

      // ── LEGS ──────────────────────────────────────────────────────
      ng();
      [-17, 0, 17].forEach((lx, i) => {
        const phase = (i/3) * Math.PI * 2;
        const waveSwg = waving  ? Math.sin(waveFrame*0.35 + i*1.2) * 28 : 0;
        const walkSwg = mode === 'walk' ? Math.sin(walkCycle + phase) * 24 : 0;
        // kick out legs on jump
        const jumpSwg = jumping ? (i-1) * Math.sin(jumpOff * 0.05) * 18 : 0;
        const swing   = walkSwg + waveSwg + jumpSwg;

        ctx.save();
        ctx.translate(lx, BH/2 - 3);
        ctx.rotate((swing * Math.PI) / 180);
        // two-segment leg
        const seg = 7;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(2, seg);
        ctx.lineTo(0, seg*2);
        ctx.strokeStyle = 'rgba(52,184,112,0.58)';
        ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.stroke();
        glow('rgba(52,184,112,0.35)', 5);
        ctx.beginPath(); ctx.arc(0, seg*2, 2.4, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(52,184,112,0.45)'; ctx.fill(); ng();
        ctx.restore();
      });

      // ── ANTENNAE ──────────────────────────────────────────────────
      const antSwing = waving ? Math.sin(waveFrame * 0.4) * 0.38 : 0;

      // left → teal
      ctx.save();
      ctx.translate(-13, -BH/2 + 1);
      ctx.rotate(antSwing);
      ctx.strokeStyle = 'rgba(52,184,112,0.38)';
      ctx.lineWidth = 1.3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(-5,-11,-3,-20); ctx.stroke();
      glow('rgba(52,184,112,1)', near||waving ? 14 : 7);
      ctx.beginPath(); ctx.arc(-3,-20, 2.8, 0, Math.PI*2);
      ctx.fillStyle = near||waving ? '#34b870' : 'rgba(52,184,112,0.8)'; ctx.fill(); ng();
      ctx.restore();

      // right → violet
      ctx.save();
      ctx.translate(10, -BH/2 + 2);
      ctx.rotate(-antSwing);
      ctx.strokeStyle = 'rgba(52,184,112,0.38)';
      ctx.lineWidth = 1.3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(6,-9,4,-17); ctx.stroke();
      glow('rgba(52,184,112,0.9)', near||waving ? 12 : 5);
      ctx.beginPath(); ctx.arc(4,-17, 2.4, 0, Math.PI*2);
      ctx.fillStyle = near||waving ? '#34b870' : 'rgba(52,184,112,0.75)'; ctx.fill(); ng();
      ctx.restore();

      // ── BODY ──────────────────────────────────────────────────────
      glow('rgba(52,184,112,0.14)', 18);
      rrect(-BW/2, -BH/2, BW, BH, 11);
      ctx.fillStyle = '#0a0d11'; ctx.fill(); ng();
      ctx.strokeStyle = near||waving||jumping ? 'rgba(52,184,112,0.9)' : 'rgba(52,184,112,0.48)';
      ctx.lineWidth = 1.4;
      rrect(-BW/2, -BH/2, BW, BH, 11); ctx.stroke();
      ctx.strokeStyle = 'rgba(52,184,112,0.08)';
      ctx.lineWidth = 1; ctx.setLineDash([3,5]);
      ctx.beginPath(); ctx.moveTo(-18,0); ctx.lineTo(18,0); ctx.stroke();
      ctx.setLineDash([]);

      // ── EYES ──────────────────────────────────────────────────────
      const blinkY = blinkFrame >= 0 ? Math.sin((blinkFrame/5)*Math.PI) : 0;
      const eyeR   = 9;
      let px = mode === 'walk' ? 2.5 : 0;
      if (near) px = Math.max(-3, Math.min(3, (pet.mx - x) * sDir * 0.04));
      if (jumping) px = pet.jumpVx > 0 ? -2.5 : 2.5; // look back in surprise

      [-15, 7].forEach(ex => {
        ctx.save();
        ctx.translate(ex, -2);
        ctx.scale(1, 1 - blinkY * 0.9);
        ctx.beginPath(); ctx.arc(0,0,eyeR,0,Math.PI*2);
        ctx.fillStyle = '#111827'; ctx.fill();
        ctx.strokeStyle = 'rgba(52,184,112,0.25)'; ctx.lineWidth = 0.8; ctx.stroke();
        glow('rgba(52,184,112,0.5)',4);
        ctx.beginPath(); ctx.arc(px,0,5.2,0,Math.PI*2);
        ctx.fillStyle = near||waving||jumping ? 'rgba(52,184,112,0.95)' : 'rgba(52,184,112,0.7)'; ctx.fill(); ng();
        ctx.beginPath(); ctx.arc(px,0,2.4,0,Math.PI*2);
        ctx.fillStyle = '#020408'; ctx.fill();
        ctx.beginPath(); ctx.arc(px-1.5,-1.5,1.2,0,Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.fill();
        ctx.restore();
      });

      // ── ARM — only when near / waving / jumping ────────────────────
      const showArm = near || waving || jumping;
      if (showArm) {
        const armAngle = waving
          ? -0.6 - Math.abs(Math.sin(waveFrame * 0.28)) * 1.1
          : jumping ? -0.8 - Math.abs(Math.sin(Date.now()*0.025)) * 0.4
          : -0.4 - Math.sin(Date.now()*0.004) * 0.2;

        ctx.save();
        ctx.translate(-BW/2 + 4, 2);
        ctx.rotate(armAngle);
        ctx.strokeStyle = 'rgba(52,184,112,0.55)';
        ctx.lineWidth = 2.4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-16, -8); ctx.stroke();
        // hand blob
        glow('rgba(52,184,112,0.5)', 7);
        ctx.beginPath(); ctx.arc(-16,-8, 3.2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(52,184,112,0.6)'; ctx.fill(); ng();
        ctx.restore();
      }

      // ── "Hi!" text while waving ────────────────────────────────────
      if (waving && waveFrame < 55) {
        const a = Math.min(1, waveFrame/8) * (1 - Math.max(0,(waveFrame-42)/13));
        ctx.save();
        ctx.rotate(-rot); ctx.scale(sDir, 1);
        ctx.globalAlpha = a;
        ctx.font = "700 13px 'IBM Plex Mono', monospace";
        ctx.fillStyle = '#34b870';
        ctx.textAlign = 'center';
        ctx.fillText('hi!', 0, -BH/2 - 28);
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      ctx.restore();
    }

    // ── toast ─────────────────────────────────────────────────────────
    function showToast(msg) { toast.textContent = msg; toast.style.opacity = '1'; }
    function hideToast()    { toast.style.opacity = '0'; }
    function posToast() {
      const tw = Math.min(toast.offsetWidth||180, 220);
      let tx = pet.x - tw/2, ty = pet.y + pet.jumpOff - 96;
      if (tx < 8) tx = 8;
      if (tx + tw > W-8) tx = W-8-tw;
      if (ty < 8) ty = pet.y + 68;
      toast.style.left = tx + 'px';
      toast.style.top  = ty + 'px';
    }

    // ── update ────────────────────────────────────────────────────────
    function update() {
      // ── jump physics (floor only) ───────────────────────────────
      if (pet.jumping && pet.surface === 'floor') {
        pet.jumpOff += pet.jumpVy;
        pet.jumpVy  += 0.44;         // gravity
        pet.x       += pet.jumpVx;
        // bounce off sides
        if (pet.x < M)   { pet.x = M;   pet.jumpVx = Math.abs(pet.jumpVx); }
        if (pet.x > W-M) { pet.x = W-M; pet.jumpVx = -Math.abs(pet.jumpVx); }
        if (pet.jumpOff >= 0) {
          pet.jumpOff = 0; pet.jumpVy = 0; pet.jumpVx = 0; pet.jumping = false;
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
            pet.mode = 'idle'; pet.modeTimer = 0;
            pet.idleFor = 70 + Math.floor(Math.random() * 130);
          }
        } else {
          pet.walkCycle += 0.04;
          pet.modeTimer++;
          if (pet.modeTimer > pet.idleFor) {
            pet.mode = 'walk'; pet.modeTimer = 0;
            if (Math.random() > 0.45) pet.sDir *= -1;
          }
        }
      }

      // blink
      pet.blinkTimer--;
      if (pet.blinkTimer <= 0) { pet.blinkFrame = 0; pet.blinkTimer = 130 + Math.random() * 160; }
      if (pet.blinkFrame >= 0) { pet.blinkFrame++; if (pet.blinkFrame > 5) pet.blinkFrame = -1; }

      // proximity / hover
      const md = Math.hypot(pet.x - pet.mx, pet.y + pet.jumpOff - pet.my);
      pet.near = md < 90;
      if (pet.waveCooldown > 0) pet.waveCooldown--;
      if (pet.near && !pet.waving && pet.waveCooldown === 0) {
        pet.waving = true; pet.waveFrame = 0;
        pet.msgIdx = (pet.msgIdx + 1) % MESSAGES.length;
        showToast(MESSAGES[pet.msgIdx]);
        pet.toastActive = true; pet.toastFrame = 0;
      }
      if (pet.waving) {
        pet.waveFrame++;
        if (pet.waveFrame > 68) { pet.waving = false; pet.waveCooldown = 230; }
      }
      if (pet.toastActive) {
        pet.toastFrame++; posToast();
        if (pet.toastFrame > 210) { hideToast(); pet.toastActive = false; }
      }

      draw();
      raf = requestAnimationFrame(update);
    }

    update();

    // ── events ────────────────────────────────────────────────────────
    const onResize = () => { resize(); if (!pet.jumping) pet.y = H - M; };
    const onMouse  = e  => { pet.mx = e.clientX; pet.my = e.clientY; };
    const onLeave  = () => { pet.mx = -9999; pet.my = -9999; };

    const onClick  = e  => {
      if (pet.surface !== 'floor') return;
      const d = Math.hypot(pet.x - e.clientX, pet.y - e.clientY);
      if (d > 70) return; // only react if click near pet
      e.stopPropagation();
      // push direction: away from click horizontally
      const clickOnRight = e.clientX > pet.x;
      pet.jumping  = true;
      pet.jumpVy   = -10.5;                    // upward kick
      pet.jumpVx   = clickOnRight ? -2.4 : 2.4; // fly away from click
      pet.jumpOff  = 0;
    };

    window.addEventListener('resize',      onResize);
    window.addEventListener('mousemove',   onMouse, { passive: true });
    window.addEventListener('click',       onClick, { capture: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',      onResize);
      window.removeEventListener('mousemove',   onMouse);
      window.removeEventListener('click',       onClick, { capture: true });
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={cvRef} style={{ position:'fixed', inset:0, zIndex:9991, pointerEvents:'none' }} />
      <div ref={toastRef} style={{
        position: 'fixed', zIndex: 9992, pointerEvents: 'none',
        background: 'rgba(7,10,11,0.93)',
        border: '1px solid rgba(52,184,112,0.26)',
        borderRadius: 4, padding: '8px 14px',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12, letterSpacing: '0.02em',
        color: 'rgba(232,236,236,0.88)',
        opacity: 0, transition: 'opacity 0.28s ease',
        maxWidth: 220, lineHeight: 1.58,
        boxShadow: '0 4px 24px rgba(52,184,112,0.08)',
      }} />
    </>
  );
}

Object.assign(window, { SitePet });
