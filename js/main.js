document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const productFilters = document.getElementById('productFilters');
  const productsGrid = document.getElementById('productsGrid');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const testimonialsSlider = document.getElementById('testimonialsSlider');
  const testimonialDots = document.getElementById('testimonialDots');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile navigation
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // Product filtering
  if (productFilters && productsGrid) {
    productFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      productFilters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productsGrid.querySelectorAll('.product-card').forEach((card) => {
        const category = card.dataset.category;
        card.classList.toggle('hidden', filter !== 'all' && category !== filter);
      });
    });
  }

  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.hidden = false;
      contactForm.reset();
      setTimeout(() => {
        formSuccess.hidden = true;
      }, 5000);
    });
  }

  // Testimonials slider
  if (testimonialsSlider && testimonialDots) {
    const testimonials = testimonialsSlider.querySelectorAll('.testimonial');
    const dots = testimonialDots.querySelectorAll('.dot');
    let current = 0;
    let interval;

    function showTestimonial(index) {
      testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    }

    function nextTestimonial() {
      showTestimonial((current + 1) % testimonials.length);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showTestimonial(i);
        clearInterval(interval);
        interval = setInterval(nextTestimonial, 5000);
      });
    });

    interval = setInterval(nextTestimonial, 5000);
  }

  // Fade-in on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .product-card, .gallery-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Notification signup popup
  const notifyOverlay = document.getElementById('notifyOverlay');
  const notifyClose = document.getElementById('notifyClose');
  const notifyDismiss = document.getElementById('notifyDismiss');
  const notifyForm = document.getElementById('notifyForm');
  const notifyContent = document.getElementById('notifyContent');
  const notifySuccess = document.getElementById('notifySuccess');
  const notifySuccessClose = document.getElementById('notifySuccessClose');

  const NOTIFY_KEY = 'glowGraceNotify';
  const DISMISS_DAYS = 7;
  const SHOW_DELAY_MS = 3000;

  function getNotifyState() {
    try {
      return JSON.parse(localStorage.getItem(NOTIFY_KEY)) || {};
    } catch {
      return {};
    }
  }

  function setNotifyState(state) {
    localStorage.setItem(NOTIFY_KEY, JSON.stringify(state));
  }

  function shouldShowPopup() {
    const state = getNotifyState();
    if (state.subscribed) return false;
    if (state.dismissedAt) {
      const daysSince = (Date.now() - state.dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return false;
    }
    return true;
  }

  function openNotifyPopup() {
    notifyOverlay.hidden = false;
    notifyOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => notifyOverlay.classList.add('visible'));
  }

  function closeNotifyPopup() {
    notifyOverlay.classList.remove('visible');
    notifyOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      notifyOverlay.hidden = true;
    }, 300);
  }

  if (notifyOverlay && shouldShowPopup()) {
    setTimeout(openNotifyPopup, SHOW_DELAY_MS);
  }

  notifyClose?.addEventListener('click', () => {
    setNotifyState({ ...getNotifyState(), dismissedAt: Date.now() });
    closeNotifyPopup();
  });

  notifyDismiss?.addEventListener('click', () => {
    setNotifyState({ ...getNotifyState(), dismissedAt: Date.now() });
    closeNotifyPopup();
  });

  notifyOverlay?.addEventListener('click', (e) => {
    if (e.target === notifyOverlay) {
      setNotifyState({ ...getNotifyState(), dismissedAt: Date.now() });
      closeNotifyPopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && notifyOverlay?.classList.contains('visible')) {
      setNotifyState({ ...getNotifyState(), dismissedAt: Date.now() });
      closeNotifyPopup();
    }
  });

  notifyForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('notifyEmail').value;
    setNotifyState({ subscribed: true, email, subscribedAt: Date.now() });
    notifyContent.hidden = true;
    notifySuccess.hidden = false;
  });

  notifySuccessClose?.addEventListener('click', closeNotifyPopup);
});
