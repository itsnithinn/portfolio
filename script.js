/* =====================================================
   script.js — Minimal interactivity + easy updates
   - Mobile menu toggle
   - Reveal-on-scroll animations
   - Contact form: works with Netlify Forms or Formspree
   - Last updated + copyright year
   - Resume link helper (optional)
   ===================================================== */

/* ======================= CONFIG (🔧 EDIT) ======================= */
/* If you host on GitHub Pages or elsewhere (not Netlify Forms),
   create a free Formspree form and paste the endpoint below.
   Example: "https://formspree.io/f/abcdwxyz"
   Leave empty "" to let Netlify Forms handle it. */
const FORMSPREE_ENDPOINT = "";

/* Optional: set your resume URLs once here (will update buttons). */
const RESUME_VIEW_URL = "resume.pdf"; // or Google Drive direct: https://drive.google.com/uc?export=download&id=FILE_ID
const RESUME_DOWNLOAD_URL = "resume.pdf";

/* ======================= NAVBAR / MOBILE ======================= */
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

/* ======================= REVEAL ON SCROLL ======================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ======================= LAST UPDATED / COPYRIGHT ======================= */
document.getElementById('copyrightYear').textContent = new Date().getFullYear();
const lastUpdated = new Date().toISOString().slice(0, 10);
const lastUpdatedEl = document.getElementById('lastUpdated');
if (lastUpdatedEl) lastUpdatedEl.textContent = `Updated: ${lastUpdated}`;

/* ======================= RESUME LINKS (optional helper) ======================= */
const resumeView = document.getElementById('resumeView');
const resumeDownload = document.getElementById('resumeDownload');
if (resumeView) resumeView.href = RESUME_VIEW_URL;
if (resumeDownload) resumeDownload.href = RESUME_DOWNLOAD_URL;

/* ======================= CONTACT FORM ======================= */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const errorMsg = document.getElementById('formError');

if (form) {
  // If a Formspree endpoint is set, submit via fetch
  if (FORMSPREE_ENDPOINT) {
    form.setAttribute('action', FORMSPREE_ENDPOINT);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      successMsg?.classList.add('hidden');
      errorMsg?.classList.add('hidden');

      const formData = new FormData(form);
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        if (res.ok) {
          form.reset();
          successMsg?.classList.remove('hidden');
        } else {
          errorMsg?.classList.remove('hidden');
        }
      } catch (err) {
        errorMsg?.classList.remove('hidden');
      }
    });
  } else {
    // Netlify Forms will handle submission server-side.
    // No JS needed here.
  }
}

/* ======================= TAG FILTER (projects) ======================= */
const filter = document.getElementById('tagFilter');
const grid = document.getElementById('projectsGrid');
if (filter && grid) {
  filter.addEventListener('change', () => {
    const tag = filter.value;
    grid.querySelectorAll('[data-tags]').forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      card.classList.toggle('hidden', tag && !tags.includes(tag.toLowerCase()));
    });
  });
}
