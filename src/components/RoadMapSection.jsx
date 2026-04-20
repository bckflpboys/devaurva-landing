import MileStone from "./MileStone";
import TagLine from "./TagLine";
import { motion } from "framer-motion";
import { Rocket, Palette, Code2, Sparkles, ChevronRight } from "lucide-react";

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
        icon: <Rocket className="w-6 h-6 text-indigo-600" />,
        gif: "/gif/consultation.gif",
        side: "right"
    },
    {
        id: 2,
        name: "Design Phase",
        description: "Creating wireframes, prototypes, and visual designs that reflect your brand identity. Iterative feedback ensures your vision comes to life.",
        icon: <Palette className="w-6 h-6 text-purple-600" />,
        gif: "/gif/digital-art.gif",
        side: "left"
    },
    {
        id: 3,
        name: "Development",
        description: "Building your website with clean, efficient code and regular progress updates. We follow best practices for optimal performance.",
        icon: <Code2 className="w-6 h-6 text-blue-600" />,
        gif: "/gif/web-settings.gif",
        side: "right"
    },
    {
        id: 4,
        name: "Testing & Launch",
        description: "Thorough testing, optimization, and successful deployment of your website. We ensure everything works flawlessly before going live.",
        icon: <Sparkles className="w-6 h-6 text-pink-600" />,
        gif: "/gif/startup.gif",
        side: "left"
    }
];

const RoadMapSection = () => {
    return (
        <section id="roadmap" className="relative py-40 overflow-hidden">
            {/* Premium Background Treatment */}
            <div className="absolute inset-0 bg-white" />
            <div className="absolute top-0 left-0 right-0 h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border-2 border-indigo-100 mb-8"
                    >
                        <span className="text-sm font-bold text-indigo-600 tracking-wide">THE DEVAURVA WAY</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-black text-5xl md:text-7xl mb-8 tracking-tighter text-gray-900"
                    >
                        How We Bring Your <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Ideas to Life</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-500 text-xl md:text-2xl leading-relaxed font-medium"
                    >
                        A systematic approach designed for speed, precision, and <br className="hidden md:block"/>
                        uncompromising quality in every line of code.
                    </motion.p>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Main Road */}
                    <div className="relative z-10 space-y-24">
                        {roadmap.map((milestone, index) => (
                            <MileStone
                                key={index}
                                title={milestone.name}
                                description={milestone.description}
                                icon={milestone.icon}
                                gif={milestone.gif}
                                side={milestone.side}
                                lastItem={index === roadmap.length - 1}
                                index={index + 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-32"
                >
                    <div className="inline-block p-1 rounded-[2rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
                        <button 
                            onClick={scrollToPricing}
                            className="bg-white text-black px-12 py-6 rounded-[1.8rem] font-bold text-lg hover:bg-transparent hover:text-white transition-all duration-500 flex items-center gap-3"
                        >
                            Start Your Roadmap
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default RoadMapSection;