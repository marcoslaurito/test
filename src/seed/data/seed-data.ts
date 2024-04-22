interface SeedJob {
  name: string;
  description: string;
  company: string;
  salary: number;
  country: string;
  skills: string[];
}

interface SeedData {
  jobs: SeedJob[];
}

export const initialData: SeedData = {
  jobs: [
    {
      name: 'Senior Software Engineer',
      description:
        'Develop scalable web applications using modern technologies.',
      company: 'Tech Innovations Inc.',
      salary: 100000,
      country: 'USA',
      skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
    },
    {
      name: 'Data Scientist',
      description:
        'Utilize machine learning techniques to analyze large datasets and derive insights.',
      company: 'Data Insights Co.',
      salary: 90000,
      country: 'United Kingdom',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    },
    {
      name: 'Cloud Solutions Architect',
      description:
        'Design and implement cloud infrastructure solutions for enterprise clients.',
      company: 'CloudTech Solutions',
      salary: 120000,
      country: 'Canada',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Networking'],
    },
    {
      name: 'Cybersecurity Analyst',
      description:
        'Monitor and respond to security threats, conduct penetration testing and risk assessments.',
      company: 'SecureNet Inc.',
      salary: 95000,
      country: 'Australia',
      skills: ['Cybersecurity', 'Penetration Testing', 'SIEM', 'Firewalls'],
    },
    {
      name: 'DevOps Engineer',
      description:
        'Automate and streamline deployment, management, and monitoring of infrastructure and applications.',
      company: 'AgileSoft',
      salary: 110000,
      country: 'USA',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'Linux'],
    },
    {
      name: 'UX/UI Designer',
      description:
        'Create intuitive user interfaces and engaging user experiences for web and mobile applications.',
      company: 'DesignTech Studios',
      salary: 85000,
      country: 'Germany',
      skills: ['UI Design', 'UX Design', 'Adobe XD', 'Figma'],
    },
    {
      name: 'Backend Developer',
      description:
        'Build and maintain server-side logic and databases for web applications.',
      company: 'CodeCrafters Ltd.',
      salary: 95000,
      country: 'USA',
      skills: ['Python', 'Django', 'SQL', 'RESTful APIs'],
    },
    {
      name: 'Network Engineer',
      description:
        'Design, implement, and maintain network infrastructure to ensure smooth data transmission and connectivity.',
      company: 'ConnectX Networks',
      salary: 100000,
      country: 'Canada',
      skills: ['Cisco', 'Routing and Switching', 'Firewalls', 'TCP/IP'],
    },
    {
      name: 'Frontend Developer',
      description:
        'Create responsive and interactive user interfaces using HTML, CSS, and JavaScript frameworks.',
      company: 'WebSolutions Co.',
      salary: 90000,
      country: 'United Kingdom',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
      name: 'Database Administrator',
      description:
        'Install, configure, and maintain database servers, ensuring data security and integrity.',
      company: 'DataGuard Inc.',
      salary: 100000,
      country: 'Australia',
      skills: [
        'SQL',
        'Database Management',
        'Backup and Recovery',
        'Performance Tuning',
      ],
    },
    {
      name: 'AI/Machine Learning Engineer',
      description:
        'Develop and deploy machine learning models to solve complex business problems.',
      company: 'AI Solutions Ltd.',
      salary: 110000,
      country: 'USA',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
    },
    {
      name: 'Systems Administrator',
      description:
        'Manage and troubleshoot server and system issues, ensure smooth operation of IT infrastructure.',
      company: 'SystemWorks Ltd.',
      salary: 95000,
      country: 'Canada',
      skills: ['Linux', 'Windows Server', 'Active Directory', 'Scripting'],
    },
    {
      name: 'Software Quality Assurance Engineer',
      description:
        'Develop and execute test plans to ensure software quality and reliability.',
      company: 'QualityTech Inc.',
      salary: 90000,
      country: 'USA',
      skills: [
        'Test Automation',
        'Manual Testing',
        'Selenium',
        'Agile Methodologies',
      ],
    },
    {
      name: 'Blockchain Developer',
      description:
        'Design and implement blockchain solutions for various applications and industries.',
      company: 'BlockChain Innovations',
      salary: 105000,
      country: 'United Kingdom',
      skills: ['Blockchain', 'Smart Contracts', 'Solidity', 'Cryptocurrency'],
    },
    {
      name: 'IT Project Manager',
      description:
        'Plan, execute, and oversee IT projects, ensuring they are completed on time and within budget.',
      company: 'ProjectMasters Inc.',
      salary: 120000,
      country: 'Australia',
      skills: [
        'Project Management',
        'Agile Methodologies',
        'Scrum',
        'Risk Management',
      ],
    },
    {
      name: 'Full Stack Developer',
      description:
        'Develop both client and server software for web applications using a variety of programming languages and frameworks.',
      company: 'FullStack Innovations',
      salary: 110000,
      country: 'USA',
      skills: ['JavaScript', 'React', 'Node.js', 'Java'],
    },
    {
      name: 'IT Support Specialist',
      description:
        'Provide technical assistance and support to end-users, troubleshoot hardware and software issues.',
      company: 'TechSupport Solutions',
      salary: 85000,
      country: 'Canada',
      skills: ['Technical Support', 'Troubleshooting', 'Windows', 'macOS'],
    },
    {
      name: 'Data Engineer',
      description:
        'Design, build, and maintain scalable data pipelines for data processing and analysis.',
      company: 'DataWorks Co.',
      salary: 100000,
      country: 'United Kingdom',
      skills: ['Big Data', 'Hadoop', 'Spark', 'ETL'],
    },
    {
      name: 'IT Security Consultant',
      description:
        'Assess and mitigate security risks, develop security strategies and policies.',
      company: 'SecureIT Solutions',
      salary: 115000,
      country: 'Australia',
      skills: [
        'Information Security',
        'Risk Assessment',
        'Security Policies',
        'Compliance',
      ],
    },
    {
      name: 'Mobile App Developer',
      description:
        'Design and develop mobile applications for iOS and Android platforms.',
      company: 'AppSolutions Ltd.',
      salary: 95000,
      country: 'USA',
      skills: ['iOS Development', 'Android Development', 'Swift', 'Kotlin'],
    },
  ],
};
