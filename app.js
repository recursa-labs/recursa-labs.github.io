(() => {
  'use strict';
  const siteName = 'recursa labs';
  const main = document.querySelector('#main');
  const views = [...document.querySelectorAll('[data-view]')];
  const navLinks = [...document.querySelectorAll('[data-route]')];
  const field = document.querySelector('#learning-field');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentView = 'home';
  let fieldVisible = true;

  function updateMotion() {
    const active = !reducedMotion.matches && currentView === 'home' && fieldVisible && !document.hidden;
    if (typeof field.pauseAnimations === 'function') {
      if (active) field.unpauseAnimations();
      else field.pauseAnimations();
    }
  }

  reducedMotion.addEventListener('change', updateMotion);
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
      if (direction) document.querySelector('#direction').scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start'});
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
