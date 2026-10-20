(() => {
  'use strict';
  const siteName = 'recursa labs';
  const main = document.querySelector('#main');
  const views = [...document.querySelectorAll('[data-view]')];
  const navLinks = [...document.querySelectorAll('[data-route]')];
  const motionControl = document.querySelector('.motion-control');
  const field = document.querySelector('#learning-field');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let preference = null;
  try { preference = sessionStorage.getItem('lab-motion'); } catch { /* Storage may be unavailable in private contexts. */ }
  let paused = preference ? preference === 'paused' : reducedMotion.matches;
  let currentView = 'home';
  let fieldVisible = true;

  function updateMotion() {
    const active = !paused && currentView === 'home' && fieldVisible && !document.hidden;
    if (typeof field.pauseAnimations === 'function') {
      if (active) field.unpauseAnimations();
      else field.pauseAnimations();
    }
    document.body.classList.toggle('motion-paused', paused);
    motionControl.setAttribute('aria-pressed', String(paused));
    motionControl.setAttribute('aria-label', paused ? 'Play ambient animation' : 'Pause ambient animation');
    motionControl.title = paused ? 'Play animation' : 'Pause animation';
  }

  motionControl.addEventListener('click', () => {
    paused = !paused;
    preference = paused ? 'paused' : 'playing';
    try { sessionStorage.setItem('lab-motion', preference); } catch { /* The control also works without storage. */ }
    updateMotion();
  });
  reducedMotion.addEventListener('change', () => {
    if (!preference) paused = reducedMotion.matches;
    updateMotion();
  });
  document.addEventListener('visibilitychange', updateMotion);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      fieldVisible = entries[0].isIntersecting;
      updateMotion();
    });
    observer.observe(field);
  }

  function route(moveFocus = false) {
    const path = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
    const direction = path === 'direction';
    currentView = !path || direction || path === 'main' ? 'home' : ['blog', 'team'].includes(path) ? path : 'not-found';
    for (const view of views) view.hidden = view.dataset.view !== currentView;
    for (const link of navLinks) {
      if (link.dataset.route === currentView) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    document.title = `${currentView === 'blog' ? 'Blog' : currentView === 'team' ? 'Team' : currentView === 'not-found' ? 'Page not found' : 'Continual learning'} — ${siteName}`;
    updateMotion();
    if (moveFocus) main.focus({preventScroll: true});
    requestAnimationFrame(() => {
      if (direction) document.querySelector('#direction').scrollIntoView({behavior: paused ? 'instant' : 'smooth', block: 'start'});
      else window.scrollTo({top: 0, behavior: 'instant'});
    });
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.classList.contains('skip-link')) {
      event.preventDefault();
      main.focus();
      main.scrollIntoView({behavior: 'instant'});
    } else if (link.getAttribute('href') === window.location.hash) {
      event.preventDefault();
      route(true);
    }
  });
  window.addEventListener('hashchange', () => route(true));
  route();
})();
