/**
 * José Toledo — Portfolio
 * Navigation, scroll animations, mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Elements ─── */
  const header = document.getElementById('header');
  const navList = document.getElementById('nav-list');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = navList.querySelectorAll('.nav__link');
  const yearSpan = document.getElementById('current-year');

  /* ─── Copyright Year ─── */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ─── Sticky Header Shadow ─── */
  function updateHeader() {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ─── Mobile Menu Toggle ─── */
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  });

  /* Close menu on link click (mobile) */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ─── Active Nav Link on Scroll ─── */
  const sectionIds = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      sectionIds.push(href.substring(1));
    }
  });

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    let current = '';
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) {
        current = id;
      }
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ─── Scroll Reveal Animation ─── */
  const revealElements = document.querySelectorAll(
    '.timeline__item, .education__card, .certs-list__item, .about__text p'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

});
