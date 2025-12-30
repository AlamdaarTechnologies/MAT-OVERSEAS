// ===== MAT OVERSEAS WEBSITE JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    // Initialize all components
    initLoadingScreen();
    initCustomCursor();
    initNavigation();
    initScrollEffects();
    initProductData();
    initProductFilters();
    initContactForm();
    initAnimations();
    initCounters();
    initParallax();
    initMagneticEffects();
    initRevealAnimations();

    console.log('Mat Overseas website initialized successfully! 🚀');
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                gsap.fromTo('body',
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: 'power2.out' }
                );
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 300);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    // Check if device supports hover (not mobile)
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const interactiveElements = 'a, button, .product-card, .floating-card, .filter-btn, .nav-link, .info-card, .value-item, .social-link';

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            }
        });
    } else {
        // Hide cursor on mobile devices
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Logo click to scroll to home
    const navLogo = document.querySelector('.nav-logo, .logo-text');
    if (navLogo) {
        navLogo.addEventListener('click', () => {
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                const homeLink = document.querySelector('a[href="#home"]');
                if (homeLink) {
                    homeLink.classList.add('active');
                }
            }
        });
        navLogo.style.cursor = 'pointer';
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Smooth scroll to section
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    // Use native smooth scrolling (works in all modern browsers)
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // GSAP ScrollTrigger registration
    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .about-text, .contact-content');

    revealElements.forEach((element, index) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    once: true
                }
            }
        );
    });
}

// ===== PRODUCT DATA =====
function initProductData() {
    const products = [
        {
            id: 1,
            name: 'Premium Modular Kitchen Handles',
            category: 'hardware',
            categoryName: 'Hardware',
            description: 'Ergonomically designed handles with premium finish for modern kitchens.',
            features: ['Stainless Steel', 'Various Finishes', 'Durable Coating'],
            icon: '🔧'
        },
        {
            id: 2,
            name: 'Soft-Close Drawer Slides',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'High-quality drawer slides with smooth soft-close mechanism.',
            features: ['100kg Capacity', 'Soft Close', 'Easy Installation'],
            icon: '📦'
        },
        {
            id: 3,
            name: 'Cabinet Hinges System',
            category: 'accessories',
            categoryName: 'Accessories',
            description: 'Adjustable cabinet hinges for perfect door alignment.',
            features: ['360° Adjustment', 'Corrosion Resistant', 'Heavy Duty'],
            icon: '🔗'
        },
        {
            id: 4,
            name: 'Pull-Out Kitchen Organizer',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Intelligent storage solution for modern kitchens.',
            features: ['Space Efficient', 'Smooth Operation', 'Easy Assembly'],
            icon: '🏪'
        },
        {
            id: 5,
            name: 'Kitchen Sink Mixer Tap',
            category: 'hardware',
            categoryName: 'Hardware',
            description: 'Modern sink mixer tap with pull-out spray head.',
            features: ['Pull-out Spray', 'Single Lever', '360° Swivel'],
            icon: '🚿'
        },
        {
            id: 6,
            name: 'Undermount Drawer System',
            category: 'accessories',
            categoryName: 'Accessories',
            description: 'Premium undermount drawer system for clean aesthetics.',
            features: ['Silent Operation', 'Easy Installation', 'Heavy Duty'],
            icon: '🗄️'
        },
        {
            id: 7,
            name: 'Blumotion Hinges',
            category: 'accessories',
            categoryName: 'Accessories',
            description: 'Soft-close cabinet hinges with integrated damping.',
            features: ['Soft Close', 'Self-Closing', 'Adjustable'],
            icon: '🚪'
        },
        {
            id: 8,
            name: 'Corner Kitchen Organizer',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Smart corner storage solution that maximizes space.',
            features: ['360° Rotation', 'Space Maximizing', 'Smooth Operation'],
            icon: '🔄'
        },
        {
            id: 9,
            name: 'Bar Handles Collection',
            category: 'hardware',
            categoryName: 'Hardware',
            description: 'Contemporary bar handles in various lengths and finishes.',
            features: ['Modern Design', 'Various Lengths', 'Premium Finish'],
            icon: '📏'
        }
    ];

    renderProducts(products);
    window.allProducts = products;
}

// ===== RENDER PRODUCTS =====
function renderProducts(products) {
    const productsGrid = document.querySelector('.products-grid');

    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <div class="product-placeholder">
                    <div class="placeholder-icon">${product.icon}</div>
                </div>
            </div>
            <div class="product-content">
                <span class="product-category">${product.categoryName}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <a href="#contact" class="product-link">Enquire Now</a>
            </div>
        </div>
    `).join('');

    // Add animation to product cards
    gsap.fromTo('.product-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.products-grid',
                start: 'top 85%',
                once: true
            }
        }
    );
}

// ===== PRODUCT FILTERS =====
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            let filteredProducts = window.allProducts;

            if (filter !== 'all') {
                filteredProducts = window.allProducts.filter(product => product.category === filter);
            }

            // Re-render products with animation
            const productsGrid = document.querySelector('.products-grid');

            gsap.to('.product-card', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    renderProducts(filteredProducts);
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!contactForm) return;

    // Handle select label positioning
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        // Ensure label is positioned correctly on load
        const selectLabel = serviceSelect.nextElementSibling;
        if (selectLabel && selectLabel.tagName === 'LABEL') {
            selectLabel.style.top = '-0.5rem';
            selectLabel.style.left = '0.5rem';
            selectLabel.style.fontSize = '0.8rem';
            selectLabel.style.color = 'var(--accent-gold)';
            selectLabel.style.background = 'var(--primary-dark)';
            selectLabel.style.padding = '0 0.5rem';
            selectLabel.style.borderRadius = '5px';
        }

        // Update label on change
        serviceSelect.addEventListener('change', function() {
            if (selectLabel) {
                selectLabel.style.top = '-0.5rem';
                selectLabel.style.left = '0.5rem';
                selectLabel.style.fontSize = '0.8rem';
                selectLabel.style.color = 'var(--accent-gold)';
                selectLabel.style.background = 'var(--primary-dark)';
                selectLabel.style.padding = '0 0.5rem';
                selectLabel.style.borderRadius = '5px';
            }
        });
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';

                setTimeout(() => {
                    input.style.borderColor = '';
                }, 3000);
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Validate phone (basic validation)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formObject.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.querySelector('.btn-text').textContent;
        submitButton.querySelector('.btn-text').textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // For demo purposes, we'll simulate a successful submission
            // In production, replace with actual Web3Forms submission
            await simulateFormSubmission(formObject);

            // Show success message
            formSuccess.style.display = 'block';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.querySelector('.btn-text').textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// ===== SIMULATE FORM SUBMISSION =====
async function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', formData);
            resolve({ success: true });
        }, 2000);
    });
}

// ===== SHOW NOTIFICATION =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : '#2a9d8f'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Hero section animations
    gsap.timeline()
        .from('.hero-title .title-line', {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-title .title-subtitle', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.floating-card', {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.2');

    // Floating cards animation
    gsap.to('.floating-card', {
        y: -10,
        duration: 3,
        stagger: 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        once: true
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));

                gsap.to(counter, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                });

                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== PARALLAX =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== MAGNETIC EFFECTS =====
function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .floating-card');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}

// ===== REVEAL ANIMATIONS =====
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.value-item, .info-card, .about-image');

    revealElements.forEach((element, index) => {
        gsap.set(element, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 80) {
    const targetPosition = element.offsetTop - offset;

    // Use native smooth scrolling
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Add click animation to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn-primary, .btn-secondary, .filter-btn, .product-link')) {
        gsap.to(e.target, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
});

// Add loading animation to images
document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG') {
        gsap.fromTo(e.target,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        );
    }
}, true);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Update any responsive animations
    if (window.innerWidth <= 768) {
        // Mobile specific adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}, 250));

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

// Console Easter egg
console.log('%c🏠 Mat Overseas - Premium Hardware Solutions', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cTransforming spaces with exquisite hardware and modular kitchen solutions', 'font-size: 14px; color: #a8b2d1;');
console.log('%cWebsite developed with ❤️ using modern web technologies', 'font-size: 12px; color: #2a9d8f;');