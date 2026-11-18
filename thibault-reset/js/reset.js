/* ============================================================
   RESET — 60-SECOND ENTRY
   ============================================================

   Five questions, then a routine assembled from Thibault's three
   levers: CO2 tolerance, heart-rate coherence, somatic mapping.

   Everything runs in the browser. No server, no API key, no
   account. The routine is chosen by the rules in pickRoutine()
   below, which is the one function to edit when a practice or a
   preference changes.

   ============================================================ */

(function () {
  'use strict';

  /* ---------- the five questions ---------- */

  var QUESTIONS = [
    {
      id: 'loudest',
      title: 'What is loudest right now?',
      help: 'Pick the one you would most want gone.',
      options: [
        { v: 'tension', label: 'Tight neck, shoulders or jaw' },
        { v: 'mind',    label: 'Racing mind, cannot switch off' },
        { v: 'breath',  label: 'Shallow breathing, sighing, never a full breath' },
        { v: 'wired',   label: 'Wired but exhausted' },
        { v: 'dread',   label: 'Something soon I am dreading' }
      ]
    },
    {
      id: 'when',
      title: 'When is it hitting?',
      help: 'Where this sits in your day changes what helps.',
      options: [
        { v: 'before',  label: 'Right before something. A call, a meeting' },
        { v: 'midday',  label: 'Mid-day, at the desk' },
        { v: 'evening', label: 'Evening. I cannot come down' },
        { v: 'night',   label: 'Night. I cannot sleep' }
      ]
    },
    {
      id: 'time',
      title: 'How long have you got?',
      help: 'Be honest. A short one you finish beats a long one you abandon.',
      options: [
        { v: 3,  label: '3 minutes' },
        { v: 7,  label: '7 minutes' },
        { v: 15, label: '15 minutes' }
      ]
    },
    {
      id: 'avoid',
      title: 'What are you not up for?',
      help: 'Pick any that apply, or none.',
      multi: true,
      options: [
        { v: 'still',  label: 'Sitting still or anything that feels like meditation' },
        { v: 'visible', label: 'Anything that looks odd. People can see me' },
        { v: 'holds',  label: 'Long breath holds' }
      ]
    },
    {
      id: 'where',
      title: 'Where are you?',
      help: 'So nothing asks you for space you do not have.',
      options: [
        { v: 'desk',    label: 'At a desk, others around' },
        { v: 'private', label: 'Somewhere private. I can use the floor' },
        { v: 'outside', label: 'Outside, or I can get outside' }
      ]
    }
  ];

  /* ---------- the practice library ----------

     Every block names the lever it belongs to, so the result can
     show someone which part of the method they just touched.

     discreet : survives an open-plan office
     still    : asks you to stay put
     holds    : involves holding the breath
     floor    : needs floor space
  */

  var BLOCKS = {
    orient: {
      lever: 'Regulation',
      name: 'Orient to the room',
      min: 2,
      discreet: true, still: true,
      how: 'Let your eyes travel slowly around the room. No staring, no hurry. Let them land wherever they want and stay a few seconds. Your nervous system is checking, honestly, whether you are safe here.'
    },
    jaw: {
      lever: 'Embodiment',
      name: 'Jaw and tongue',
      min: 2,
      discreet: true,
      how: 'Unclench your teeth so they stop touching. Let your tongue fall off the roof of your mouth. Breathe out slowly through your nose, longer than you breathed in. The jaw holds more of the day than most people notice.'
    },
    shoulders: {
      lever: 'Embodiment',
      name: 'Shoulders and neck',
      min: 3,
      how: 'Slow shoulder rolls backwards, as slow as you can stand. Then let your head tip gently to one side and just breathe there. Swap sides. Nothing forced, no stretching into pain.'
    },
    ribs: {
      lever: 'Embodiment',
      name: 'Open the ribcage',
      min: 3,
      floor: false,
      how: 'Reach one arm overhead and lean gently to the other side. Breathe into the side you have opened, so the lower ribs move. Three or four breaths, then swap. Laptop posture closes this down all day.'
    },
    unwind: {
      lever: 'Embodiment',
      name: 'Shake it off',
      min: 3,
      floor: true,
      how: 'Stand and let your arms, hands and legs shake loose for a minute. It looks silly and it works. Then stop, stand still, and feel what is buzzing.'
    },
    exhale: {
      lever: 'Foundation',
      name: 'Longer exhale',
      min: 3,
      discreet: true,
      how: 'In through the nose, then out through the nose for about twice as long. Stay comfortable. If you are gasping at the end you have made it too long. The long exhale is the switch that tells the body it can stand down.'
    },
    light: {
      lever: 'Foundation',
      name: 'Light breathing',
      min: 4,
      discreet: true, still: true,
      how: 'Breathe through your nose and make each breath slightly smaller and quieter than feels normal. You want a mild sense of wanting more air, never a struggle. This is how CO2 tolerance is trained.'
    },
    coherence: {
      lever: 'Regulation',
      name: 'Coherent breathing',
      min: 5,
      discreet: true, still: true,
      how: 'In for about five seconds, out for about five. Even, smooth, nasal. Rest your attention in the middle of your chest. This is the rhythm the HeartMath device trains, done without one.'
    },
    walk: {
      lever: 'Regulation',
      name: 'Walk and breathe',
      min: 5,
      how: 'Walk at an easy pace, breathing only through your nose. Match the breath to your steps, roughly four steps in, six steps out. If you need your mouth, slow down.'
    },
    deskreset: {
      lever: 'Embodiment',
      name: 'Desk reset',
      min: 3,
      discreet: true,
      how: 'Without leaving your chair: draw slow circles with your nose, as if writing on the wall in front of you. Then roll the shoulders back a few times. Small, slow, nobody will notice.'
    },
    hands: {
      lever: 'Embodiment',
      name: 'Hands and forearms',
      min: 2,
      discreet: true,
      how: 'Spread your fingers wide, hold a moment, then make a loose fist. Repeat slowly. Then turn each wrist in both directions. Hours of typing live here and it goes straight up into the shoulders.'
    },
    eyes: {
      lever: 'Embodiment',
      name: 'Let the eyes go long',
      min: 2,
      discreet: true,
      how: 'Look at the furthest thing you can see, out of a window if there is one, and let your eyes rest there. Blink properly. A screen holds your focus at one fixed distance all day and the body reads that as vigilance.'
    },
    land: {
      lever: 'Embodiment',
      name: 'Land it',
      min: 1,
      discreet: true,
      how: 'Before you go back to the screen, name one thing that is different in your body now. Out loud or in your head. Noticing the change is what teaches your system to find it again.'
    }
  };

  /* ---------- the rules ---------- */

  function pickRoutine(a) {
    var avoid = a.avoid || [];
    var no = function (k) { return avoid.indexOf(k) !== -1; };
    var desk = a.where === 'desk';
    var outside = a.where === 'outside';

    // what the person named as loudest sets the main lever
    var chain;
    if (a.loudest === 'tension')      chain = ['shoulders', 'ribs', 'jaw', 'exhale'];
    else if (a.loudest === 'mind')    chain = ['orient', 'coherence', 'jaw', 'land'];
    else if (a.loudest === 'breath')  chain = ['exhale', 'light', 'ribs', 'land'];
    else if (a.loudest === 'wired')   chain = ['orient', 'exhale', 'shoulders', 'coherence'];
    else                              chain = ['orient', 'exhale', 'jaw', 'land'];

    // the time of day shifts the emphasis
    if (a.when === 'before')        chain = ['orient', 'exhale', 'jaw'].concat(chain);
    else if (a.when === 'midday')   chain = ['shoulders', 'walk'].concat(chain);
    else if (a.when === 'evening')  chain = ['unwind', 'exhale'].concat(chain);
    else if (a.when === 'night')    chain = ['exhale', 'light', 'coherence'];

    if (outside) chain = ['walk'].concat(chain);

    // drop anything the person ruled out
    var ok = [];
    for (var i = 0; i < chain.length; i++) {
      var k = chain[i], b = BLOCKS[k];
      if (!b || ok.indexOf(k) !== -1) continue;
      if (no('visible') && !b.discreet) continue;
      if (no('still') && b.still) continue;
      if (no('holds') && b.holds) continue;
      if (desk && b.floor) continue;
      ok.push(k);
    }

    // "land it" always closes the routine, so keep it out of the filling
    ok = ok.filter(function (k) { return k !== 'land'; });

    // anything else that passes the same filters, to fill a long slot
    var allowed = function (k) {
      var b = BLOCKS[k];
      if (!b || k === 'land') return false;
      if (no('visible') && !b.discreet) return false;
      if (no('still') && b.still) return false;
      if (no('holds') && b.holds) return false;
      if (desk && b.floor) return false;
      return true;
    };
    var FILLER = ['shoulders', 'ribs', 'deskreset', 'exhale', 'jaw', 'walk',
                  'eyes', 'hands', 'coherence', 'light', 'unwind', 'orient'];
    for (var f = 0; f < FILLER.length; f++) {
      if (ok.indexOf(FILLER[f]) === -1 && allowed(FILLER[f])) ok.push(FILLER[f]);
    }

    // take blocks in order while they fit; never go over the time asked for,
    // not even on the opener (a 5-minute walk is no answer to "I have 3")
    var out = [], used = 0;
    for (var j = 0; j < ok.length; j++) {
      var blk = BLOCKS[ok[j]];
      if (used + blk.min > a.time) continue;
      out.push(ok[j]);
      used += blk.min;
      if (used >= a.time) break;
    }

    // nothing fit: give the shortest thing that passed the filters
    if (!out.length) {
      var best = ok[0];
      for (var s = 1; s < ok.length; s++) {
        if (BLOCKS[ok[s]].min < BLOCKS[best].min) best = ok[s];
      }
      out = [best]; used = BLOCKS[best].min;
    }

    // close by noticing the change, if a minute is left or it rounds out
    if (used + 1 <= a.time && out.length) {
      out.push('land'); used += 1;
    }
    return { keys: out, total: used };
  }

  function whyLine(a) {
    if (a.loudest === 'tension')
      return 'You named tension, so this starts in the body and lets the breath follow.';
    if (a.loudest === 'mind')
      return 'A racing mind rarely argues its way quiet. This works on the body underneath it instead.';
    if (a.loudest === 'breath')
      return 'Shallow breathing and constant sighing are a CO2 tolerance problem, not a willpower problem.';
    if (a.loudest === 'wired')
      return 'Wired and exhausted at once is a nervous system stuck on, not a lack of rest.';
    return 'Before something you are dreading, the job is to drop the activation, not to think it through.';
  }

  /* ---------- the page ---------- */

  var answers = {}, step = 0;
  var root = document.getElementById('rx');
  if (!root) return;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderDots() {
    var d = '';
    for (var i = 0; i < QUESTIONS.length; i++) {
      d += '<span class="rx-dot' + (i < step ? ' done' : (i === step ? ' now' : '')) + '"></span>';
    }
    return '<div class="rx-dots" aria-hidden="true">' + d + '</div>';
  }

  function renderQuestion() {
    var q = QUESTIONS[step];
    var picked = answers[q.id];
    var h = '<div class="rx-card">' + renderDots() +
            '<p class="rx-step">Question ' + (step + 1) + ' of ' + QUESTIONS.length + '</p>' +
            '<h2 class="rx-q">' + esc(q.title) + '</h2>' +
            '<p class="rx-help">' + esc(q.help) + '</p>' +
            '<div class="rx-opts">';
    for (var i = 0; i < q.options.length; i++) {
      var o = q.options[i];
      var on = q.multi
        ? (picked && picked.indexOf(o.v) !== -1)
        : (picked === o.v);
      h += '<button type="button" class="rx-opt' + (on ? ' on' : '') +
           '" data-v="' + esc(o.v) + '">' + esc(o.label) + '</button>';
    }
    h += '</div>';
    if (q.multi) {
      h += '<button type="button" class="rx-next" data-next="1">' +
           (picked && picked.length ? 'Continue' : 'None of these') + '</button>';
    }
    if (step > 0) h += '<button type="button" class="rx-back" data-back="1">Back</button>';
    h += '</div>';
    root.innerHTML = h;
    var first = root.querySelector('.rx-opt');
    if (first) first.focus();
  }

  function renderResult() {
    var r = pickRoutine(answers);
    var h = '<div class="rx-card rx-result">' +
            '<p class="rx-step">Your routine</p>' +
            '<h2 class="rx-q">' + r.total + ' minutes, starting now</h2>' +
            '<p class="rx-why">' + esc(whyLine(answers)) + '</p>' +
            '<ol class="rx-steps">';
    for (var i = 0; i < r.keys.length; i++) {
      var b = BLOCKS[r.keys[i]];
      h += '<li class="rx-block">' +
             '<div class="rx-block-head">' +
               '<span class="rx-block-n">' + ('0' + (i + 1)).slice(-2) + '</span>' +
               '<span class="rx-block-name">' + esc(b.name) + '</span>' +
               '<span class="rx-block-min">' + b.min + ' min</span>' +
             '</div>' +
             '<p class="rx-block-lever">' + esc(b.lever) + '</p>' +
             '<p class="rx-block-how">' + esc(b.how) + '</p>' +
           '</li>';
    }
    h += '</ol>' +
         '<p class="rx-safety">Breathe through your nose and stay comfortable throughout. ' +
         'Never push to the point of strain. If you feel dizzy, stop and breathe normally.</p>' +
         '<div class="rx-ctas">' +
           '<a class="btn btn-gold rx-cta" href="https://calendly.com/thibault-postel89/new-meeting" target="_blank" rel="noopener">Book a free discovery call</a>' +
           '<a class="btn btn-gold-outline rx-cta" href="../audit/">Go deeper: the full audit</a>' +
         '</div>' +
         '<button type="button" class="rx-again" data-again="1">Start again</button>' +
         '<p class="rx-disclaimer">Coaching and education. Not psychotherapy or medical care.</p>' +
         '</div>';
    root.innerHTML = h;
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function advance() {
    step++;
    if (step >= QUESTIONS.length) renderResult();
    else renderQuestion();
  }

  root.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;

    if (t.hasAttribute('data-again')) {
      answers = {}; step = 0; renderQuestion(); return;
    }
    if (t.hasAttribute('data-back')) {
      step = Math.max(0, step - 1); renderQuestion(); return;
    }
    if (t.hasAttribute('data-next')) { advance(); return; }

    if (t.classList.contains('rx-opt')) {
      var q = QUESTIONS[step];
      var raw = t.getAttribute('data-v');
      var v = (q.id === 'time') ? parseInt(raw, 10) : raw;

      if (q.multi) {
        var cur = answers[q.id] || [];
        var at = cur.indexOf(v);
        if (at === -1) cur.push(v); else cur.splice(at, 1);
        answers[q.id] = cur;
        renderQuestion();
      } else {
        answers[q.id] = v;
        advance();
      }
    }
  });

  renderQuestion();
})();
