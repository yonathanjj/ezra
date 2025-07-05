document.addEventListener('DOMContentLoaded', () => {
  // --- DATA ---
  const servicesData = [
    { title: "UI/UX Design", description: "Crafting intuitive and visually appealing interfaces that provide meaningful user experiences." },
    { title: "Product Strategy", description: "Developing a clear vision and roadmap for your product to ensure it meets market needs and business goals." },
    { title: "Web Development", description: "Building responsive, high-performance websites using modern technologies and best practices." },
  ];

  // Rich portfolio data for gallery popup
  const portfolioData = [
    {
      id: 'kenean-coffee',
      title: 'Kenean Coffee Branding',
      category: 'branding',
      coverImage: 'co1.jpg',
      galleryImages: ['co1.jpg', 'co2.jpg', 'co3.jpg', 'co4.jpg', 'co5.jpg'],
      description: 'A comprehensive brand identity for a modern coffee shop, focusing on a clean aesthetic and memorable packaging. The goal was to create a brand that feels both premium and approachable.',
      client: 'Kenean Coffee Co.',
      year: '2023',
      services: 'Branding, Packaging, Print'
    },
    {
      id: 'persona-posters',
      title: 'Persona Poster Series',
      category: 'poster',
      coverImage: 'persona1.jpg',
      galleryImages: ['persona1.jpg', 'persona2.jpg', 'persona3.jpg'],
      description: 'A series of posters for a conceptual film festival. Each poster uses high-contrast imagery and bold typography to explore themes of identity and perception.',
      client: 'Internal Project',
      year: '2022',
      services: 'Art Direction, Print Design'
    },
    {
      id: 'kabod-identity',
      title: 'Kabod Church Identity',
      category: 'branding',
      coverImage: 'kabod(1).jpg',
      galleryImages: ['kabod(1).jpg', 'kabod(2).jpg', 'kabod(3).jpg', 'kabod(4).jpg', 'kabod(5).jpg'],
      description: 'Visual identity for a modern church community. The project included logo design, event branding, and social media templates to foster a cohesive and welcoming online presence.',
      client: 'Kabod Community',
      year: '2023',
      services: 'Branding, Social Media'
    },
    {
      id: 'sports-campaign',
      title: 'Athletic Ad Campaign',
      category: 'poster',
      coverImage: 'sport1.jpg',
      galleryImages: ['sport1.jpg', 'sport2.jpg', 'sport3.jpg', 'sport4.jpg'],
      description: 'A dynamic advertising campaign for an athletic brand, featuring powerful action shots and energetic graphics to capture the spirit of competition and perseverance.',
      client: 'Momentum Athletics',
      year: '2022',
      services: 'Art Direction, Advertising'
    },
    {
      id: 'digital-art-1',
      title: 'Abstract Grid System',
      category: 'digital',
      coverImage: 'g1.jpg',
      galleryImages: ['g1.jpg', 'g2.jpg', 'g4.jpg', 'g10.jpg'],
      description: 'An exploration of generative art using grid systems and color theory. These digital pieces experiment with structure, chaos, and visual rhythm.',
      client: 'Personal Exploration',
      year: '2024',
      services: 'Digital Art, Creative Coding'
    },
    {
      id: 'corp-branding',
      title: 'Corporate Identity Pack',
      category: 'branding',
      coverImage: 'sp1.jpg',
      galleryImages: ['sp1.jpg', 'sp2.jpg', 'sp3.jpg', 'sp4.jpg', 'sp5.jpg'],
      description: 'A clean and professional identity package for a tech startup, including logo, business cards, and presentation templates designed for clarity and impact.',
      client: 'Innovate Solutions',
      year: '2021',
      services: 'Branding, UI/UX'
    }
  ];

  // --- DOM ELEMENTS ---
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const servicesGrid = document.querySelector('.services-grid');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const portfolioFilters = document.querySelector('.portfolio-filters');

  // Popup Elements
  const popup = document.getElementById('project-popup');
  const popupClose = document.getElementById('popup-close');
  const popupMainImage = document.getElementById('popup-main-image');
  const popupThumbnails = document.getElementById('popup-thumbnails');
  const popupTitle = document.getElementById('popup-title');
  const popupDescription = document.getElementById('popup-description');
  const popupClient = document.getElementById('popup-client');
  const popupYear = document.getElementById('popup-year');
  const popupServices = document.getElementById('popup-services');

  // --- NAVIGATION & HEADER ---
  if (navToggle) { navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navMenu.classList.toggle('active'); }); }
  function scrollHeader() { header.classList.toggle('scroll-header', window.scrollY >= 50); }
  window.addEventListener('scroll', scrollHeader);

  // --- DYNAMIC CONTENT ---
  function loadServices() { servicesGrid.innerHTML = servicesData.map(s => `<div class="service-card animate-up"><h3>${s.title}</h3><p>${s.description}</p></div>`).join(''); }
  function loadPortfolio() { portfolioGrid.innerHTML = portfolioData.map(p => `<div class="portfolio-card animate-up" data-category="${p.category}" data-id="${p.id}"><img src="${p.coverImage}" alt="${p.title}"><div class="portfolio-content"><h3>${p.title}</h3><p>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p></div></div>`).join(''); }

  loadServices();
  loadPortfolio();

  // --- PORTFOLIO FILTERING ---
  if (portfolioFilters) {
    portfolioFilters.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-item')) {
        portfolioFilters.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        const filterValue = e.target.dataset.filter;
        portfolioGrid.querySelectorAll('.portfolio-card').forEach(card => {
          card.classList.add('hide');
          setTimeout(() => { if (card.dataset.category === filterValue || filterValue === 'all') card.classList.remove('hide'); }, 100);
        });
      }
    });
  }

  // --- POPUP LOGIC ---
  function openPopup(projectId) {
    const project = portfolioData.find(p => p.id === projectId);
    if (!project) return;

    // Populate text content
    popupTitle.textContent = project.title;
    popupDescription.textContent = project.description;
    popupClient.textContent = project.client;
    popupYear.textContent = project.year;
    popupServices.textContent = project.services;

    // Populate gallery
    popupMainImage.innerHTML = `<img src="${project.galleryImages[0]}" alt="Main view of ${project.title}">`;
    popupThumbnails.innerHTML = project.galleryImages.map((img, index) =>
      `<div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
         <img src="${img}" alt="Thumbnail of ${project.title}">
       </div>`
    ).join('');

    // Show popup
    document.body.classList.add('no-scroll');
    popup.classList.add('active');
  }

  function closePopup() {
    document.body.classList.remove('no-scroll');
    popup.classList.remove('active');
  }

  // Event listener for opening popup
  portfolioGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.portfolio-card');
    if (card) openPopup(card.dataset.id);
  });

  // Event listener for changing main image via thumbnails
  popupThumbnails.addEventListener('click', (e) => {
    const thumbnail = e.target.closest('.thumbnail');
    if (thumbnail) {
      popupThumbnails.querySelector('.active').classList.remove('active');
      thumbnail.classList.add('active');
      popupMainImage.innerHTML = `<img src="${thumbnail.dataset.image}" alt="Main view">`;
    }
  });

  // Event listeners for closing popup
  popupClose.addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });

  // --- ANIMATIONS ---
  anime({ targets: '.hero-title .line', translateY: [100, 0], opacity: [0, 1], easing: 'easeOutExpo', duration: 1500, delay: anime.stagger(200, { start: 500 }) });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY, target: { clientWidth, clientHeight } } = e;
      const x = (offsetX / clientWidth) * 30 - 15;
      const y = (offsetY / clientHeight) * 30 - 15;
      anime({ targets: btn, x, y, scale: 1.05, duration: 300, easing: 'easeOutQuad' });
    });
    btn.addEventListener('mouseleave', () => anime({ targets: btn, x: 0, y: 0, scale: 1, duration: 300, easing: 'easeOutQuad' }));
  });
});
