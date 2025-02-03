import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectsSection = () => {
    return (
        <section id="projects" className="py-20" role="region" aria-labelledby="projects-heading">
            <div className="text-center mb-12">
                <h2 id="projects-heading" className="text-4xl font-bold mb-4">My Projects</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Here are some of the projects I've worked on. Each project demonstrates
                    different skills and technologies in web development.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Projects list">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="bg-white/20 backdrop-blur-lg rounded-xl shadow-sm ring-1 ring-gray-300 overflow-hidden hover:shadow-lg hover:ring-gray-400 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        role="listitem"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={project.image}
                                alt={`${project.title} project screenshot`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                        role="listitem"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                                    aria-label={`View ${project.title} source code`}
                                >
                                    <Github size={20} aria-hidden="true" />
                                    <span>Code</span>
                                </a>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                                    aria-label={`Visit ${project.title} live demo`}
                                >
                                    <ExternalLink size={20} aria-hidden="true" />
                                    <span>Live Demo</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
