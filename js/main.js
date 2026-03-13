document.addEventListener('DOMContentLoaded', () => {

    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.getElementById('nav-links');
    const navActions = document.getElementById('nav-actions');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            if (navActions) navActions.classList.toggle('active', isOpen);

            // Hamburger animation
            const spans = mobileBtn.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (navActions) navActions.classList.remove('active');
                const spans = mobileBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 80;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // 4. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 5. Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // 6. "How it works" step cards - animate on scroll into view
    const stepCards = document.querySelectorAll('.hiw-step-card');
    let currentActiveStep = 0;

    const animateHIWSteps = () => {
        const hiwSection = document.querySelector('.how-it-works');
        if (!hiwSection) return;

        const rect = hiwSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = 1 - (rect.bottom / (window.innerHeight + rect.height));
            const stepIndex = Math.min(Math.floor(progress * stepCards.length * 2), stepCards.length - 1);

            if (stepIndex !== currentActiveStep) {
                stepCards[currentActiveStep].classList.remove('active');
                stepCards[stepIndex].classList.add('active');
                currentActiveStep = stepIndex;
            }
        }
    };

    window.addEventListener('scroll', animateHIWSteps, { passive: true });
});
