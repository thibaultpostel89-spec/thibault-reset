/* ============================================================
   QUIZZ VID — participant view (rounds 1 and 2)
   Reads its round from <body data-round="1">.
   Nothing here needs editing; the questions live in config.js.
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.QUIZZ_VID || {};
  var round = Number(document.body.getAttribute('data-round')) || 1;
  var spec = (CFG.rounds || {})[round];
  var root = document.getElementById('qv');
  if (!spec || !root) return;

  var SENT_KEY = 'quizz_vid_sent_round_' + round;
  var questions = spec.questions;
  /* screen 0 is the optional first name, then one screen per question */
  var TOTAL = questions.length + 1;

  var idx = 0;
  var name = '';
  var answers = questions.map(function () { return null; });
  var sending = false;

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

  /* ---------- sending ---------- */
  function configured() {
    var s = CFG.supabase || {};
    return s.url && s.anonKey &&
      s.url.indexOf('PASTE_') !== 0 && s.anonKey.indexOf('PASTE_') !== 0;
  }

  function send() {
    var s = CFG.supabase;
    return fetch(s.url.replace(/\/+$/, '') + '/rest/v1/' + s.table, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: s.anonKey,
        Authorization: 'Bearer ' + s.anonKey,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        round: round,
        first_name: name || null,
        answers: answers
      })
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
    });
  }

  /* ---------- screens ---------- */
  function renderName() {
    var body = el('div', 'qv-body');
    body.appendChild(el('h1', 'qv-q', 'First name?'));
    body.appendChild(el('p', 'qv-help',
      'Optional. It is only used so Thibault can pull up your result during the sensor demo. Leave it blank to stay anonymous.'));
    var input = el('input', 'qv-field');
    input.type = 'text';
    input.placeholder = 'Your first name';
    input.value = name;
    input.autocomplete = 'given-name';
    input.oninput = function () { name = input.value.trim(); };
    input.onkeydown = function (e) { if (e.key === 'Enter') go(1); };
    body.appendChild(input);
    return body;
  }

  function renderQuestion(n) {
    var q = questions[n];
    var body = el('div', 'qv-body');
    body.appendChild(el('h1', 'qv-q', esc(q.q)));
    q.options.forEach(function (opt, i) {
      var b = el('button', 'qv-opt' + (answers[n] === i ? ' on' : ''), esc(opt));
      b.type = 'button';
      b.onclick = function () {
        /* no auto-advance: a mis-tap should stay fixable */
        answers[n] = i;
        render();
      };
      body.appendChild(b);
    });
    return body;
  }

  function renderDone(state) {
    var body = el('div', 'qv-body');
    if (state === 'sending') {
      body.appendChild(el('h1', 'qv-done-title', 'Sending…'));
      body.appendChild(el('p', 'qv-done-text', 'One second.'));
    } else if (state === 'ok') {
      body.appendChild(el('h1', 'qv-done-title', 'Got it. Thank you.'));
      body.appendChild(el('p', 'qv-done-text',
        'Your answers are in. Look up at the screen, we go through the results together.'));
    } else {
      body.appendChild(el('h1', 'qv-done-title', 'Could not send'));
      body.appendChild(el('p', 'qv-done-text',
        'Check your connection and try again. Your answers are still here.'));
      var again = el('button', 'qv-next', 'Try again');
      again.type = 'button';
      again.style.marginTop = '18px';
      again.onclick = submit;
      body.appendChild(again);
    }
    return body;
  }

  function renderAlready() {
    var body = el('div', 'qv-body');
    body.appendChild(el('h1', 'qv-done-title', 'Already answered'));
    body.appendChild(el('p', 'qv-done-text',
      'This phone has already sent its answers for ' + esc(spec.pill.toLowerCase()) + '.'));
    return body;
  }

  /* ---------- shell ---------- */
  function shell(bodyNode, opts) {
    opts = opts || {};
    root.innerHTML = '';
    var card = el('div', 'qv-card');

    var bar = el('div', 'qv-bar');
    var fill = el('div', 'qv-bar-fill');
    fill.style.width = (opts.pct === undefined ? 100 : opts.pct) + '%';
    bar.appendChild(fill);
    card.appendChild(bar);

    var head = el('div', 'qv-head');
    head.appendChild(el('span', 'qv-pill', esc(spec.pill)));
    if (opts.step) head.appendChild(el('span', 'qv-step', esc(opts.step)));
    card.appendChild(head);

    card.appendChild(bodyNode);

    if (opts.nav) {
      var nav = el('div', 'qv-nav');
      var back = el('button', 'qv-back', 'Back');
      back.type = 'button';
      back.disabled = idx === 0;
      back.onclick = function () { go(-1); };
      nav.appendChild(back);

      var last = idx === TOTAL - 1;
      var next = el('button', 'qv-next', last ? 'Submit' : 'Next');
      next.type = 'button';
      /* the name screen is skippable; a question is not */
      next.disabled = idx > 0 && answers[idx - 1] === null;
      next.onclick = function () { last ? submit() : go(1); };
      nav.appendChild(next);
      card.appendChild(nav);
    }

    root.appendChild(card);
  }

  function go(step) {
    idx = Math.max(0, Math.min(TOTAL - 1, idx + step));
    render();
    window.scrollTo(0, 0);
  }

  function submit() {
    if (sending) return;
    if (!configured()) {
      shell(renderDone('fail'), {});
      return;
    }
    sending = true;
    shell(renderDone('sending'), {});
    send().then(function () {
      sending = false;
      try { localStorage.setItem(SENT_KEY, String(Date.now())); } catch (e) {}
      shell(renderDone('ok'), {});
    }).catch(function () {
      sending = false;
      shell(renderDone('fail'), {});
    });
  }

  function render() {
    var pct = Math.round((idx / TOTAL) * 100);
    if (idx === 0) {
      shell(renderName(), { pct: pct, step: 'Before we start', nav: true });
    } else {
      shell(renderQuestion(idx - 1), {
        pct: pct,
        step: 'Question ' + idx + ' of ' + questions.length,
        nav: true
      });
    }
  }

  /* one phone, one submission per round */
  var already = false;
  try { already = !!localStorage.getItem(SENT_KEY); } catch (e) {}
  if (already && location.search.indexOf('again') === -1) {
    shell(renderAlready(), {});
  } else {
    render();
  }
})();
