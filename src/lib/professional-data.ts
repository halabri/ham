import {
  ProfessionalProfile,
  PersonalInformation,
  ProfessionalSummary,
  SkillsData,
  WorkExperience,
  EducationData,
  ContactInformation,
} from '@/types/professional';

// Personal Information
export const personalInfo: PersonalInformation = {
  fullName: "Ham (Hisham Alabri)",
  title: "Senior Software Engineer",
  tagline: "Java - Spring Boot - React",
};

// Professional Summary
export const professionalSummary: ProfessionalSummary = {
  overview: "Software engineer with 12+ years of experience designing and delivering enterprise-grade applications across healthcare, aviation, and public services. Strong expertise in Java, Spring Boot, React, with proven leadership as a technical lead and architect.  Skilled in building scalable, secure systems and integrating with diverse APIs. Hands-on coder passionate about solving complex problems and driving software excellence.",
  yearsExperience: 12,
};

// Skills Data
export const skillsData: SkillsData = {
  categories: [
    {
      name: "Languages & Frameworks",
      skills: ["Java", "Spring Boot", "React", "TypeScript", "JavaScript", "HTML", "iOS (Objective-C)"],
      priority: 1,
    },
    {
      name: "Cloud & DevOps",
      skills: ["Microservices architecture", "Event-Driven Architecture (Kafka/RabbitMQ)", "Docker", "Kubernetes", "AWS (ECS, CloudFront)", "GitHub Actions CI/CD"],
      priority: 2,
    },
    {
      name: "Databases",
      skills: ["MySQL", "PostgreSQL", "SQLite"],
      priority: 3,
    },
    {
      name: "Security",
      skills: ["OAuth/OIDC authentication", "JWT", "API Security", "Compliance with penetration testing standards"],
      priority: 4,
    },
    {
      name: "Other Expertise",
      skills: ["REST API design and integration", "External services API integration (email/SMS, file upload, file processing)"],
      priority: 5,
    },
  ],
};

// Work Experience
export const workExperience: WorkExperience[] = [
  {
    id: "five-faces-2020-2025",
    company: "Five Faces",
    position: "Principal Software Engineer",
    startDate: new Date(2020, 0, 1), // Jan 2020
    endDate: new Date(2025, 7, 31), // Aug 2025
    achievements: [
      "Led architecture decisions and acted as technical lead for a team of 5 developers.",
      "Designed and delivered inhouse DX5 microservices platform.",
      "Mentored junior developers and established coding standards across the team.",
      "Delivered critical COVID-19 vaccination management systems under tight deadlines.",
    ],
    projects: [
      {
        name: "Digital Front Door",
        description: "Patient portal and healthcare management platform.",
        impact: "Deployed across SLHD, Alfred Health, Peninsula Health, NZ Health).",
      },
      {
        name: "Florence",
        description: "Custom patient experience platform for SLHD.",
      },
      {
        name: "MassVax/CoVax",
        description: "COVID-19 vaccination booking and management system.",
        impact: "Served NSW Greater Sydney Area.",
      },
      {
        name: "Queue Management System",
        description: "Enterprise queue and appointment scheduling platform.",
        impact: "Deployed across UQ and Bupa Health.",
      },
      {
        name: "VMS (Visitor Management)",
        description: "Enterprise facility visitor tracking and management.",
        impact: "Deployed across Alfred Health, WSLHD, QUT",
      },
    ],
    technologies: ["Java", "Spring Boot", "React", "AWS", "MySQL", "Docker", "Kubernetes"],
  },
  {
    id: "intelligent-pathways-2018-2019",
    company: "Intelligent Pathways",
    position: "Senior Software Engineer",
    startDate: new Date(2018, 5, 1), // Jun 2018
    endDate: new Date(2019, 11, 31), // Dec 2019
    achievements: [
      "Delivered iOS applications and Java Spring backend integrations for enterprise customers across healthcare and aviation.",
      "Worked across the full development lifecycle, from data modeling to deployment, with a strong focus on reliability and usability.",
    ],
    projects: [
      {
        name: "QAS ePCR",
        description: "Electronic Patient Care Record system for Queensland Ambulance Service.",
        impact: "Delivered iOS features and backend Spring services to support operational efficiency and enhance customer engagement.",
      },
      {
        name: "Jetstream",
        description: "Airline staff application for customer loyalty tracking, note-taking, and seat map management.",
      },
    ],
    technologies: ["Java", "Spring Framework", "iOS (Objective-C)", "PostgreSQL", "SQLite", "XML Processing"],
  },
  {
    id: "five-faces-2017-2018",
    company: "Five Faces",
    position: "Senior Software Engineer",
    startDate: new Date(2017, 2, 1), // Mar 2017
    endDate: new Date(2018, 4, 31), // May 2018
    achievements: [
      "Build and enhance web-based solutions in Spring/HTML/JavaScript.",
      "Develop Digital Signage, Visitor Management System (VMS) and Queue Management System (QMS) deployments for healthcare and university clients.",
    ],
    projects: [
      {
        name: "Digital Signage",
        description: "Centralized media management, scheduling, delivery, monitoring and playback.",
      },
      {
        name: "Queue Management System",
        description: "Enterprise queue and appointment scheduling platform.",
      },
      {
        name: "VMS (Visitor Management)",
        description: "Enterprise facility visitor tracking and management.",
      },
    ],
    technologies: ["Java", "Spring Framework", "Javascript"],
  },
  {
    id: "intelligent-pathways-2013-2017",
    company: "Intelligent Pathways",
    position: "Software Engineer",
    startDate: new Date(2013, 1, 1), // Feb 2013
    endDate: new Date(2017, 1, 28), // Feb 2017
    achievements: [
      "Started as an iOS and HTML developer.",
      "Expanded into Java Spring Framework and API Integration.",
    ],
    projects: [
      {
        name: "Jetstream",
        description: "Airline staff application for customer loyalty tracking, note-taking, and seat map management.",
      },
      {
        name: "ClipForms",
        description: "Dynamic form builder and data collection system."
      },
      {
        name: "SES Assistance QLD",
        description: "Emergency services assistance and coordination platform",
        impact: "Enhanced emergency response coordination in Queensland",
      },
    ],
    technologies: ["iOS (Objective-C)", "SQLite", "Java", "Spring Framework", "JavaScript", "JQuery"],
  },
];

// Education Data
export const educationData: EducationData = {
  degrees: [
    {
      degree: "Bachelor of Engineering (Honours)",
      field: "Computer Systems",
      institution: "La Trobe University",
      startDate: new Date(2008, 2, 1), // Mar 2008
      endDate: new Date(2012, 10, 30), // Nov 2012
    },
  ],
};

// Contact Information
export const contactInformation: ContactInformation = {
  email: "ham314@outlook.com",
  github: "https://github.com/halabri",
};

// Complete Professional Profile
export const professionalProfile: ProfessionalProfile = {
  personalInfo,
  professionalSummary,
  skills: skillsData,
  experience: workExperience,
  education: educationData,
  contact: contactInformation,
};