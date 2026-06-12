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
});
