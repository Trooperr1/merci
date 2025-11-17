/**
 * MERCI STUDIO - MODERN JAVASCRIPT
 * Ultra-modern interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modern features
    initPreloader();
    initAdvancedCursor();
    initCounters();
    initLanguageSwitcher();
    initAOS();
    initModernForm();
    initNewsletter();
    initHeroAnimations();
});

/**
 * Preloader with Progress
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');

    if (!preloader || !progressBar) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';

                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 500);
        }

        progressBar.style.width = progress + '%';
    }, 200);

    // Ensure preloader doesn't show too long
    setTimeout(() => {
        if (progress < 100) {
            progress = 100;
            progressBar.style.width = '100%';
        }
    }, 3000);
}

/**
 * Advanced Custom Cursor
 */
function initAdvancedCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursorDot || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Dot follows immediately
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;

        // Ring follows with delay
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
        cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .expertise-card, .testimonial-card, input, textarea, select');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

/**
 * Animated Counters
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;

        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

/**
 * Language Switcher
 */
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            langButtons.forEach(b => b.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');

            const lang = btn.getAttribute('data-lang');
            console.log('Language switched to:', lang);

            // Here you would implement actual language switching
            // For now, we'll just show a notification
            showNotification(`Language switched to ${lang.toUpperCase()}`);
        });
    });
}

/**
 * Initialize AOS (Animate On Scroll)
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
        });
    }
}

/**
 * Modern Form Handling
 */
function initModernForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    // Enhanced input interactions
    const inputs = form.querySelectorAll('.form-input-modern');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Validate on input
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.style.borderColor = 'rgba(0, 255, 0, 0.3)';
            } else {
                input.style.borderColor = '';
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit-modern');
        const originalHTML = submitBtn.innerHTML;

        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.style.opacity = '0.7';

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form data:', data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success state
        submitBtn.innerHTML = '<span>Message Sent!</span> ✓';
        submitBtn.style.background = '#22c55e';

        // Show success notification
        showNotification('Thank you! We\'ll be in touch soon.', 'success');

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.style.opacity = '';
        }, 3000);

        /* Production: Replace with actual API call
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success handling
            } else {
                // Error handling
                showNotification('Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Connection error. Please try again.', 'error');
        }
        */
    });
}

/**
 * Newsletter Form
 */
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const input = form.querySelector('.newsletter-input');
        const button = form.querySelector('.newsletter-button');
        const email = input.value;

        if (!email) return;

        // Disable button
        button.disabled = true;
        button.textContent = 'Subscribing...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        button.textContent = 'Subscribed!';
        button.style.background = '#22c55e';

        showNotification('Thanks for subscribing!', 'success');

        // Reset
        input.value = '';

        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Subscribe';
            button.style.background = '';
        }, 3000);

        /* Production: Replace with actual API call
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                // Success handling
            }
        } catch (error) {
            console.error('Newsletter error:', error);
        }
        */
    });
}

/**
 * Hero Entrance Animations
 */
function initHeroAnimations() {
    // Nothing needed here as AOS handles it
    // But we can add custom animations if needed
}

/**
 * Trigger Entrance Animations
 */
function triggerEntranceAnimations() {
    // Animate hero words
    const words = document.querySelectorAll('.hero-title-modern .word');

    words.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(50px)';
            word.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification-toast');
    if (existingNotif) {
        existingNotif.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;

    // Style based on type
    const styles = {
        info: 'background: rgba(255, 255, 255, 0.95); color: #000;',
        success: 'background: rgba(34, 197, 94, 0.95); color: #fff;',
        error: 'background: rgba(239, 68, 68, 0.95); color: #fff;'
    };

    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        ${styles[type]}
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(100px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(100px);
        }
    }
`;
document.head.appendChild(style);

/**
 * Smooth Scroll Enhancement
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Portfolio Hover Effects
 */
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        portfolioItems.forEach(other => {
            if (other !== item) {
                other.style.opacity = '0.5';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        portfolioItems.forEach(other => {
            other.style.opacity = '1';
        });
    });
});

/**
 * Expertise Card Parallax
 */
const expertiseCards = document.querySelectorAll('.expertise-card');

expertiseCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/**
 * Testimonial Auto-Rotate (Optional)
 */
function initTestimonialRotation() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    setInterval(() => {
        testimonials[currentIndex].style.transform = 'scale(1)';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.transform = 'scale(1.05)';
    }, 5000);
}

// Uncomment to enable auto-rotation
// initTestimonialRotation();

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

initScrollProgress();

/**
 * Image Lazy Loading Enhancement
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

/**
 * Performance Monitoring
 */
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log('🚀 Page Load Time:', (pageLoadTime / 1000).toFixed(2), 'seconds');
    });
}

/**
 * Console Branding
 */
console.log('%c MERCI STUDIO ', 'background: #000; color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px;');
console.log('%c Swiss Precision. Global Impact. ', 'background: #fff; color: #000; font-size: 14px; padding: 5px 10px;');
console.log('%c 🇨🇭 Based in Zürich, Switzerland ', 'color: #666; font-size: 12px; padding: 5px;');
console.log('%c 🌍 Serving clients worldwide ', 'color: #666; font-size: 12px; padding: 5px;');
console.log('%c ✉️ hello@mercistudio.com ', 'color: #666; font-size: 12px; padding: 5px;');
console.log('%c\nInterested in joining our team? We\'re always looking for talented developers!', 'color: #999; font-style: italic; font-size: 11px;');
