import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Border shine effect that peaks when card is centered
    const borderColor = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5, 0.6, 1],
        ["rgba(0,0,0,0.2)", "rgba(0,0,0,0.25)", "rgba(99,102,241,0.8)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.2)"]
    );

    const glossOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5, 0.6, 1],
        [0, 0, 0.1, 0, 0]
    );

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ borderColor }}
            className="flex-none w-[400px] md:w-full h-full bg-white/70 backdrop-blur-xl rounded-t-2xl rounded-b-[2.5rem] border relative overflow-hidden group transition-all duration-700 flex flex-col"
            role="listitem"
        >
            <motion.div
                style={{ opacity: glossOpacity }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none rounded-t-2xl rounded-b-[2.5rem]"
            />

            <div className="relative aspect-video overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={isHovered && project.hoverImage ? project.hoverImage : project.image}
                        src={isHovered && project.hoverImage ? project.hoverImage : project.image}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.8 }}
                        transition={{ duration: 0.4 }}
                        alt={`${project.title} project screenshot`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                
                {/* Category Tag */}
                {project.category && (
                    <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 bg-yellow-400 border border-black/10 rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-sm">
                            {project.category}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{project.title}</h3>
                </div>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                    {project.description}
                </p>


                <div className="flex items-center gap-4 mt-auto">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border-2 border-indigo-600 rounded-full text-white hover:bg-indigo-700 hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group/link"
                        aria-label={`Visit ${project.title} live demo`}
                    >
                        <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Live Demo</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    return (
        <section id="clientprojects" className="py-32 relative overflow-hidden bg-white" role="region" aria-labelledby="projects-heading">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 mb-6 block"
                    >
                        Proven Success
                    </motion.span>
                    <h2 id="projects-heading" className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.8] mb-8">
                        CLIENT <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-600">PROJECTS</span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        A curated selection of industrial-grade solutions engineered for performance,
                        scalability, and exceptional user experiences.
                    </p>
                </div>

                <div className="flex overflow-x-auto gap-8 pb-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 justify-center no-scrollbar" role="list" aria-label="Projects list">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;

