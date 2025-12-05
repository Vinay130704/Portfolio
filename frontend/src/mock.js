

export const personalInfo = {
  name: "Vinay Kumar",
  title: "Full Stack Developer & Data Science Enthusiast",
  tagline: "Innovative Computer Science Student | MERN Stack | Machine Learning | NLP",
  email: "vinaykumar.jld13@gmail.com",
  phone: "+91 9888384712",
  location: "Jalandhar, India",
  github: "https://github.com/Vinay130704",
  linkedin: "#",
  twitter: "#",
  bio: "Innovative computer science student with hands-on expertise in MERN stack development, machine learning, NLP, and hackathon projects. I deliver real-world tech solutions spanning web applications, predictive modeling, and gaming content. Known for creative project execution, timely delivery, and effective team collaboration.",
  heroImage: "https://images.unsplash.com/photo-1707528041466-83a325f01a3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzY0MTI5MDYzfDA&ixlib=rb-4.1.0&q=85",
  aboutImage: "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzY0MTI5MDYzfDA&ixlib=rb-4.1.0&q=85"
};

export const skills = {
  languages: [
    { name: "C++", level: 85 },
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "HTML/CSS", level: 92 }
  ],
  frameworks: [
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 82 },
    { name: "Express.js", level: 80 },
    { name: "MongoDB", level: 78 }
  ],
  tools: [
    { name: "Git/GitHub", level: 85 },
    { name: "Jupyter", level: 80 },
    { name: "VS Code", level: 90 },
    { name: "XAMPP", level: 75 }
  ],
  specializations: [
    { name: "Machine Learning", level: 85 },
    { name: "NLP", level: 80 },
    { name: "Full Stack Development", level: 88 },
    { name: "Data Science", level: 82 }
  ]
};

export const experiences = [
  {
    id: 1,
    title: "Intern",
    company: "C-DAC, Noida",
    organization: "A Scientific Society of Ministry of Electronics & IT, Government of India",
    location: "Jalandhar, IN",
    duration: "January 2025 - February 2025",
    type: "Internship",
    description: [
      "Completed online training in 'Ethical Hacking & Penetration Testing'",
      "Worked on simulated attacks, identified vulnerabilities, and applied penetration testing methodologies",
      "Gained hands-on experience in cybersecurity tools, ethical hacking, and penetration testing methodologies"
    ],
    technologies: ["Ethical Hacking", "Penetration Testing", "Cybersecurity"]
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Vidhun Learnify",
    location: "Jalandhar, IN",
    duration: "June 2024 - July 2024",
    type: "Internship",
    description: [
      "Engineered supervised ML models for classification and regression using Python and scikit-learn",
      "Built Jupyter-based reproducible workflows for seamless experimentation and deployment",
      "Developed NLP algorithms to extract and analyze text data efficiently"
    ],
    technologies: ["Python", "scikit-learn", "Jupyter", "NLP", "Machine Learning"]
  },
  {
    id: 3,
    title: "Full Stack Developer Intern",
    company: "Bharat Intern",
    location: "Jalandhar, IN",
    duration: "August 2023 - September 2023",
    type: "Internship",
    description: [
      "Developed and deployed a content management website (HTML, CSS, JavaScript, PHP) improving workflow efficiency",
      "Built a project management tool with task tracking and team collaboration features",
      "Delivered two projects successfully in a one-month internship"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Guardian Net",
    shortDescription: "A smarter, safer society management platform",
    description: "Built using the MERN stack, this full-stack web application serves as a digital gatekeeper for residential communities. It blends security with simplicity. Designed with user experience and safety in mind, Guardian Net empowers societies to stay connected, informed, and protected.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST API"],
    duration: "December 2024",
    github: "https://github.com/Vinay130704",
    demo: "https://guardiannet.vercel.app/",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjb2Rpbmd8ZW58MHx8fHwxNzY0MTU4OTk5fDA&ixlib=rb-4.1.0&q=85",
    featured: true
  },
  {
    id: 2,
    title: "Caption Generator",
    shortDescription: "AI-powered image captioning tool",
    description: "This image captioning tool leverages Python and deep learning to turn pictures into words. By combining computer vision and natural language processing, the project automatically generates meaningful captions for input images. It's a small step into the world of AI, exploring how machines can 'see' and describe the world.",
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "LSTM", "Computer Vision"],
    duration: "2024",
    github: "https://github.com/Vinay130704",
    demo: "https://captiongen-io.streamlit.app/",
    image: "https://images.unsplash.com/photo-1707528041466-83a325f01a3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzY0MTI5MDYzfDA&ixlib=rb-4.1.0&q=85",
    featured: true
  },
  {
    id: 3,
    title: "Recipe GenAI",
    shortDescription: "AI-powered culinary assistant",
    description: "A smart cooking companion that generates personalized recipes using Generative AI. Simply input your available ingredients or cravings, and the AI creates detailed cooking instructions, making meal planning effortless and creative.",
    technologies: ["Python", "GenAI", "LLM", "Render"],
    duration: "2024",
    github: "https://github.com/Vinay130704",
    demo: "https://recipe-genai.onrender.com/",
    image: "/assets/recipe-genai.png",
    featured: false
  }
];

export const certifications = [
  {
    id: 1,
    title: "Internship Certificate",
    issuer: "Bharat Intern",
    date: "August 2023 - September 2023",
    description: "Developed 2 websites in one month",
    credentialId: "BI-2023-001"
  },
  {
    id: 2,
    title: "DevCreate Hackathon",
    issuer: "DevCreate",
    date: "April 2024 - May 2024",
    description: "Built ML model analyzing soil health using supervised learning",
    credentialId: "DC-2024-H01"
  },
  {
    id: 3,
    title: "GNA Hackathon",
    issuer: "GNA University",
    date: "May 2022 - June 2022",
    description: "Simulated communication network using Core Python and QKD",
    credentialId: "GNA-2022-H01"
  },
  {
    id: 4,
    title: "Summer Industrial Training",
    issuer: "Vidhun Learnify",
    date: "June 2024 - July 2024",
    description: "Comprehensive training in Data Science and Machine Learning",
    credentialId: "VL-2024-SIT"
  }
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Computer Engineering",
    institution: "I.K. Gujral Punjab Technical University",
    location: "Jalandhar, India",
    duration: "August 2022 - Present",
    description: "Currently pursuing Bachelor's degree in Computer Engineering"
  },
  {
    id: 2,
    degree: "12th Standard",
    institution: "Modern High School",
    location: "Amritsar, India",
    duration: "February 2021 - April 2022",
    description: "Completed higher secondary education"
  }
];


export const submitContactForm = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock contact form submission:', formData);
      resolve({ success: true, message: 'Message sent successfully!' });
    }, 1000);
  });
};
