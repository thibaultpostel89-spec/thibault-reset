document.addEventListener('DOMContentLoaded', () => {

  // ---------- footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- real photo loader (graceful: keeps placeholder if the file isn't there yet) ----------
  function applyPhoto(el, url) {
    if (el.classList.contains('float-object')) {
      const absoluteUrl = new URL(url, document.baseURI).href;
      el.style.setProperty('--photo', `url('${absoluteUrl}')`);
    } else {
      el.style.backgroundImage = `url('${url}')`;
    }
    el.classList.add('has-photo');
  }
  document.querySelectorAll('[data-photo]').forEach(el => {
    const candidates = [el.getAttribute('data-photo')]
      .concat((el.getAttribute('data-photo-fallback') || '').split(',').map(s => s.trim()).filter(Boolean));
    function tryNext(i) {
      if (i >= candidates.length) return;
      const img = new Image();
      img.onload = () => applyPhoto(el, candidates[i]);
      img.onerror = () => tryNext(i + 1);
      img.src = candidates[i];
    }
    tryNext(0);
  });

  // ---------- expose real nav height for sticky offsets ----------
  const siteNav = document.getElementById('siteNav');
  function setNavHeight() {
    if (siteNav) {
      document.documentElement.style.setProperty('--nav-height', siteNav.offsetHeight + 'px');
    }
  }
  setNavHeight();
  window.addEventListener('resize', setNavHeight);

  // ---------- mobile nav burger ----------
  const nav = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open
        ? '<svg width="24" height="24"><use href="#icon-close"></use></svg>'
        : '<svg width="24" height="24"><use href="#icon-menu"></use></svg>';
    });
    document.querySelectorAll('#navMobile a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.innerHTML = '<svg width="24" height="24"><use href="#icon-menu"></use></svg>';
      });
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    const panel = trigger.nextElementSibling;
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (expanded) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // ---------- "Sound familiar?" phone thread reveal (one message at a time) ----------
  const sfItems = document.querySelectorAll('.sf-reveal');
  if (sfItems.length) {
    const SF_STEP_MS = 1200; // pace between messages, capped well under 3s
    let sfStarted = false;
    const sfObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !sfStarted) {
          sfStarted = true;
          sfItems.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * SF_STEP_MS);
          });
          sfObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    sfObserver.observe(sfItems[0]);
  }

  // ---------- "Physical Signs" pills: appear one by one, in random order ----------
  const pillItems = Array.from(document.querySelectorAll('.pill-reveal'));
  if (pillItems.length) {
    const PILL_STEP_MS = 250;
    let pillsStarted = false;
    const shuffled = pillItems.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const pillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !pillsStarted) {
          pillsStarted = true;
          shuffled.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * PILL_STEP_MS);
          });
          pillObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    pillObserver.observe(pillItems[0]);
  }

  // ---------- floating still-life objects ----------
  const isMobileFloats = window.matchMedia('(max-width: 900px)').matches;

  let lightboxEl = null;
  function openFloatLightbox(obj, name, desc, badge) {
    if (!lightboxEl) {
      lightboxEl = document.createElement('div');
      lightboxEl.className = 'float-lightbox';
      lightboxEl.innerHTML =
        '<button class="float-lightbox-close" aria-label="Close">&times;</button>' +
        '<div class="float-lightbox-card"><div class="float-lightbox-body"></div></div>';
      document.body.appendChild(lightboxEl);
      lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl) closeFloatLightbox();
      });
      lightboxEl.querySelector('.float-lightbox-close').addEventListener('click', closeFloatLightbox);
    }
    const card = lightboxEl.querySelector('.float-lightbox-card');
    const photo = obj.style.getPropertyValue('--photo');
    card.style.backgroundImage = photo || '';
    lightboxEl.querySelector('.float-lightbox-body').innerHTML =
      '<span class="fi-name">' + name + '</span>' +
      '<span class="fi-desc">' + desc + '</span>' +
      (badge ? '<span class="fi-badge">' + badge + '</span>' : '');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lightboxEl.classList.add('visible'));
  }
  function closeFloatLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('visible');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.float-object').forEach(obj => {
    const name = obj.getAttribute('data-name') || '';
    const desc = obj.getAttribute('data-desc') || '';
    const badge = obj.getAttribute('data-badge') || '';
    const info = document.createElement('div');
    info.className = 'float-info';
    info.innerHTML =
      '<span class="fi-name">' + name + '</span>' +
      '<span class="fi-desc">' + desc + '</span>' +
      (badge ? '<span class="fi-badge">' + badge + '</span>' : '');
    obj.appendChild(info);

    if (isMobileFloats) {
      const label = document.createElement('span');
      label.className = 'float-mobile-label';
      label.textContent = name;
      obj.appendChild(label);
      obj.addEventListener('click', () => openFloatLightbox(obj, name, desc, badge));
    } else {
      obj.addEventListener('mouseenter', () => obj.classList.add('hovered'));
      obj.addEventListener('mouseleave', () => obj.classList.remove('hovered'));
    }
  });

  // ---------- "Real presence" orbit: nodes converge toward center on scroll ----------
  const orbitStage = document.getElementById('orbitStage');
  if (orbitStage) {
    const orbitNodes = document.querySelectorAll('.orbit-node');
    const orbitLinesSvg = document.getElementById('orbitLines');
    const orbitLineEls = [];
    orbitNodes.forEach(() => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      orbitLinesSvg.appendChild(line);
      orbitLineEls.push(line);
    });

    function layoutOrbit() {
      const rect = orbitStage.getBoundingClientRect();
      // use layout (unscaled) dimensions for positioning math, since a CSS
      // transform: scale() on mobile changes the rendered rect but not the
      // coordinate space that style.left/top and offsetWidth operate in.
      const cx = orbitStage.offsetWidth / 2;
      const cy = orbitStage.offsetHeight / 2;
      const vh = window.innerHeight;
      const stageCenterY = rect.top + rect.height / 2;
      let progress = 1 - Math.min(1, Math.max(0, stageCenterY / vh));
      progress = Math.min(1, progress * 1.3);

      orbitNodes.forEach((node, i) => {
        const angle = parseFloat(node.dataset.angle) * Math.PI / 180;
        const far = parseFloat(node.dataset.far);
        const near = parseFloat(node.dataset.near);
        const dist = far - (far - near) * progress;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        node.style.left = (x - node.offsetWidth / 2) + 'px';
        node.style.top = (y - node.offsetHeight / 2) + 'px';
        node.classList.toggle('near', progress > 0.55);

        const line = orbitLineEls[i];
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.style.stroke = progress > 0.55 ? 'rgba(210,171,116,0.5)' : 'rgba(210,171,116,0.2)';
      });
    }
    layoutOrbit();
    window.addEventListener('scroll', () => requestAnimationFrame(layoutOrbit), { passive: true });
    window.addEventListener('resize', layoutOrbit);
  }

  // ---------- "From Survival to Presence" scroll-driven journey ----------
  const journeyWrap = document.getElementById('journeyScroll');
  if (journeyWrap) {
    const bodyOutline = document.querySelector('.body-outline');
    const organBrain = document.querySelector('.organ-brain');
    const organLungs = document.querySelector('.organ-lungs');
    const organHeart = document.querySelector('.organ-heart');
    const organGut = document.querySelector('.organ-gut');
    const steps = document.querySelectorAll('.journey-step');

    let ticking = false;

    function updateJourney() {
      ticking = false;
      const rect = journeyWrap.getBoundingClientRect();
      const total = journeyWrap.offsetHeight - window.innerHeight;
      let progress = -rect.top / total;
      progress = Math.min(1, Math.max(0, progress));

      let stepIndex = Math.floor(progress * 4);
      if (stepIndex > 3) stepIndex = 3;
      if (progress <= 0) stepIndex = 0;

      steps.forEach((step, i) => {
        step.classList.toggle('active', i === stepIndex);
      });

      organBrain.classList.toggle('active', stepIndex >= 0);
      organLungs.classList.toggle('active', stepIndex >= 1);
      organHeart.classList.toggle('active', stepIndex >= 2);
      organGut.classList.toggle('active', stepIndex >= 3);
      bodyOutline.classList.toggle('active', stepIndex >= 3);
      bodyOutline.classList.toggle('presence', stepIndex >= 3);
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateJourney);
        ticking = true;
      }
    }, { passive: true });

    updateJourney();
  }

});
