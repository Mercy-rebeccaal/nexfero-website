export const PROJECTS_DATA = [
  {
    id: 'cogniflow-ai',
    title: 'CogniFlow AI',
    category: 'Artificial Intelligence',
    tagline: 'Autonomous Multi-Agent Workflow & NLP Engine',
    description: 'An enterprise-grade cognitive orchestrator that coordinates specialized AI sub-agents to analyze unstructured documentation, synthesize action plans, and automate multi-step business decisions.',
    fullDescription: 'CogniFlow AI is an advanced proof-of-concept exploring deterministic guardrails around probabilistic large language models. Built for enterprises managing heavy operational workflows, it implements contextual memory retrieval, dynamic task decomposition, and verifiable audit trails.',
    badge: 'AI Prototype',
    tags: ['Python', 'PyTorch', 'FastAPI', 'React', 'Vector DB'],
    metrics: [
      { label: 'Latency', value: '< 240ms' },
      { label: 'Agent Types', value: '8 Specialized' },
      { label: 'Architecture', value: 'Event-Driven' }
    ],
    features: [
      'Dynamic multi-agent routing with contextual handoffs',
      'Retrieval-Augmented Generation (RAG) with semantic re-ranking',
      'Deterministic safety evaluation and hallucination scoring',
      'Streaming responses with granular token introspection'
    ],
    techDetails: {
      frontend: 'React, Tailwind CSS, WebSockets',
      backend: 'Python 3.11, FastAPI, Celery',
      ai: 'HuggingFace Transformers, LangChain, FAISS',
      cloud: 'Docker containers, AWS ECS'
    }
  },
  {
    id: 'novacloud-erp',
    title: 'NovaCloud ERP',
    category: 'Web Applications',
    tagline: 'High-Throughput Cloud Resource & Analytics Suite',
    description: 'A modern, modular enterprise platform unifying real-time inventory telemetry, multi-entity financial ledgers, and team coordination in a single responsive dashboard.',
    fullDescription: 'NovaCloud ERP demonstrates our full-stack web engineering capability. Designed to replace sluggish legacy ERP systems, it utilizes server-driven UI elements, optimistic updates, and offline-first data synchronization.',
    badge: 'Full-Stack System',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'Throughput', value: '10k+ req/sec' },
      { label: 'Sync Engine', value: 'CRDT / Delta' },
      { label: 'UI Response', value: 'Instantaneous' }
    ],
    features: [
      'Sub-second executive analytics and chart rendering',
      'Granular role-based access control (RBAC) with audit logs',
      'Automated invoice reconciliation and tax calculation engine',
      'Responsive layout optimized for desktops, tablets, and phones'
    ],
    techDetails: {
      frontend: 'React, Vite, Chart.js',
      backend: 'Node.js, Express, Knex.js',
      database: 'PostgreSQL with connection pooling',
      devops: 'Docker, GitHub Actions, NGINX'
    }
  },
  {
    id: 'sentinx-security',
    title: 'SentinX Zero-Trust',
    category: 'Security Solutions',
    tagline: 'Continuous Device Posture & Threat Monitor',
    description: 'An adaptive security framework providing behavioral anomaly detection, micro-segmentation enforcement, and continuous identity verification across distributed environments.',
    fullDescription: 'SentinX was conceived to address modern perimeter-less enterprise landscapes. It continually assesses device health, connection hygiene, and behavioral patterns to dynamically adjust network authorization levels.',
    badge: 'Cybersecurity Architecture',
    tags: ['Python', 'Machine Learning', 'WebSockets', 'Flask', 'SQLite'],
    metrics: [
      { label: 'Detection Speed', value: 'Real-Time' },
      { label: 'False Positives', value: '< 0.4%' },
      { label: 'Security Level', value: 'Zero-Trust' }
    ],
    features: [
      'Continuous behavioral heuristic scoring via machine learning',
      'Automated lateral movement quarantine triggers',
      'Low-footprint endpoint telemetry agent',
      'Interactive SOC (Security Operations Center) visual map'
    ],
    techDetails: {
      core: 'Python, Scikit-learn, NumPy',
      telemetry: 'WebSockets, gRPC streams',
      storage: 'Time-series SQLite database',
      frontend: 'Lightweight responsive canvas dashboard'
    }
  },
  {
    id: 'predictr-ml',
    title: 'Predictr ML',
    category: 'Machine Learning',
    tagline: 'Time-Series Demand & Anomaly Forecasting',
    description: 'A machine learning pipeline designed to forecast inventory swings, customer demand spikes, and macroeconomic trends with statistical confidence intervals.',
    fullDescription: 'Predictr ML combines classical statistical models with modern deep learning transformers to provide actionable predictive intelligence for supply chain and retail decision makers.',
    badge: 'ML Pipeline',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'NumPy'],
    metrics: [
      { label: 'Forecast Horizon', value: '90 Days' },
      { label: 'Confidence', value: '95% Interval' },
      { label: 'Training Time', value: 'Optimized' }
    ],
    features: [
      'Automated feature extraction and seasonality decomposition',
      'Dynamic hyperparameter tuning with Bayesian optimization',
      'Interactive sensitivity simulation sliders in real time',
      'Exportable forecast reports in JSON, CSV, and visual formats'
    ],
    techDetails: {
      mlStack: 'Python, Scikit-learn, XGBoost, Prophet',
      processing: 'Pandas, Polars, NumPy',
      interface: 'Streamlit & React embedding',
      deployment: 'FastAPI inference microservice'
    }
  },
  {
    id: 'nexpulse-health',
    title: 'NexPulse Platform',
    category: 'Digital Platforms',
    tagline: 'Smart Telehealth Consultation & Intelligent Triage',
    description: 'A resilient digital health platform featuring smart preliminary triage, secure WebRTC audio/video consultations, and encrypted health records management.',
    fullDescription: 'NexPulse highlights our ability to build mission-critical, high-compliance digital platforms. It combines user-friendly booking workflows with AI-assisted symptom summaries to streamline clinician reviews.',
    badge: 'Platform Engineering',
    tags: ['WebRTC', 'React', 'Node.js', 'MongoDB', 'Socket.io'],
    metrics: [
      { label: 'Video Latency', value: '< 120ms' },
      { label: 'Encryption', value: 'End-to-End' },
      { label: 'Uptime Goal', value: '99.99%' }
    ],
    features: [
      'Peer-to-peer encrypted HD video and crisp audio calling',
      'Structured clinical symptom questionnaire with triage flags',
      'Automated reminder dispatch via SMS and Email channels',
      'Responsive accessibility compliance (WCAG AA)'
    ],
    techDetails: {
      realtime: 'WebRTC mesh, Socket.io signaling',
      frontend: 'React, CSS Grid, Accessible ARIA',
      backend: 'Node.js, Express microservices',
      database: 'Encrypted MongoDB database cluster'
    }
  },
  {
    id: 'auracommerce-3d',
    title: 'AuraCommerce 3D',
    category: 'Web Applications',
    tagline: 'Next-Generation Immersive WebGL E-Commerce Storefront',
    description: 'An ultra-performant headless retail experience showcasing real-time 3D product customization, spatial lighting, and lightning-fast checkout transitions.',
    fullDescription: 'AuraCommerce illustrates how cutting-edge 3D graphics on the web can boost customer engagement without sacrificing page load speeds or mobile responsiveness.',
    badge: 'Interactive 3D Web',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'WebGL', 'Node.js'],
    metrics: [
      { label: 'LCP Score', value: '1.1s' },
      { label: 'Frame Rate', value: 'Smooth 60 FPS' },
      { label: 'Mobile Support', value: 'Touch-Optimized' }
    ],
    features: [
      'Hardware-accelerated 3D product view with 360-degree rotation',
      'Material and color swapper with realistic surface reflections',
      'Micro-interactions with haptic and audio feedback options',
      'Progressive asset loading with graceful 2D fallbacks'
    ],
    techDetails: {
      graphics: 'HTML5 Canvas, WebGL, glTF asset pipeline',
      frontend: 'Vanilla JavaScript ES6+, Modern CSS3',
      cart: 'Client-side state management with indexedDB caching',
      backend: 'RESTful Node.js API with MySQL database'
    }
  }
];
