(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.focus(); } });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear().toString();
  const dialog = document.querySelector('.lightbox');
  const lightboxImage = dialog?.querySelector('img');
  const lightboxCaption = dialog?.querySelector('p');
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    if(!dialog || typeof dialog.showModal !== 'function') return;
    const img = button.querySelector('img');
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = img?.alt || '';
    lightboxCaption.textContent = button.dataset.caption || '';
    dialog.showModal();
  }));
  dialog?.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
    },{rootMargin:'0px 0px -35px 0px',threshold:.06});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.body.classList.add('js-animations');
  }
})();
