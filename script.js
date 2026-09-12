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
