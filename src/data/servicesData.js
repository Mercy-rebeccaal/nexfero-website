/**
 * NexFero Innovations - Official Services Data
 * Covers the 7 core offerings from the master specification.
 */

export const SERVICES_DATA = {
  'website-design-dev': {
    key: 'website-design-dev',
    title: 'Website Design and Development',
    badge: 'Core Specialty',
    tagline: 'High-Impact, Fast, Responsive Websites Built with Cutting-Edge Standards',
    description: 'We design and engineer bespoke web experiences that merge contemporary aesthetics with lightning-fast performance, accessibility, and high conversion structures.',
    capabilities: [
      'Custom Responsive Web Design',
      'Interactive Micro-Animations & 3D Elements',
      'Search Engine Optimization (SEO) & Performance Tuning',
      'Cross-Browser & Multi-Device Optimization'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Figma', 'SEO'],
    deliverables: [
      'Production-ready, minified and optimized web code',
      'Mobile-first responsive layouts across all viewports',
      'Structured Schema.org markup & meta tags'
    ],
    visualType: 'web-design',
    order: 1
  },
  'full-stack-dev': {
    key: 'full-stack-dev',
    title: 'Full Stack Development',
    badge: 'Enterprise Architecture',
    tagline: 'Seamlessly Integrated Frontends, Resilient APIs, and Scalable Databases',
    description: 'End-to-end full stack software engineering. We develop scalable client-facing interfaces tightly coupled with robust server-side business logic and high-throughput data layers.',
    capabilities: [
      'Modern Single Page Applications (SPAs)',
      'RESTful & GraphQL API Engineering',
      'Authentication, Authorization & Role-Based Access',
      'Database Modeling & Transaction Management'
    ],
    technologies: ['React', 'Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'MySQL'],
    deliverables: [
      'Complete full-stack repository with API contracts',
      'Relational or document schema migrations',
      'Secure token-based auth workflows'
    ],
    visualType: 'full-stack',
    order: 2
  },
  'software-app-dev': {
    key: 'software-app-dev',
    title: 'Software Application Development',
    badge: 'Custom Engineering',
    tagline: 'Tailored Software Solutions Built for Reliability and High Concurrency',
    description: 'We develop custom software architectures that address complex operational requirements, automating internal workflows and eliminating business bottlenecks.',
    capabilities: [
      'Custom Enterprise Software Systems',
      'Multi-Tier Client-Server Architecture',
      'Automated Data Processing Pipelines',
      'Legacy System Modernization & Upgrades'
    ],
    technologies: ['Java', 'Spring Boot', 'Python', 'Flask', 'C#', 'SQL'],
    deliverables: [
      'Modular, extensible source code with documentation',
      'Unit and integration test suites',
      'Operational runbooks and deployment guides'
    ],
    visualType: 'software-app',
    order: 3
  },
  'ai-ml-solutions': {
    key: 'ai-ml-solutions',
    title: 'AI and Machine Learning Solutions',
    badge: 'Intelligent Systems',
    tagline: 'Transforming Data into Predictive Intelligence and Cognitive Automation',
    description: 'We architect and deploy practical machine learning models and generative AI systems that deliver measurable business advantages, from predictive analytics to intelligent automation.',
    capabilities: [
      'Supervised & Unsupervised Machine Learning Models',
      'Generative AI & LLM Workflow Integration',
      'Time-Series Forecasting & Anomaly Detection',
      'Interactive Data Dashboards & Visualizations'
    ],
    technologies: ['Python', 'Machine Learning', 'Random Forest', 'Streamlit', 'Scikit-learn', 'Generative AI'],
    deliverables: [
      'Trained and evaluated ML pipeline scripts',
      'Interactive Streamlit / React analytical interfaces',
      'Model validation telemetry and accuracy benchmarks'
    ],
    visualType: 'ai-brain',
    order: 4
  },
  'database-management': {
    key: 'database-management',
    title: 'Database Management',
    badge: 'Data Integrity',
    tagline: 'Optimized Data Storage, ACID Transactions, and High-Throughput Queries',
    description: 'Designing resilient database architectures that maintain strict consistency, prevent concurrency conflicts, and execute sub-millisecond queries under peak loads.',
    capabilities: [
      'Relational Schema Design (MySQL, PostgreSQL, SQLite)',
      'NoSQL Document Databases (MongoDB)',
      'Transaction Integrity & Concurrency Control',
      'Query Optimization, Indexing & Backup Automation'
    ],
    technologies: ['MySQL', 'MongoDB', 'SQLite', 'PostgreSQL', 'SQL Optimization'],
    deliverables: [
      'Normalized schema definitions and migration scripts',
      'Optimized indexing and performance profiling reports',
      'Automated backup and disaster recovery plans'
    ],
    visualType: 'database-disk',
    order: 5
  },
  'automation-smart-tech': {
    key: 'automation-smart-tech',
    title: 'Automation and Smart Technology Solutions',
    badge: 'Emerging Tech',
    tagline: 'Bridging Hardware, Sensors, Embedded Systems, and Smart Automations',
    description: 'From assistive IoT devices with sensor arrays to computer vision navigation systems, we develop smart connected technologies that solve tactile, real-world problems.',
    capabilities: [
      'Smart Sensor & Camera Integration',
      'Embedded Hardware Layout Architecture',
      'Real-Time Audio / Voice Telemetry Feedback',
      'Automated Hardware-Software Communication Protocols'
    ],
    technologies: ['Embedded Hardware', 'Sensors', 'Camera Systems', 'IoT', 'Python', 'C#'],
    deliverables: [
      'Hardware communication driver architectures',
      'Sensor telemetry processing firmware scripts',
      'Prototype simulation testing benchmarks'
    ],
    visualType: 'smart-tech',
    order: 6
  },
  'custom-digital-projects': {
    key: 'custom-digital-projects',
    title: 'Custom Digital Projects',
    badge: 'Innovation Lab',
    tagline: 'Experimental Prototypes, XR/VR Experiences, and Specialized Software',
    description: 'Have a non-standard product idea? Our innovation team brings unique technical concepts to life, including VR simulations, specialized portals, and bespoke web experiments.',
    capabilities: [
      'Virtual Reality (VR) & Augmented Reality (XR) Platforms',
      'Interactive 3D Simulations in Unity',
      'Custom Niche Web Applications & Portals',
      'Rapid Technical Proof-of-Concept Prototyping'
    ],
    technologies: ['Unity', 'C#', 'VR', 'XR', 'WebGL', 'Modern Web APIs'],
    deliverables: [
      'Interactive 3D / XR simulation builds',
      'Complete proof-of-concept prototype source code',
      'Technical architecture evaluation documentation'
    ],
    visualType: 'custom-crystal',
    order: 7
  }
};
