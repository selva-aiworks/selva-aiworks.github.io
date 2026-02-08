'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import GlassCard from '@/components/GlassCard';
import { projects } from '@/data/portfolio';

// Projects data imported from centralized portfolio.ts for SEO consistency

interface ProjectsSectionProps {
    visible: boolean;
}

export default function ProjectsSection({ visible }: ProjectsSectionProps) {
    if (!visible) {
        return null;
    }

    return (
        <div id="projects" className="min-h-screen relative">
            {/* Background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-purple-900/10 to-black" />

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
                                id={`project-${project.slug}`}
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
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
        </div>
    );
}
