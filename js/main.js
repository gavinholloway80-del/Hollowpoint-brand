document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const productsGrid = document.getElementById('productsGrid');
  const productSearch = document.getElementById('productSearch');
  const noResults = document.getElementById('noResults');
  const resetFilters = document.getElementById('resetFilters');
  const filterControls = document.querySelectorAll('[data-filter]');
  const categoryLinks = document.querySelectorAll('[data-filter-link]');
  const contactForm = document.getElementById('contactForm');
  const sellForm = document.getElementById('sellForm');
  const formSuccess = document.getElementById('formSuccess');
  const sellSuccess = document.getElementById('sellSuccess');
  const checkoutButton = document.getElementById('checkoutButton');
  const checkoutSuccess = document.getElementById('checkoutSuccess');
  const cartCountEls = [
    document.getElementById('cartCount'),
    document.getElementById('toolbarCartCount'),
    document.getElementById('checkoutCartCount'),
  ].filter(Boolean);
  const wishlistCount = document.getElementById('wishlistCount');

  let cartCount = 0;
  let wishlistTotal = 0;

  function updateCartCount() {
    cartCountEls.forEach((el) => {
      el.textContent = cartCount;
    });
  }

  function updateWishlistCount() {
    if (wishlistCount) {
      wishlistCount.textContent = wishlistTotal;
    }
  }

  function closeMobileNav() {
    navLinks?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  });

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  function productMatches(card) {
    const query = productSearch?.value.trim().toLowerCase() || '';
    const searchable = card.dataset.search || '';
    const matchesSearch = !query || searchable.includes(query);

    const matchesFilters = Array.from(filterControls).every((control) => {
      const value = control.value;
      const key = control.dataset.filter;
      return value === 'all' || card.dataset[key] === value;
    });

    return matchesSearch && matchesFilters;
  }

  function applyFilters() {
    if (!productsGrid) return;

    let visibleCount = 0;
    productsGrid.querySelectorAll('.product-card').forEach((card) => {
      const isVisible = productMatches(card);
      card.classList.toggle('hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (noResults) {
      noResults.hidden = visibleCount > 0;
    }
  }

  productSearch?.addEventListener('input', applyFilters);
  filterControls.forEach((control) => control.addEventListener('change', applyFilters));

  resetFilters?.addEventListener('click', () => {
    productSearch.value = '';
    filterControls.forEach((control) => {
      control.value = 'all';
    });
    applyFilters();
  });

  categoryLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const category = link.dataset.filterLink;
      const categoryFilter = document.getElementById('categoryFilter');
      if (categoryFilter) {
        categoryFilter.value = category;
        applyFilters();
      }
    });
  });

  document.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => {
      cartCount += 1;
      updateCartCount();

      const originalText = button.textContent;
      button.textContent = 'Added';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1200);
    });
  });

  document.querySelectorAll('.wishlist-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const isActive = button.classList.toggle('active');
      wishlistTotal += isActive ? 1 : -1;
      button.textContent = isActive ? '-' : '+';
      updateWishlistCount();
    });
  });

  function handleForm(form, successEl) {
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      successEl.hidden = false;
      form.reset();
      setTimeout(() => {
        successEl.hidden = true;
      }, 5000);
    });
  }

  handleForm(contactForm, formSuccess);
  handleForm(sellForm, sellSuccess);

  checkoutButton?.addEventListener('click', () => {
    checkoutSuccess.hidden = false;
    setTimeout(() => {
      checkoutSuccess.hidden = true;
    }, 5000);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.drop-card, .product-card, .auth-card, .insta-tile').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  const notifyOverlay = document.getElementById('notifyOverlay');
  const notifyClose = document.getElementById('notifyClose');
  const notifyDismiss = document.getElementById('notifyDismiss');
  const notifyForm = document.getElementById('notifyForm');
  const notifyContent = document.getElementById('notifyContent');
  const notifySuccess = document.getElementById('notifySuccess');
  const notifySuccessClose = document.getElementById('notifySuccessClose');

  const NOTIFY_KEY = 'hollowpointNotify';
  const DISMISS_DAYS = 7;
  const SHOW_DELAY_MS = 2600;

  function getNotifyState() {
    try {
      return JSON.parse(localStorage.getItem(NOTIFY_KEY)) || {};
    } catch {
      return {};
    }
  }

  function setNotifyState(state) {
    try {
      localStorage.setItem(NOTIFY_KEY, JSON.stringify(state));
    } catch {
      // Browsers in private mode can disable storage; the popup still works without persistence.
    }
  }

  function shouldShowPopup() {
    const state = getNotifyState();
    if (state.subscribed) return false;
    if (state.dismissedAt) {
      const daysSinceDismissal = (Date.now() - state.dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissal < DISMISS_DAYS) return false;
    }
    return true;
  }

  function openNotifyPopup() {
    if (!notifyOverlay) return;
    notifyOverlay.hidden = false;
    notifyOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => notifyOverlay.classList.add('visible'));
  }

  function closeNotifyPopup() {
    if (!notifyOverlay) return;
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

  updateCartCount();
  updateWishlistCount();
  applyFilters();
});
