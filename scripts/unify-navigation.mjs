import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function header(prefix, active) {
  const links = [
    ['home', 'index.html', 'HOME'],
    ['services', 'services.html', 'SERVICES'],
    ['blog', 'blog.html', 'BLOG'],
    ['about', 'about.html', 'ABOUT US'],
    ['faq', 'faq.html', 'FAQ'],
    ['contact', 'contact.html', 'CONTACT']
  ];
  const navItems = links
    .map(([key, href, label]) => {
      const cls = key === active ? ' class="active"' : '';
      return `<li><a href="${prefix}${href}" data-nav="${key}"${cls}>${label}</a></li>`;
    })
    .join('\n        ');

  return `<header class="le-header">
  <div class="nav-wrap">
    <a href="${prefix}index.html" class="logo">
      <img src="${prefix}assets/logo.png" alt="LeadingEdge" class="logo-img">
    </a>
    <nav id="mainNav">
      <ul>
        ${navItems}
      </ul>
      <a href="${prefix}booking.html" class="btn btn-dark nav-mobile-cta">BOOK CONSULTATION</a>
    </nav>
    <a href="${prefix}booking.html" class="btn btn-dark nav-cta">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>
      BOOK CONSULTATION
    </a>
    <button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
</header>`;
}

function footer(prefix) {
  return `<footer class="le-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a href="${prefix}index.html" class="logo">
          <img src="${prefix}assets/logo.png" alt="LeadingEdge" class="logo-img">
        </a>
        <p>We design and build premium residential and commercial spaces that stand the test of time.</p>
        <div class="social">
          <a href="https://www.instagram.com/leadingedge_dev/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
          <a href="https://www.linkedin.com/company/leadingedge-devt/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><circle cx="4" cy="4" r="2"/><path d="M2 9h4v13H2zM9 9h4v2s1-2 4-2 5 2 5 6v7h-4v-6c0-2-1-3-2.5-3S11 11 11 13v9H9z"/></svg></a>
        </div>
      </div>
      <div class="footer-col"><h4>COMPANY</h4><ul>
        <li><a href="${prefix}about.html">About Us</a></li>
        <!-- PLACEHOLDER: Our Team routes to About until a dedicated team page exists -->
        <li><a href="${prefix}about.html">Our Team</a></li>
        <!-- PLACEHOLDER: Careers routes to Contact until a dedicated careers page exists -->
        <li><a href="${prefix}contact.html">Careers</a></li>
        <li><a href="${prefix}blog.html">News &amp; Insights</a></li>
      </ul></div>
      <div class="footer-col"><h4>SERVICES</h4><ul>
        <li><a href="${prefix}services/residential-construction.html">Residential</a></li>
        <li><a href="${prefix}services/home-remodeling.html">Home Remodeling</a></li>
        <li><a href="${prefix}services/land-development.html">Land Development</a></li>
        <li><a href="${prefix}services/business-consulting.html">Business Consulting</a></li>
      </ul></div>
      <div class="footer-col"><h4>QUICK LINKS</h4><ul>
        <li><a href="${prefix}services.html">Projects</a></li>
        <li><a href="${prefix}index.html#services">Services</a></li>
        <li><a href="${prefix}faq.html">FAQ</a></li>
        <li><a href="${prefix}contact.html">Contact Us</a></li>
      </ul></div>
      <div class="footer-col"><h4>CONTACT US</h4>
        <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .3 2 .6 3a2 2 0 01-.5 2L8 10a16 16 0 006 6l1.3-1.1a2 2 0 012-.5c1 .3 2 .5 3 .6a2 2 0 011.7 2z"/></svg><a href="tel:+14146305297">+1 (414) 630-5297</a></div>
        <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg><a href="mailto:jay.lorino@leadingedgemgt.com">jay.lorino@leadingedgemgt.com</a></div>
        <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Milwaukee, WI 53201, USA</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 LeadingEdge Development LLC. All Rights Reserved.</span>
      <div class="links"><a href="${prefix}privacy-policy.html">Privacy Policy</a><a href="${prefix}terms-of-use.html">Terms of Use</a></div>
    </div>
  </div>
</footer>`;
}

const navAssets = `<link rel="stylesheet" href="PREFIXassets/site-nav.css">`;
const navAssetsServices = navAssets.replace('PREFIX', '../');
const navAssetsRoot = navAssets.replace('PREFIX', '');
const effectsCss = `<link rel="stylesheet" href="PREFIXassets/3d-effects.css">`;
const effectsCssServices = effectsCss.replace('PREFIX', '../');
const effectsCssRoot = effectsCss.replace('PREFIX', '');

function patchFile(filePath, prefix, active) {
  let html = fs.readFileSync(filePath, 'utf8');

  if (!html.includes('site-nav.css')) {
    const link = prefix === '../' ? navAssetsServices : navAssetsRoot;
    html = html.replace('</head>', link + '\n</head>');
  }

  if (!html.includes('3d-effects.css')) {
    const fx = prefix === '../' ? effectsCssServices : effectsCssRoot;
    html = html.replace('</head>', fx + '\n</head>');
  }

  if (html.includes('le-header')) {
    html = html.replace(/<header class="le-header">[\s\S]*?<\/header>/i, header(prefix, active));
    html = html.replace(/<\/header>\s*<a href="[^"]*booking\.html"[\s\S]*?<\/header>\s*/i, '</header>\n');
  } else {
    html = html.replace(/<header[\s\S]*?<\/header>/i, header(prefix, active));
    html = html.replace(/<!-- TopNavBar -->[\s\S]*?<\/nav>/i, header(prefix, active));
    html = html.replace(/<nav class="sticky[\s\S]*?<\/nav>/i, header(prefix, active));
  }

  html = html.replace(/<footer[\s\S]*?<\/footer>/i, footer(prefix));

  html = html.replace(/<script>\s*document\.getElementById\('menuToggle'\)[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script src="(\.\.\/)?assets\/hero-video\.js"(\s+defer)?><\/script>\n?/g, '');
  html = html.replace(/<script src="(\.\.\/)?assets\/form-handler\.js"(\s+defer)?><\/script>\n?/g, '');
  html = html.replace(/<script src="(\.\.\/)?assets\/3d-effects\.js"(\s+defer)?><\/script>\n?/g, '');
  html = html.replace(/<script src="(\.\.\/)?assets\/service-detail\.js"(\s+defer)?><\/script>\n?/g, '');
  html = html.replace(/<script src="(\.\.\/)?assets\/site-nav\.js"(\s+defer)?><\/script>\n?/g, '');

  const hasHeroVideo = html.includes('heroVideo') || html.includes('hero-video');
  const hasFormHandler = html.includes('data-le-form');

  const scripts = [
    `<script src="${prefix}assets/3d-effects.js" defer></script>`,
    `<script src="${prefix}assets/site-nav.js" defer></script>`
  ];
  if (filePath.includes(`${path.sep}services${path.sep}`) || html.includes('service-detail')) {
    scripts.unshift(`<script src="${prefix}assets/service-detail.js" defer></script>`);
  }
  if (hasHeroVideo) {
    scripts.unshift(`<script src="${prefix}assets/hero-video.js" defer></script>`);
  }
  if (hasFormHandler) {
    const navIdx = scripts.findIndex(function (s) { return s.indexOf('site-nav.js') !== -1; });
    scripts.splice(navIdx, 0, `<script src="${prefix}assets/form-handler.js" defer></script>`);
  }
  html = html.replace('</body>', scripts.join('\n') + '\n</body>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Patched:', filePath);
}

const pageActive = {
  'index.html': 'home',
  'about.html': 'about',
  'blog.html': 'blog',
  'services.html': 'services',
  'contact.html': 'contact',
  'booking.html': 'booking',
  'faq.html': 'faq',
  'privacy-policy.html': '',
  'terms-of-use.html': ''
};

const rootPages = ['index.html', 'about.html', 'blog.html', 'communities.html', 'services.html', 'contact.html', 'booking.html', 'faq.html', 'privacy-policy.html', 'terms-of-use.html'];
rootPages.forEach((f) => {
  const fp = path.join(root, f);
  if (fs.existsSync(fp)) patchFile(fp, '', pageActive[f] || '');
});

const serviceDir = path.join(root, 'services');
if (fs.existsSync(serviceDir)) {
  fs.readdirSync(serviceDir).filter((f) => f.endsWith('.html')).forEach((f) => {
    patchFile(path.join(serviceDir, f), '../', 'services');
  });
}

const blogDir = path.join(root, 'blog');
if (fs.existsSync(blogDir)) {
  fs.readdirSync(blogDir).filter((f) => f.endsWith('.html')).forEach((f) => {
    patchFile(path.join(blogDir, f), '../', 'blog');
  });
}

console.log('Navigation unified.');
