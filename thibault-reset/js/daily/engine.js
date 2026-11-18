/* ============================================================
   YOUR DAILY RESET — RECOMMENDATION ENGINE
   ============================================================
   Deterministic and rules based. No model, no invention.

   A practice is chosen by intention and available time only.
   Body areas never select the practice: they add a separate,
   clearly labelled note. The user can always reject what comes
   back and ask for something else.
   ============================================================ */

window.DailyEngine = (function () {
  'use strict';

  function all() { return window.DAILY_EXERCISES || []; }

  /* every practice for a goal, nearest duration first */
  function candidates(goal, minutes) {
    return all()
      .filter(function (p) { return p.goal === goal; })
      .sort(function (a, b) {
        return Math.abs(a.minutes - minutes) - Math.abs(b.minutes - minutes);
      });
  }

  /* `rejected` holds ids the user has already turned down */
  function pick(goal, minutes, rejected) {
    rejected = rejected || [];
    var list = candidates(goal, minutes);
    for (var i = 0; i < list.length; i++) {
      if (rejected.indexOf(list[i].id) === -1) return list[i];
    }
    // everything for this goal was rejected: offer another goal at the same length
    var others = all().filter(function (p) {
      return p.minutes === minutes && rejected.indexOf(p.id) === -1;
    });
    return others[0] || list[0] || null;
  }

  /* notes are additive and never change which practice was chosen */
  function notesFor(areas) {
    var map = window.DAILY_AREA_NOTES || {}, out = [];
    (areas || []).forEach(function (a) { if (map[a]) out.push(map[a]); });
    return out;
  }

  function checkLibrary() {
    var problems = [];
    var seen = {};
    all().forEach(function (p) {
      if (seen[p.id]) problems.push('duplicate id: ' + p.id);
      seen[p.id] = 1;
      var sum = p.steps.reduce(function (n, s) { return n + s.min; }, 0);
      if (sum !== p.minutes) {
        problems.push(p.id + ': steps total ' + sum + ' but minutes says ' + p.minutes);
      }
      if (!p.gentler) problems.push(p.id + ': no gentler alternative');
      if (!p.safety) problems.push(p.id + ': no safety note');
    });
    ['relax', 'recharge', 'focus', 'reconnect'].forEach(function (g) {
      [2, 5, 10, 20].forEach(function (m) {
        var hit = all().filter(function (p) { return p.goal === g && p.minutes === m; });
        if (!hit.length) problems.push('nothing for ' + g + ' at ' + m + ' minutes');
      });
    });
    return problems;
  }

  return { pick: pick, notesFor: notesFor, candidates: candidates, checkLibrary: checkLibrary };
})();
