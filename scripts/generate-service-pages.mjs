import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const services = JSON.parse(fs.readFileSync(path.join(root, 'data/services.json'), 'utf8'));

const icons = {
  home: '<path d="M4 12l8-7 8 7"/><path d="M6 11v9h12v-9"/><path d="M10 20v-5h4v5"/>',
  blueprint: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M10 13h4M10 17h4M8 9h.01"/>',
  add_home: '<path d="M12 3l9 7v11H3V10l9-7z"/><path d="M12 12v6M9 15h6"/>',
  format_paint: '<path d="M12 3l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"/><path d="M4 21h16"/>',
  cottage: '<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-4h6v4"/>',
  eco: '<path d="M12 3C8 8 5 11 5 16c0 2.2 1.8 4 4 4h6c2.2 0 4-1.8 4-4 0-5-3-8-7-13z"/>',
  terrain: '<path d="M3 20h18"/><path d="M6 20V10l4-6 3 4 4-8 3 10v10"/>',
  plumbing: '<path d="M7 3v4M17 3v4"/><path d="M12 8v13M8 21h8"/><path d="M9 8h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2a2 2 0 012-2z"/>',
  map: '<circle cx="12" cy="10" r="3"/><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/>',
  engineering: '<path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z"/>',
  water: '<path d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0z"/>',
  forest: '<path d="M12 22v-8M8 14l-2-4 2-2 2 2-2 4M16 14l-2-4 2-2 2 2-2 4"/><path d="M4 20h16"/>',
  assignment: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h6"/>',
  schedule: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  groups: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.5c2.5 0 4.5 2 4.5 4.5"/>',
  verified: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/>',
  budget: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  business: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M2 12h20"/>',
  strategy: '<path d="M4 19h16M4 15l4-8 4 5 4-9 4 12"/>',
  analytics: '<path d="M4 19V5M4 19h16"/><path d="M8 17V11M12 17V7M16 17v-4"/>',
  handshake: '<path d="M11 13l2-2 3 3M2 12l5-5 3 2 5-5M14 3h5v5"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>',
  star: '<path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>'
};

function svg(name, cls) {
  const d = icons[name] || icons.check;
  return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${d}</svg>`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPage(service) {
  const displayTitle = service.title.replace(/^Luxury /, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(service.metaDescription)}">
<title>${esc(displayTitle)} | LeadingEdge</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/service-detail.css">
<link rel="stylesheet" href="../assets/site-nav.css">
</head>
<body>

<header class="le-header">
  <div class="nav-wrap">
    <a href="../index.html" class="logo">
      <img src="../assets/logo.png" alt="LeadingEdge" class="logo-img">
    </a>
    <nav id="mainNav">
      <ul>
        <li><a href="../index.html" data-nav="home">HOME</a></li>
        <li><a href="../about.html" data-nav="about">ABOUT US</a></li>
        <li><a href="../services.html" data-nav="services" class="active">SERVICES</a></li>
        <li><a href="../faq.html" data-nav="faq">FAQ</a></li>
        <li><a href="../contact.html" data-nav="contact">CONTACT</a></li>
      </ul>
    </nav>
    <a href="../booking.html" class="btn btn-dark nav-cta">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>
      BOOK CONSULTATION
    </a>
    <button class="menu-toggle" id="menuToggle" aria-label="Menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
</header>

<main>
  <section class="sd-hero">
    <div class="sd-hero-bg"><img src="${service.heroImage}" alt="${esc(displayTitle)}"></div>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span>/</span>
        <a href="../services.html">Services</a><span>/</span>
        <span>${esc(displayTitle)}</span>
      </nav>
      <h1 class="serif">${esc(displayTitle)}</h1>
      <p class="subtitle">${esc(service.subtitle)}</p>
      <div class="sd-hero-btns">
        <a href="../booking.html" class="btn btn-white">Request Consultation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D3121" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a href="../contact.html" class="btn btn-outline" style="border-color:rgba(255,255,255,0.6);color:#fff;">Contact Us</a>
      </div>
    </div>
  </section>

  <section class="section" id="overview">
    <div class="container">
      <span class="section-eyebrow reveal">Service Overview</span>
      <h2 class="section-title serif reveal">Built for Lasting Value</h2>
      <div class="overview-grid">
        <div class="overview-copy reveal">
          ${service.overview.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
        </div>
        <div class="overview-image reveal">
          <img src="${service.overviewImage}" alt="${esc(displayTitle)} overview" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section bg" id="offer">
    <div class="container">
      <span class="section-eyebrow reveal">What We Offer</span>
      <h2 class="section-title serif reveal">Comprehensive Capabilities</h2>
      <p class="section-intro reveal">Every engagement is structured to deliver clarity, quality, and confidence from the first conversation through final delivery.</p>
      <div class="offer-grid">
        ${service.offer
          .map(
            (item) => `
        <article class="offer-card reveal">
          <div class="offer-icon">${svg(item.icon)}</div>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.description)}</p>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section bg" id="faq">
    <div class="container">
      <span class="section-eyebrow reveal" style="text-align:center;display:block;">FAQ</span>
      <h2 class="section-title serif reveal" style="text-align:center;">Frequently Asked Questions</h2>
      <div class="faq-list">
        ${service.faqs
          .map(
            (faq, i) => `
        <div class="faq-item${i === 0 ? ' open' : ''}">
          <button class="faq-q" aria-expanded="${i === 0 ? 'true' : 'false'}">
            ${esc(faq.question)}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-a"><p>${esc(faq.answer)}</p></div>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="sd-cta">
    <div class="sd-cta-bg"><img src="${service.ctaImage}" alt="" loading="lazy"></div>
    <div class="container">
      <h2 class="reveal">Ready to Move Forward with Confidence?</h2>
      <p class="reveal">Partner with LeadingEdge for ${esc(displayTitle.toLowerCase())} backed by licensed expertise, transparent communication, and results you can trust for years to come.</p>
      <div class="sd-cta-btns reveal">
        <a href="../booking.html" class="btn btn-white">Request Consultation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D3121" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a href="../contact.html" class="btn btn-outline" style="border-color:rgba(255,255,255,0.6);color:#fff;">Contact Us</a>
      </div>
    </div>
  </section>
</main>

<footer class="le-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a href="../index.html" class="logo">
          <img src="../assets/logo.png" alt="LeadingEdge" class="logo-img">
        </a>
        <p>We design and build premium residential and commercial spaces that stand the test of time.</p>
        <div class="social">
          <a href="https://www.instagram.com/leadingedge_dev/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
          <a href="https://www.linkedin.com/company/leadingedge-devt/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><circle cx="4" cy="4" r="2"/><path d="M2 9h4v13H2zM9 9h4v2s1-2 4-2 5 2 5 6v7h-4v-6c0-2-1-3-2.5-3S11 11 11 13v9H9z"/></svg></a>
        </div>
      </div>
      <div class="footer-col"><h4>COMPANY</h4><ul>
        <li><a href="../about.html">About Us</a></li>
        <!-- PLACEHOLDER: Our Team routes to About until a dedicated team page exists -->
        <li><a href="../about.html">Our Team</a></li>
        <!-- PLACEHOLDER: Careers routes to Contact until a dedicated careers page exists -->
        <li><a href="../contact.html">Careers</a></li>
        <li><a href="../blog.html">News &amp; Insights</a></li>
      </ul></div>
      <div class="footer-col"><h4>SERVICES</h4><ul>
        <li><a href="residential-construction.html">Residential Construction</a></li>
        <li><a href="land-development.html">Land Development</a></li>
        <li><a href="general-contracting.html">Project Management</a></li>
        <li><a href="business-consulting.html">Business Consulting</a></li>
      </ul></div>
      <div class="footer-col"><h4>QUICK LINKS</h4><ul>
        <li><a href="../index.html#services">Services</a></li>
        <li><a href="../faq.html">FAQ</a></li>
        <li><a href="../booking.html">Book Consultation</a></li>
        <li><a href="../contact.html">Contact Us</a></li>
      </ul></div>
      <div class="footer-col"><h4>CONTACT US</h4>
        <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .3 2 .6 3a2 2 0 01-.5 2L8 10a16 16 0 006 6l1.3-1.1a2 2 0 012-.5c1 .3 2 .5 3 .6a2 2 0 011.7 2z"/></svg><span>+1 (414) 630-5297</span></div>
        <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg><span>jay.lorino@leadingedgemgt.com</span></div>
        <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Milwaukee, WI 53201, USA</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2024 LeadingEdge Developments. All Rights Reserved.</span>
      <div class="links"><a href="../privacy-policy.html">Privacy Policy</a><a href="../terms-of-use.html">Terms of Use</a></div>
    </div>
  </div>
</footer>

<script src="../assets/service-detail.js"></script>
<script src="../assets/site-nav.js"></script>
</body>
</html>`;
}

const outDir = path.join(root, 'services');
fs.mkdirSync(outDir, { recursive: true });

services.forEach((service) => {
  const html = buildPage(service);
  const file = path.join(outDir, `${service.slug}.html`);
  fs.writeFileSync(file, html, 'utf8');
  console.log('Generated:', file);
});

console.log(`Done — ${services.length} service pages created.`);
