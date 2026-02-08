
export const siteConfig = {
    title: "Selva | Selva G — AI Engineer & Website Developer Bangalore",
    description: "Selva (Selva G) — AI/ML Engineer & CTO at Voxel. Website Developer in Bangalore. Specializing in Generative AI, Agentic Systems, ML, React, Next.js. Hire Bangalore AI engineer for AI and web projects.",
    url: "https://selva-aiworks.github.io",
    author: {
        name: "Selva",
        fullName: "Selva G",
        alternateNames: ["G Selva", "Selva AI Engineer", "Selva Bangalore"],
        role: "CTO & AI/ML Engineer",
        email: "selvaofficialmail@gmail.com",
        socials: {
            github: "https://github.com/selva-aiworks",
            linkedin: "https://www.linkedin.com/in/selva-g",
            voxel: "https://heisenbergdruglab.github.io/"
        }
    }
};

export const projects = [
    {
        id: 1,
        slug: 'pace',
        color: '#eab308',
        title: 'P.A.C.E',
        subtitle: 'Pythonic AI for Coding and Execution',
        date: 'Jan 2025',
        description: 'Designed a system leveraging NVIDIA\'s NeMo API to generate Python code from natural language inputs. Streamlined workflows by converting human intentions into executable scripts.',
        brief: 'Groundbreaking AI-powered code generation system that transforms natural language descriptions into executable Python code. Leverages NVIDIA NeMo API to bridge the gap between human intent and machine execution, enabling developers to describe functionality in plain English and receive working code.',
        image: '/projects/pace.webp',
        gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
        tags: ['NVIDIA NeMo', 'Python', 'AI Automation', 'NLP', 'Code Generation'],
        technologies: ['Python', 'NVIDIA NeMo', 'NLP', 'Code Generation', 'AI', 'API Integration', 'AST'],
        highlights: [
            'Natural language to code conversion',
            'NVIDIA NeMo API integration',
            'Executable code generation',
            'Multiple programming paradigms'
        ],
        link: 'https://github.com/selva-aiworks/P.A.C.E---Pythonic-AI-for-Coding-and-Execution',
        githubUrl: 'https://github.com/selva-aiworks/P.A.C.E---Pythonic-AI-for-Coding-and-Execution',
        liveUrl: '',
        featured: false
    },
    {
        id: 2,
        slug: 'webs',
        color: '#06b6d4',
        title: 'W.E.B.S',
        subtitle: 'Web Extraction and Summarization System',
        date: 'March 2025',
        description: 'Developed a system using AI agents from CrewAI to scrape web content, summarize it, and save results in PDF format. Implemented automation for efficient data extraction.',
        brief: 'Intelligent web content extraction and summarization platform utilizing advanced NLP techniques. Automatically scrapes, processes, and condenses web content into concise, meaningful summaries. Perfect for research, content curation, and information aggregation tasks.',
        image: '/projects/webs.webp',
        gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
        tags: ['CrewAI', 'Web Scraping', 'Summarization', 'Transformers'],
        technologies: ['Python', 'BeautifulSoup', 'NLP', 'Transformers', 'Web Scraping', 'Summarization'],
        highlights: [
            'Automated web content extraction',
            'Intelligent text summarization',
            'Multi-source aggregation',
            'Clean data processing pipeline'
        ],
        link: 'https://github.com/selva-aiworks/W.E.B.S---Web-Extraction-and-Summarization-System',
        githubUrl: 'https://github.com/selva-aiworks/W.E.B.S---Web-Extraction-and-Summarization-System',
        liveUrl: '',
        featured: false
    },
    {
        id: 3,
        slug: 'speech',
        color: '#a855f7',
        title: 'Speech Recognition System',
        subtitle: 'Real-time Multilingual STT & TTS',
        date: 'April 2024',
        description: 'Built a real-time multilingual STT and TTS system with 98% word accuracy using GPT-2 and open-source libraries. Supports English, Spanish, and French.',
        brief: 'Revolutionary voice interaction system combining speech recognition, natural language understanding, and text-to-speech synthesis. Integrates seamlessly with ChatGPT to create a fully conversational AI assistant capable of understanding context and generating human-like responses through voice.',
        image: '/projects/speech.webp',
        gradient: 'from-purple-500/20 via-violet-500/20 to-indigo-500/20',
        tags: ['GPT-2', 'NLP', 'STT/TTS', 'Audio Processing'],
        technologies: ['Python', 'OpenAI API', 'Speech Recognition', 'pyttsx3', 'NLP', 'Deep Learning', 'Audio Processing'],
        highlights: [
            'Real-time speech-to-text conversion',
            'ChatGPT integration for responses',
            'Natural voice synthesis',
            'Context-aware conversations'
        ],
        link: 'https://github.com/selva-aiworks/Speech-Recognition-Synthesis',
        githubUrl: 'https://github.com/selva-aiworks/Speech-Recognition-Synthesis',
        liveUrl: '',
        featured: false
    },
    {
        id: 4,
        slug: 'sports',
        color: '#f97316',
        title: 'Sports Image Classification',
        subtitle: '92% Accuracy Classification Model',
        date: 'Nov 2023',
        description: 'Engineered a Sports Classification System achieving 92% accuracy. Leveraged TensorFlow and Google Colab for model training, optimization, and deployment.',
        brief: 'State-of-the-art computer vision model for precise sports activity classification. Leverages convolutional neural networks and transfer learning to achieve high accuracy in identifying various sports from images. The system demonstrates advanced understanding of image processing pipelines and deep learning architectures.',
        image: '/projects/sports.webp',
        gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
        tags: ['TensorFlow', 'Computer Vision', 'Deep Learning', 'CNN'],
        technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN', 'Transfer Learning', 'Data Augmentation'],
        highlights: [
            'Multi-class sports classification',
            'Transfer learning with pre-trained models',
            'Custom CNN architecture design',
            'Real-time inference capabilities'
        ],
        link: 'https://github.com/selva-aiworks/Sports-Classification',
        githubUrl: 'https://github.com/selva-aiworks/Sports-Classification',
        liveUrl: '',
        featured: false
    },
    {
        id: 5,
        slug: 'robot',
        color: '#22c55e',
        title: 'Autonomous Navigation',
        subtitle: 'A* Pathfinding Algorithm',
        date: 'Dec 2024',
        description: 'A* Pathfinding Algorithm Implementation for autonomous robot navigation. Demonstrates optimal path planning and obstacle avoidance strategies.',
        brief: 'Sophisticated pathfinding implementation for autonomous robotics, utilizing the A* algorithm for optimal route calculation. The system efficiently navigates through complex grid-based environments, demonstrating strong algorithmic problem-solving and robotics fundamentals with real-time visualization.',
        image: '/projects/robot.webp',
        gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
        tags: ['Robotics', 'A* Algorithm', 'Pathfinding', 'Python'],
        technologies: ['Python', 'Robotics', 'Algorithms', 'Pathfinding', 'Simulation'],
        highlights: [
            'Optimal path calculation',
            'Dynamic obstacle avoidance',
            'Real-time path replanning',
            'Efficient grid-based navigation'
        ],
        link: 'https://github.com/selva-aiworks/Autonomous-Robot-Navigation-System',
        githubUrl: 'https://github.com/selva-aiworks/Autonomous-Robot-Navigation-System',
        liveUrl: '',
        featured: false
    },
    {
        id: 6,
        slug: 'codsoft',
        color: '#ec4899',
        title: 'CodSoft Internship',
        subtitle: 'Artificial Intelligence Intern',
        date: 'Aug 2023',
        description: 'Completed an intensive internship, deploying AI-driven systems to improve efficiency. Gained hands-on experience in leveraging AI tools for impactful project delivery.',
        brief: 'Intensive internship program focused on practical AI application and system deployment. Worked on real-world challenges including recommendation systems, chatbots, and predictive models. Gained comprehensive experience in the full AI development lifecycle from data preprocessing to model deployment.',
        image: '/projects/codsoft_refined_v3.webp',
        gradient: 'from-pink-500/20 via-rose-500/20 to-red-500/20',
        tags: ['AI Internship', 'Machine Learning', 'Project Deployment'],
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter', 'Git'],
        highlights: [
            'End-to-end model deployment',
            'Real-world problem solving',
            'Collaborative development',
            'Performance optimization'
        ],
        link: 'https://github.com/selva-aiworks/CODSOFT',
        githubUrl: 'https://github.com/selva-aiworks/CODSOFT',
        liveUrl: '',
        featured: false
    }
];

export const currentlyWorkingProjects = [
    {
        slug: 'lipsync',
        title: 'Lip-Sync Avatar Generation',
        description: 'Generating lip-synced avatar videos from audio and source images/videos using open-source audio feature extractors and diffusion models.',
        tags: ['Generative AI', 'Diffusion Models', 'Audio Processing', 'Open Source'],
        image: '/projects/lipsync_avatar_stunning.webp'
    },
    {
        slug: 'livekit',
        title: 'LiveKit Agent Infrastructure',
        description: 'Setting up a complete LiveKit agent with local STT, TTS, and LLM services, utilizing open-source models for a fully self-hosted solution.',
        tags: ['LiveKit', 'Local LLM', 'STT/TTS', 'Agentic AI'],
        image: '/projects/livekit_agent_stunning.webp'
    },
    {
        slug: 'chatbot',
        title: 'Human-like Web Chatbot',
        description: 'Built a more human-like chatbot using JS and open-source LLM APIs, featuring seamless email integration for direct communication.',
        tags: ['Chatbot', 'Email Integration', 'Open Source LLM', 'JavaScript'],
        image: '/projects/web_chatbot_stunning.webp'
    }
];

export const skills = {
    languages: ['Python', 'HTML', 'PHP', 'JavaScript'],
    frameworks: ['Hugging Face', 'LangChain', 'CrewAI', 'PyTorch', 'LiveKit', 'TensorFlow', 'LlamaIndex', 'vLLM', 'Ollama', 'Rasa', 'Sentence-Transformers'],
    specializations: ['Generative AI', 'Agentic AI', 'Conversational AI', 'RAG', 'Multimodal AI', 'Web Scraping', 'API Integrations'],
    webDev: ['WordPress', 'CSS', 'React', 'Next.js', 'TSX']
};

export const experience = [
    {
        role: 'AI Software Engineer',
        company: '*astTECS Unified Communication Pvt Ltd',
        period: 'Jun 2025 – Present',
        description: 'Specializing in voicebot and chatbot deployment, Avatar generation, and building RAG bots. Actively experimenting with open-source LLMs and running them locally for optimized performance.'
    },
    {
        role: 'AI Trainer',
        company: 'Sambhav Foundation',
        period: 'Dec 2024 – Jun 2025',
        description: 'Led engaging, hands-on AI/ML training sessions for over 500 students, fostering a deep understanding of intelligent systems and practical implementation.'
    },
    {
        role: 'Artificial Intelligence Intern',
        company: 'CodSoft',
        period: 'Aug 2023 – Sep 2023',
        description: 'Completed an intensive internship, deploying AI-driven systems to improve efficiency. Gained hands-on experience in leveraging AI tools for impactful project delivery.'
    }
];
