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
const contactForm = document.getElementById('contactForm');

// Sample Data with multiple images per project
const projectsData = [
    {
        id: 1,
        title: "Kenean coffee",
        category: "Posters",
        images: [
            "co1.jpg",
            "co2.jpg",
            "co3.jpg",
            "co4.jpg",
            "co5.jpg"
        ],
        description: "A futuristic brand identity for an electronic music festival featuring glowing neon elements and cyberpunk aesthetics. The project involved creating a comprehensive visual system that worked across digital and physical applications while maintaining a cohesive futuristic feel.",
        client: "Neon Festivals Inc.",
        year: "2023",
        services: "Logo, Brand Guidelines, Merchandise"
    },
    {
        id: 2,
        title: "persona",
        category: "Poster Series",
        images: [
            "persona1.jpg",
            "persona2.jpg",
            "persona3.jpg"
        ],
        description: "A series of posters exploring the beauty in urban decay and industrial landscapes for a photography exhibition. The typography was carefully integrated with the photographic elements to create a harmonious composition that told a visual story of urban transformation.",
        client: "Metro Gallery",
        year: "2022",
        services: "Print Design, Art Direction"
    },

    {
        id: 6,
        title: "kabod",
        category: "church posters",
        images: [
            "Kabod(1).jpg",
            "kabod(2).jpg",
            "kabod(3).jpg",
            "kabod(4).jpg",
            "kabod(5).jpg"
        ],
        description: "Nature-inspired brand identity for an organic cafe chain using fluid shapes and earthy tones. The identity system extended across packaging, signage, and digital platforms, with each application maintaining the organic, handcrafted feel while adapting to different contexts.",
        client: "GreenRoots Cafe",
        year: "2023",
        services: "Logo, Brand Guidelines, Environmental Design"
    }
];

const galleryData = [
    { id: 1, image: "g1.jpg", title: "Poster Series 01" },
    { id: 2, image: "g2.jpg", title: "Poster Series 02" },
    { id: 3, image: "g3.jpg", title: "Experimental Typography" },
    { id: 4, image: "g4.jpg", title: "Digital Artwork 01" },
    { id: 5, image: "g5.jpg", title: "Editorial Spread" },
    { id: 6, image: "g6.jpg", title: "Brand Exploration" },
    { id: 7, image: "g7.jpg", title: "Packaging Concept" },
    { id: 8, image: "g8.jpg", title: "Poster Series 03" },
    { id: 9, image: "g9.jpg", title: "Digital Artwork 02" },
    { id: 10, image: "g10.jpg", title: "Typography Study" },
    { id: 11, image: "g11.jpg", title: "Collage Series" },
    { id: 1, image: "sp1.jpg", title: "Poster Series 01" },
    { id: 2, image: "sp2.jpg", title: "Poster Series 02" },
    { id: 3, image: "sp3.jpg", title: "Experimental Typography" },
    { id: 4, image: "sp4.jpg", title: "Digital Artwork 01" },
    { id: 5, image: "sp5.jpg", title: "Editorial Spread" },
    { id: 6, image: "church1.jpg", title: "Brand Exploration" },
    { id: 7, image: "church2.jpg", title: "Packaging Concept" },
    { id: 8, image: "church3.jpg", title: "Poster Series 03" },
    { id: 9, image: "church4.jpg", title: "Digital Artwork 02" },
    { id: 10, image: "church5.jpg", title: "Typography Study" },
    { id: 7, image: "sport1.jpg", title: "Packaging Concept" },
    { id: 8, image: "sport2.jpg", title: "Poster Series 03" },
    { id: 9, image: "sport3.jpg", title: "Digital Artwork 02" },
    { id: 10, image: "sport4.jpg", title: "Typography Study" }
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
    initAnimations(); // This function will now be empty or have non-conflicting animations

    // Initialize scroll event for nav
    initScrollEvents();

    // Initialize intersection observer for animations
    initIntersectionObserver();

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
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
            <img src="${project.images[0]}" alt="${project.title}" class="project-image">
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
    const popupMainImage = document.querySelector('.main-image');
    const popupThumbnails = document.querySelector('.thumbnail-grid');
    const popupTitle = document.querySelector('.popup-title');
    const popupDescription = document.querySelector('.popup-description');
    const popupClient = document.querySelector('.detail-value.client');
    const popupYear = document.querySelector('.detail-value.year');
    const popupServices = document.querySelector('.detail-value.services');

    // Set main image
    popupMainImage.innerHTML = `<img src="${project.images[0]}" alt="${project.title}">`;

    // Clear existing thumbnails
    popupThumbnails.innerHTML = '';

    // Add thumbnails
    project.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `<img src="${image}" alt="${project.title} thumbnail ${index + 1}">`;

        thumbnail.addEventListener('click', () => {
            // Change main image when thumbnail is clicked
            popupMainImage.innerHTML = `<img src="${image}" alt="${project.title}">`;

            // Highlight active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.style.borderColor = 'var(--border-color)');
            thumbnail.style.borderColor = 'var(--accent-light)';
        });

        popupThumbnails.appendChild(thumbnail);
    });

    // Highlight first thumbnail
    if (popupThumbnails.firstChild) {
        popupThumbnails.firstChild.style.borderColor = 'var(--accent-light)';
    }

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

                if (target.classList.contains('pricing-container')) {
                    target.classList.add('animate'); // This might be a typo, should be 'animated' or this class should be styled.

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
    // Added main section containers to this list for generic fade-in effect
    document.querySelectorAll(
        '.about, .projects, .services, .pricing, .contact, .footer, ' + // Main sections
        '.about-text, .about-images, .project-card, .service-card, ' + // Specific elements within sections
        '.gallery-button, .pricing-container, .contact-info, .contact-form' // Other animatable elements
    ).forEach(el => {
        observer.observe(el);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // In a real app, you would send this to a server
    console.log('Form submitted:', data);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    e.target.reset();
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