/**
 * NexFero Innovations - Master Application Controller
 * 
 * Orchestrates:
 * - Preloader animation with NexFero logo
 * - Floating glassmorphic navigation with scrollspy & mobile drawer
 * - Interactive Project Portfolio with animated category filters
 * - Interactive Process Timeline with dynamic progress tracking
 * - Interactive Tech Stack filtering and SVG logo rendering
 * - Scroll-to-top button with circular SVG scroll-depth indicator
 */

(function () {
  'use strict';

  // 1. PRELOADER
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 400);
    }
  });

  // 2. NAVBAR SCROLL EFFECT & SCROLLSPY
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('navbar-menu');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Scrollspy with IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('is-active');
      navMenu.classList.toggle('menu-open');
      document.body.classList.toggle('nav-drawer-open');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('is-active');
        navMenu.classList.remove('menu-open');
        document.body.classList.remove('nav-drawer-open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('menu-open') &&
          !navMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('is-active');
        navMenu.classList.remove('menu-open');
        document.body.classList.remove('nav-drawer-open');
      }
    });
  }

  // Smooth Scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. PROJECTS PORTFOLIO RENDERER & FILTER
  const projectGrid = document.getElementById('projects-grid');
  const projectFilters = document.querySelectorAll('.project-filter-btn');

  function renderProjects(filter = 'all') {
    if (!projectGrid || !window.NEXFERO_PROJECTS) return;

    const filtered = filter === 'all'
      ? window.NEXFERO_PROJECTS
      : window.NEXFERO_PROJECTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    projectGrid.innerHTML = filtered.map((project, idx) => `
      <article class="project-card" data-category="${project.category}">
        <div class="project-card-header">
          <div class="project-category-badge">${project.category}</div>
          <div class="project-badge-pill">${project.badge}</div>
        </div>

        <div class="project-card-visual">
          <div class="project-visual-pattern pattern-${(idx % 4) + 1}">
            <div class="visual-glow-orb"></div>
            <div class="visual-circuit-lines"></div>
            <div class="visual-center-emblem">
              <span class="project-emblem-icon">✦</span>
              <span class="project-emblem-text">${project.title.substring(0, 4)}</span>
            </div>
          </div>
        </div>

        <div class="project-card-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>

          <div class="project-tags">
            ${project.tags.map(t => `<span class="project-tag-pill">${t}</span>`).join('')}
          </div>

          <div class="project-metrics-row">
            ${project.metrics.slice(0, 2).map(m => `
              <div class="card-metric-col">
                <span class="metric-value-text">${m.value}</span>
                <span class="metric-label-text">${m.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="project-card-footer">
          <button type="button" class="btn-project-view" onclick="openProjectModal('${project.id}')">
            <span>Explore Architecture</span>
            <span class="arrow-icon">→</span>
          </button>
        </div>
      </article>
    `).join('');
  }

  if (projectFilters.length > 0) {
    projectFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        projectFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter') || 'all';
        renderProjects(filterVal);
      });
    });
  }

  renderProjects('all');

  // 4. INTERACTIVE PROCESS TIMELINE
  const processSteps = [
    {
      num: '01',
      title: 'Discover',
      tagline: "Deep Exploration of Ideas & Technical Boundaries",
      desc: "We initiate every collaboration by conducting in-depth stakeholder sessions. We deconstruct your product vision, define operational constraints, map end-user personas, and establish quantifiable technical benchmarks.",
      deliverables: ['Product Requirement Document (PRD)', 'Technical Feasibility Analysis', 'User Persona & Journey Maps', 'Security & Compliance Scope']
    },
    {
      num: '02',
      title: 'Plan',
      tagline: 'Strategic Architecture & Systems Blueprinting',
      desc: "Our engineering leadership designs an extensible system blueprint. We evaluate database models, API communication protocols, AI model integrations, and cloud infrastructure requirements before development begins.",
      deliverables: ['System Architecture Diagram', 'Data Schema & Entity Modeling', 'Milestone-Based Sprint Roadmap', 'Cloud Infrastructure Cost Projections']
    },
    {
      num: '03',
      title: 'Design',
      tagline: 'High-Fidelity UI/UX & Interactive Prototyping',
      desc: "Transforming specifications into captivating, accessible visual experiences. We produce high-fidelity wireframes and clickable prototypes in Figma, rigorously adhering to WCAG 2.1 AA accessibility guidelines.",
      deliverables: ['Figma Design System & Token Library', 'Clickable High-Fidelity Prototype', 'Responsive Breakpoint Layouts', 'Design Audit & Accessibility Certification']
    },
    {
      num: '04',
      title: 'Develop',
      tagline: 'Agile Codebase Engineering & Model Integration',
      desc: "Writing clean, modular, and maintainable code. We implement test-driven practices, integrate intelligent APIs, and set up continuous automated build pipelines with strict code reviews at every pull request.",
      deliverables: ['Production-Grade Source Codebase', 'REST & GraphQL API Endpoints', 'Containerized Microservices (Docker)', 'Automated CI/CD Integration Pipelines']
    },
    {
      num: '05',
      title: 'Test',
      tagline: 'Rigorous Verification, Security & Load Audits',
      desc: "Exhaustive quality assurance across multiple devices and environments. We run automated unit tests, end-to-end integration flows, penetration tests, and simulated high-concurrency load spikes to ensure zero failures.",
      deliverables: ['Unit & Integration Test Coverage (>90%)', 'Penetration & Vulnerability Assessment', 'Lighthouse 95+ Performance Audit', 'Cross-Browser Compatibility Report']
    },
    {
      num: '06',
      title: 'Launch',
      tagline: 'Zero-Downtime Deployment & Continuous Evolution',
      desc: "Flawless production deployment to AWS, Azure, or modern edge networks. We establish automated monitoring, real-time error telemetry, comprehensive operational playbooks, and structured post-launch support.",
      deliverables: ['Zero-Downtime Production Rollout', 'DNS & Custom Domain SSL Configuration', 'Real-time Telemetry & Health Alerts', 'Complete Operational Documentation']
    }
  ];

  const timelineNodes = document.querySelectorAll('.process-step-btn');
  const processDetailTitle = document.getElementById('process-detail-title');
  const processDetailTagline = document.getElementById('process-detail-tagline');
  const processDetailDesc = document.getElementById('process-detail-desc');
  const processDetailDeliverables = document.getElementById('process-detail-deliverables');
  const processProgressBar = document.getElementById('process-progress-bar');

  function updateProcessStep(index) {
    const step = processSteps[index];
    if (!step) return;

    timelineNodes.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    if (processProgressBar) {
      const percent = (index / (processSteps.length - 1)) * 100;
      processProgressBar.style.width = `${percent}%`;
    }

    if (processDetailTitle) processDetailTitle.textContent = `${step.num} – ${step.title}`;
    if (processDetailTagline) processDetailTagline.textContent = step.tagline;
    if (processDetailDesc) processDetailDesc.textContent = step.desc;

    if (processDetailDeliverables) {
      processDetailDeliverables.innerHTML = step.deliverables.map(d => `
        <li><span class="gold-check">✓</span> ${d}</li>
      `).join('');
    }
  }

  timelineNodes.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateProcessStep(idx));
  });

  // 5. TECH STACK FILTERING & DATA
  const TECH_ITEMS = [
    // Frontend
    { name: 'HTML5', category: 'frontend', role: 'Semantic Structure & SEO Architecture', badge: 'Standard' },
    { name: 'CSS3', category: 'frontend', role: 'Modern Layouts, Flexbox, Grid & Keyframes', badge: 'Style' },
    { name: 'JavaScript', category: 'frontend', role: 'ES6+ Asynchronous & Interactive Logic', badge: 'Language' },
    { name: 'React', category: 'frontend', role: 'Component-Driven Single Page Applications', badge: 'Framework' },

    // Backend
    { name: 'Python', category: 'backend', role: 'Core Logic, Scripting & Computational Engine', badge: 'Language' },
    { name: 'Flask', category: 'backend', role: 'Lightweight RESTful Microservices & APIs', badge: 'Framework' },
    { name: 'Node.js', category: 'backend', role: 'High-Concurrency Event-Driven Backend Runtime', badge: 'Runtime' },

    // Database
    { name: 'MySQL', category: 'database', role: 'ACID-Compliant Relational Data Modeling', badge: 'Relational' },
    { name: 'MongoDB', category: 'database', role: 'Flexible JSON Document Storage for Rapid Scale', badge: 'NoSQL' },
    { name: 'SQLite', category: 'database', role: 'Embedded Zero-Config Local & Edge Database', badge: 'Embedded' },

    // AI & ML
    { name: 'Machine Learning', category: 'ai-ml', role: 'Predictive Modeling & Statistical Inference', badge: 'Domain' },
    { name: 'Scikit-learn', category: 'ai-ml', role: 'Supervised & Unsupervised Learning Pipelines', badge: 'Toolkit' },
    { name: 'Python (AI)', category: 'ai-ml', role: 'NumPy, Pandas & PyTorch Integration', badge: 'Core' },

    // Tools & Cloud
    { name: 'GitHub', category: 'tools', role: 'Version Control, Code Review & CI/CD Actions', badge: 'DevOps' },
    { name: 'VS Code', category: 'tools', role: 'Primary Engineering & Debugging Environment', badge: 'Tool' },
    { name: 'Figma', category: 'tools', role: 'UI/UX Wireframing & Design System Tokens', badge: 'Design' },
    { name: 'Streamlit', category: 'tools', role: 'Rapid Data Science & Model Prototyping', badge: 'Prototyping' },
    { name: 'AWS', category: 'cloud', role: 'Scalable Cloud Compute, S3, ECS & CloudFront', badge: 'Cloud' },
    { name: 'Microsoft Azure', category: 'cloud', role: 'Enterprise Cloud Services & Hybrid Hosting', badge: 'Cloud' }
  ];

  const techGrid = document.getElementById('tech-stack-grid');
  const techTabs = document.querySelectorAll('.tech-tab-btn');

  function renderTechStack(filter = 'all') {
    if (!techGrid) return;

    const filtered = filter === 'all'
      ? TECH_ITEMS
      : TECH_ITEMS.filter(t => t.category === filter);

    techGrid.innerHTML = filtered.map(item => `
      <div class="tech-card">
        <div class="tech-card-header">
          <div class="tech-icon-box">
            ${getTechLogoSVG(item.name)}
          </div>
          <span class="tech-badge-tag">${item.badge}</span>
        </div>
        <h4 class="tech-name">${item.name}</h4>
        <p class="tech-role">${item.role}</p>
      </div>
    `).join('');
  }

  function getTechLogoSVG(name) {
    // Precise clean vector representations for each technology
    const svgs = {
      'HTML5': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M5 3l2.5 24.5L16 30l8.5-2.5L27 3H5zm18.3 7H10.7l.4 4h11.8l-.8 8.8L16 24.5l-6-1.7-.3-3.8h3.4l.2 1.8 2.7.7 2.7-.7.4-4H9.9L9 6h14.5l-.2 4z" fill="#F9BE4A"/></svg>`,
      'CSS3': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M5 3l2.5 24.5L16 30l8.5-2.5L27 3H5zm18.1 7.2l-.3 3.8H11.5l.3 3.8h10.7l-.8 8.8L16 28.2l-5.7-1.6-.4-4.2h3.4l.2 2 2.5.7 2.5-.7.3-3.6H9.9L9 6h14.3l-.2 4.2z" fill="#FFD477"/></svg>`,
      'JavaScript': `<svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="4" fill="#F9BE4A"/><path d="M19.5 24.5c-1-.2-1.7-.8-2.2-1.6l2.3-1.4c.3.5.7.8 1.3.8.7 0 1.2-.3 1.2-1.1v-6.7h2.8v6.7c0 2.3-1.4 3.4-3.4 3.4-.7 0-1.4-.1-2-.1zm-8.8 0c-1.8 0-3.1-.9-3.7-2.3l2.4-1.4c.4.8.9 1.3 1.6 1.3.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.6-1.5l-.8-.3c-1.8-.8-2.7-1.8-2.7-3.4 0-1.9 1.5-3.3 3.6-3.3 1.5 0 2.6.5 3.3 1.8l-2.2 1.4c-.3-.6-.6-.9-1.2-.9-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.3l.8.3c2.1.9 3 1.9 3 3.6-.1 2.2-1.7 3.5-3.8 3.5z" fill="#063B30"/></svg>`,
      'React': `<svg viewBox="0 0 32 32" width="28" height="28"><ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#FFD477" stroke-width="1.8" transform="rotate(30 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#F9BE4A" stroke-width="1.8" transform="rotate(90 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#FFD477" stroke-width="1.8" transform="rotate(150 16 16)"/><circle cx="16" cy="16" r="2.5" fill="#FFFFFF"/></svg>`,
      'Python': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M15.8 3c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4v.6H9.2s-2.7.3-2.7 4c0 3.7 2.4 3.5 2.4 3.5h1.4v-2c0-2.3 2-2.2 2-2.2h3.9c1.9 0 1.8-1.8 1.8-1.8V5s.4-2-2.2-2zm-1.8 1.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm1.9 22.8c4.2 0 3.9-1.8 3.9-1.8l-.1-1.9h-4v-.6h6.8s2.7-.3 2.7-4c0-3.7-2.4-3.5-2.4-3.5h-1.4v2c0 2.3-2 2.2-2 2.2h-3.9c-1.9 0-1.8 1.8-1.8 1.8V25s-.4 2 2.2 2zm1.8-1.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#F9BE4A"/></svg>`,
      'Flask': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M14 4h4v3h-4zM15 7h2v6.5l4.8 10.5H10.2L15 13.5V7z" fill="none" stroke="#FFD477" stroke-width="2"/><circle cx="16" cy="22" r="1.5" fill="#F9BE4A"/><circle cx="13" cy="24" r="1.2" fill="#F9BE4A"/><circle cx="19" cy="24" r="1.2" fill="#F9BE4A"/></svg>`,
      'Node.js': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 3l11 6.3v13.4L16 29 5 22.7V9.3L16 3z" fill="none" stroke="#F9BE4A" stroke-width="2"/><path d="M16 11l6 3.5v7L16 25l-6-3.5v-7l6-3.5z" fill="#104638" stroke="#FFD477" stroke-width="1.5"/></svg>`,
      'MySQL': `<svg viewBox="0 0 32 32" width="28" height="28"><ellipse cx="16" cy="8" rx="10" ry="4" fill="none" stroke="#F9BE4A" stroke-width="2"/><path d="M6 8v16c0 2.2 4.5 4 10 4s10-1.8 10-4V8" fill="none" stroke="#F9BE4A" stroke-width="2"/><path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4" fill="none" stroke="#FFD477" stroke-width="1.8"/></svg>`,
      'MongoDB': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 3C16 3 9 10 9 18c0 5 3.5 9 7 11 3.5-2 7-6 7-11 0-8-7-15-7-15z" fill="none" stroke="#FFD477" stroke-width="2"/><path d="M16 3v25" stroke="#F9BE4A" stroke-width="1.8"/></svg>`,
      'SQLite': `<svg viewBox="0 0 32 32" width="28" height="28"><rect x="5" y="6" width="22" height="20" rx="3" fill="none" stroke="#F9BE4A" stroke-width="2"/><path d="M10 12h12M10 16h12M10 20h8" stroke="#FFD477" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'Machine Learning': `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="8" cy="8" r="3" fill="#F9BE4A"/><circle cx="24" cy="8" r="3" fill="#F9BE4A"/><circle cx="8" cy="24" r="3" fill="#F9BE4A"/><circle cx="24" cy="24" r="3" fill="#F9BE4A"/><circle cx="16" cy="16" r="4" fill="#FFD477"/><path d="M8 8l8 8 8-8M8 24l8-8 8 8M8 8v16M24 8v16" stroke="#FFD477" stroke-width="1.4"/></svg>`,
      'Scikit-learn': `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="11" cy="16" r="6" fill="#F9BE4A" opacity="0.85"/><circle cx="21" cy="16" r="6" fill="#FFD477" opacity="0.85"/><path d="M16 11a6 6 0 0 1 0 10 6 6 0 0 1 0-10z" fill="#063B30"/></svg>`,
      'Python (AI)': `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="11" fill="none" stroke="#F9BE4A" stroke-width="2" stroke-dasharray="3,3"/><path d="M12 16h8M16 12v8" stroke="#FFD477" stroke-width="2.2" stroke-linecap="round"/></svg>`,
      'GitHub': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 3C8.8 3 3 8.8 3 16c0 5.7 3.7 10.6 8.9 12.3.7.1.9-.3.9-.6v-2.3c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1.1.1-.8.4-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.4 3.6 1.3 1-.3 2.2-.4 3.3-.4 1.1 0 2.2.1 3.3.4 2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.3 3.2.1 3.5.8.9 1.3 2.1 1.3 3.5 0 5-3 6.1-5.9 6.4.5.4.9 1.2.9 2.5v3.6c0 .4.3.8.9.6C25.3 26.6 29 21.7 29 16c0-7.2-5.8-13-13-13z" fill="#FFD477"/></svg>`,
      'VS Code': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M23 3l6 3v20l-6 3-13-10L4 23l-2-1V10l2-1 6 4 13-10zm-6 13l6-5v10l-6-5z" fill="none" stroke="#F9BE4A" stroke-width="2" stroke-linejoin="round"/></svg>`,
      'Figma': `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="11" cy="7" r="4" fill="#FFD477"/><circle cx="19" cy="7" r="4" fill="#F9BE4A"/><circle cx="11" cy="15" r="4" fill="#F9BE4A"/><circle cx="19" cy="15" r="4" fill="#FFD477"/><circle cx="11" cy="23" r="4" fill="#FFD477"/></svg>`,
      'Streamlit': `<svg viewBox="0 0 32 32" width="28" height="28"><polygon points="16,5 26,23 6,23" fill="none" stroke="#FFD477" stroke-width="2.5"/><polygon points="16,11 22,21 10,21" fill="#F9BE4A"/></svg>`,
      'AWS': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M8 17l4-9h2.5l4 9h-2.3l-.8-2h-4.3l-.8 2H8zm4-3.8h3l-1.5-3.8-1.5 3.8z" fill="#F9BE4A"/><path d="M6 21c7 4 13 4 20 0" fill="none" stroke="#FFD477" stroke-width="2" stroke-linecap="round"/><polygon points="26,20 27,23 23,22" fill="#FFD477"/></svg>`,
      'Microsoft Azure': `<svg viewBox="0 0 32 32" width="28" height="28"><polygon points="6,25 15,6 20,16 11,25" fill="#F9BE4A"/><polygon points="14,25 22,12 26,25" fill="#FFD477"/></svg>`
    };

    return svgs[name] || `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="10" fill="none" stroke="#F9BE4A" stroke-width="2"/><text x="16" y="20" font-size="12" text-anchor="middle" fill="#FFD477">✦</text></svg>`;
  }

  if (techTabs.length > 0) {
    techTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        techTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-tech-filter') || 'all';
        renderTechStack(filter);
      });
    });
  }

  renderTechStack('all');

  // 6. BACK TO TOP BUTTON WITH CIRCULAR PROGRESS
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('scroll-progress-circle');

  function handleScrollProgress() {
    if (!backToTopBtn) return;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    if (progressCircle && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      const circumference = 2 * Math.PI * 18; // r = 18
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

})();

