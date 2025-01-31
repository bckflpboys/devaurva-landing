import MileStone from "./MileStone";
import TagLine from "./TagLine";
import { motion } from "framer-motion";

const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const roadmap = [
    {
        id: 1,
        name: "Project KickOff",
        description: "Initial consultation, requirement gathering, and project planning to ensure alignment with your goals. We establish clear objectives and timelines.",
        icon: "🚀"
    },
    {
        id: 2,
        name: "Design Phase",
        description: "Creating wireframes, prototypes, and visual designs that reflect your brand identity. Iterative feedback ensures your vision comes to life.",
        icon: "🎨"
    },
    {
        id: 3,
        name: "Development",
        description: "Building your website with clean, efficient code and regular progress updates. We follow best practices for optimal performance.",
        icon: "⚙️"
    },
    {
        id: 4,
        name: "Testing & Launch",
        description: "Thorough testing, optimization, and successful deployment of your website. We ensure everything works flawlessly before going live.",
        icon: "✨"
    }
];

const RoadMapSection = () => {
    return (
        <section className="relative py-32 overflow-hidden" style={{ position: 'relative' }}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <TagLine>Development Process</TagLine>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="font-extrabold text-4xl md:text-5xl mb-6 pt-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                    >
                        Your Vision, Our Expertise
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-gray-600 text-lg leading-relaxed"
                    >
                        We follow a proven development process to transform your ideas into reality. 
                        Each step is carefully executed to ensure the highest quality and satisfaction.
                    </motion.p>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-4xl mx-auto" style={{ position: 'relative' }}>
                    {/* Decorative Elements */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />
                    
                    {/* Timeline Content */}
                    <div className="relative z-10">
                        {roadmap.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <MileStone
                                    title={milestone.name}
                                    description={milestone.description}
                                    icon={milestone.icon}
                                    lastItem={index === roadmap.length - 1}
                                    index={index + 1}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-20"
                >
                    <p className="text-gray-600 mb-6">Ready to start your project?</p>
                    <button 
                        onClick={scrollToPricing}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:scale-105"
                    >
                        Get Started Now
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default RoadMapSection;