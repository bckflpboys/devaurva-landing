import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Search, Filter, Layout } from 'lucide-react';
import { projects } from '../data/projects';
import TagLine from '../components/TagLine';

const templates = [
    { name: "Doctor Healthcare", file: "Doctor Healthcare App showcase.html", category: "Medical" },
    { name: "Doctor Office V1", file: "doctor office 1.html", category: "Medical" },
    { name: "Modern Office", file: "doctor office modern.html", category: "Medical" },
    { name: "Specialist Booking", file: "doctor specialist booking.html", category: "Medical" },
    { name: "Pharmacy Store", file: "pharmacy selling.html", category: "E-commerce" },
    { name: "SmallHQ Classic", file: "smallhq 1.html", category: "Business" },
    { name: "SmallHQ Purple Pro", file: "smallhq 2 purple.html", category: "Business" },
    { name: "SmallHQ Orange Pro", file: "smallhq 2 orange.html", category: "Business" },
    { name: "Futuristic Medical", file: "doctor office futuristic.html", category: "Medical" },
    { name: "Custom Generated Page", file: "generated-page (4).html", category: "General" },
];

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    
    const allCategories = ['All', ...new Set(projects.map(p => p.category))];
    
    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <TagLine>Global Portfolio</TagLine>
                <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.8] mb-8 mt-6">
                    INDUSTRIAL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-600">ENGINEERING</span>
                </h1>
                <p className="text-gray-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Explore a decade of digital excellence. From scalable SaaS platforms to immersive web ecosystems, 
                    we build the infrastructure that powers the future.
                </p>
            </div>

            {/* Templates Showcase - NEW */}
            <div className="max-w-7xl mx-auto px-6 mb-32">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Ready-To-Deploy Templates</h2>
                        <div className="h-1 w-20 bg-indigo-600 mt-2"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {templates.map((template, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -8 }}
                            className="relative group bg-white rounded-[2.5rem] p-1 border-2 border-slate-100 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.15)] flex flex-col"
                        >
                            {/* Live Website Preview (iFrame) */}
                            <div className="relative aspect-[4/3] rounded-[2rem] bg-slate-100 overflow-hidden border-2 border-white group-hover:border-indigo-500/10 transition-all duration-500">
                                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-white/10 to-transparent" />
                                <div className="w-full h-full scale-[0.35] origin-top-left">
                                    <iframe 
                                        src={`/html/${template.file}`}
                                        className="w-[1000px] h-[800px] border-none pointer-events-none bg-white"
                                        title={template.name}
                                        loading="lazy"
                                        scrolling="no"
                                    />
                                </div>
                                
                                {/* Overlay hover effect */}
                                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-500 z-20" />
                                
                                <div className="absolute bottom-6 right-6 z-30">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full text-indigo-600 shadow-sm">
                                        LIVE PREVIEW
                                    </span>
                                </div>
                            </div>
                            
                            {/* Card Body */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">{template.category}</span>
                                </div>
                                
                                <h3 className="text-2xl font-black text-gray-900 mb-8 leading-tight line-clamp-2 uppercase tracking-tighter">
                                    {template.name}
                                </h3>

                                <div className="mt-auto">
                                    <a 
                                        href={`/html/${template.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/40 group-hover:scale-[1.02]"
                                    >
                                        Live Preview
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Client Projects Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Bespoke Client Projects</h2>
                <div className="h-1 w-20 bg-indigo-600 mt-2"></div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-wrap gap-3">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                                filter === cat 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 placeholder-indigo-50" 
                                    : "bg-white border-zinc-100 text-gray-500 hover:border-indigo-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500"
                            >
                                {/* Image Workspace */}
                                <div className="relative aspect-video overflow-hidden bg-gray-100">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    
                                    {/* Category Overlay */}
                                    <div className="absolute top-6 right-6">
                                        <span className="px-4 py-2 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10">
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{project.title}</h3>
                                    <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <a 
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] hover:bg-black transition-all duration-300 group/btn"
                                        >
                                            View Live
                                            <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                        {project.githubUrl && (
                                            <a 
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-14 h-14 flex items-center justify-center border-2 border-zinc-100 rounded-2xl text-gray-400 hover:text-black hover:border-black transition-all duration-300"
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* CTA */}
            <div className="max-w-7xl mx-auto px-6 mt-32">
                <div className="relative p-12 md:p-20 rounded-[3rem] bg-black overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-transparent to-purple-900/40" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                            Ready to build your <br /> own masterpiece?
                        </h2>
                        <a 
                            href="/#contact"
                            className="inline-flex items-center gap-4 bg-yellow-400 text-black px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all transform hover:scale-105"
                        >
                            Start a Project
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
