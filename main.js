

document.addEventListener('DOMContentLoaded', () => {

  // SCROLL REVEAL 
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings within same parent
          const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 80}ms`;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  // MOBILE NAV TOGGLE
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('navMobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);

      // Animate hamburger → X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--ink)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => sectionObserver.observe(s));

  // NAV SCROLL SHADOW 
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(13, 15, 20, 0.97)';
    } else {
      nav.style.background = 'rgba(13, 15, 20, 0.85)';
    }
  }, { passive: true });

  // SMOOTH SCROLL OFFSET (accounts for fixed nav)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
