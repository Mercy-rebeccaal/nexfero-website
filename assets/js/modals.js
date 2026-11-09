/**
 * NexFero Innovations - Accessible Dialog Modals & Interactive Previews
 * 
 * Complies with modern web standards:
 * - Uses native <dialog> element with showModal() and close()
 * - Light dismiss (click on backdrop closes modal)
 * - Restores focus to trigger element on close
 * - Traps focus natively
 * - Prevents background page scrolling while modal is open
 */

(function () {
  'use strict';

  // Service Deep-Dive Details Data
  const SERVICE_DETAILS = {
    'ai-ml': {
      title: 'Artificial Intelligence & Machine Learning',
      badge: 'Core Competency',
      tagline: 'Engineering Intelligent, Context-Aware Systems That Accelerate Business Growth',
      description: 'At NexFero Innovations, our AI & Machine Learning team builds high-accuracy, reliable machine intelligence architectures designed for enterprise deployment. Rather than treating AI as a novelty, we engineer practical models that directly automate manual workloads, extract actionable intelligence from unstructured data, and forecast trends with high statistical confidence.',
      capabilities: [
        {
          title: 'AI-Powered Applications',
          desc: 'Developing conversational interfaces, contextual copilot systems, and automated task assistants tailored to your industry workflows.'
        },
        {
          title: 'Machine Learning Solutions',
          desc: 'End-to-end ML pipelines including automated data preprocessing, feature engineering, model training, and continuous drift monitoring.'
        },
        {
          title: 'Intelligent Automation',
          desc: 'Automating multi-step knowledge work, document parsing, visual inspection, and high-frequency business logic with AI verification.'
        },
        {
          title: 'Predictive Analytics',
          desc: 'Time-series forecasting, customer lifetime value modeling, churn risk prediction, and demand elasticity simulation.'
        }
      ],
      technologies: ['Python', 'Scikit-learn', 'PyTorch', 'FastAPI', 'Pandas', 'NumPy', 'Docker'],
      deliverables: [
        'Custom-trained or fine-tuned ML models with API endpoints',
        'Interactive analytics dashboard for real-time model telemetry',
        'Deterministic validation test suites and accuracy metrics',
        'Comprehensive documentation and deployment playbooks'
      ]
    },
    'web-dev': {
      title: 'Web Development',
      badge: 'High Performance',
      tagline: 'Fast, Accessible, Scalable Web Applications Built for Modern Demands',
      description: 'We craft high-performance web applications that combine aesthetic elegance with technical precision. Using modern JavaScript/React, semantic HTML5, and clean CSS, our web solutions achieve lightning-fast loading speeds, frictionless user experiences, and rock-solid architectural foundations ready to scale to millions of requests.',
      capabilities: [
        {
          title: 'Business Websites',
          desc: 'Conversion-engineered startup websites and corporate portals with strong visual identity, SEO readiness, and responsive brilliance.'
        },
        {
          title: 'Custom Web Applications',
          desc: 'Complex single-page applications (SPAs), SaaS dashboards, internal tooling, and client portals built with modern component architectures.'
        },
        {
          title: 'Full-Stack Development',
          desc: 'Seamless integration of frontend interfaces with robust backend APIs, relational and NoSQL databases, and third-party services.'
        },
        {
          title: 'Responsive Interfaces',
          desc: 'Flawless visual rendering and touch interactivity across smartphones, tablets, laptops, and ultra-wide desktop monitors.'
        }
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Flask', 'MySQL', 'MongoDB'],
      deliverables: [
        'Production-ready, minified, optimized web application source code',
        'Lighthouse 95+ score compliance across Performance, SEO, and Accessibility',
        'Secure RESTful API integration and automated error logging',
        'Cross-browser and multi-device automated testing report'
      ]
    },
    'mobile-dev': {
      title: 'Mobile Application Development',
      badge: 'Native & Cross-Platform',
      tagline: 'Delivering Intuitive Mobile Experiences into the Palms of Your Users',
      description: 'NexFero develops high-performance mobile applications that provide buttery-smooth 60fps animations, intuitive navigation flows, and deep native hardware integrations. Whether you need an Android app, an iOS release, or an agile cross-platform solution, we build apps users love to engage with daily.',
      capabilities: [
        {
          title: 'Android Applications',
          desc: 'Engineered specifically for the Android ecosystem following Material You guidelines, hardware sensor APIs, and Google Play policies.'
        },
        {
          title: 'iOS Application Development',
          desc: 'Pixel-perfect interfaces adhering to Apple Human Interface Guidelines with smooth tactile interactions and secure Keychain auth.'
        },
        {
          title: 'Cross-Platform Solutions',
          desc: 'Unified codebases leveraging cutting-edge hybrid technologies that cut time-to-market in half while maintaining near-native performance.'
        },
        {
          title: 'Offline-First Architectures',
          desc: 'Resilient local database synchronization ensuring users can browse, draft, and work even during intermittent connectivity.'
        }
      ],
      technologies: ['React Native', 'Kotlin', 'Swift', 'Node.js', 'Firebase', 'SQLite'],
      deliverables: [
        'Compiled binaries ready for Google Play Store and Apple App Store deployment',
        'Secure push notification backend integration',
        'Local encrypted SQLite / Realm database schema',
        'Performance profiling and memory leak audit log'
      ]
    },
    'ui-ux': {
      title: 'UI/UX Design',
      badge: 'Human-Centered',
      tagline: 'Bridging Technological Complexity with Intuitive, Inspiring Aesthetics',
      description: 'Great technology falls flat without an intuitive interface. NexFero’s design methodology unites cognitive ergonomics, brand storytelling, and modern design systems. We transform complex workflows into simple, elegant digital journeys that inspire trust and drive conversions.',
      capabilities: [
        {
          title: 'User Interface Design',
          desc: 'Futuristic yet clean visual interfaces, bespoke design tokens, harmonious emerald-and-gold palettes, and balanced typography.'
        },
        {
          title: 'User Experience Research',
          desc: 'User journey mapping, information architecture wireframing, cognitive load reduction, and usability friction identification.'
        },
        {
          title: 'Interactive Prototyping',
          desc: 'Clickable high-fidelity micro-interactions and transitions to validate user flows before writing a single line of production code.'
        },
        {
          title: 'Figma-Based Design Systems',
          desc: 'Scalable, tokenized UI component libraries with auto-layout, dark/light variants, and comprehensive developer handoff specs.'
        }
      ],
      technologies: ['Figma', 'Design Tokens', 'CSS Variables', 'Micro-Interactions', 'WCAG AA Audit'],
      deliverables: [
        'Complete Figma design workspace with atomic component library',
        'High-fidelity interactive prototype for stakeholder alignment',
        'Design tokens export (CSS custom properties, JSON format)',
        'Accessibility audit certifying WCAG 2.1 AA color contrast compliance'
      ]
    },
    'cloud': {
      title: 'Cloud Solutions',
      badge: 'Resilient Infrastructure',
      tagline: 'Scalable, Cost-Optimized Cloud Architectures Designed for Zero Downtime',
      description: 'Modern enterprises cannot afford fragile servers. NexFero designs, migrates, and manages resilient cloud ecosystems. By leveraging microservices, automated infrastructure-as-code, and serverless compute, we ensure your digital products handle massive traffic surges effortlessly.',
      capabilities: [
        {
          title: 'Cloud Deployment',
          desc: 'Automated CI/CD pipelines deploying containerized workloads to AWS, Azure, Netlify, and Vercel with zero-downtime rollouts.'
        },
        {
          title: 'Cloud Infrastructure',
          desc: 'Virtual Private Clouds (VPC), automated load balancing, DDoS mitigation, multi-zone database clusters, and secure secret vaults.'
        },
        {
          title: 'Application Hosting',
          desc: 'High-availability container orchestration, edge computing distributions, SSL/TLS automation, and CDN asset caching.'
        },
        {
          title: 'Scalable Architecture',
          desc: 'Decoupled event-driven message brokers, caching tiers with Redis, and horizontally auto-scaling application tiers.'
        }
      ],
      technologies: ['AWS', 'Microsoft Azure', 'Docker', 'NGINX', 'GitHub Actions', 'Linux'],
      deliverables: [
        'Infrastructure-as-Code scripts and Dockerfiles',
        'Automated CI/CD GitHub Actions workflows with test and deploy gates',
        'Cloud security hardening report and role-based IAM policies',
        'Real-time uptime monitoring and alerting dashboard setup'
      ]
    },
    'digital-marketing': {
      title: 'Digital Marketing & Growth',
      badge: 'Data-Driven Reach',
      tagline: 'Amplifying Your Brand Visibility and Converting Engaged Visitors into Partners',
      description: 'Building exceptional digital solutions is only half the journey; the world needs to discover them. NexFero provides data-driven digital branding, technical search engine optimization, and strategic content roadmaps that position your technology startup as an industry authority.',
      capabilities: [
        {
          title: 'Digital Branding',
          desc: 'Crafting cohesive brand identities, authoritative tone-of-voice guidelines, and futuristic digital asset kits that resonate with tech clients.'
        },
        {
          title: 'Social Media Presence',
          desc: 'Curated technical thought-leadership content, visual carousels, and community engagement strategies across LinkedIn, X, and Instagram.'
        },
        {
          title: 'Search Engine Optimization (SEO)',
          desc: 'Technical SEO audits, semantic Schema.org markup, Core Web Vitals optimization, keyword architecture, and search visibility prep.'
        },
        {
          title: 'Online Growth Strategies',
          desc: 'Data analytics instrumentation, conversion funnel tracking, A/B testing frameworks, and inbound lead magnet architecture.'
        }
      ],
      technologies: ['Google Search Console', 'Schema.org', 'Core Web Vitals', 'Open Graph', 'Analytics'],
      deliverables: [
        'Comprehensive technical SEO architecture report',
        'Brand asset guideline book with social media templates',
        'Structured Schema.org JSON-LD integration across all pages',
        'Competitor search visibility and keyword positioning audit'
      ]
    }
  };

  // DOM Elements
  const projectModal = document.getElementById('project-modal');
  const serviceModal = document.getElementById('service-modal');
  const adminModal = document.getElementById('admin-modal');

  let lastActiveElement = null;

  function openDialog(dialog) {
    if (!dialog) return;
    lastActiveElement = document.activeElement;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.classList.add('dialog-open');
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    document.body.classList.remove('dialog-open');
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Setup Light Dismiss & Close Buttons for all <dialog> elements
  document.querySelectorAll('dialog').forEach(dialog => {
    // Backdrop click
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDialog(dialog);
      }
    });

    // Close button inside dialog
    const closeBtn = dialog.querySelector('.dialog-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeDialog(dialog));
    }
  });

  // Open Service Modal
  window.openServiceModal = function (serviceKey) {
    const data = SERVICE_DETAILS[serviceKey];
    if (!data || !serviceModal) return;

    const titleEl = serviceModal.querySelector('#service-modal-title');
    const badgeEl = serviceModal.querySelector('#service-modal-badge');
    const taglineEl = serviceModal.querySelector('#service-modal-tagline');
    const descEl = serviceModal.querySelector('#service-modal-desc');
    const capListEl = serviceModal.querySelector('#service-modal-capabilities');
    const techListEl = serviceModal.querySelector('#service-modal-tech');
    const delivListEl = serviceModal.querySelector('#service-modal-deliverables');

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (taglineEl) taglineEl.textContent = data.tagline;
    if (descEl) descEl.textContent = data.description;

    if (capListEl) {
      capListEl.innerHTML = data.capabilities.map(c => `
        <div class="modal-capability-item">
          <div class="modal-cap-icon">✦</div>
          <div>
            <h4>${c.title}</h4>
            <p>${c.desc}</p>
          </div>
        </div>
      `).join('');
    }

    if (techListEl) {
      techListEl.innerHTML = data.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('');
    }

    if (delivListEl) {
      delivListEl.innerHTML = data.deliverables.map(d => `<li><span class="gold-check">✓</span> ${d}</li>`).join('');
    }

    // Set CTA intent
    const ctaBtn = serviceModal.querySelector('#service-modal-cta');
    if (ctaBtn) {
      ctaBtn.onclick = () => {
        closeDialog(serviceModal);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const serviceSelect = document.getElementById('service-select');
          if (serviceSelect) {
            const valMap = {
              'ai-ml': 'AI & Machine Learning',
              'web-dev': 'Web Development',
              'mobile-dev': 'Mobile App Development',
              'ui-ux': 'UI/UX Design',
              'cloud': 'Cloud Solutions',
              'digital-marketing': 'Digital Marketing'
            };
            serviceSelect.value = valMap[serviceKey] || 'Other';
          }
        }
      };
    }

    openDialog(serviceModal);
  };

  // Open Project Modal
  window.openProjectModal = function (projectId) {
    if (!window.NEXFERO_PROJECTS || !projectModal) return;
    const project = window.NEXFERO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    const titleEl = projectModal.querySelector('#project-modal-title');
    const badgeEl = projectModal.querySelector('#project-modal-badge');
    const tagEl = projectModal.querySelector('#project-modal-category');
    const descEl = projectModal.querySelector('#project-modal-desc');
    const fullDescEl = projectModal.querySelector('#project-modal-fulldesc');
    const metricsEl = projectModal.querySelector('#project-modal-metrics');
    const featuresEl = projectModal.querySelector('#project-modal-features');
    const techEl = projectModal.querySelector('#project-modal-tech');
    const noticeEl = projectModal.querySelector('#project-modal-notice');

    if (titleEl) titleEl.textContent = project.title;
    if (badgeEl) badgeEl.textContent = project.badge;
    if (tagEl) tagEl.textContent = project.category;
    if (descEl) descEl.textContent = project.tagline;
    if (fullDescEl) fullDescEl.textContent = project.fullDescription;

    if (noticeEl) {
      noticeEl.innerHTML = `
        <div class="prototype-notice-box">
          <span class="notice-icon">ℹ</span>
          <span><strong>Engineering Showcase:</strong> This project represents a proprietary architecture and research prototype created by the NexFero Innovations team to demonstrate real-world system capability.</span>
        </div>
      `;
    }

    if (metricsEl) {
      metricsEl.innerHTML = project.metrics.map(m => `
        <div class="modal-metric-card">
          <span class="metric-val">${m.value}</span>
          <span class="metric-label">${m.label}</span>
        </div>
      `).join('');
    }

    if (featuresEl) {
      featuresEl.innerHTML = project.features.map(f => `<li><span class="gold-check">✦</span> ${f}</li>`).join('');
    }

    if (techEl) {
      techEl.innerHTML = project.tags.map(t => `<span class="tech-pill">${t}</span>`).join('');
    }

    const ctaBtn = projectModal.querySelector('#project-modal-cta');
    if (ctaBtn) {
      ctaBtn.onclick = () => {
        closeDialog(projectModal);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const msgInput = document.getElementById('contact-message');
          if (msgInput) {
            msgInput.value = `Hello NexFero team, I am interested in discussing your work on ${project.title} (${project.category}) for our upcoming project.`;
          }
        }
      };
    }

    openDialog(projectModal);
  };

  // Close helper
  window.closeModal = function (modalId) {
    const dialog = document.getElementById(modalId);
    if (dialog) closeDialog(dialog);
  };

})();

