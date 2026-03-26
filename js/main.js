/* ============================================================
   ENGINEERING OFFICE PORTAL — MAIN JAVASCRIPT
   Handles: nav, theme, tabs, FAQ, status tracker, form validation
   ============================================================ */

/* ── DOM READY ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initScrollBehavior();
  initMobileNav();
  initPermitTabs();
  initFAQ();
  initActiveNavLinks();
  initBackToTop();
});

/* ── THEME TOGGLE (Dark / Light) ────────────────────────────── */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const saved = localStorage.getItem('eo_theme') || 'light';

  applyTheme(saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('eo_theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* ── SCROLL BEHAVIOR ────────────────────────────────────────── */
function initScrollBehavior() {
  const header = document.getElementById('siteHeader');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── ACTIVE NAV LINKS (scroll spy) ─────────────────────────── */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
  });
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ── PERMIT TABS ────────────────────────────────────────────── */
function initPermitTabs() {
  const tabs = document.querySelectorAll('.ptab');
  const panels = document.querySelectorAll('.ppanel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Activate selected
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // Quick-access card links open correct tab
  document.querySelectorAll('.qcard').forEach(card => {
    card.addEventListener('click', (e) => {
      const permit = card.getAttribute('data-permit');
      const matchingTab = document.querySelector(`.ptab[data-tab="${permit}"]`);
      if (matchingTab) {
        setTimeout(() => matchingTab.click(), 100);
      }
    });
  });
}

/* ── FAQ ACCORDION ──────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── BACK TO TOP BUTTON ─────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ── DOWNLOAD SIMULATION ────────────────────────────────────── */
function downloadReqs(permitType) {
  showToast(`Downloading "${permitType} Requirements"...`);
  // In production: replace with real file URL
  // window.open('files/' + fileName + '.pdf', '_blank');
}

function simulateDownload(e, formName) {
  e.preventDefault();
  showToast(`Downloading "${formName}"...`);
}

/* ── TOAST NOTIFICATION ─────────────────────────────────────── */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}
