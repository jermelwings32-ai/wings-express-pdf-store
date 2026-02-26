/* ── Wings Express LLC — Website Scripts ────────────────── */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar shrink on scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
        navbar.style.padding = '8px 0';
        navbar.style.background = 'rgba(10, 10, 20, 0.95)';
    } else {
        navbar.style.padding = '16px 0';
        navbar.style.background = 'rgba(10, 10, 20, 0.8)';
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(10, 10, 20, 0.98)';
        navLinks.style.padding = '20px 24px';
        navLinks.style.gap = '16px';
        navLinks.style.borderBottom = '1px solid rgba(226, 183, 20, 0.1)';
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.product-card, .feature-card, .resource-card, .value').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Dynamic year in footer
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
    yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear());
}

// ─── Payhip Integration ─────────────────────────────────────
// Map product slugs to Payhip checkout URLs
// UPDATE THESE with real Payhip product links once products are listed
const PAYHIP_PRODUCTS = {
    'ai-money-machine': '',       // e.g. 'https://payhip.com/b/xxxxx'
    'affiliate-marketing': '',    // e.g. 'https://payhip.com/b/yyyyy'
    'digital-products': '',       // e.g. 'https://payhip.com/b/zzzzz'
    'complete-bundle': ''         // e.g. 'https://payhip.com/b/bbbbb'
};

// Handle buy button clicks
document.querySelectorAll('.payhip-buy-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const productSlug = this.dataset.product;
        const payhipUrl = PAYHIP_PRODUCTS[productSlug];

        if (payhipUrl) {
            // Open Payhip checkout
            window.open(payhipUrl, '_blank');
        } else {
            // Fallback — scroll to bundle or show coming soon
            alert('🚀 Store launching soon! Products will be available for purchase shortly.');
        }
    });
});

console.log('Wings Express LLC — Website loaded');
console.log('Payhip integration ready — update PAYHIP_PRODUCTS with real URLs');
