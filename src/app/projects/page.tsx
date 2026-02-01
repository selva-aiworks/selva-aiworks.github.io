'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import PillNav from '@/components/PillNav';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';

const projects = [
  {
    id: 1,
    color: '#eab308',
    title: 'P.A.C.E',
    subtitle: 'Pythonic AI for Coding & Execution',
    date: 'Jan 2025',
    brief: 'Groundbreaking AI-powered code generation system that transforms natural language descriptions into executable Python code. Leverages NVIDIA NeMo API to bridge the gap between human intent and machine execution, enabling developers to describe functionality in plain English and receive working code.',
    image: '/projects/pace.png',
    gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
    technologies: ['Python', 'NVIDIA NeMo', 'NLP', 'Code Generation', 'AI', 'API Integration', 'AST'],
    highlights: [
      'Natural language to code conversion',
      'NVIDIA NeMo API integration',
      'Executable code generation',
      'Multiple programming paradigms'
    ],
    githubUrl: 'https://github.com/selva-aiworks/P.A.C.E---Pythonic-AI-for-Coding-and-Execution',
    liveUrl: '',
    featured: false
  },
  {
    id: 2,
    color: '#06b6d4',
    title: 'W.E.B.S',
    subtitle: 'Web Extraction & Summarization System',
    date: 'March 2025',
    brief: 'Intelligent web content extraction and summarization platform utilizing advanced NLP techniques. Automatically scrapes, processes, and condenses web content into concise, meaningful summaries. Perfect for research, content curation, and information aggregation tasks.',
    image: '/projects/webs.png',
    gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    technologies: ['Python', 'BeautifulSoup', 'NLP', 'Transformers', 'Web Scraping', 'Summarization'],
    highlights: [
      'Automated web content extraction',
      'Intelligent text summarization',
      'Multi-source aggregation',
      'Clean data processing pipeline'
    ],
    githubUrl: 'https://github.com/selva-aiworks/W.E.B.S---Web-Extraction-and-Summarization-System',
    liveUrl: '',
    featured: false
  },
  {
    id: 3,
    color: '#a855f7',
    title: 'Speech Recognition & Synthesis',
    subtitle: 'Intelligent Voice AI with ChatGPT',
    date: 'April 2024',
    brief: 'Revolutionary voice interaction system combining speech recognition, natural language understanding, and text-to-speech synthesis. Integrates seamlessly with ChatGPT to create a fully conversational AI assistant capable of understanding context and generating human-like responses through voice.',
    image: '/projects/speech.png',
    gradient: 'from-purple-500/20 via-violet-500/20 to-indigo-500/20',
    technologies: ['Python', 'OpenAI API', 'Speech Recognition', 'pyttsx3', 'NLP', 'Deep Learning', 'Audio Processing'],
    highlights: [
      'Real-time speech-to-text conversion',
      'ChatGPT integration for responses',
      'Natural voice synthesis',
      'Context-aware conversations'
    ],
    githubUrl: 'https://github.com/selva-aiworks/Speech-Recognition-Synthesis',
    liveUrl: '',
    featured: false
  },
  {
    id: 4,
    color: '#f97316',
    title: 'Sports Classification AI',
    subtitle: 'Advanced Image Recognition System',
    date: 'Nov 2023',
    brief: 'State-of-the-art computer vision model for precise sports activity classification. Leverages convolutional neural networks and transfer learning to achieve high accuracy in identifying various sports from images. The system demonstrates advanced understanding of image processing pipelines and deep learning architectures.',
    image: '/projects/sports.png',
    gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN', 'Transfer Learning', 'Data Augmentation'],
    highlights: [
      'Multi-class sports classification',
      'Transfer learning with pre-trained models',
      'Custom CNN architecture design',
      'Real-time inference capabilities'
    ],
    githubUrl: 'https://github.com/selva-aiworks/Sports-Classification',
    liveUrl: '',
    featured: false
  },
  {
    id: 5,
    color: '#22c55e',
    title: 'Autonomous Robot Navigation',
    subtitle: 'A* Pathfinding Algorithm Implementation',
    date: 'Dec 2024',
    brief: 'Sophisticated 2D autonomous navigation system implementing the A* pathfinding algorithm for optimal route calculation. The system efficiently navigates through complex grid-based environments, demonstrating strong algorithmic problem-solving and robotics fundamentals with real-time visualization.',
    image: '/projects/robot.png',
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    technologies: ['Python', 'A* Algorithm', 'Pathfinding', 'Pygame', 'Data Structures', 'Visualization'],
    highlights: [
      'Optimal path calculation',
      'Dynamic obstacle avoidance',
      'Real-time visualization',
      'Efficient algorithm implementation'
    ],
    githubUrl: 'https://github.com/selva-aiworks/Autonomous-Robot-Navigation',
    liveUrl: '',
    featured: false
  },
  {
    id: 6,
    title: 'CodSoft AI Internship',
    subtitle: 'Comprehensive AI/ML Portfolio',
    date: 'Aug 2023',
    brief: 'A complete collection of cutting-edge AI projects developed during my internship at Codsoft. This portfolio demonstrates proficiency across multiple AI domains including computer vision, natural language processing, and predictive analytics. Each project showcases end-to-end implementation from data preprocessing to model deployment.',
    image: '/projects/codsoft_refined_v3.png',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Jupyter', 'Pandas', 'NumPy', 'Matplotlib'],
    highlights: [
      'Image Captioning System',
      'Tic-Tac-Toe AI Game',
      'Rule-based Chatbot',
      'Model optimization techniques'
    ],
    githubUrl: 'https://github.com/selva-aiworks/CodSoft',
    liveUrl: '',
    featured: false
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-purple-900/10 to-black" />

      {/* Navigation */}
      <PillNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/#about' },
          { label: 'Experience', href: '/#experience' },
          { label: 'Skills', href: '/#skills' },
          { label: 'Projects', href: '/projects' },
          { label: 'Contact', href: '/contact' }
        ]}
        activeHref="/projects"
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-24 pb-12 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mb-6 flex justify-center"
            textClassName="text-5xl md:text-7xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent royal-heading"
          >
            Projects
          </ScrollReveal>
          <p className="text-xl text-white/60 max-w-3xl mx-auto premium-text">
            Innovative AI/ML solutions showcasing expertise in machine learning, computer vision, NLP, and intelligent systems
          </p>
        </div>
      </motion.header>

      {/* Projects */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-12 no-splash">
          {projects.map((project, index) => {
            const isReversed = index % 2 !== 0; // Alternate layout

            return (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group"
              >
                <GlassCard
                  className={`h-full ${project.featured ? 'shadow-[0_0_50px_rgba(59,130,246,0.1)]' : ''}`}
                  gradient={project.gradient}
                  glowColor={project.color}
                >
                  <div className={`grid md:grid-cols-2 gap-8 ${isReversed ? 'md:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative ${isReversed ? 'md:col-start-2' : ''}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <NextImage
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500" />
                      </div>

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col ${isReversed ? 'md:col-start-1 md:row-start-1' : ''}`}>
                      {/* Title */}
                      <div className="mb-4">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 royal-heading">
                            {project.title}
                          </h2>
                          <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-mono whitespace-nowrap border border-white/5">
                            {project.date}
                          </span>
                        </div>
                        <p className="text-blue-400/80 font-mono text-sm">{project.subtitle}</p>
                      </div>

                      {/* Brief */}
                      <p className="text-white/70 leading-relaxed mb-6 text-base premium-text">
                        {project.brief}
                      </p>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          Key Highlights
                        </h3>
                        <ul className="grid grid-cols-1 gap-2">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-white/60 flex items-start gap-2">
                              <span className="text-blue-400 mt-1">▸</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-white/90 mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 hover:border-blue-500/30 hover:text-blue-300 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 mt-auto">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 font-medium"
                        >
                          <Github className="w-5 h-5" />
                          View Code
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}