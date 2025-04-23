// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const aboutImages = document.querySelectorAll('.about-images img');
const projectsGrid = document.querySelector('.projects-grid');
const galleryButton = document.querySelector('.gallery-button');
const fullscreenGallery = document.querySelector('.fullscreen-gallery');
const closeGallery = document.querySelector('.close-gallery');
const projectPopup = document.querySelector('.project-popup');
const closePopup = document.querySelector('.close-popup');
const galleryGrid = document.querySelector('.gallery-grid');
const nav = document.querySelector('.nav');

// Sample Data
const projectsData = [
    {
        id: 1,
        title: "Neon Dreams",
        category: "Brand Identity",
        image: "1.jpg",
        description: "A futuristic brand identity for an electronic music festival featuring glowing neon elements and cyberpunk aesthetics. The project involved creating a comprehensive visual system that worked across digital and physical applications while maintaining a cohesive futuristic feel.",
        client: "Neon Festivals Inc.",
        year: "2023",
        services: "Logo, Brand Guidelines, Merchandise"
    },
    {
        id: 2,
        title: "Urban Decay",
        category: "Poster Series",
        image: "2.jpg",
        description: "A series of posters exploring the beauty in urban decay and industrial landscapes for a photography exhibition. The typography was carefully integrated with the photographic elements to create a harmonious composition that told a visual story of urban transformation.",
        client: "Metro Gallery",
        year: "2022",
        services: "Print Design, Art Direction"
    },
    {
        id: 3,
        title: "Minimalist",
        category: "Packaging",
        image: "3.jpg",
        description: "Clean, minimalist packaging design for a luxury skincare line focusing on sustainability and purity. The design uses subtle embossing and a restrained color palette to communicate the brand's commitment to simplicity and quality ingredients.",
        client: "Aurea Skincare",
        year: "2023",
        services: "Packaging, Brand Identity"
    },
    {
        id: 4,
        title: "Chromatic",
        category: "Digital Campaign",
        image: "4.jpg",
        description: "Vibrant digital campaign for a music streaming service featuring bold colors and dynamic typography. The campaign included social media assets, display ads, and animated banners that maintained visual consistency while allowing for creative variation across platforms.",
        client: "SoundWave",
        year: "2022",
        services: "Digital Design, Motion Graphics"
    },
    {
        id: 5,
        title: "Type in Motion",
        category: "Animation",
        image: "images/project5.jpg",
        description: "Kinetic typography series exploring the relationship between movement and letterforms in digital space. Each animation was carefully choreographed to music, creating a synesthetic experience where typography became a visual representation of sound.",
        client: "TypeLab",
        year: "2021",
        services: "Motion Design, Art Direction"
    },
    {
        id: 6,
        title: "Organic Forms",
        category: "Brand Identity",
        image: "images/project6.jpg",
        description: "Nature-inspired brand identity for an organic cafe chain using fluid shapes and earthy tones. The identity system extended across packaging, signage, and digital platforms, with each application maintaining the organic, handcrafted feel while adapting to different contexts.",
        client: "GreenRoots Cafe",
        year: "2023",
        services: "Logo, Brand Guidelines, Environmental Design"
    }
];

const galleryData = [
    { id: 1, image: "1.jpg", title: "Poster Series 01" },
    { id: 2, image: "2.jpg", title: "Poster Series 02" },
    { id: 3, image: "3.jpg", title: "Experimental Typography" },
    { id: 4, image: "4.jpg", title: "Digital Artwork 01" },
    { id: 5, image: "images/gallery5.jpg", title: "Editorial Spread" },
    { id: 6, image: "images/gallery6.jpg", title: "Brand Exploration" },
    { id: 7, image: "images/gallery7.jpg", title: "Packaging Concept" },
    { id: 8, image: "images/gallery8.jpg", title: "Poster Series 03" },
    { id: 9, image: "images/gallery9.jpg", title: "Digital Artwork 02" },
    { id: 10, image: "images/gallery10.jpg", title: "Typography Study" },
    { id: 11, image: "images/gallery11.jpg", title: "Collage Series" },
    { id: 12, image: "images/gallery12.jpg", title: "Poster Series 04" }
];

const servicesData = [
    {
        title: "Brand Identity",
        description: "Comprehensive visual identity systems including logos, color palettes, typography, and brand guidelines that create a cohesive and memorable brand presence."
    },
    {
        title: "Print Design",
        description: "Posters, packaging, editorial design, and physical collateral with meticulous attention to detail and production quality."
    },
    {
        title: "Digital Design",
        description: "UI/UX, social media assets, and digital campaigns optimized for engagement and conversion across all platforms."
    },
    {
        title: "Art Direction",
        description: "Conceptual development and visual strategy for campaigns, photoshoots, and multimedia projects."
    },
    {
        title: "Motion Design",
        description: "Animated graphics, title sequences, and kinetic typography that brings static designs to life."
    },
    {
        title: "Consulting",
        description: "One-on-one creative direction and design strategy sessions tailored to your specific needs and challenges."
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    loadProjects();

    // Load gallery
    loadGallery();

    // Load services
    loadServices();

    // Initialize image rotation for about section
    if (aboutImages.length > 0) {
        rotateImages();
    }

    // Initialize animations
    initAnimations();

    // Initialize scroll event for nav
    initScrollEvents();

    // Initialize intersection observer for animations
    initIntersectionObserver();
});

// Functions
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    if (navMenu.classList.contains('active')) {
        animateMenuLinks();
    }
}

function animateMenuLinks() {
    navLinks.forEach((link, index) => {
        anime({
            targets: link,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800,
            delay: index * 100,
            easing: 'easeOutExpo'
        });
    });
}

function rotateImages() {
    let currentIndex = 0;

    // Set first image as active
    aboutImages[currentIndex].classList.add('active');

    setInterval(() => {
        aboutImages.forEach(img => img.classList.remove('active'));
        currentIndex = (currentIndex + 1) % aboutImages.length;
        aboutImages[currentIndex].classList.add('active');

        // Anime.js fade animation
        anime({
            targets: aboutImages[currentIndex],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }, 4000);
}

function loadProjects() {
    projectsGrid.innerHTML = '';

    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <h4 class="project-title">${project.title}</h4>
                <p class="project-category">${project.category}</p>
            </div>
        `;

        projectCard.addEventListener('click', () => openProjectPopup(project));
        projectsGrid.appendChild(projectCard);
    });
}

function loadServices() {
    const servicesGrid = document.querySelector('.services-grid');
    servicesGrid.innerHTML = '';

    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="card-edge"></div>
            <h3 class="card-title">${service.title}</h3>
            <div class="card-arrow">→</div>
            <div class="card-description">${service.description}</div>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

function loadGallery() {
    galleryGrid.innerHTML = '';

    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
        `;

        galleryItem.addEventListener('click', () => {
            // In a real implementation, you might want to show a larger version
            alert(`Viewing: ${item.title}`);
        });

        galleryGrid.appendChild(galleryItem);
    });
}

function openProjectPopup(project) {
    const popup = document.querySelector('.project-popup');
    const popupImage = document.querySelector('.popup-image-container');
    const popupTitle = document.querySelector('.popup-title');
    const popupDescription = document.querySelector('.popup-description');
    const popupClient = document.querySelector('.detail-value.client');
    const popupYear = document.querySelector('.detail-value.year');
    const popupServices = document.querySelector('.detail-value.services');

    popupImage.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    popupTitle.textContent = project.title;
    popupDescription.textContent = project.description;
    popupClient.textContent = project.client;
    popupYear.textContent = project.year;
    popupServices.textContent = project.services;

    popup.classList.add('active');
    document.body.classList.add('no-scroll');

    // Anime.js animation for popup
    anime({
        targets: popup,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.popup-container',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 400,
        delay: 200,
        easing: 'spring(1, 80, 10, 0)'
    });
}

function closeProjectPopup() {
    const popup = document.querySelector('.project-popup');

    anime({
        targets: popup,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
            popup.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

function toggleGallery() {
    const gallery = document.querySelector('.fullscreen-gallery');

    if (gallery.classList.contains('active')) {
        anime({
            targets: gallery,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                gallery.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    } else {
        gallery.classList.add('active');
        document.body.classList.add('no-scroll');

        anime({
            targets: gallery,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });

        anime({
            targets: '.gallery-grid',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 500,
            delay: 300,
            easing: 'easeOutExpo'
        });
    }
}

function initAnimations() {
    // Hero section animations
    anime({
        targets: '.hero-title',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-subtitle',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 300,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.cta-button',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 500,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.tools-section',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 700,
        easing: 'easeOutExpo'
    });
}

function initScrollEvents() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                if (target.classList.contains('about-text')) {
                    anime({
                        targets: target,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                if (target.classList.contains('about-images')) {
                    anime({
                        targets: target,
                        translateX: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                if (target.classList.contains('project-card')) {
                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: anime.stagger(100),
                        easing: 'easeOutExpo'
                    });
                }

                if (target.classList.contains('service-card')) {
                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: anime.stagger(100),
                        easing: 'easeOutExpo'
                    });
                }

                if (target.classList.contains('gallery-button')) {
                    anime({
                        targets: target,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

               // In your existing initIntersectionObserver function, update this part:
               function initIntersectionObserver() {
                   const observer = new IntersectionObserver((entries) => {
                       entries.forEach(entry => {
                           if (entry.isIntersecting) {
                               const target = entry.target;

                               if (target.classList.contains('pricing-container')) {
                                   target.classList.add('animate');

                                   // Animate table rows one by one
                                   const rows = target.querySelectorAll('.table-row');
                                   anime({
                                       targets: rows,
                                       translateY: [20, 0],
                                       opacity: [0, 1],
                                       duration: 600,
                                       delay: anime.stagger(100),
                                       easing: 'easeOutExpo'
                                   });
                               }

                               // ... rest of your existing code ...
                           }
                       });
                   }, {
                       threshold: 0.1
                   });

                   // Observe the pricing container
                   const pricingContainer = document.querySelector('.pricing-container');
                   if (pricingContainer) {
                       observer.observe(pricingContainer);
                   }

               }

                if (target.classList.contains('contact-info')) {
                    anime({
                        targets: target,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                if (target.classList.contains('contact-form')) {
                    anime({
                        targets: target,
                        translateX: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                if (target.classList.contains('footer')) {
                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                target.classList.add('animated');
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements that need to be animated
    document.querySelectorAll('.about-text, .about-images, .project-card, .service-card, .gallery-button, .pricing-container, .contact-info, .contact-form, .footer').forEach(el => {
        observer.observe(el);
    });
}

// Event Listeners
hamburger.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

galleryButton.addEventListener('click', toggleGallery);
closeGallery.addEventListener('click', toggleGallery);
closePopup.addEventListener('click', closeProjectPopup);

// Close popup when clicking outside content
projectPopup.addEventListener('click', (e) => {
    if (e.target === projectPopup) {
        closeProjectPopup();
    }
});