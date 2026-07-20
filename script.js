// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// =========================================================
// Scrollspy — highlight active nav link
// =========================================================
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav__links a');

const setActiveNav = (id) => {
  navItems.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.nav === id);
  });
};

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => spy.observe(section));

// =========================================================
// Project image fallback
// If an image fails to load (or hasn't been added yet), hide it
// so the CSS gradient + label placeholder shows instead.
// =========================================================
document.querySelectorAll('.project__media img').forEach((img) => {
  img.addEventListener('error', () => {
    img.setAttribute('data-broken', 'true');
  });
});

// =========================================================
// Reveal on scroll
// =========================================================
const revealTargets = document.querySelectorAll(
  '.stat, .thesis, .timeline__item, .project, .skills__group, .contact__item'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

// =========================================================
// Footer year
// =========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================================================
// Starfield background
// =========================================================
(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.3,
      speed: Math.random() * 0.12 + 0.02,
      alpha: Math.random() * 0.5 + 0.25,
    }));
  }

  function draw(moving) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e9ecf2';
    for (const s of stars) {
      if (moving) {
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      }
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function animate() {
    draw(true);
    requestAnimationFrame(animate);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => {
    resize();
    initStars();
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    draw(false);
  } else {
    animate();
  }
})();
