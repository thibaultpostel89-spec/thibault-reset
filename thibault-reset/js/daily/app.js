/* ============================================================
   YOUR DAILY RESET — FLOW
   ============================================================
   Body check-in, intention, time, practice, reflection, exits.

   Nothing is stored. Closing the tab forgets everything, which
   is deliberate while the product has no accounts and handles
   what people say about their bodies.
   ============================================================ */

(function () {
  'use strict';

  var CALENDLY = 'https://calendly.com/thibault-postel89/new-meeting';

  var GOALS = [
    { id: 'relax',     name: 'Relax',     line: 'Find a little more calm.' },
    { id: 'recharge',  name: 'Recharge',  line: 'Gently restore energy.' },
    { id: 'focus',     name: 'Focus',     line: 'Support attention and clarity.' },
    { id: 'reconnect', name: 'Reconnect', line: 'Feel more present and grounded.' }
  ];
  var TIMES = [2, 5, 10, 20];

  var root = document.getElementById('daily');
  if (!root) return;

  var state = { areas: [], unsure: false, goal: null, minutes: null, rejected: [] };
  var bodyMap = null, player = null;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function go(fn) {
    if (player) { player.destroy(); player = null; }
    fn();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function head(n, title, sub) {
    return '<p class="dl-step">Step ' + n + ' of 4</p>' +
           '<h2 class="dl-h">' + esc(title) + '</h2>' +
           (sub ? '<p class="dl-sub">' + esc(sub) + '</p>' : '');
  }

  /* ---------- 1. body check-in ---------- */
  function screenBody() {
    root.innerHTML =
      '<div class="dl-card">' +
        head(1, 'Where do you notice tension?', 'Tap anywhere you feel it. Choose as many as you like, or none at all.') +
        '<div id="dl-bodymap"></div>' +
        '<div class="dl-row">' +
          '<button type="button" class="dl-ghost" data-act="unsure">I am not sure</button>' +
          '<button type="button" class="dl-ghost" data-act="skip">Skip this</button>' +
        '</div>' +
        '<button type="button" class="dl-next" data-act="toGoal">Continue</button>' +
        '<p class="dl-note">This is a way of noticing, not a diagnosis. It does not decide which practice you get.</p>' +
      '</div>';
    bodyMap = window.DailyBodyMap.create({ host: document.getElementById('dl-bodymap') });
  }

  /* ---------- 2. intention ---------- */
  function screenGoal() {
    var cards = GOALS.map(function (g) {
      return '<button type="button" class="dl-goal' + (state.goal === g.id ? ' on' : '') +
             '" data-goal="' + g.id + '">' +
               '<span class="dl-goal-name">' + esc(g.name) + '</span>' +
               '<span class="dl-goal-line">' + esc(g.line) + '</span>' +
             '</button>';
    }).join('');
    root.innerHTML =
      '<div class="dl-card">' +
        head(2, 'What would you like to support right now?') +
        '<div class="dl-goals">' + cards + '</div>' +
        '<button type="button" class="dl-back" data-act="toBody">Back</button>' +
      '</div>';
  }

  /* ---------- 3. time ---------- */
  function screenTime() {
    var btns = TIMES.map(function (m) {
      return '<button type="button" class="dl-time" data-min="' + m + '">' + m +
             '<span>minutes</span></button>';
    }).join('');
    root.innerHTML =
      '<div class="dl-card">' +
        head(3, 'How much time do you have?') +
        '<div class="dl-times">' + btns + '</div>' +
        '<button type="button" class="dl-back" data-act="toGoal">Back</button>' +
      '</div>';
  }

  /* ---------- 4. the practice ---------- */
  function screenPractice() {
    var p = window.DailyEngine.pick(state.goal, state.minutes, state.rejected);
    if (!p) { screenTime(); return; }
    state.current = p;

    var notes = window.DailyEngine.notesFor(state.unsure ? [] : state.areas);
    var noteHtml = notes.length
      ? '<div class="dl-notes"><p class="dl-notes-t">Because of what you marked</p>' +
        notes.map(function (n) { return '<p>' + esc(n) + '</p>'; }).join('') + '</div>'
      : '';

    var steps = p.steps.map(function (s, i) {
      return '<li><span class="dl-pn">' + ('0' + (i + 1)).slice(-2) + '</span>' +
             '<span class="dl-pt">' + esc(s.text) + '</span>' +
             '<span class="dl-pm">' + s.min + ' min</span></li>';
    }).join('');

    root.innerHTML =
      '<div class="dl-card">' +
        '<p class="dl-step">Your Daily RESET</p>' +
        '<h2 class="dl-h">' + esc(p.title) + '</h2>' +
        '<p class="dl-sub">' + esc(p.purpose) + '</p>' +
        '<p class="dl-meta">' + p.minutes + ' minutes &middot; ' + esc(p.goal) + '</p>' +
        noteHtml +
        '<ol class="dl-plan">' + steps + '</ol>' +
        '<div id="dl-player"></div>' +
        '<div class="dl-soft"><p class="dl-soft-t">A gentler version</p><p>' + esc(p.gentler) + '</p></div>' +
        '<p class="dl-safety">' + esc(p.safety) + '</p>' +
        '<div class="dl-row">' +
          '<button type="button" class="dl-ghost" data-act="another">Suggest another practice</button>' +
          '<button type="button" class="dl-ghost" data-act="toTime">Change the time</button>' +
        '</div>' +
        '<button type="button" class="dl-next" data-act="toDone">I have finished</button>' +
      '</div>';

    player = window.DailyPlayer.create({
      host: document.getElementById('dl-player'),
      practice: p,
      onDone: function () { go(screenDone); },
      onLeave: function () { state.rejected.push(p.id); go(screenPractice); }
    });
  }

  /* ---------- 5. reflection and exits ---------- */
  function screenDone() {
    root.innerHTML =
      '<div class="dl-card">' +
        '<p class="dl-step">Afterwards</p>' +
        '<h2 class="dl-h">How do you feel now?</h2>' +
        '<p class="dl-sub">There is no right answer, and no answer is a problem.</p>' +
        '<div class="dl-opts">' +
          ['A little better', 'About the same', 'Less comfortable', 'Not sure']
            .map(function (t) { return '<button type="button" class="dl-opt" data-feel="' + esc(t) + '">' + esc(t) + '</button>'; })
            .join('') +
        '</div>' +
      '</div>';
  }

  function screenExits(feel) {
    var less = feel === 'Less comfortable';
    root.innerHTML =
      '<div class="dl-card">' +
        '<p class="dl-step">Where next</p>' +
        '<h2 class="dl-h">' + (less ? 'Thank you for saying so' : 'That is noted') + '</h2>' +
        '<p class="dl-sub">' + (less
          ? 'Some practices do not suit some days or some bodies. Nothing is wrong with you. Try a gentler or shorter one, or leave it for now.'
          : 'Nothing here needs to be bought or booked. These are simply what is available.') + '</p>' +
        '<div class="dl-exits">' +
          '<button type="button" class="dl-exit" data-act="restart">' +
            '<span class="dl-exit-t">Continue your RESET</span>' +
            '<span class="dl-exit-l">Try another practice, or a different length.</span></button>' +
          '<button type="button" class="dl-exit" data-act="lisbon">' +
            '<span class="dl-exit-t">Explore Lisbon</span>' +
            '<span class="dl-exit-l">Quiet places and studios worth knowing about.</span></button>' +
          '<a class="dl-exit" href="' + CALENDLY + '" target="_blank" rel="noopener">' +
            '<span class="dl-exit-t">Book a RESET Assessment</span>' +
            '<span class="dl-exit-l">A free 30-minute call with Thibault.</span></a>' +
        '</div>' +
        '<p class="dl-disclaimer">Educational wellness support. Not medical diagnosis or treatment. ' +
        'If something hurts or worries you, speak to a health professional.</p>' +
      '</div>';
  }

  /* ---------- Explore Lisbon ---------- */
  function screenLisbon() {
    var places = window.DAILY_LISBON || [];
    var body;
    if (!places.length) {
      body = '<div class="dl-empty">' +
        '<p>There is nothing here yet, on purpose.</p>' +
        '<p>This section will only ever list places Thibault has been to himself, ' +
        'with the date each was last checked. No invented venues, no unverified prices, ' +
        'and any paid placement would be marked as such.</p></div>';
    } else {
      body = '<div class="dl-places">' + places.map(function (p) {
        return '<article class="dl-place">' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p class="dl-place-meta">' + esc(p.category) + ' &middot; ' + esc(p.neighborhood) + '</p>' +
          '<p>' + esc(p.description) + '</p>' +
          (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">Website</a>' : '') +
          '<p class="dl-place-check">Last checked ' + esc(p.checked) + '</p>' +
        '</article>';
      }).join('') + '</div>';
    }
    root.innerHTML =
      '<div class="dl-card">' +
        '<p class="dl-step">Explore Lisbon</p>' +
        '<h2 class="dl-h">Places that may suit you</h2>' + body +
        '<button type="button" class="dl-back" data-act="restart">Back to the start</button>' +
      '</div>';
  }

  /* ---------- events ---------- */
  root.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act], [data-goal], [data-min], [data-feel]');
    if (!el) return;

    var goal = el.getAttribute('data-goal');
    if (goal) { state.goal = goal; go(screenTime); return; }

    var min = el.getAttribute('data-min');
    if (min) { state.minutes = parseInt(min, 10); state.rejected = []; go(screenPractice); return; }

    var feel = el.getAttribute('data-feel');
    if (feel) { go(function () { screenExits(feel); }); return; }

    switch (el.getAttribute('data-act')) {
      case 'unsure':  state.unsure = true; state.areas = []; if (bodyMap) bodyMap.clear(); go(screenGoal); break;
      case 'skip':    state.unsure = true; state.areas = []; go(screenGoal); break;
      case 'toGoal':  if (bodyMap) state.areas = bodyMap.selected(); go(screenGoal); break;
      case 'toBody':  go(screenBody); break;
      case 'toTime':  go(screenTime); break;
      case 'another': state.rejected.push(state.current.id); go(screenPractice); break;
      case 'toDone':  go(screenDone); break;
      case 'lisbon':  go(screenLisbon); break;
      case 'restart':
        state = { areas: [], unsure: false, goal: null, minutes: null, rejected: [] };
        go(screenBody);
        break;
    }
  });

  screenBody();
})();
