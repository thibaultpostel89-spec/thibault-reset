/* ============================================================
   YOUR DAILY RESET — BODY MAP
   ============================================================
   An interactive silhouette. Tap areas where you notice
   tension. Multiple areas allowed, none required.

   This is an awareness tool. It never infers a condition and
   never decides which practice someone gets.
   ============================================================ */

window.DailyBodyMap = (function () {
  'use strict';

  /* Shapes are deliberately simple and symmetrical. The figure has to
     read as a body at 200px wide on a phone, not be anatomical. */
  var ARMS  = 'M66 90 L57 97 L48 208 C47 216 52 220 58 219 C62 218 64 214 65 207 L71 126 Z ' +
              'M134 90 L143 97 L152 208 C153 216 148 220 142 219 C138 218 136 214 135 207 L129 126 Z';
  var LEGS  = 'M78 240 L75 396 C75 402 79 404 84 404 L92 404 C96 404 98 401 98 396 L100 240 Z ' +
              'M122 240 L125 396 C125 402 121 404 116 404 L108 404 C104 404 102 401 102 396 L100 240 Z';

  var ZONES = {
    front: [
      { id: 'jaw',       label: 'Jaw',       d: 'M82 46 C84 60 91 66 100 66 C109 66 116 60 118 46 C112 56 88 56 82 46 Z' },
      { id: 'neck',      label: 'Neck',      d: 'M91 62 h18 v22 h-18 Z' },
      { id: 'shoulders', label: 'Shoulders', d: 'M66 90 C68 84 80 80 100 80 C120 80 132 84 134 90 L131 108 C124 100 114 98 100 98 C86 98 76 100 69 108 Z' },
      { id: 'chest',     label: 'Chest',     d: 'M71 104 C78 98 88 96 100 96 C112 96 122 98 129 104 L126 166 H74 Z' },
      { id: 'abdomen',   label: 'Abdomen',   d: 'M74 168 H126 L123 238 H77 Z' },
      { id: 'arms',      label: 'Arms',      d: ARMS },
      { id: 'legs',      label: 'Legs',      d: LEGS }
    ],
    back: [
      { id: 'neck',      label: 'Neck',       d: 'M91 62 h18 v22 h-18 Z' },
      { id: 'shoulders', label: 'Shoulders',  d: 'M66 90 C68 84 80 80 100 80 C120 80 132 84 134 90 L131 108 C124 100 114 98 100 98 C86 98 76 100 69 108 Z' },
      { id: 'upperback', label: 'Upper back', d: 'M71 104 C78 98 88 96 100 96 C112 96 122 98 129 104 L126 166 H74 Z' },
      { id: 'lowerback', label: 'Lower back', d: 'M74 168 H126 L123 238 H77 Z' },
      { id: 'arms',      label: 'Arms',       d: ARMS },
      { id: 'legs',      label: 'Legs',       d: LEGS }
    ]
  };

  // the outline sits under the zones so the figure still reads as a body
  var SILHOUETTE =
    '<ellipse cx="100" cy="38" rx="21" ry="25"/>' +
    '<path d="M91 56 h18 v28 h-18 Z"/>' +
    '<path d="M66 96 C66 86 76 80 100 80 C124 80 134 86 134 96 L126 190 L123 238 H77 L74 190 Z"/>' +
    '<path d="' + ARMS + '"/>' +
    '<path d="' + LEGS + '"/>';

  function create(opts) {
    var host = opts.host;
    var selected = [];
    var side = 'front';

    function render() {
      var zones = ZONES[side];
      var svg =
        '<svg class="bm-svg" viewBox="0 0 200 410" role="img" ' +
        'aria-label="A simple human figure. Choose any areas where you notice tension.">' +
        '<g class="bm-body" aria-hidden="true">' + SILHOUETTE + '</g><g class="bm-zones">';
      for (var i = 0; i < zones.length; i++) {
        var z = zones[i];
        var on = selected.indexOf(z.id) !== -1;
        svg += '<path class="bm-zone' + (on ? ' on' : '') + '" d="' + z.d + '" ' +
               'data-zone="' + z.id + '" tabindex="0" role="checkbox" ' +
               'aria-checked="' + (on ? 'true' : 'false') + '" ' +
               'aria-label="' + z.label + '"><title>' + z.label + '</title></path>';
      }
      svg += '</g></svg>';

      var chips = '';
      for (var j = 0; j < zones.length; j++) {
        var zz = zones[j], onc = selected.indexOf(zz.id) !== -1;
        chips += '<button type="button" class="bm-chip' + (onc ? ' on' : '') +
                 '" data-zone="' + zz.id + '" aria-pressed="' + (onc ? 'true' : 'false') +
                 '">' + zz.label + '</button>';
      }

      host.innerHTML =
        '<div class="bm">' +
          '<div class="bm-sides" role="group" aria-label="Which side of the body">' +
            '<button type="button" class="bm-side' + (side === 'front' ? ' on' : '') + '" data-side="front">Front</button>' +
            '<button type="button" class="bm-side' + (side === 'back' ? ' on' : '') + '" data-side="back">Back</button>' +
          '</div>' +
          svg +
          '<div class="bm-chips">' + chips + '</div>' +
        '</div>';
    }

    function toggle(id) {
      var at = selected.indexOf(id);
      if (at === -1) selected.push(id); else selected.splice(at, 1);
      render();
    }

    host.addEventListener('click', function (e) {
      var sideBtn = e.target.closest('.bm-side');
      if (sideBtn) { side = sideBtn.getAttribute('data-side'); render(); return; }
      var z = e.target.closest('[data-zone]');
      if (z) toggle(z.getAttribute('data-zone'));
    });

    // the SVG paths are focusable, so make them work from the keyboard too
    host.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var z = e.target.closest('.bm-zone');
      if (!z) return;
      e.preventDefault();
      toggle(z.getAttribute('data-zone'));
    });

    render();
    return {
      selected: function () { return selected.slice(); },
      clear: function () { selected = []; render(); }
    };
  }

  return { create: create };
})();
