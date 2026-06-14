/* ================================================================
   THE ENCLAVE — Gomoa Fetteh P.U.D
   Main JavaScript: Animations, Nav, Interactions
   ================================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     SCROLL-TRIGGERED FADE-UP ANIMATIONS
  ---------------------------------------------------------------- */
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('[data-anim="fade-up"]').forEach((el) => {
    animObserver.observe(el);
  });

  /* ----------------------------------------------------------------
     NAVIGATION — scroll state
  ---------------------------------------------------------------- */
  const nav = document.getElementById('nav');

  const onScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init

  /* ----------------------------------------------------------------
     HERO — dual-video seamless crossfade
  ---------------------------------------------------------------- */
  // Dual-video seamless crossfade loop at 60% speed
  const vidA = document.querySelector('.hero__video--a');
  const vidB = document.querySelector('.hero__video--b');

  function initHeroVideo(vid, isB) {
    const FADE = 0.5;
    const setRate = () => { vid.playbackRate = 0.6; };
    vid.addEventListener('canplay', setRate);
    vid.addEventListener('play', setRate);
    vid.addEventListener('loadedmetadata', function () {
      vid.playbackRate = 0.6;
      if (isB) vid.currentTime = vid.duration / 2;
    }, { once: true });
    vid.addEventListener('timeupdate', function () {
      const t = this.currentTime;
      const d = this.duration;
      if (!d) return;
      if (d - t < FADE) {
        this.style.opacity = Math.max(0, (d - t) / FADE).toFixed(3);
      } else if (t < FADE) {
        this.style.opacity = Math.min(1, t / FADE).toFixed(3);
      } else {
        this.style.opacity = '1';
      }
    });
  }

  if (vidA) initHeroVideo(vidA, false);
  if (vidB) initHeroVideo(vidB, true);


  /* ----------------------------------------------------------------
     MOBILE NAVIGATION — open / close
  ---------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.nav__mobile-links a, .nav__mobile-cta');

  const openMobileNav = () => {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', openMobileNav);
  mobileClose.addEventListener('click', closeMobileNav);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  /* ----------------------------------------------------------------
     NEWSLETTER FORM — submit feedback
  ---------------------------------------------------------------- */
  const form = document.getElementById('newsletterForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Validate (basic)
      const email = form.querySelector('input[type="email"]').value.trim();
      const checked = form.querySelector('input[type="checkbox"]').checked;

      if (!email || !checked) return;

      // Feedback state
      btn.innerHTML = 'Thank you &mdash; we\'ll be in touch. &#10003;';
      btn.style.background = 'var(--c-teal)';
      btn.style.borderColor = 'var(--c-teal)';
      btn.disabled = true;

      // Reset after 4 seconds
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

  /* ----------------------------------------------------------------
     SMOOTH ACTIVE NAV HIGHLIGHT (optional — highlights current section)
  ---------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.style.color = 'var(--c-white)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ----------------------------------------------------------------
     HIGHLIGHTS CARDS — cursor-aware subtle tilt (desktop only)
  ---------------------------------------------------------------- */
  if (window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) {
    document.querySelectorAll('.highlights__card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------------
     STAT NUMBER COUNTER ANIMATION
  ---------------------------------------------------------------- */
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;

        let start = 0;
        const duration = 1600;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        statsObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  // Tag countable stats with data-count
  document.querySelectorAll('.hero__float-num, .vision__stat-value').forEach((el) => {
    const val = parseInt(el.textContent, 10);
    if (!isNaN(val) && val > 1) {
      el.dataset.count = val;
      el.textContent = '0';
      statsObserver.observe(el);
    }
  });

  /* ----------------------------------------------------------------
     FAQ ACCORDION
  ---------------------------------------------------------------- */
  document.querySelectorAll('.faq-item__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.faq-item.is-open').forEach((el) => {
        el.classList.remove('is-open');
        el.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------------------------------
     CONTACT & INVESTMENT FORMS — submit feedback
  ---------------------------------------------------------------- */
  ['contactForm', 'investForm'].forEach((id) => {
    const f = document.getElementById(id);
    if (!f) return;

    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Message sent &mdash; we\'ll be in touch. &#10003;';
      btn.style.background = 'var(--c-teal)';
      btn.style.borderColor = 'var(--c-teal)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        f.reset();
      }, 4000);
    });
  });

})();
