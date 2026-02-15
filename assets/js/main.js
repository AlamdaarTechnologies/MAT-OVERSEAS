// ===== MAT OVERSEAS WEBSITE JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
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

    initContactForm();
    initAnimations();
    initCounters();
    initParallax();
    initMagneticEffects();
    initRevealAnimations();
    initProductModal();

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
// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    // Function to handle cursor state
    function handleCursorVisibility(e) {
        if (e.matches) {
            // Hover supported (Desktop)
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
            document.body.style.cursor = 'none'; // Force hide default cursor
        } else {
            // No hover (Mobile/Touch)
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            document.body.style.cursor = 'auto'; // Show default cursor
        }
    }

    // Media query for hover capability
    const hoverQuery = window.matchMedia('(hover: hover)');

    // Initial check
    handleCursorVisibility(hoverQuery);

    // Listen for changes
    hoverQuery.addEventListener('change', handleCursorVisibility);

    // Initial positioning
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorFollower, { xPercent: -50, yPercent: -50 });

    // Mouse move listener (always active but elements might be hidden)
    window.addEventListener('mousemove', (e) => {
        // Direct movement for the dot (instant)
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });

        // Delayed movement for the follower
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out"
        });
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
            name: 'Slim Tandem Drawer',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Sleek and maximizing storage efficiency.',
            features: ['Soft Close', 'Heavy Duty', 'Slim Design'],
            image: 'assets/images/products/Slim Tandem Box.png',
            specifications: {
                'Material': 'Steel Panel/Galvanized',
                'Finish': 'Dark Grey Matt',
                'Load Capacity': '40kg - 60kg',
                'Extension': '20" , 22" Full Extension',
                'Closing': 'Soft-Close Mechanism'
            }
        },
        {
            id: 2,
            name: 'S Corner',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Innovative S-shaped corner storage unit.',
            features: ['Space Maximizer', 'Smooth Gliding', 'Easy Access'],
            image: 'assets/images/products/S-corner.jpg',
            specifications: {
                'Cabinet Size': '900mm - 1000mm',
                'Trays': '2 Swing-Out Trays',
                'Load per Tray': '20kg',
                'Finish': 'Dark Grey',
                'Installation': 'Left / Right'
            }
        },
        {
            id: 3,
            name: 'Universal Magic Corner',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'The ultimate blind corner solution.',
            features: ['Universal Fit', '4 Basket System', 'Soft Stop'],
            image: 'assets/images/products/Universal magic corner.jpg',
            specifications: {
                'Cabinet Width': '800mm - 900mm',
                'Load Capacity': '5kg each basket',
                'Structure': 'High-strength Steel',
                'Baskets': 'Anti-slip Base',
                'Operation': 'Pull-out & Swing'
            }
        },
        {
            id: 4,
            name: 'SS Pantry Unit',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Tall unit storage for organized pantry.',
            features: ['Adjustable Baskets', 'Heavy Load', 'Full View'],
            image: 'assets/images/products/Pantry unit.jpg',
            specifications: {
                'Height': '500mm x 1700mm',
                'Width': '600mm',
                'Layers': '6 Basket Layers',
                'Material': 'Stainless Steel 304',
                'Slides': 'Top & Bottom Running'
            }
        },
        {
            id: 5,
            name: 'Bottle Pull Out',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Convenient storage for bottles and jars.',
            features: ['Divider System', 'Stable Motion', 'Compact'],
            image: 'assets/images/products/Bottle pull out.jpg',
            specifications: {
                'Cabinet Width': '200mm - 300mm',
                'Runners': 'Soft Close Undermount',
                'Material': 'Stainless Steel',
                'Color': 'Dark Grey',
                'Mounting': 'Side / Bottom'
            }
        },
        {
            id: 6,
            name: 'Elevator Basket',
            category: 'kitchen',
            categoryName: 'Kitchen Solutions',
            description: 'Pull-down system for high wall cabinets.',
            features: ['Ergonomic', 'Easy Lift', 'Adjustable Tension'],
            image: 'assets/images/products/Elevator basket.jpg',
            specifications: {
                'Cabinet Width': '900mm',
                'Load Capacity': '15kg - 20kg',
                'Mechanism': 'Hydraulic Assist',
                'Shelves': '2 Tier System',
                'Handle': 'Soft Grip'
            }
        },
        {
            id: 7,
            name: 'SS Waste Bin',
            category: 'accessories',
            categoryName: 'Accessories',
            description: 'Hygienic and concealed waste management.',
            features: ['Odor Seal', 'Easy Clean', 'Auto Lid'],
            image: 'assets/images/products/SS Waste bin.jpg',
            specifications: {
                'Capacity': '8L',
                'Material': 'Stainless Steel + Plastic',
                'Mounting': 'Door / Floor',
                'Lid': 'Automatic Opening',
                'Bin': 'Removable Inner Bucket'
            }
        }
    ];

    renderProducts(products);
    window.allProducts = products;
}

// Global variable to hold the Swiper instance
let productSwiperInstance = null;

// Render functions
function renderProducts(products) {
    const productsWrapper = document.getElementById('productsWrapper');

    if (!productsWrapper) {
        console.error("Element with ID 'productsWrapper' not found.");
        return;
    }

    // Clear existing content
    productsWrapper.innerHTML = '';

    if (products.length === 0) {
        productsWrapper.innerHTML = `
            <div class="no-products" style="text-align: center; padding: 2rem;">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        // Destroy Swiper if no products
        if (productSwiperInstance) {
            productSwiperInstance.destroy(true, true);
            productSwiperInstance = null;
        }
        return;
    }

    // Create Slides
    // Duplicate products to ensure seamless loop with coverflow
    const loopProducts = [...products, ...products, ...products];

    productsWrapper.innerHTML = loopProducts.map(product => `
        <div class="swiper-slide">
            <div class="product-image" style="background: transparent; height: 60%; padding: 1rem;">
                <img src="${product.image}" alt="${product.name}" style="height: 100%; object-fit: contain; width: 100%; border-radius: 10px;">
            </div>
            <div class="product-content" style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                <span class="product-category" style="align-self: flex-start; margin-bottom: 0.5rem;">${product.categoryName}</span>
                <h3 class="product-title" style="font-size: 1.2rem; margin-bottom: 0.5rem;">${product.name}</h3>
                <p class="product-description" style="font-size: 0.9rem; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.description}</p>
                <div style="margin-top: auto;">
                    <button onclick="openProductModal(${product.id})" class="product-link">View Details</button>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize Swiper
    initSwiper();
}

function initSwiper() {
    // Destroy existing Swiper instance if it exists
    if (productSwiperInstance) {
        productSwiperInstance.destroy(true, true);
    }

    productSwiperInstance = new Swiper('.product-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        loopedSlides: 6,
        pagination: false, // Disable default pagination to use custom logic
        on: {
            init: function () {
                initCustomPagination(this);
            },
            slideChange: function () {
                updateCustomPagination(this);
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        initialSlide: 1, // Start with the second product focused
        // Removed duplicate loop: true to avoid conflicts, it's set above with loopedSlides
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    });
}

// Custom Pagination Logic
function initCustomPagination(swiper) {
    const paginationEl = document.querySelector('.swiper-pagination');
    if (!paginationEl) return;

    // Clear existing
    paginationEl.innerHTML = '';

    // Create 7 dots only
    const totalUnique = 7;
    for (let i = 0; i < totalUnique; i++) {
        const bullet = document.createElement('span');
        bullet.className = 'swiper-pagination-bullet';
        // Add click listener
        bullet.addEventListener('click', () => {
            const currentRealIndex = swiper.realIndex;
            const targets = [i, i + 7, i + 14];

            let bestTarget = targets[0];
            let minDiff = Math.abs(currentRealIndex - bestTarget);

            targets.forEach(t => {
                const diff = Math.abs(currentRealIndex - t);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestTarget = t;
                }
            });

            swiper.slideToLoop(bestTarget);
        });
        paginationEl.appendChild(bullet);
    }

    updateCustomPagination(swiper);
}

function updateCustomPagination(swiper) {
    const paginationEl = document.querySelector('.swiper-pagination');
    if (!paginationEl) return;

    const totalUnique = 7;
    const activeIndex = swiper.realIndex % totalUnique;

    const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
    bullets.forEach((bullet, idx) => {
        if (idx === activeIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
            bullet.style.backgroundColor = 'var(--accent-gold)';
            bullet.style.opacity = '1';
        } else {
            bullet.classList.remove('swiper-pagination-bullet-active');
            bullet.style.backgroundColor = '';
            bullet.style.opacity = '';
        }
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
        serviceSelect.addEventListener('change', function () {
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
            // Send data to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            const json = await response.json();

            if (response.status === 200) {
                // Show success message
                formSuccess.style.display = 'block';
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            } else {
                console.error('Form submission error:', json);
                showNotification(json.message || 'Failed to send message', 'error');
            }

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
                    onUpdate: function () {
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
    // General reveal elements (keep delay for staggered effect if needed)
    const generalReveals = document.querySelectorAll('.value-item, .about-image');
    generalReveals.forEach((element, index) => {
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

    // Contact cards specific animation
    const contactCards = document.querySelectorAll('.info-card');
    contactCards.forEach((element, index) => {
        gsap.set(element, { opacity: 0, y: 30 });
        ScrollTrigger.create({
            trigger: element,
            start: 'top bottom', // Trigger as soon as the top of element hits bottom of viewport
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0, // No delay for immediate feedback
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ===== PRODUCT MODAL =====
function initProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    const overlay = document.getElementById('modalOverlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeProductModal);
    }

    // Modal Enquire Button Logic
    const enquireBtn = modal.querySelector('.modal-enquire-btn');
    if (enquireBtn) {
        enquireBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeProductModal();

            // Wait for modal exit animation before scrolling
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
}

function openProductModal(productId) {
    const product = window.allProducts.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const title = modal.querySelector('.modal-title');
    const category = modal.querySelector('.modal-category');
    const description = modal.querySelector('.modal-description');
    const icon = modal.querySelector('.modal-icon');
    const specsBody = document.getElementById('modalSpecsBody');

    // Populate Data
    title.textContent = product.name;
    category.textContent = product.categoryName;
    description.textContent = product.description;

    // Inject Image instead of Icon
    const imagePlaceholder = modal.querySelector('.modal-image-placeholder');
    if (imagePlaceholder) {
        // Clear previous content (icon or old image)
        imagePlaceholder.innerHTML = `<img src="${product.image}" alt="${product.name}" class="modal-product-image">`;
    }

    // Populate Specifications
    if (product.specifications) {
        specsBody.innerHTML = Object.entries(product.specifications).map(([key, value]) => `
            <tr>
                <td class="specs-key">${key}</td>
                <td class="specs-value">${value}</td>
            </tr>
        `).join('');
    } else {
        specsBody.innerHTML = '<tr><td colspan="2">No specifications available.</td></tr>';
    }

    // Show Modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

window.openProductModal = openProductModal; // Make global

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
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