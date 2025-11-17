/**
 * MERCI STUDIO - MAIN JAVASCRIPT
 * Premium interactions and animations
 */

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
    initScrollEffects();
});

/**
 * Custom Cursor
 */
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursor.style.borderColor = '#fff';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        });
    });
}

/**
 * Navigation
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Hide/show nav on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

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
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .feature-item, .contact-item');

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Section animations
    const sections = document.querySelectorAll('.service-detail, .services-overview, .contact-section');

    sections.forEach(section => {
        const content = section.querySelector('.detail-content, .services-grid, .contact-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(50px)';
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });

            sectionObserver.observe(section);
        }
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    // Parallax effect for 3D containers
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero parallax
        const hero3d = document.getElementById('hero3d');
        if (hero3d) {
            hero3d.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Detail sections parallax
        const detail3ds = document.querySelectorAll('.detail-3d');
        detail3ds.forEach(detail => {
            const rect = detail.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            if (scrollPercent > 0 && scrollPercent < 1) {
                detail.style.transform = `translateY(${scrollPercent * 100}px)`;
            }
        });
    });

    // Service cards tilt effect
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#22c55e';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);

        // In production, replace with actual form submission:
        /*
        try {
            const formData = new FormData(form);
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Success handling
            } else {
                // Error handling
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
        */
    });

    // Input animations
    const inputs = form.querySelectorAll('.form-input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            input.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
}

/**
 * Loading Animation
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

/**
 * Performance Optimization - Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll and resize events
const optimizedScroll = debounce(() => {
    // Scroll optimizations
}, 16);

const optimizedResize = debounce(() => {
    // Resize optimizations
}, 250);

window.addEventListener('scroll', optimizedScroll);
window.addEventListener('resize', optimizedResize);

/**
 * Easter Egg - Konami Code
 */
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

/**
 * Console Message
 */
console.log('%c MERCI STUDIO ', 'background: #000; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Premium Digital Solutions ', 'background: #fff; color: #000; font-size: 14px; padding: 5px;');
console.log('%c Looking for developers? hello@mercistudio.com ', 'color: #666; font-size: 12px;');
