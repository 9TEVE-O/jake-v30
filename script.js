// JAKE v30.0.0
// Birthday release. If Jake is reading this in source view: correct behaviour detected.

const bootLines = [
  ['> initialising JAKE...', ''],
  ['> loading 29 previous major versions...', ''],
  ['> electrical systems', 'ok'],
  ['  OK  controls // PLCs // cooling // fire systems', 'ok'],
  ['> hardware affinity', 'ok'],
  ['  OK  unnecessarily high', 'ok'],
  ['> b-boy engine', 'ok'],
  ['  OK  native module detected', 'ok'],
  ['> red ranger legacy package', 'ok'],
  ['  OK  Jason-era support retained', 'ok'],
  ['> vape inventory', 'warn'],
  ['  WARN  supply exceeds known demand', 'warn'],
  ['> family psychic bus', 'warn'],
  ['  ???  nana still refuses formal verification', 'warn'],
  ['> git integration', 'ok'],
  ['  OK  repository era has begun', 'ok'],
  ['> maturity check', 'redline'],
  ['  RESULT  production-ready-ish', 'redline'],
  ['', ''],
  ['> upgrade available: JAKE v30.0.0', 'ok']
];

const bootLog = document.querySelector('#bootLog');
const deployBtn = document.querySelector('#deployBtn');
const release = document.querySelector('#release');
const boot = document.querySelector('#boot');
let lineIndex = 0;

function addBootLine() {
  if (lineIndex >= bootLines.length) {
    deployBtn.classList.remove('hidden');
    return;
  }
  const [text, cls] = bootLines[lineIndex++];
  const div = document.createElement('div');
  div.textContent = text || ' ';
  if (cls) div.classList.add(cls);
  bootLog.appendChild(div);
  setTimeout(addBootLine, lineIndex < 4 ? 280 : 120);
}
setTimeout(addBootLine, 450);

deployBtn.addEventListener('click', () => {
  playAirhorn(0.35);
  fireConfetti(2400);
  boot.classList.add('hidden');
  release.classList.remove('hidden');
  requestAnimationFrame(() => release.classList.add('system-online'));
  window.scrollTo({ top: 0, behavior: 'instant' });
});

document.querySelector('#airhornBtn').addEventListener('click', () => {
  playAirhorn(0.55);
  fireConfetti(1000);
});

document.querySelector('#shapeBtn').addEventListener('click', (event) => {
  document.body.classList.toggle('shape-mode');
  event.currentTarget.textContent = document.body.classList.contains('shape-mode')
    ? 'CEASE SHAPE CUTTING'
    : 'INITIATE SHAPE CUTTING';
  if (document.body.classList.contains('shape-mode')) playAirhorn(0.3);
});

document.querySelector('#devToggle').addEventListener('click', () => {
  document.querySelector('#devPanel').classList.toggle('hidden');
});

const secretLines = [
  'TEST 01  heart_of_gold ........ PASS',
  'TEST 02  vape_scarcity ......... FAIL (expected)',
  'TEST 03  dance_floor ........... PASS',
  'TEST 04  frankie_cost_model .... NOT FINANCIALLY SENSIBLE',
  'TEST 05  family_sanity ......... INCONCLUSIVE',
  'TEST 06  uncle_steven .......... LEGACY DEPENDENCY',
  'TEST 07  party_protocol ........ SHOTS × 4',
  '',
  'OVERALL: ship it.'
];

document.querySelector('#secretBtn').addEventListener('click', () => {
  document.querySelector('#secretOutput').textContent = secretLines.join('\n');
  fireConfetti(1200);
});

function playAirhorn(volume = 0.4) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.025);
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.72);
    master.connect(ctx.destination);
    [220, 277, 330].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'sawtooth' : 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.72, ctx.currentTime + 0.7);
      gain.gain.value = i === 0 ? 0.55 : 0.18;
      osc.connect(gain).connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.75);
    });
    setTimeout(() => ctx.close(), 900);
  } catch (_) {
    // Sound is optional. The joke still works without it.
  }
}

function fireConfetti(duration = 1800) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.querySelector('#confetti');
  const ctx = canvas.getContext('2d');
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const resize = () => {
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * innerWidth,
    y: -20 - Math.random() * innerHeight * .4,
    vx: (Math.random() - .5) * 4,
    vy: 3 + Math.random() * 5,
    r: 3 + Math.random() * 5,
    hue: [0, 42, 120, 190][Math.floor(Math.random() * 4)],
    spin: Math.random() * Math.PI
  }));
  const start = performance.now();
  function frame(now) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.spin += .1;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.spin);
      ctx.fillStyle = `hsl(${p.hue} 90% 60%)`;
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    });
    if (now - start < duration) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  requestAnimationFrame(frame);
}

// === Visual systems upgrade ===
// Lightweight, dependency-free, and deliberately inspectable.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function installLanguageRack() {
  const heroCopy = document.querySelector('.hero-copy');
  if (!heroCopy || heroCopy.querySelector('.language-rack')) return;
  const rack = document.createElement('div');
  rack.className = 'language-rack';
  rack.innerHTML = `
    <span class="language-rack-label">STACK DETECTED // BUILD PATH</span>
    <div class="language-rack-list">
      ${['HTML', 'CSS', 'JavaScript', 'Python', 'Git', 'GitHub', 'PLC', 'Controls'].map(label => `<span class="lang-badge">${label}</span>`).join('')}
    </div>`;
  const actions = heroCopy.querySelector('.hero-actions');
  heroCopy.insertBefore(rack, actions || null);
}

function installCodeRain() {
  if (reducedMotion || document.querySelector('.code-rain')) return;
  const layer = document.createElement('div');
  layer.className = 'code-rain';
  layer.setAttribute('aria-hidden', 'true');
  const fragments = [
    'const jake = new Human(30);',
    'def ship_it(): return True',
    '<div class="b-boy">',
    'git commit -m "ship v30"',
    'vapeInventory++',
    'PLC.connect()',
    'if (floor) cutShapes();',
    'SELECT * FROM good_kids;',
    'aircon.status = "cold";',
    'frankie.cost > expected',
    'npm run birthday',
    'console.log("bro")'
  ];
  fragments.forEach((text, i) => {
    const span = document.createElement('span');
    span.textContent = text;
    span.style.left = `${4 + (i * 8.1) % 92}%`;
    span.style.setProperty('--duration', `${15 + (i % 5) * 3}s`);
    span.style.setProperty('--delay', `${-i * 1.65}s`);
    span.style.setProperty('--drift', `${(i % 2 ? 1 : -1) * (20 + i * 3)}px`);
    layer.appendChild(span);
  });
  document.body.prepend(layer);
}

function installNodeNetwork() {
  if (document.querySelector('.network-canvas')) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'network-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame = null;
  let nodes = [];

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(28, Math.min(70, Math.floor((width * height) / 22000)));
    nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .16,
      vy: (Math.random() - .5) * .16,
      r: 1 + Math.random() * 1.7,
      phase: Math.random() * Math.PI * 2,
      accent: i % 17 === 0 ? 'red' : i % 11 === 0 ? 'cyan' : 'green'
    }));
  }

  function colour(node, alpha) {
    if (node.accent === 'red') return `rgba(255,59,48,${alpha})`;
    if (node.accent === 'cyan') return `rgba(98,217,255,${alpha})`;
    return `rgba(125,255,150,${alpha})`;
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, width, height);
    const t = time * .001;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!reducedMotion) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -20) a.x = width + 20;
        if (a.x > width + 20) a.x = -20;
        if (a.y < -20) a.y = height + 20;
        if (a.y > height + 20) a.y = -20;
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 13200) {
          const alpha = (1 - dist2 / 13200) * .12;
          ctx.strokeStyle = `rgba(125,255,150,${alpha})`;
          ctx.lineWidth = .65;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const pulse = reducedMotion ? .65 : .46 + Math.sin(t * 2.2 + a.phase) * .26;
      ctx.shadowBlur = 13;
      ctx.shadowColor = colour(a, .65);
      ctx.fillStyle = colour(a, Math.max(.22, pulse));
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r * (1 + Math.max(0, pulse) * .35), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    resize();
    draw();
  }, { passive: true });
}

installLanguageRack();
installCodeRain();
installNodeNetwork();
