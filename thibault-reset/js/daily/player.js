/* ============================================================
   YOUR DAILY RESET — GUIDED PRACTICE PLAYER
   ============================================================
   Walks through a practice step by step with a timer.
   Pause, restart, skip and leave are all available at any
   moment. Nothing auto-plays sound and nothing is mandatory.
   ============================================================ */

window.DailyPlayer = (function () {
  'use strict';

  function mmss(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function create(opts) {
    var host = opts.host;
    var practice = opts.practice;
    var onDone = opts.onDone;
    var onLeave = opts.onLeave;

    var idx = 0;
    var left = practice.steps[0].min * 60;
    var running = false;
    var tick = null;

    function total() {
      return practice.steps.reduce(function (n, s) { return n + s.min * 60; }, 0);
    }
    function elapsed() {
      var done = 0;
      for (var i = 0; i < idx; i++) done += practice.steps[i].min * 60;
      return done + (practice.steps[idx].min * 60 - left);
    }

    function stop() { if (tick) { clearInterval(tick); tick = null; } running = false; }

    function start() {
      if (running) return;
      running = true;
      tick = setInterval(function () {
        left--;
        if (left <= 0) { nextStep(); } else { paint(); }
      }, 1000);
      paint();
    }

    function nextStep() {
      stop();
      if (idx >= practice.steps.length - 1) { render(true); if (onDone) onDone(); return; }
      idx++;
      left = practice.steps[idx].min * 60;
      render();
      start();
    }

    function restart() {
      stop(); idx = 0; left = practice.steps[0].min * 60; render();
    }

    function paint() {
      var t = host.querySelector('.dp-time');
      if (t) t.textContent = mmss(Math.max(0, left));
      var bar = host.querySelector('.dp-bar-fill');
      if (bar) bar.style.width = Math.min(100, (elapsed() / total()) * 100) + '%';
      var pb = host.querySelector('.dp-play');
      if (pb) pb.textContent = running ? 'Pause' : 'Start';
    }

    function render(finished) {
      if (finished) { host.innerHTML = ''; return; }
      var s = practice.steps[idx];
      host.innerHTML =
        '<div class="dp">' +
          '<div class="dp-bar" aria-hidden="true"><span class="dp-bar-fill"></span></div>' +
          '<p class="dp-count">Step ' + (idx + 1) + ' of ' + practice.steps.length + '</p>' +
          '<p class="dp-time" role="timer" aria-live="off">' + mmss(left) + '</p>' +
          '<p class="dp-text">' + s.text + '</p>' +
          '<div class="dp-controls">' +
            '<button type="button" class="dp-play">Start</button>' +
            '<button type="button" class="dp-skip">Skip step</button>' +
            '<button type="button" class="dp-restart">Restart</button>' +
          '</div>' +
          '<button type="button" class="dp-leave">Choose a different practice</button>' +
        '</div>';
      paint();
    }

    host.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.classList.contains('dp-play'))    { running ? stop() : start(); paint(); }
      else if (b.classList.contains('dp-skip'))    { nextStep(); }
      else if (b.classList.contains('dp-restart')) { restart(); }
      else if (b.classList.contains('dp-leave'))   { stop(); if (onLeave) onLeave(); }
    });

    render();
    return { destroy: stop };
  }

  return { create: create };
})();
