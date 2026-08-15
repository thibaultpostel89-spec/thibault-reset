/* ============================================================
   RESET — Human Performance Audit
   Full-screen questionnaire modal, one question at a time.

   TO RECEIVE ANSWERS BY EMAIL:
   1. Go to https://web3forms.com (no account needed)
   2. Enter thibault.postel89@gmail.com, you get an access key by email
   3. Paste that key below, replacing PASTE_YOUR_KEY_HERE
   ============================================================ */

var WEB3FORMS_KEY = 'PASTE_YOUR_KEY_HERE';
var CONTACT_EMAIL = 'thibault.postel89@gmail.com';

(function () {
  'use strict';

  /* ---------- shared option sets ---------- */
  var FREQ = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'];
  var FREQ_DAY = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost every day'];
  var FREQ_MORNING = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost every morning'];
  var FREQ_VERY = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'];

  var SECTIONS = [
    { id: 'info', num: '', title: 'Your details', sub: '' },
    { id: 'focus', num: 'I', title: 'Performance & Focus', sub: 'Mental energy, attention and cognitive capacity' },
    { id: 'autonomic', num: 'II', title: 'Autonomic Regulation & Heart Coherence', sub: 'Your ability to shift from activation to recovery' },
    { id: 'breathing', num: 'III', title: 'Breathing & Respiratory Efficiency', sub: 'Breathing mechanics and CO₂ tolerance' },
    { id: 'biomech', num: 'IV', title: 'Biomechanics & Structure', sub: 'Posture, tension and body mechanics' },
    { id: 'somatic', num: 'V', title: 'Somatic Mapping & Interoception', sub: 'Your ability to feel, read and influence your body' },
    { id: 'recovery', num: 'VI', title: 'Recovery & Somatic Load', sub: 'What happens when you stop pushing' },
    { id: 'presence', num: 'VII', title: 'Presence & Connection', sub: 'What the whole system is meant to give you' },
    { id: 'goal', num: 'VIII', title: 'Your Goal', sub: 'What you actually want to change' }
  ];

  /* dim = which score it feeds · inv = higher answer means worse */
  var QUESTIONS = [
    { s: 'info', type: 'email', label: 'Your email', req: true },
    { s: 'info', type: 'text', label: 'Your name', req: true },

    /* I — Performance & Focus */
    { s: 'focus', type: 'scale', label: 'Focus', q: 'How well can you stay on one complex task without switching tabs, checking your phone or looking for another hit of stimulation?', lo: 'I lose focus almost immediately', hi: 'I can stay deeply focused for a long time', req: true, dim: 'cognitive' },
    { s: 'focus', type: 'scale', label: 'Brain fog', q: 'How much mental fog do you feel — difficulty thinking clearly, or a sense that your brain is running slow?', lo: 'Very clear mind', hi: 'Almost constant fog', req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'choice', label: 'Energy crash', q: 'How often do you get a significant drop in energy or motivation between 2pm and 4pm?', opts: FREQ_DAY, req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'choice', label: 'Stimulants', q: 'How many coffees, energy drinks, nicotine hits or other stimulants do you typically have per day?', opts: ['0', '1', '2 to 3', '4 to 5', 'More than 5'], req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'scale', label: 'Stimulant dependence', q: 'How much do you feel you need stimulants to work, think or hold your energy up?', lo: 'I function fine without', hi: 'I really struggle without', req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'scale', label: 'Performance anxiety', q: 'Before a presentation, an important call or a high-stakes situation, how much does your body fire up?', lo: 'Very calm', hi: 'Strong physical activation', req: true, dim: 'coherence', inv: true },

    /* II — Autonomic Regulation & Heart Coherence */
    { s: 'autonomic', type: 'choice', label: 'Morning stress', q: 'How often do you wake up with mental pressure, a knot in your stomach, or thoughts firing immediately?', opts: FREQ_MORNING, req: true, dim: 'autonomic', inv: true },
    { s: 'autonomic', type: 'scale', label: 'Sensory sensitivity', q: 'How much do noise, light, notifications, conversations or movement around you disturb your state?', lo: 'Barely affected', hi: 'Very easily overstimulated', req: true, dim: 'coherence', inv: true },
    { s: 'autonomic', type: 'multi', label: 'Physical stress signs', q: 'Which signs show up regularly when you are stressed, focused or under pressure?', opts: ['Dry mouth', 'Cold hands', 'Cold feet', 'Racing heart', 'Short breath', 'Held breath', 'Chest tightness', 'Clenched jaw', 'Raised shoulders', 'Abdominal tension', 'Sweating', 'Trembling', 'Frequent urge to urinate', 'None of these'], req: true, dim: 'load', inv: true },
    { s: 'autonomic', type: 'scale', label: 'Return to calm', q: 'After a stressful situation, how well do you come back to baseline?', lo: 'I can stay activated for hours', hi: 'I come down quickly', req: true, dim: 'autonomic' },
    { s: 'autonomic', type: 'scale', label: 'Autonomic flexibility', q: 'How well can you deliberately move yourself from a stressed, highly activated state into a calmer one?', lo: 'Very hard', hi: 'Very easy', req: true, dim: 'autonomic' },
    { s: 'autonomic', type: 'scale', label: 'Regulation under pressure', q: 'When things get hard, can you stay calm enough to keep breathing properly, think, and make good decisions?', lo: 'I lose my grip fast', hi: 'I stay stable under pressure', req: true, dim: 'autonomic' },
    { s: 'autonomic', type: 'scale', label: 'Emotional reactivity', q: 'When a strong emotion shows up, how fast does it take over your physical and mental state?', lo: 'Not very reactive', hi: 'Very strongly reactive', req: true, dim: 'autonomic', inv: true },
    { s: 'autonomic', type: 'number', label: 'HRV', q: 'If you use a Garmin, Oura, Whoop, Apple Watch or another tracker, what is your average HRV?', help: 'In milliseconds. Leave blank if you do not track it.', unit: 'ms' },
    { s: 'autonomic', type: 'choice', label: 'Real-time feedback', q: 'Have you ever watched your heart rhythm change in real time while you breathe?', opts: ['Yes, with a coherence device', 'Only nightly averages from a watch or ring', 'No, never', 'Not sure'], req: true, dim: 'coherence', vals: [1, 0.5, 0, 0.15] },
    { s: 'autonomic', type: 'scale', label: 'Blind or guided', q: 'When you deliberately try to calm yourself down, do you actually know whether it is working — or are you guessing?', lo: 'I am guessing', hi: 'I can feel it clearly', req: true, dim: 'coherence' },
    { s: 'autonomic', type: 'choice', label: 'Coherence response', q: 'When you practise slow breathing or a regulation technique, do you notice a clear shift in your state?', opts: ['Yes, quickly', 'Yes, but slightly', 'It depends on the day', 'Very little', 'I have never really tried'], req: true, dim: 'coherence', vals: [1, 0.7, 0.5, 0.2, 0.35] },

    /* III — Breathing */
    { s: 'breathing', type: 'choice', label: 'Night breathing', q: 'How do you generally breathe while you sleep?', opts: ['Mostly through the nose', 'Mostly nose, but sometimes dry mouth', 'Mixed nose and mouth', 'Mostly through the mouth', 'I do not know'], req: true, dim: 'breathing', vals: [1, 0.75, 0.45, 0.1, 0.4] },
    { s: 'breathing', type: 'choice', label: 'Dry mouth on waking', q: 'How often do you wake up with a dry mouth?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost every morning'], req: true, dim: 'breathing', inv: true },
    { s: 'breathing', type: 'multi', label: 'Breathing under stress', q: 'When you work intensely or get stressed, what changes do you notice in your breathing?', opts: ['It gets faster', 'It gets shallower', 'It moves up into my chest', 'I sometimes hold it', 'I sigh a lot', 'I need to take big breaths', 'I breathe more through my mouth', 'Little change', 'I do not know'], req: true, dim: 'breathing', inv: true },
    { s: 'breathing', type: 'choice', label: 'Air hunger', q: 'How often do you feel you cannot get a satisfying breath, or need to breathe deeply?', opts: FREQ_VERY, req: true, dim: 'breathing', inv: true },
    { s: 'breathing', type: 'number', label: 'BOLT score', q: 'After a normal exhale, how many seconds can you wait before the first clear urge to breathe — without forcing?', help: 'Number of seconds. If you have never measured it, try it now.', unit: 'sec', req: true, dim: 'breathing', max: 40 },

    /* IV — Biomechanics */
    { s: 'biomech', type: 'scale', label: 'Posture', q: 'How far do your head and shoulders drift forward when you work or use your phone?', lo: 'Naturally good posture', hi: 'Strongly forward', req: true, dim: 'load', inv: true },
    { s: 'biomech', type: 'choice', label: 'Jaw', q: 'How often do you clench your jaw or teeth when focused, stressed, or asleep?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost constantly'], req: true, dim: 'load', inv: true },
    { s: 'biomech', type: 'scale', label: 'Core stability', q: 'How stable and supported do you feel through your trunk, pelvis and lower back?', lo: 'Very unstable / frequent pain', hi: 'Very stable and solid', req: true, dim: 'load' },
    { s: 'biomech', type: 'multi', label: 'Tension zones', q: 'Where do you regularly feel tension, stiffness or a sense of blockage?', opts: ['Jaw', 'Neck', 'Traps', 'Shoulders', 'Chest', 'Diaphragm', 'Upper abdomen', 'Lower back', 'Psoas', 'Hips', 'Pelvis', 'None'], req: true, dim: 'load', inv: true },

    /* V — Somatic Mapping */
    { s: 'somatic', type: 'scale', label: 'Body awareness', q: 'How naturally do you notice the sensations present in your body during the day?', lo: 'I barely notice my body', hi: 'Very fine body perception', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'scale', label: 'Locating stress', q: 'When you get stressed, can you pinpoint exactly where it shows up in your body?', lo: 'I usually have no idea', hi: 'I locate it almost instantly', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'scale', label: 'Reading emotions', q: 'How well do you recognise an emotion through what happens in your body, before you start analysing it mentally?', lo: 'I understand emotions intellectually', hi: 'I feel them in my body first', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'scale', label: 'Voluntary release', q: 'When you notice a tight area, how well can you deliberately release it?', lo: 'Almost impossible', hi: 'I can easily change the tension', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'choice', label: 'Body armour', q: 'Even after sport, stretching or massage, how often does the same tension come back?', opts: FREQ, req: true, dim: 'load', inv: true },
    { s: 'somatic', type: 'choice', label: 'Autopilot', q: 'How often do you feel you are running on automatic, without really feeling your body or the present moment?', opts: FREQ_VERY, req: true, dim: 'presence', inv: true },

    /* VI — Recovery */
    { s: 'recovery', type: 'choice', label: 'Irritability', q: 'How often do small problems trigger a bigger reaction than you would like?', opts: FREQ_VERY, req: true, dim: 'load', inv: true },
    { s: 'recovery', type: 'choice', label: 'Startle reflex', q: 'How often do you jump hard at an unexpected noise or movement?', opts: ['Almost never', 'Rarely', 'Sometimes', 'Often', 'Very often'], req: true, dim: 'load', inv: true },
    { s: 'recovery', type: 'choice', label: 'After training', q: 'After an intense workout, which best describes your usual experience?', opts: ['Calmer, clearer, more present', 'Physically tired but pleasantly relaxed', 'Discharged for a moment, then tension returns', 'Still wired and restless', 'More irritable or tense than before', 'Depends heavily on the type of training'], req: true, dim: 'load', vals: [1, 0.85, 0.4, 0.15, 0, 0.5] },
    { s: 'recovery', type: 'scale', label: 'Relationship to rest', q: 'How well can you do nothing, without guilt, restlessness or a need for stimulation?', lo: 'Rest is very uncomfortable', hi: 'I can deeply slow down', req: true, dim: 'autonomic' },
    { s: 'recovery', type: 'scale', label: 'End of day', q: 'How well can you mentally and physically close your day?', lo: 'My system keeps running for hours', hi: 'I switch off easily', req: true, dim: 'autonomic' },
    { s: 'recovery', type: 'multi', label: 'Sleep', q: 'Which of these do you currently run into?', opts: ['Hard to fall asleep', 'Racing thoughts at bedtime', 'Waking during the night', 'Waking around 3–5am', 'Hard to fall back asleep', 'Light sleep', 'Waking tired despite enough hours', 'No particular problem'], req: true, dim: 'load', inv: true },

    /* VII — Presence & Connection */
    { s: 'presence', type: 'scale', label: 'Presence with others', q: 'When you talk with someone, how much are you actually there rather than in your own head?', lo: 'Often mentally elsewhere', hi: 'Fully present', req: true, dim: 'presence' },
    { s: 'presence', type: 'scale', label: 'Presence in good moments', q: 'When something enjoyable happens, how well can you actually enjoy it without analysing, anticipating or drifting?', lo: 'My mind keeps running', hi: 'I get fully absorbed', req: true, dim: 'presence' },
    { s: 'presence', type: 'scale', label: 'Connection to yourself', q: 'How connected do you feel to what you feel, what you need, and your inner state?', lo: 'Very disconnected', hi: 'Very connected', req: true, dim: 'connection' },
    { s: 'presence', type: 'scale', label: 'Connection to others', q: 'How genuinely connected do you currently feel to the people around you?', lo: 'Very isolated / distant', hi: 'Deeply connected', req: true, dim: 'connection' },
    { s: 'presence', type: 'choice', label: 'Isolation under stress', q: 'When you go through a hard period, what do you usually do?', opts: ['I stay connected and ask for support easily', 'I keep my relationships but share little', 'I gradually reduce contact', 'I isolate heavily', 'It depends on the situation'], req: true, dim: 'connection', vals: [1, 0.65, 0.35, 0, 0.5] },
    { s: 'presence', type: 'multi', label: 'Relational impact', q: 'Which behaviours show up most when you are stressed or overloaded?', opts: ['Less patient', 'I listen less', 'Physically there but mentally elsewhere', 'I isolate', 'I reply to messages less', 'More reactive', 'I seek more validation', 'Less desire to see people', 'I shut down emotionally', 'It barely affects my relationships'], req: true, dim: 'connection', inv: true },

    /* VIII — Your goal */
    { s: 'goal', type: 'longtext', label: 'Main transformation', q: 'If RESET worked exactly as you hope, what would concretely change in your life?', req: true },
    { s: 'goal', type: 'multi', label: 'Priority outcomes', q: 'What matters most to you right now?', opts: ['Lower my stress level', 'Find inner calm', 'Improve my focus', 'Reduce rumination', 'More mental clarity', 'Stabilise my energy', 'Sleep better', 'Breathe more efficiently', 'Reduce physical tension', 'Feel more connected to my body', 'Recover better', 'Handle emotions better', 'Come down faster after stress', 'Be more present', 'Feel more connected to others', 'Feel less isolated', 'Improve my relationships', 'Improve physical performance'], req: true },
    { s: 'goal', type: 'text', label: 'Single priority', q: 'If you could only improve one thing over the coming weeks, which would it be?', req: true },
    { s: 'goal', type: 'choice', label: 'How long', q: 'How long have these difficulties been significantly affecting your daily life?', opts: ['Less than 3 months', '3 to 6 months', '6 to 12 months', '1 to 3 years', 'More than 3 years'], req: true },
    { s: 'goal', type: 'longtext', label: 'What you have tried', q: 'What have you already tried to improve your stress, energy, focus, body or nervous system?', help: 'Therapy, meditation, sport, breathwork, yoga, supplements, medication, coaching, massage, sauna, cold exposure, routine changes…' },
    { s: 'goal', type: 'scale', label: 'Motivation', q: 'How ready are you to build new practices into your daily life on a regular basis?', lo: 'Mostly curious', hi: 'Ready to commit seriously', req: true }
  ];

  var DIMS = {
    cognitive: { name: 'Cognitive Performance', desc: 'Focus, brain fog, energy and stimulant reliance.' },
    autonomic: { name: 'Autonomic Flexibility', desc: 'Reactivity, coming down, regulation under pressure.' },
    coherence: { name: 'Heart Coherence Capacity', desc: 'Physiological stability and response to regulation.' },
    breathing: { name: 'Breathing Efficiency', desc: 'Night breathing, stress breathing, air hunger, BOLT.' },
    awareness: { name: 'Somatic Awareness', desc: 'Interoception, locating stress, voluntary release.' },
    load: { name: 'Somatic Load', desc: 'Tension, body armour, startle, irritability, recovery.' },
    presence: { name: 'Presence', desc: 'Getting off autopilot and staying in the experience.' },
    connection: { name: 'Connection', desc: 'Connection to self and others under stress.' }
  };

  var STORE = 'reset_audit_v1';
  var answers = {};
  var idx = 0;
  var root = null;

  /* ---------- persistence ---------- */
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify({ a: answers, i: idx })); } catch (e) {}
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return;
      var d = JSON.parse(raw);
      answers = d.a || {};
      idx = typeof d.i === 'number' ? d.i : 0;
    } catch (e) {}
  }
  function clear() {
    try { localStorage.removeItem(STORE); } catch (e) {}
  }

  /* ---------- scoring ---------- */
  function normalise(q, v) {
    if (v === undefined || v === null || v === '') return null;
    var n = null;
    if (q.type === 'scale') n = (Number(v) - 1) / 9;
    else if (q.type === 'choice') {
      var i = q.opts.indexOf(v);
      if (i < 0) return null;
      n = q.vals ? q.vals[i] : i / (q.opts.length - 1);
      if (q.vals) return clamp(n);
    } else if (q.type === 'multi') {
      var count = Array.isArray(v) ? v.length : 0;
      var none = Array.isArray(v) && v.some(function (x) {
        return /^(none|no particular)/i.test(x);
      });
      if (none) count = 0;
      n = 1 - Math.min(count, 6) / 6;
      return clamp(n);
    } else if (q.type === 'number') {
      var num = Number(v);
      if (isNaN(num)) return null;
      n = Math.min(num, q.max || 40) / (q.max || 40);
      return clamp(n);
    } else return null;
    if (q.inv) n = 1 - n;
    return clamp(n);
  }
  function clamp(n) { return Math.max(0, Math.min(1, n)); }

  function computeScores() {
    var acc = {};
    QUESTIONS.forEach(function (q, i) {
      if (!q.dim) return;
      var n = normalise(q, answers[i]);
      if (n === null) return;
      if (!acc[q.dim]) acc[q.dim] = [];
      acc[q.dim].push(n);
    });
    var out = [];
    Object.keys(DIMS).forEach(function (k) {
      if (!acc[k] || !acc[k].length) return;
      var avg = acc[k].reduce(function (a, b) { return a + b; }, 0) / acc[k].length;
      out.push({ key: k, name: DIMS[k].name, desc: DIMS[k].desc, score: Math.round(avg * 100) });
    });
    out.sort(function (a, b) { return a.score - b.score; });
    return out;
  }

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function isAnswered(i) {
    var q = QUESTIONS[i];
    var v = answers[i];
    if (!q.req) return true;
    if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
    return v !== undefined && v !== null && String(v).trim() !== '';
  }

  /* ---------- rendering ---------- */
  function render() {
    if (!root) return;
    var body = root.querySelector('.audit-body');
    var q = QUESTIONS[idx];
    var sec = SECTIONS.filter(function (s) { return s.id === q.s; })[0];
    body.innerHTML = '';

    var pct = Math.round((idx / QUESTIONS.length) * 100);
    root.querySelector('.audit-bar-fill').style.width = pct + '%';
    root.querySelector('.audit-step').textContent =
      'Question ' + (idx + 1) + ' of ' + QUESTIONS.length;

    var head = el('div', 'audit-sec');
    head.innerHTML = (sec.num ? '<span class="audit-sec-num">' + sec.num + '</span>' : '') +
      '<span class="audit-sec-title">' + esc(sec.title) + '</span>';
    body.appendChild(head);

    if (q.label && q.q) body.appendChild(el('p', 'audit-label', esc(q.label)));
    body.appendChild(el('h3', 'audit-q', esc(q.q || q.label)));
    if (q.help) body.appendChild(el('p', 'audit-help', esc(q.help)));

    body.appendChild(buildInput(q));

    var err = el('p', 'audit-error');
    err.style.display = 'none';
    body.appendChild(err);

    root.querySelector('.audit-back').disabled = idx === 0;
    var next = root.querySelector('.audit-next');
    next.textContent = idx === QUESTIONS.length - 1 ? 'See my results' : 'Next';
  }

  function buildInput(q) {
    var wrap = el('div', 'audit-input');
    var i = idx;

    if (q.type === 'scale') {
      var row = el('div', 'audit-scale');
      for (var n = 1; n <= 10; n++) {
        (function (n) {
          var b = el('button', 'audit-dot' + (Number(answers[i]) === n ? ' on' : ''), String(n));
          b.type = 'button';
          b.onclick = function () { answers[i] = n; save(); render(); setTimeout(next, 180); };
          row.appendChild(b);
        })(n);
      }
      wrap.appendChild(row);
      var lab = el('div', 'audit-scale-labels');
      lab.innerHTML = '<span>' + esc(q.lo || '') + '</span><span>' + esc(q.hi || '') + '</span>';
      wrap.appendChild(lab);

    } else if (q.type === 'choice') {
      q.opts.forEach(function (o) {
        var b = el('button', 'audit-opt' + (answers[i] === o ? ' on' : ''), esc(o));
        b.type = 'button';
        b.onclick = function () { answers[i] = o; save(); render(); setTimeout(next, 180); };
        wrap.appendChild(b);
      });

    } else if (q.type === 'multi') {
      if (!Array.isArray(answers[i])) answers[i] = [];
      q.opts.forEach(function (o) {
        var on = answers[i].indexOf(o) > -1;
        var b = el('button', 'audit-opt multi' + (on ? ' on' : ''), esc(o));
        b.type = 'button';
        b.onclick = function () {
          var a = answers[i];
          var p = a.indexOf(o);
          if (p > -1) a.splice(p, 1); else a.push(o);
          save(); render();
        };
        wrap.appendChild(b);
      });
      wrap.appendChild(el('p', 'audit-help', 'Select all that apply.'));

    } else if (q.type === 'longtext') {
      var ta = el('textarea', 'audit-field');
      ta.rows = 5;
      ta.value = answers[i] || '';
      ta.oninput = function () { answers[i] = ta.value; save(); };
      wrap.appendChild(ta);

    } else {
      var inp = el('input', 'audit-field');
      inp.type = q.type === 'email' ? 'email' : (q.type === 'number' ? 'number' : 'text');
      if (q.unit) inp.placeholder = q.unit;
      inp.value = answers[i] || '';
      inp.oninput = function () { answers[i] = inp.value; save(); };
      inp.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); next(); } };
      wrap.appendChild(inp);
    }
    return wrap;
  }

  function showError(msg) {
    var err = root.querySelector('.audit-error');
    if (!err) return;
    err.textContent = msg;
    err.style.display = 'block';
  }

  function next() {
    var q = QUESTIONS[idx];
    if (!isAnswered(idx)) {
      showError(q.type === 'multi' ? 'Pick at least one option.' : 'This one is required.');
      return;
    }
    if (q.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(answers[idx]).trim())) {
      showError('That email does not look right.');
      return;
    }
    if (idx === QUESTIONS.length - 1) { finish(); return; }
    idx++;
    save();
    render();
    root.querySelector('.audit-body').scrollTop = 0;
  }

  function back() {
    if (idx === 0) return;
    idx--;
    save();
    render();
  }

  /* ---------- submit + results ---------- */
  function finish() {
    var scores = computeScores();
    renderResults(scores, 'sending');
    submit(scores).then(function () {
      renderResults(scores, 'sent');
    }).catch(function () {
      renderResults(scores, 'failed');
    });
  }

  function payload(scores) {
    var lines = [];
    QUESTIONS.forEach(function (q, i) {
      var v = answers[i];
      if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) return;
      lines.push((q.label || q.q) + ': ' + (Array.isArray(v) ? v.join(', ') : v));
    });
    var s = scores.map(function (d) { return d.name + ': ' + d.score + '/100'; }).join('\n');
    return 'SCORES\n' + s + '\n\nANSWERS\n' + lines.join('\n');
  }

  function submit(scores) {
    var email = answers[0] || '';
    var name = answers[1] || '';
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'PASTE_YOUR_KEY_HERE') {
      return Promise.reject(new Error('not configured'));
    }
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: 'RESET Audit — ' + name,
        from_name: 'RESET Audit',
        email: email,
        name: name,
        message: payload(scores)
      })
    }).then(function (r) {
      if (!r.ok) throw new Error('bad status');
      return r.json();
    });
  }

  function renderResults(scores, state) {
    var body = root.querySelector('.audit-body');
    root.querySelector('.audit-bar-fill').style.width = '100%';
    root.querySelector('.audit-step').textContent = 'Your results';
    root.querySelector('.audit-nav').style.display = 'none';
    body.innerHTML = '';
    body.scrollTop = 0;

    body.appendChild(el('h3', 'audit-q', 'Your Human Performance map'));
    body.appendChild(el('p', 'audit-help',
      'Higher is better. Your lowest score is usually the bottleneck worth working on first.'));

    var list = el('div', 'audit-scores');
    scores.forEach(function (d, n) {
      var row = el('div', 'audit-score' + (n === 0 ? ' weak' : ''));
      row.innerHTML =
        '<div class="audit-score-top"><span>' + esc(d.name) +
        (n === 0 ? ' <em>&larr; start here</em>' : '') +
        '</span><strong>' + d.score + '</strong></div>' +
        '<div class="audit-score-bar"><i style="width:' + d.score + '%"></i></div>' +
        '<p>' + esc(d.desc) + '</p>';
      list.appendChild(row);
    });
    body.appendChild(list);

    var cta = el('div', 'audit-cta');
    if (state === 'sending') {
      cta.appendChild(el('p', 'audit-help', 'Saving your answers…'));
    } else if (state === 'sent') {
      cta.innerHTML =
        '<p class="audit-sent">Sent. I read every one of these personally.</p>' +
        '<p class="audit-help">Next step: a free 30-minute call to talk it through, ' +
        'or the full written plan built from your answers.</p>' +
        '<a class="btn btn-gold" href="https://calendly.com/thibault-postel89/new-meeting" target="_blank" rel="noopener">Book your free 30-min call</a>';
    } else {
      cta.innerHTML =
        '<p class="audit-sent">Your results are above, but the automatic send is not set up yet.</p>' +
        '<p class="audit-help">Book a call and we will go through it together.</p>' +
        '<a class="btn btn-gold" href="https://calendly.com/thibault-postel89/new-meeting" target="_blank" rel="noopener">Book your free 30-min call</a>' +
        '<p class="audit-help">Or email <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a></p>';
    }
    body.appendChild(cta);
    clear();
  }

  /* ---------- shell ---------- */
  function build() {
    root = el('div', 'audit-overlay');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML =
      '<div class="audit-panel">' +
        '<div class="audit-head">' +
          '<div class="audit-headline">' +
            '<span class="audit-title">Human Performance Audit</span>' +
            '<span class="audit-step"></span>' +
          '</div>' +
          '<button class="audit-close" type="button" aria-label="Close">&times;</button>' +
          '<div class="audit-bar"><div class="audit-bar-fill"></div></div>' +
        '</div>' +
        '<div class="audit-body"></div>' +
        '<div class="audit-nav">' +
          '<button class="audit-back" type="button">Back</button>' +
          '<button class="audit-next btn btn-gold" type="button">Next</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    root.querySelector('.audit-close').onclick = close;
    root.querySelector('.audit-back').onclick = back;
    root.querySelector('.audit-next').onclick = next;
    /* deliberately no click-outside-to-close */
    document.addEventListener('keydown', function (e) {
      if (!root || !root.classList.contains('open')) return;
      if (e.key === 'Escape') close();
    });
  }

  function open() {
    if (!root) build();
    load();
    if (idx >= QUESTIONS.length) { idx = 0; answers = {}; }
    root.querySelector('.audit-nav').style.display = '';
    root.classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    if (!root) return;
    root.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- wire up ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-audit-open]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        open();
      });
    });
    initPopup();
  });

  window.RESETAudit = { open: open, close: close };

  /* ============================================================
     Desktop-only prompt, shown once, before the offers section
     ============================================================ */
  function initPopup() {
    var SEEN = 'reset_popup_v1';
    var isDesktop = window.innerWidth > 900 &&
      !('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (!isDesktop) return;
    try { if (localStorage.getItem(SEEN)) return; } catch (e) {}

    var pop = el('div', 'promo-overlay');
    pop.innerHTML =
      '<div class="promo-panel">' +
        '<button class="promo-close" type="button" aria-label="Close">&times;</button>' +
        '<p class="promo-eyebrow">Before you look at prices</p>' +
        '<h3 class="promo-title">Find out what is actually stuck first.</h3>' +
        '<p class="promo-text">A free Human Performance Audit: 8 dimensions, from breathing ' +
        'efficiency to somatic load. You get your scores immediately and see which one is ' +
        'your real bottleneck.</p>' +
        '<button class="btn btn-gold promo-cta" type="button">Take the free audit</button>' +
        '<p class="promo-micro">Free &middot; No card &middot; Your results on screen</p>' +
      '</div>';
    document.body.appendChild(pop);

    function seen() {
      try { localStorage.setItem(SEEN, '1'); } catch (e) {}
    }
    function show() {
      if (pop.classList.contains('open')) return;
      pop.classList.add('open');
      seen();
      cleanup();
    }
    function hide() {
      pop.classList.remove('open');
    }
    pop.querySelector('.promo-close').onclick = hide;
    pop.querySelector('.promo-cta').onclick = function () { hide(); open(); };
    /* deliberately no click-outside-to-close */

    function onExit(e) {
      if (e.clientY <= 0) show();
    }
    var offers = document.getElementById('offers');
    function onScroll() {
      if (!offers) return;
      var top = offers.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) show();
    }
    function cleanup() {
      document.removeEventListener('mouseout', onExit);
      window.removeEventListener('scroll', onScroll);
    }
    document.addEventListener('mouseout', onExit);
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
