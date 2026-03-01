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

// ─── Stripe Payment Integration ─────────────────────────────
const STRIPE_PRODUCTS = {
    'ai-money-machine': 'https://buy.stripe.com/test_5kQ28tcfS2Qv25z8kF1Nu00',
    'affiliate-marketing': 'https://buy.stripe.com/test_9B614pcfS76LaC5asN1Nu01',
    'digital-products': 'https://buy.stripe.com/test_8x2cN7djWbn125z8kF1Nu02',
    'complete-bundle': 'https://buy.stripe.com/test_3cIcN74Nq4YDdOh44p1Nu03'
};

// Handle buy button clicks — open Stripe Checkout
document.querySelectorAll('.payhip-buy-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const productSlug = this.dataset.product;
        const checkoutUrl = STRIPE_PRODUCTS[productSlug];

        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        } else {
            alert('🚀 Store launching soon! This product will be available shortly.');
        }
    });
});

console.log('Wings Express LLC — Website loaded');
console.log('Stripe Checkout integration active');
