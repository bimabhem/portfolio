document.addEventListener('DOMContentLoaded', () => {
    /* --- Loading Screen --- */
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });

    /* --- Custom Cursor - Only for Desktop --- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only show cursor on non-touch devices
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    } else {
        // Hide cursor on touch devices
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    const toggleMenu = () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            menuOpen = false;
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on window resize (for orientation changes)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });

    /* --- Dark/Light Mode Toggle --- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
    }

    /* --- Typed.js Animation --- */
    new Typed('#typed', {
        strings: [
            'Web Developer',
            'Fresh Graduate'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    /* --- Particles.js Configuration --- */
    const isMobile = window.innerWidth <= 768;
    const particlesCount = isMobile ? 40 : 80;
    const particlesValueArea = isMobile ? 500 : 800;
    const particlesSpeed = isMobile ? 1.5 : 2;
    
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": particlesCount, "density": { "enable": true, "value_area": particlesValueArea } },
            "color": { "value": "#3a86ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#3a86ff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": particlesSpeed, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { 
                "onhover": { "enable": !isMobile, "mode": "grab" }, // Disable hover on mobile
                "onclick": { "enable": true, "mode": "push" }, 
                "resize": true 
            },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    /* --- Scroll Reveal Animations --- */
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: false,
        mobile: true
    });

    sr.reveal('.hero-content, .section-header');
    sr.reveal('.hero-image', { origin: 'right', delay: 400 });
    sr.reveal('.about-image', { origin: 'left' });
    sr.reveal('.about-content, .timeline-item, .portfolio-item, .intern-card, .info-card', { interval: 200 });

    /* --- Skills Cards Animation --- */
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    skillCards.forEach(card => skillObserver.observe(card));

    /* --- Badge Stagger Animation on Hover --- */
    skillCards.forEach(card => {
        const badges = card.querySelectorAll('.skill-badge');
        
        card.addEventListener('mouseenter', () => {
            badges.forEach((badge, index) => {
                badge.style.animationDelay = `${index * 0.05}s`;
                badge.style.animation = 'none';
                badge.offsetHeight; // Trigger reflow
                badge.style.animation = 'badgeBounce 0.3s ease forwards';
            });
        });
    });

    /* --- Contact Section Social Icons Animation --- */
    const socialIcons = document.querySelectorAll('.social-icon');
    
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                socialObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    socialIcons.forEach(icon => socialObserver.observe(icon));

    /* --- Counter Animation --- */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* --- Portfolio Filter --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active button class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 0);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    /* --- Modal Project Details --- */
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-btn');

    const projectData = {
        1: {
            title: "Sistem Informasi Inventaris",
            img: "img/web1.png",
            tech: "CodeIgniter 3, MySQL, Bootstrap",
            desc: "Sistem inventaris lengkap untuk mengelola stok barang di gudang. Memiliki fitur manajemen supplier, barang masuk/keluar, cetak laporan PDF, dan dashboard statistik real-time."
        },
        2: {
            title: "Website Profil Instansi",
            img: "img/web2.png",
            tech: "Laravel, MySQL, Tailwind CSS",
            desc: "Website profil untuk institusi pendidikan dengan CMS (Content Management System) kustom. Admin dapat mengelola berita, data dosen, kurikulum, dan pengumuman dengan mudah."
        },
        3: {
            title: "Website Portofolio Pribadi",
            img: "img/web3.png",
            tech: "HTML5, CSS3, JavaScript Vanilla",
            desc: "Website portofolio interaktif dengan desain Glassmorphism dan animasi modern. Dibangun menggunakan teknologi web terkini untuk performa optimal dan responsivitas tinggi."
        }
    };

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const data = projectData[id];

            modalBody.innerHTML = `
                <img src="${data.img}" alt="${data.title}" style="width:100%; border-radius:15px; margin-bottom:20px;">
                <h2 style="margin-bottom:10px; font-size: 1.5rem;">${data.title}</h2>
                <p style="color:var(--accent-purple); font-weight:600; margin-bottom:15px;">${data.tech}</p>
                <p style="margin-bottom:20px;">${data.desc}</p>
                <div class="modal-links" style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="#" class="btn btn-primary" style="flex: 1; min-width: 120px;">Live Demo</a>
                    <a href="#" class="btn btn-secondary" style="flex: 1; min-width: 120px;">Source Code</a>
                </div>
            `;
            modal.style.display = 'flex';
            body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            body.style.overflow = 'auto';
        }
    });

    /* --- Back To Top --- */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
