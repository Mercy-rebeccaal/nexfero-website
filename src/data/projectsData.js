/**
 * NexFero Innovations - Official Project Portfolio Data
 * Strictly maintains the 7 genuine projects from the master specification.
 */

export const PROJECTS_DATA = [
  {
    id: 'smart-learning-environment',
    title: 'Smart Learning Environment',
    category: 'VR & Education',
    tagline: 'VR-Based Learning Platform with Interactive 3D Simulations',
    shortDescription: 'Built a VR-based learning platform with interactive 3D simulations and virtual labs to simplify complex science concepts.',
    fullDescription: 'Built a VR-based learning platform with interactive 3D simulations and virtual labs to simplify complex science concepts. Implemented using Unity, C#, and XR tools to enhance engagement and practical understanding.',
    technologies: ['Unity', 'C#', 'VR', 'XR'],
    visualType: 'vr-classroom',
    visualDesc: 'Virtual classroom with interactive floating 3D science objects',
    order: 1
  },
  {
    id: 'atlas-assistive-tech',
    title: 'ATLAS – An Assistive Technology for Visually Impaired',
    category: 'Assistive AI & IoT',
    tagline: 'AI-Enabled Smart Navigation Cane with 360° Vision',
    shortDescription: 'R&D project involving an AI-enabled smart cane with a 360° camera and obstacle sensors, providing real-time voice guidance for safer navigation.',
    fullDescription: 'R&D project involving an AI-enabled smart cane with a 360° camera and obstacle sensors, providing real-time voice guidance for safer navigation. Designed the system architecture and hardware layout for easy and reliable use.',
    technologies: ['Artificial Intelligence', 'Camera Systems', 'Sensors', 'Embedded Hardware'],
    visualType: 'smart-cane',
    visualDesc: 'Smart navigation cane with sensors and 360° camera',
    order: 2
  },
  {
    id: 'traffic-signal-optimization',
    title: 'Traffic Signal Timing Optimization',
    category: 'Machine Learning',
    tagline: 'Predictive Traffic Signal Timings Using Random Forest',
    shortDescription: 'Built a Random Forest model to predict optimal traffic signal timings using real-world traffic data.',
    fullDescription: 'Built a Random Forest model to predict optimal traffic signal timings using real-world traffic data. Deployed a Streamlit dashboard to visualize predictions and assist congestion reduction.',
    technologies: ['Python', 'Random Forest', 'Machine Learning', 'Streamlit'],
    visualType: 'traffic-signals',
    visualDesc: 'Smart traffic signal with connected roads and data visualization',
    order: 3
  },
  {
    id: 'event-management-portal',
    title: 'Event Management and Registration Portal',
    category: 'Full-Stack Web',
    tagline: 'Spring Boot Event Portal with Automated Seat Concurrency',
    shortDescription: 'A web-based application developed using Java and Spring Boot. Allows users to register for events while preventing overbooking by checking seat availability.',
    fullDescription: 'A web-based application developed using Java and Spring Boot. Allows users to register for events while preventing overbooking by checking seat availability. The system ensures data consistency and avoids data loss using database transactions.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS'],
    visualType: 'event-stage',
    visualDesc: 'Modern event stage with registration interface',
    order: 4
  },
  {
    id: 'ai-resume-generator',
    title: 'AI Resume & Cover Letter Generator',
    category: 'Generative AI',
    tagline: 'Generative AI-Powered ATS-Friendly Career Document Generator',
    shortDescription: 'Developed an AI-powered application using Python, Streamlit, and Generative AI to create professional resumes and cover letters.',
    fullDescription: 'Developed an AI-powered application using Python, Streamlit, and Generative AI to create professional resumes and cover letters. The application generates personalized content based on user input through a simple interface. It helps users quickly create well-structured and ATS-friendly resumes and cover letters.',
    technologies: ['Python', 'Streamlit', 'Generative AI'],
    visualType: 'ai-resume',
    visualDesc: 'Floating AI-generated resume document with smart AI elements',
    order: 5
  },
  {
    id: 'blood-donation-system',
    title: 'Blood Donation Management System',
    category: 'Healthcare Systems',
    tagline: 'Dynamic MVC Blood Group Matching and Donor Platform',
    shortDescription: 'Developed a dynamic Blood Donation Management System using Java, JSP, and Servlets deployed on Apache Tomcat.',
    fullDescription: 'Developed a dynamic Blood Donation Management System using Java, JSP, and Servlets deployed on Apache Tomcat. The application enables donor registration, city-based blood group search, and real-time result display using XML-based data storage. Implemented MVC architecture with server-side validation and request handling.',
    technologies: ['Java', 'JSP', 'Servlets', 'Apache Tomcat', 'XML'],
    visualType: 'blood-donation',
    visualDesc: 'Blood donation symbol with a digital healthcare interface',
    order: 6
  },
  {
    id: 'learning-management-system',
    title: 'Learning Management System (LMS)',
    category: 'Web Platforms',
    tagline: 'Modular Enterprise Academic Portal & Course Management',
    shortDescription: 'Developed a web-based LMS using Java Servlets and JSP deployed on Apache Tomcat with authentication and course modules.',
    fullDescription: 'Developed a web-based LMS using Java Servlets and JSP deployed on Apache Tomcat. Implemented user authentication, session management, course listing, assignment viewing, and profile modules with structured navigation and responsive UI.',
    technologies: ['Java', 'JSP', 'Servlets', 'Apache Tomcat', 'HTML', 'CSS'],
    visualType: 'lms-books',
    visualDesc: 'Floating digital books, learning dashboard and graduation cap',
    order: 7
  }
];
