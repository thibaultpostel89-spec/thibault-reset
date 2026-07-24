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

  // ---------- "Sound familiar?" phone thread reveal ----------
  const sfItems = document.querySelectorAll('.sf-reveal');
  if (sfItems.length) {
    const sfObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 110);
          sfObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    sfItems.forEach(el => sfObserver.observe(el));
  }

  // ---------- floating still-life objects ----------
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

    obj.addEventListener('mouseenter', () => obj.classList.add('hovered'));
    obj.addEventListener('mouseleave', () => obj.classList.remove('hovered'));
    obj.addEventListener('touchstart', () => {
      document.querySelectorAll('.float-object.hovered').forEach(o => {
        if (o !== obj) o.classList.remove('hovered');
      });
      obj.classList.toggle('hovered');
    }, { passive: true });
  });

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
