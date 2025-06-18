import type { ResumeData } from '../types/resume';

export const mockResumeData: ResumeData = {
  personalInfo: {
    // Basic Information
    firstName: "Sarah",
    lastName: "Johnson",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    
    // Contact Information
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    website: "https://sarahjohnson.dev",
    
    // Address
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    
    // Personal Statement
    personalStatement: "**Experienced software engineer** with 5+ years of expertise in full-stack development, specializing in **React**, **Node.js**, and cloud technologies. Passionate about creating scalable, user-centric applications and leading cross-functional teams to deliver high-quality solutions. Proven track record of **reducing system downtime by 40%** and **improving application performance by 60%** through innovative optimization strategies.",
    
    // Social Media Links
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    portfolio: "https://sarahjohnson.dev",
    twitter: "https://twitter.com/sarahjohnson",
  },
  
  experience: [
    {
      id: "exp1",
      jobTitle: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      description: "**Lead full-stack development** for enterprise applications serving 100K+ users.\n\n**Key Achievements:**\n- **Reduced API response time by 60%** through database optimization and caching strategies\n- **Led a team of 5 developers** in migrating legacy systems to modern React/Node.js stack\n- **Implemented CI/CD pipelines** that reduced deployment time from 2 hours to 15 minutes\n- **Mentored 3 junior developers** and conducted code reviews for team best practices\n\n**Technologies:** React, Node.js, PostgreSQL, Redis, Docker, AWS"
    },
    {
      id: "exp2",
      jobTitle: "Software Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "2020-03",
      endDate: "2021-12",
      description: "**Developed and maintained** multiple web applications using modern JavaScript frameworks.\n\n**Key Achievements:**\n- **Built a real-time dashboard** that improved user engagement by 45%\n- **Optimized database queries** resulting in 30% faster page load times\n- **Collaborated with UX designers** to implement responsive, accessible interfaces\n- **Participated in agile development** with 2-week sprint cycles\n\n**Technologies:** React, Express.js, MongoDB, Socket.io, Heroku"
    },
    {
      id: "exp3",
      jobTitle: "Junior Developer",
      company: "Digital Solutions LLC",
      location: "Oakland, CA",
      startDate: "2019-06",
      endDate: "2020-02",
      description: "**Contributed to front-end development** of client websites and internal tools.\n\n**Key Achievements:**\n- **Developed 10+ client websites** using HTML, CSS, and JavaScript\n- **Implemented responsive design** principles for mobile-first development\n- **Collaborated with senior developers** on larger projects and learned best practices\n- **Maintained and updated** existing client websites and applications\n\n**Technologies:** HTML5, CSS3, JavaScript, jQuery, WordPress, Git"
    }
  ],
  
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2015-09",
      endDate: "2019-05",
      gpa: "3.8/4.0",
      description: "**Relevant Coursework:** Data Structures & Algorithms, Software Engineering, Database Systems, Web Development\n\n**Projects:**\n- **Built a social media platform** using React and Node.js for senior capstone project\n- **Developed a machine learning model** for predicting stock prices using Python and TensorFlow\n- **Created a mobile app** for campus event management using React Native\n\n**Honors:** Dean's List (3 years), Computer Science Department Award"
    },
    {
      id: "edu2",
      degree: "AWS Certified Solutions Architect",
      institution: "Amazon Web Services",
      location: "Online",
      startDate: "2021-06",
      endDate: "2021-06",
      gpa: "",
      description: "**Certification:** AWS Solutions Architect Associate (SAA-C02)\n\n**Skills Covered:**\n- **Cloud architecture design** and implementation\n- **Security best practices** and compliance\n- **Cost optimization** strategies\n- **High availability** and fault tolerance\n- **Database services** and data migration"
    }
  ],
  
  skills: [
    {
      id: "technical",
      name: "Technical Skills",
      skills: [
        {
          id: "skill1",
          name: "React",
          proficiency: "Expert",
          description: "**5+ years experience** building complex user interfaces and state management with Redux and Context API. **Expertise in:** Hooks, Performance optimization, Testing with Jest and React Testing Library"
        },
        {
          id: "skill2",
          name: "Node.js",
          proficiency: "Advanced",
          description: "**4+ years experience** developing RESTful APIs and microservices. **Expertise in:** Express.js, Authentication, Database integration, API design patterns"
        },
        {
          id: "skill3",
          name: "TypeScript",
          proficiency: "Advanced",
          description: "**3+ years experience** using TypeScript for type-safe development. **Expertise in:** Interface design, Generic types, Advanced type patterns"
        },
        {
          id: "skill4",
          name: "PostgreSQL",
          proficiency: "Intermediate",
          description: "**3+ years experience** with relational database design and optimization. **Expertise in:** Query optimization, Indexing, Stored procedures"
        },
        {
          id: "skill5",
          name: "Docker",
          proficiency: "Intermediate",
          description: "**2+ years experience** with containerization and deployment. **Expertise in:** Multi-stage builds, Docker Compose, CI/CD integration"
        }
      ]
    },
    {
      id: "soft",
      name: "Soft Skills",
      skills: [
        {
          id: "skill6",
          name: "Leadership",
          proficiency: "Advanced",
          description: "**Led teams of 5+ developers**, conducted code reviews, and mentored junior developers. Experience in project planning and stakeholder communication."
        },
        {
          id: "skill7",
          name: "Problem Solving",
          proficiency: "Expert",
          description: "**Strong analytical skills** for debugging complex issues and optimizing system performance. Experience with root cause analysis and solution design."
        },
        {
          id: "skill8",
          name: "Communication",
          proficiency: "Advanced",
          description: "**Excellent written and verbal communication** skills. Experience presenting technical solutions to non-technical stakeholders and writing technical documentation."
        }
      ]
    },
    {
      id: "languages",
      name: "Languages",
      skills: [
        {
          id: "skill9",
          name: "English",
          proficiency: "Native",
          description: "**Native speaker** with excellent written and verbal communication skills."
        },
        {
          id: "skill10",
          name: "Spanish",
          proficiency: "Intermediate",
          description: "**Conversational proficiency** - can communicate effectively in professional settings."
        }
      ]
    },
    {
      id: "certifications",
      name: "Certifications",
      skills: [
        {
          id: "skill11",
          name: "AWS Solutions Architect",
          proficiency: "Certified",
          description: "**AWS Solutions Architect Associate** certification demonstrating expertise in cloud architecture and AWS services."
        },
        {
          id: "skill12",
          name: "Scrum Master",
          proficiency: "Certified",
          description: "**Certified Scrum Master** with experience leading agile development teams and facilitating sprint ceremonies."
        }
      ]
    }
  ]
}; 