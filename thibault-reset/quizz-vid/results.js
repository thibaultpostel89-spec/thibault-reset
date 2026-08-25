/* ============================================================
   QUIZZ VID — presenter dashboard
   Polls Supabase every few seconds. Nothing to click during the
   activity: leave it open on the projector.
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.QUIZZ_VID || {};
  var POLL_MS = 4000;
  var rows = [];
  var lastOk = 0;
  var lookupTerm = '';

  var elRounds = document.getElementById('qvRounds');
  var elLive = document.getElementById('qvLive');
  var elLookOut = document.getElementById('qvLookupOut');
  var elLookIn = document.getElementById('qvLookupInput');

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function configured() {
    var s = CFG.supabase || {};
    return s.url && s.anonKey &&
      s.url.indexOf('PASTE_') !== 0 && s.anonKey.indexOf('PASTE_') !== 0;
  }

  function fetchRows() {
    var s = CFG.supabase;
    var url = s.url.replace(/\/+$/, '') + '/rest/v1/' + s.table +
      '?select=round,first_name,answers,created_at&order=created_at.asc';
    return fetch(url, {
      headers: { apikey: s.anonKey, Authorization: 'Bearer ' + s.anonKey },
      cache: 'no-store'
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  /* ---------- scoring, done here so config.js stays the one source ---------- */
  function statsFor(roundNo) {
    var spec = (CFG.rounds || {})[roundNo];
    if (!spec) return null;
    var mine = rows.filter(function (r) { return Number(r.round) === roundNo; });
    var qs = spec.questions;
    var perQ = qs.map(function () { return { right: 0, answered: 0 }; });
    var totalRight = 0, totalAnswered = 0;

    mine.forEach(function (r) {
      var a = Array.isArray(r.answers) ? r.answers : [];
      qs.forEach(function (q, i) {
        if (a[i] === null || a[i] === undefined) return;
        perQ[i].answered++;
        totalAnswered++;
        if (Number(a[i]) === q.correct) { perQ[i].right++; totalRight++; }
      });
    });

    return {
      spec: spec,
      responses: mine.length,
      overall: totalAnswered ? Math.round((totalRight / totalAnswered) * 100) : 0,
      perQ: perQ.map(function (p, i) {
        return {
          label: qs[i].q,
          pct: p.answered ? Math.round((p.right / p.answered) * 100) : 0,
          answered: p.answered
        };
      })
    };
  }

  function roundCard(roundNo) {
    var st = statsFor(roundNo);
    if (!st) return '';
    var bars = st.responses
      ? st.perQ.map(function (q, i) {
          var cls = q.pct >= 70 ? ' high' : q.pct < 40 ? ' low' : '';
          return '<div class="qv-qrow">' +
            '<div class="qv-qrow-top">' +
              '<span class="qv-qrow-label">' + (i + 1) + '. ' + esc(q.label) + '</span>' +
              '<span class="qv-qrow-pct">' + q.pct + '%</span>' +
            '</div>' +
            '<div class="qv-track"><div class="qv-fill' + cls + '" style="width:' + q.pct + '%"></div></div>' +
          '</div>';
        }).join('')
      : '<p class="qv-empty">Waiting for the first answers…</p>';

    return '<section class="qv-round">' +
      '<p class="qv-round-name">' + esc(st.spec.pill) + '</p>' +
      '<p class="qv-round-video">' + esc(st.spec.title) + '</p>' +
      '<div class="qv-big">' +
        '<span class="qv-big-num">' + (st.responses ? st.overall : '—') + '<span style="font-size:38px">%</span></span>' +
        '<span class="qv-big-label">correct<br>overall</span>' +
      '</div>' +
      '<p class="qv-count"><b>' + st.responses + '</b> ' +
        (st.responses === 1 ? 'response' : 'responses') + ' so far</p>' +
      bars +
    '</section>';
  }

  function renderLookup() {
    if (!elLookOut) return;
    var term = lookupTerm.trim().toLowerCase();
    if (!term) { elLookOut.innerHTML = ''; return; }
    var hits = rows.filter(function (r) {
      return r.first_name && String(r.first_name).toLowerCase().indexOf(term) > -1;
    });
    if (!hits.length) {
      elLookOut.innerHTML = '<div class="hit">No one by that name yet.</div>';
      return;
    }
    elLookOut.innerHTML = hits.map(function (r) {
      var spec = (CFG.rounds || {})[Number(r.round)];
      if (!spec) return '';
      var a = Array.isArray(r.answers) ? r.answers : [];
      var right = spec.questions.reduce(function (n, q, i) {
        return n + (Number(a[i]) === q.correct ? 1 : 0);
      }, 0);
      return '<div class="hit"><b>' + esc(r.first_name) + '</b> &middot; ' +
        esc(spec.pill.toLowerCase()) + ' &middot; ' +
        right + ' / ' + spec.questions.length + ' correct</div>';
    }).join('');
  }

  function render() {
    var nums = Object.keys(CFG.rounds || {}).map(Number).sort();
    var withData = nums.filter(function (n) {
      return rows.some(function (r) { return Number(r.round) === n; });
    });
    elRounds.className = 'qv-rounds' + (withData.length >= 2 ? ' two' : '');
    elRounds.innerHTML = nums.map(roundCard).join('');
    renderLookup();

    var stale = Date.now() - lastOk > POLL_MS * 3;
    elLive.className = 'qv-live' + (stale ? ' stale' : '');
    elLive.querySelector('.qv-live-text').textContent =
      stale ? 'connection lost' : 'live';
  }

  function tick() {
    fetchRows().then(function (data) {
      rows = data || [];
      lastOk = Date.now();
      render();
    }).catch(function () {
      render();
    });
  }

  if (!configured()) {
    document.getElementById('qvSetup').style.display = 'block';
    return;
  }
  if (elLookIn) {
    elLookIn.oninput = function () { lookupTerm = elLookIn.value; renderLookup(); };
  }
  tick();
  setInterval(tick, POLL_MS);
})();
