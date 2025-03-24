const teamsData = [
  { 
    id: 1, 
    name: "Omnitrix", 
    domain: "AI & Machine Learning", 
    description1: "Description 1", 
    description2: "Description 2", 
    tasksPending: 2,
    hackathonName: "AI Summit 2025",
    projectDescription: "An AI-powered solution that transforms complex data into actionable insights using advanced machine learning algorithms.",
    projectLink: "https://github.com/omnitrix/data-insights",
    teamMembers: [
      { role: "LEADER", username: "team1-leader", tasks: "Training the model, collecting datasets", linkedin: "linkedin.com/in/team1-leader" },
      { role: "FRONTEND", username: "team1-frontend", tasks: "Building UI components", linkedin: "linkedin.com/in/team1-frontend" }
    ]
  },
  { 
    id: 2, 
    name: "BugZero", 
    domain: "Software Development & DevOps", 
    description1: "Bug tracking system", 
    description2: "Automated bug detection", 
    tasksPending: 5,
    hackathonName: "DevOps Challenge 2025",
    projectDescription: "BugZero is an intelligent bug tracking system that detects, categorizes, and prioritizes software bugs.",
    projectLink: "https://github.com/bugzero/main-repo",
    teamMembers: [
      { role: "LEADER", username: "team2-lead", tasks: "Architecture planning", linkedin: "linkedin.com/in/team2-lead" },
      { role: "QA ENGINEER", username: "team2-qa", tasks: "Testing accuracy", linkedin: "linkedin.com/in/team2-qa" }
    ]
  },
  { 
    id: 3, 
    name: "NxtGenTeam", 
    domain: "AR/VR & Metaverse", 
    description1: "AR/VR Solutions", 
    description2: "Immersive experiences", 
    tasksPending: 3,
    hackathonName: "Metaverse Hackathon",
    projectDescription: "Developing an AR/VR platform for immersive educational experiences.",
    projectLink: "https://github.com/nxtgenteam/ar-learning",
    teamMembers: [
      { role: "LEADER", username: "team3-pm", tasks: "Coordinating development milestones", linkedin: "linkedin.com/in/team3-pm" },
      { role: "VR DEVELOPER", username: "team3-vr", tasks: "Creating virtual environments", linkedin: "linkedin.com/in/team3-vr" }
    ]
  },
  { 
    id: 4, 
    name: "DataVizards", 
    domain: "Data Science & Visualization", 
    description1: "Data visualization", 
    description2: "Complex insights simplified", 
    tasksPending: 4,
    hackathonName: "Data Science Cup 2025",
    projectDescription: "Creating interactive visualizations that make complex data understandable.",
    projectLink: "https://github.com/datavizards/visualization-engine",
    teamMembers: [
      { role: "LEADER", username: "team4-ds", tasks: "Data preparation", linkedin: "linkedin.com/in/team4-ds" },
      { role: "UI DEVELOPER", username: "team4-ui", tasks: "Building dashboards", linkedin: "linkedin.com/in/team4-ui" }
    ]
  },
  { 
    id: 5, 
    name: "QuantumBits", 
    domain: "Quantum Computing", 
    description1: "Quantum simulations", 
    description2: "Quantum algorithms research", 
    tasksPending: 3,
    hackathonName: "QuantumTech 2025",
    projectDescription: "Developing quantum algorithms for secure encryption and problem-solving.",
    projectLink: "https://github.com/quantumbits/qsim",
    teamMembers: [
      { role: "LEADER", username: "team5-quantum", tasks: "Quantum algorithm research", linkedin: "linkedin.com/in/team5-quantum" }
    ]
  },
  { 
    id: 6, 
    name: "CyberSentinel", 
    domain: "Cybersecurity", 
    description1: "Network security", 
    description2: "Threat detection AI", 
    tasksPending: 2,
    hackathonName: "Cyber Defense 2025",
    projectDescription: "An AI-powered security system that monitors network traffic for suspicious activities in real-time.",
    projectLink: "https://github.com/cybersentinel/security-ai",
    teamMembers: [
      { role: "LEADER", username: "team6-security", tasks: "Implementing AI threat detection", linkedin: "linkedin.com/in/team6-security" },
      { role: "DEVOPS", username: "team6-devops", tasks: "Setting up security protocols", linkedin: "linkedin.com/in/team6-devops" }
    ]
  },
  { 
    id: 7, 
    name: "NeuroTech", 
    domain: "Neuroscience & AI", 
    description1: "Brainwave analysis", 
    description2: "Neuro AI models", 
    tasksPending: 4,
    hackathonName: "AI in Healthcare 2025",
    projectDescription: "Developing AI models that analyze brainwave signals to detect neurological disorders.",
    projectLink: "https://github.com/neurotech/brainwave-ai",
    teamMembers: [
      { role: "LEADER", username: "team7-neuro", tasks: "Brainwave data collection", linkedin: "linkedin.com/in/team7-neuro" },
      { role: "ML ENGINEER", username: "team7-ml", tasks: "Developing AI models", linkedin: "linkedin.com/in/team7-ml" }
    ]
  },
  { 
    id: 8, 
    name: "EcoTech", 
    domain: "Sustainable Energy", 
    description1: "Green energy solutions", 
    description2: "Smart grids", 
    tasksPending: 5,
    hackathonName: "GreenTech 2025",
    projectDescription: "Designing a smart grid system that optimizes energy distribution for renewable energy sources.",
    projectLink: "https://github.com/ecotech/smartgrid",
    teamMembers: [
      { role: "LEADER", username: "team8-green", tasks: "Renewable energy research", linkedin: "linkedin.com/in/team8-green" },
      { role: "BACKEND DEV", username: "team8-backend", tasks: "Building grid optimization algorithms", linkedin: "linkedin.com/in/team8-backend" }
    ]
  },
  { 
    id: 9, 
    name: "MedTech Innovators", 
    domain: "Healthcare & Biotech", 
    description1: "AI in healthcare", 
    description2: "Medical diagnostics", 
    tasksPending: 3,
    hackathonName: "MedHack 2025",
    projectDescription: "AI-powered diagnostic tool that predicts disease probabilities based on patient data.",
    projectLink: "https://github.com/medtech/ai-diagnosis",
    teamMembers: [
      { role: "LEADER", username: "team9-med", tasks: "Developing disease prediction models", linkedin: "linkedin.com/in/team9-med" },
      { role: "DATA SCIENTIST", username: "team9-data", tasks: "Training AI on medical datasets", linkedin: "linkedin.com/in/team9-data" }
    ]
  }
];

export default teamsData;
