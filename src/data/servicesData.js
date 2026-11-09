export const SERVICES_DATA = {
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
