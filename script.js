document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hero = document.getElementById('hero');
  const scrollHint = document.getElementById('scrollHint');

  // Show navbar after hero is half scrolled
  const heroHeight = () => (hero ? hero.offsetHeight : window.innerHeight);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const threshold = heroHeight() * 0.5;

    if (navbar && hero) {
      if (scrollY > threshold) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }

    // Fade out scroll hint
    if (scrollHint) {
      const hintOpacity = Math.max(0, 1 - scrollY / (heroHeight() * 0.3));
      scrollHint.style.opacity = hintOpacity;
    }
  }, { passive: true });

  // Intersection Observer for scroll-reveal animations
  const revealElements = document.querySelectorAll(
    '.story-text, .story-image, .philosophy-image, .philosophy-text, .creator-photo, .creator-accent, .detail-image, .detail-quote, .reveal'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Collection section → dark background on scroll
  const collectionSection = document.getElementById('collection');
  if (collectionSection) {
    const darkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          collectionSection.classList.add('dark');
        } else {
          collectionSection.classList.remove('dark');
        }
      });
    }, {
      threshold: 0.35
    });
    darkObserver.observe(collectionSection);
  }

  // Detail section → color shift on scroll (like collection)
  const detailSection = document.getElementById('detail');
  if (detailSection) {
    const detailObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          detailSection.classList.add('color-shift');
        } else {
          detailSection.classList.remove('color-shift');
        }
      });
    }, {
      threshold: 0.35
    });
    detailObserver.observe(detailSection);
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
