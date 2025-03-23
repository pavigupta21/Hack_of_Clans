const teamsData = [
  { 
    id: 1, 
    name: "Omnitrix", 
    domain: "AI & Machine Learning", 
    description1: "Description 1", 
    description2: "Description 2", 
    tasksPending: 2,
    hackathonName: "AI Summit 2025",
    projectDescription: "An AI-powered solution that transforms complex data into actionable insights using advanced machine learning algorithms. Our project focuses on real-time analysis and visualization of large datasets, making it easier for businesses to make informed decisions quickly.",
    projectLink: "https://github.com/omnitrix/data-insights",
    teamMembers: [
      { role: "LEADER", username: "team1-leader", tasks: "Working on Training the model, collecting Datasets", linkedin: "linkedin.com/in/team1-leader" },
      { role: "FRONTEND", username: "team1-frontend", tasks: "Building responsive UI components and data visualizations", linkedin: "linkedin.com/in/team1-frontend" },
      { role: "BACKEND", username: "team1-backend", tasks: "Developing API endpoints and database architecture", linkedin: "linkedin.com/in/team1-backend" },
      { role: "ML ENGINEER", username: "team1-ml", tasks: "Implementing and optimizing machine learning models", linkedin: "linkedin.com/in/team1-ml" }
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
    projectDescription: "BugZero is an intelligent bug tracking system that automatically detects, categorizes, and prioritizes software bugs. Our system integrates with popular development environments and uses pattern recognition to suggest potential fixes based on similar issues resolved in the past.",
    projectLink: "https://github.com/bugzero/main-repo",
    teamMembers: [
      { role: "LEADER", username: "team2-lead", tasks: "Architecture planning and team coordination", linkedin: "linkedin.com/in/team2-lead" },
      { role: "DEVELOPER", username: "team2-dev1", tasks: "Building core detection algorithms", linkedin: "linkedin.com/in/team2-dev1" },
      { role: "UX DESIGNER", username: "team2-ux", tasks: "Creating intuitive interfaces for bug reporting", linkedin: "linkedin.com/in/team2-ux" },
      { role: "QA ENGINEER", username: "team2-qa", tasks: "Testing system accuracy and performance", linkedin: "linkedin.com/in/team2-qa" },
      { role: "DEVOPS", username: "team2-devops", tasks: "Setting up CI/CD pipelines and deployment", linkedin: "linkedin.com/in/team2-devops" }
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
    projectDescription: "Our team is developing a groundbreaking AR/VR platform that creates immersive educational experiences. By combining cutting-edge graphics with interactive learning modules, we're transforming how complex concepts are taught and understood across various educational levels.",
    projectLink: "https://github.com/nxtgenteam/ar-learning",
    teamMembers: [
      { role: "LEADER", username: "team3-pm", tasks: "Coordinating development milestones", linkedin: "linkedin.com/in/team3-pm" },
      { role: "AR DEVELOPER", username: "team3-ar", tasks: "Implementing augmented reality features", linkedin: "linkedin.com/in/team3-ar" },
      { role: "VR DEVELOPER", username: "team3-vr", tasks: "Creating virtual environments and interactions", linkedin: "linkedin.com/in/team3-vr" },
      { role: "3D ARTIST", username: "team3-artist", tasks: "Designing models and visual assets", linkedin: "linkedin.com/in/team3-artist" },
      { role: "EDUCATION SPECIALIST", username: "team3-edu", tasks: "Ensuring pedagogical effectiveness", linkedin: "linkedin.com/in/team3-edu" },
      { role: "FULL-STACK DEV", username: "team3-fullstack", tasks: "Building supporting web infrastructure", linkedin: "linkedin.com/in/team3-fullstack" }
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
    projectDescription: "DataVizards creates stunning interactive visualizations that make complex data understandable at a glance. Our toolkit enables non-technical users to generate insightful dashboards through an intuitive drag-and-drop interface while providing advanced customization options for data scientists.",
    projectLink: "https://github.com/datavizards/visualization-engine",
    teamMembers: [
      { role: "LEADER", username: "team4-ds", tasks: "Statistical modeling and data preparation", linkedin: "linkedin.com/in/team4-ds" },
      { role: "VISUALIZATION DEV", username: "team4-viz", tasks: "Creating interactive charts and graphs", linkedin: "linkedin.com/in/team4-viz" },
      { role: "UI DEVELOPER", username: "team4-ui", tasks: "Building the dashboard interface", linkedin: "linkedin.com/in/team4-ui" },
      { role: "BACKEND DEV", username: "team4-backend", tasks: "Data processing and API development", linkedin: "linkedin.com/in/team4-backend" }
    ]
  }
];

export default teamsData;
