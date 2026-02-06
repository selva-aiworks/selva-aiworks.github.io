'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, MapPin, Phone, Download, Sparkles } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Orb from '@/components/Orb';
import PillNav from '@/components/PillNav';
import ScrollReveal from '@/components/ScrollReveal';
import FallingText from '@/components/FallingText';
import Stack from '@/components/Stack';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import MobileDock from '@/components/MobileDock';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

const projects = [
  {
    title: 'P.A.C.E',
    subtitle: 'Pythonic AI for Coding and Execution',
    description: 'Designed a system leveraging NVIDIA\'s NeMo API to generate Python code from natural language inputs. Streamlined workflows by converting human intentions into executable scripts.',
    tags: ['NVIDIA NeMo', 'Python', 'AI Automation'],
    link: '#'
  },
  {
    title: 'W.E.B.S',
    subtitle: 'Web Extraction and Summarization System',
    description: 'Developed a system using AI agents from CrewAI to scrape web content, summarize it, and save results in PDF format. Implemented automation for efficient data extraction.',
    tags: ['CrewAI', 'Web Scraping', 'Summarization'],
    link: '#'
  },
  {
    title: 'Speech Recognition System',
    subtitle: 'Real-time Multilingual STT & TTS',
    description: 'Built a real-time multilingual STT and TTS system with 98% word accuracy using GPT-2 and open-source libraries. Supports English, Spanish, and French.',
    tags: ['GPT-2', 'NLP', 'STT/TTS'],
    link: '#'
  },
  {
    title: 'Sports Image Classification',
    subtitle: '92% Accuracy Classification Model',
    description: 'Engineered a Sports Classification System achieving 92% accuracy. Leveraged TensorFlow and Google Colab for model training, optimization, and deployment.',
    tags: ['TensorFlow', 'Computer Vision', 'Deep Learning'],
    link: '#'
  }
];

const currentlyWorkingProjects = [
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

const skills = {
  languages: ['Python', 'HTML', 'PHP', 'JavaScript'],
  frameworks: ['Hugging Face', 'LangChain', 'CrewAI', 'PyTorch', 'LiveKit', 'TensorFlow', 'LlamaIndex', 'vLLM', 'Ollama', 'Rasa', 'Sentence-Transformers'],
  specializations: ['Generative AI', 'Agentic AI', 'Conversational AI', 'RAG', 'Multimodal AI', 'Web Scraping', 'API Integrations'],
  webDev: ['WordPress', 'CSS', 'React', 'Next.js', 'TSX']
};

const experience = [
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

export default function Home() {
  const [activeSection, setActiveSection] = React.useState<'home' | 'projects' | 'contact'>('home');
  const [topCard, setTopCard] = React.useState({
    title: 'P.A.C.E - Pythonic AI',
    link: '#project-1'
  });

  const stackProjects = [
    { id: 6, img: '/projects/codsoft_refined_v3.webp', title: 'CodSoft AI Internship', link: '#project-6' },
    { id: 5, img: '/projects/robot.webp', title: 'Autonomous Navigation', link: '#project-5' },
    { id: 4, img: '/projects/sports.webp', title: 'Sports Classification', link: '#project-4' },
    { id: 3, img: '/projects/speech.webp', title: 'Speech Recognition', link: '#project-3' },
    { id: 2, img: '/projects/webs.webp', title: 'W.E.B.S - Web Extraction', link: '#project-2' },
    { id: 1, img: '/projects/pace.webp', title: 'P.A.C.E - Pythonic AI', link: '#project-1' }
  ];

  // Sections that belong to the 'home' main view
  const HOME_SECTIONS = ['home', 'about', 'experience', 'skills', 'certificates', 'achievements', 'current-projects'];

  // Helper to determine which main view should be active based on hash
  const resolveActiveSection = (hash: string) => {
    const section = hash.replace('#', '');
    if (section === 'projects' || section.startsWith('project-')) {
      return 'projects';
    }
    if (section === 'contact') {
      return 'contact';
    }
    if (HOME_SECTIONS.includes(section) || !section) {
      return 'home';
    }
    return null; // Let it stay as is if unknown
  };

  // Handle URL hash on initial load and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const resolved = resolveActiveSection(hash);
      if (resolved) {
        setActiveSection(resolved);
      }
    };

    // Initial check
    handleLocationChange();

    // Listen for hash changes and browser back/forward
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Listen for chatbot navigation events
  useEffect(() => {
    const handleChatbotNav = (e: any) => {
      const sectionId = e.detail; // This is now the mapped elementId from Chatbot.tsx
      const resolved = resolveActiveSection(sectionId);
      if (resolved) {
        setActiveSection(resolved);
        // We set the hash so the browser scrolls to the element
        window.location.hash = sectionId === 'home' ? '' : sectionId;
      }
    };

    window.addEventListener('chatbot-navigate', handleChatbotNav);
    return () => window.removeEventListener('chatbot-navigate', handleChatbotNav);
  }, []);

  // Navigation handler for SPA (manual clicks from PillNav/Dock)
  const handleNavigate = (section: string) => {
    const resolved = resolveActiveSection(section);
    if (resolved) {
      setActiveSection(resolved);
      // Update URL hash
      window.location.hash = section === 'home' ? '' : section;
      // Scroll to top if exactly switching to home base, projects base, or contact base
      if (section === 'home' || section === 'projects' || section === 'contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Ensure we scroll to the correct element after a view switch
  // using useLayoutEffect to run after DOM updates but before paint
  React.useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  // Get active href for PillNav based on current section
  const getActiveHref = () => {
    if (activeSection === 'projects') return '#projects';
    if (activeSection === 'contact') return '#contact';

    // For home, return the actual hash if it's one of ours, otherwise #home
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash && HOME_SECTIONS.includes(hash.replace('#', ''))) {
      return hash;
    }
    return '#home';
  };

  return (
    <>
      <PillNav
        items={[
          { label: 'Home', href: '#home' },
          { label: 'About', href: '#about' },
          { label: 'Experience', href: '#experience' },
          { label: 'Skills', href: '#skills' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' }
        ]}
        activeHref={getActiveHref()}
        onNavigate={handleNavigate}
      />

      {/* Home Section */}
      {activeSection === 'home' && (
        <main className="min-h-screen relative overflow-hidden">
          <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-4 text-center pt-4 md:pt-0">
            {/* Orb background */}
            <div className="absolute inset-0 overflow-hidden z-0">
              <Orb
                hue={260}
                hoverIntensity={2.5}
                rotateOnHover={true}
                forceHoverState={false}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="z-10 relative pointer-events-none mt-10"
            >
              {/* Name with gradient animation */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-6 text-7xl md:text-9xl font-bold tracking-tighter bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent hero-name-font"
              >
                G Selva
              </motion.h1>

              {/* Animated role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-light text-white/90 tracking-wide inline-block relative">
                  <span className="relative z-10">AI / ML Engineer</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </h2>
              </motion.div>

              {/* Time-based greeting message - Easter Egg */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="mb-6"
              >
                <p className="text-sm md:text-base text-white/40 font-light italic">
                  {(() => {
                    const hour = new Date().getHours();
                    if (hour >= 5 && hour < 12) return "Good morning! Ready to build something amazing?";
                    if (hour >= 12 && hour < 17) return "Good afternoon! Let's create something innovative.";
                    if (hour >= 17 && hour < 22) return "Good evening! Perfect time for some AI magic.";
                    return "Working late? That's the developer spirit!";
                  })()}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
              >
                Building the future with <span className="text-blue-400 font-medium">Generative AI</span>,
                <span className="text-purple-400 font-medium"> Agentic Systems</span>, and
                <span className="text-pink-400 font-medium"> Deep Learning</span>
              </motion.p>

              {/* Download Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mb-10 pointer-events-auto"
              >
                <div className="relative group inline-flex rounded-full p-[2px] border border-white/10 bg-white/5">
                  <div className="absolute inset-0 rounded-full pointer-events-none">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                      variant="royal"
                    />
                  </div>
                  <a
                    href="/resume.pdf"
                    download
                    className="relative z-10 flex items-center gap-3 px-8 py-4 bg-black/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Download className="w-5 h-5 text-blue-400 group-hover:animate-bounce" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex gap-6 justify-center mb-12 pointer-events-auto"
              >
                <SocialLink href="https://github.com/selva-aiworks" icon={<Github />} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/in/selva-g" icon={<Linkedin />} label="LinkedIn" />
                <SocialLink href="mailto:selvaofficialmail@gmail.com" icon={<Mail />} label="Email" />
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm text-white/50 pointer-events-auto"
              >
                <div className="flex items-center gap-2 glass-panel px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" /> +91 9363087305
                </div>
                <div className="flex items-center gap-2 glass-panel px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                  <MapPin className="w-4 h-4 text-purple-400" /> Bangalore, India
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
              >
                Professional Summary
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                <GlassCard className="w-full h-[500px] md:h-[350px] !aspect-auto">
                  <div className="w-full h-full">
                    <FallingText
                      text="As a Innovative AI/ML Engineer, I architect intelligent systems that bridge the gap between human intent and machine execution. Specializing in Generative AI and Agentic Systems, I go beyond standard deployments by Fine-tuning Models to create truly immersive and human-like experiences. From Training Custom Models to building complex RAG Pipelines. My focus is on engineering autonomous solutions that are not just functional, but intuitively responsive and exceptionally powerful"
                      highlightWords={["AI/ML Engineer", "Generative AI", "Agentic Systems", "Fine-tuning", "human-like", "RAG Pipelines", "intuitively responsive", "exceptionally powerful"]}
                      trigger="click"
                      backgroundColor="transparent"
                      wireframes={false}
                      gravity={0.56}
                      fontSize="1rem"
                      mouseConstraintStiffness={0.4}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.35 }}
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={6}
                containerClassName="mb-16 pl-6 border-l-4 border-blue-500/50"
                textClassName="text-4xl md:text-5xl font-bold"
              >
                Experience
              </ScrollReveal>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1, duration: 0.35 }}
                  >
                    <GlassCard className="hover:border-white/20">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <span className="text-white/40 font-mono text-sm">{exp.period}</span>
                      </div>
                      <div className="text-lg text-blue-300 mb-4">{exp.company}</div>
                      <p className="text-white/60 leading-relaxed">{exp.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.35 }}
            >
              <ScrollReveal
                baseOpacity={1}
                enableBlur={true}
                baseRotation={5}
                blurStrength={6}
                containerClassName="mb-16 pl-6 border-purple-500/50"
                textClassName="text-4xl md:text-5xl font-bold royal-heading"
              >
                Technical Skills
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8">
                <SkillCategory title="Languages" items={skills.languages} index={0} />
                <SkillCategory title="Frameworks & Tools" items={skills.frameworks} index={1} />
                <SkillCategory title="Specializations" items={skills.specializations} index={2} />
                <SkillCategory
                  title="Web Development"
                  items={skills.webDev}
                  index={3}
                  extra={
                    <a href="https://heisenbergdruglab.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2">
                      Web-Designs Portfolio <ExternalLink className="w-3 h-3" />
                    </a>
                  }
                />
              </div>
            </motion.div>
          </section>

          {/* Currently Working Projects Section */}
          <section id="current-projects" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={6}
                containerClassName="mb-16 pl-6 border-l-4 border-purple-500/50"
                textClassName="text-4xl md:text-5xl font-bold"
              >
                Currently Working Projects
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentlyWorkingProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    id={`project-${project.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <GlassCard className="h-full">
                      <div className="flex flex-col h-full overflow-hidden">
                        {/* Image */}
                        <div className="image-container relative h-48 mb-4 rounded-xl overflow-hidden">
                          <NextImage
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        </div>
                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">
                          {project.description}
                        </p>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={6}
                containerClassName="mb-16 pl-6 border-l-4 border-pink-500/50"
                textClassName="text-4xl md:text-5xl font-bold royal-heading"
              >
                Key Projects
              </ScrollReveal>
              <div className="flex flex-col items-center gap-10">
                <Stack
                  cardsData={stackProjects}
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  cardDimensions={{ width: 600, height: 500 }}
                  animationConfig={{ stiffness: 260, damping: 20 }}
                  onCardChange={(card) => setTopCard({ title: card.title || '', link: card.link || '' })}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href={topCard.link}
                    className="group inline-flex items-center gap-2 px-4 py-2 text-sm md:px-6 md:py-3 md:text-base bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full hover:from-pink-500/30 hover:to-purple-500/30 hover:border-pink-500/50 transition-all duration-300"
                  >
                    <span className="text-white/90 font-medium">View {topCard.title}</span>
                    <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Education & Certifications */}
          <section id="certificates" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
              >
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={6}
                  containerClassName="mb-8"
                  textClassName="text-3xl md:text-4xl font-bold"
                >
                  Qualification
                </ScrollReveal>
                <GlassCard className="w-full h-auto min-h-[150px] !aspect-auto">
                  <div className="w-full h-full">
                    <h3 className="text-xl font-bold mb-2 text-white">B.E. in Artificial Intelligence & Machine Learning</h3>
                    <p className="text-white/60 mb-2">AMC Engineering College, Bangalore</p>
                    <p className="text-white/40 text-sm">2020 – 2024 • CGPA: 8.06/10</p>
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
              >
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={6}
                  containerClassName="mb-8"
                  textClassName="text-3xl md:text-4xl font-bold"
                >
                  Certifications
                </ScrollReveal>
                <GlassCard className="w-full h-auto min-h-[200px] !aspect-auto">
                  <div className="space-y-4 w-full h-full">
                    <CertificationItem
                      title="DeepLearning.AI Specialization"
                      issuer="Stanford University"
                      link="https://www.coursera.org/account/accomplishments/specialization/E3C6TSKJ3JU7?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n"
                    />
                    <a href="https://www.coursera.org/account/accomplishments/specialization/E3C6TSKJ3JU7?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2">
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                    <CertificationItem
                      title="Cloud Foundations"
                      issuer="AWS"
                      link="https://www.credly.com/badges/fb27106e-1c59-45a8-9d9e-04f06bdb0314/public_url"
                    />
                    <a href="https://www.credly.com/badges/fb27106e-1c59-45a8-9d9e-04f06bdb0314/public_url" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2">
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                    <CertificationItem
                      title="Machine Learning Foundations"
                      issuer="AWS"
                      link="https://www.credly.com/badges/56eb0778-3f40-4d1c-aac0-ce0c867166c8/public_url"
                    />
                    <a href="https://www.credly.com/badges/56eb0778-3f40-4d1c-aac0-ce0c867166c8/public_url" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2">
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                    <CertificationItem
                      title="Python for Deep Learning"
                      issuer="Udemy"
                      link="https://www.udemy.com/certificate/UC-92cb7db8-c93d-4ff6-adf9-5ea2befa2777/"
                    />
                    <a href="https://www.udemy.com/certificate/UC-92cb7db8-c93d-4ff6-adf9-5ea2befa2777/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2">
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </section>

          {/* Achievements */}
          <section id="achievements" className="py-24 px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={6}
                containerClassName="mb-12 flex justify-center"
                textClassName="text-3xl md:text-4xl font-bold text-center"
              >
                Achievements
              </ScrollReveal>
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <GlassCard>
                  <div className="space-y-6">
                    <AchievementItem text="Stanford University DeepLearning.AI Machine Learning Specialization – Certified in supervised, unsupervised, and reinforcement learning." />
                    <AchievementItem text="Omdena Local Chapter Challenge Contributor – Developed an AI-powered mobile application for crop disease detection in Kenya." />
                    <AchievementItem text="AI Project Development & Innovation – Designed and deployed multiple AI-driven solutions in NLP and computer vision." />
                    <AchievementItem text="AI Training & Community Contribution – Led hands-on AI/ML training sessions for aspiring engineers." />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </section>

        </main>
      )}

      {/* Projects Section */}
      <ProjectsSection visible={activeSection === 'projects'} />

      {/* Contact Section */}
      <ContactSection visible={activeSection === 'contact'} />

      {/* Mobile Dock */}
      <MobileDock activeSection={activeSection} onNavigate={handleNavigate} />
    </>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactElement<{ className?: string }>; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-full glass-card hover:bg-white/20 hover:scale-110 transition-all group relative overflow-hidden"
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      {React.cloneElement(icon, {
        className: "w-6 h-6 text-white/70 group-hover:text-white transition-colors relative z-10"
      })}
    </motion.a>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="w-full h-full min-h-[300px] p-8 flex flex-col border border-white/10 rounded-[25px] bg-white/5 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 font-mono mt-1">{project.subtitle}</p>
          </div>
        </div>
        <p className="text-white/60 mb-8 flex-grow leading-relaxed text-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkillCategory({ title, items, index, extra }: { title: string; items: string[]; index: number; extra?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative h-full"
    >
      <GlassCard className="h-full min-h-[220px]" innerClassName="bg-black/40">
        <div className="relative z-10 overflow-hidden h-full">
          <h3 className="text-xl font-bold mb-6 text-white/90">{title}</h3>
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <span key={item} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/70 border border-white/5 hover:bg-white/10 transition-colors">
                {item}
              </span>
            ))}
          </div>
          {extra && <div className="mt-6 pt-6 border-t border-white/10">{extra}</div>}
        </div>
      </GlassCard>
    </motion.div>
  );
}

function CertificationItem({ title, issuer, link }: { title: string; issuer: string; link?: string }) {
  const Content = () => (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:bg-blue-300 transition-colors" />
      <div>
        <div className="font-medium text-white/90 group-hover:text-white transition-colors flex items-center gap-2">
          {title}
          {link && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />}
        </div>
        <div className="text-sm text-white/50">{issuer}</div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
        <Content />
      </a>
    );
  }

  return (
    <div className="p-2 -mx-2">
      <Content />
    </div>
  );
}

function AchievementItem({ text }: { text: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2.5 flex-shrink-0" />
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}
