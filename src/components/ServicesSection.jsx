import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
    Globe, 
    ShoppingCart, 
    LayoutDashboard, 
    Smartphone, 
    Chrome, 
    Gamepad2,
    ArrowUpRight
} from "lucide-react";

const services = [
    {
        id: "web",
        title: "Websites",
        description: "High-performance, SEO-optimized digital presence built with modern frameworks for maximum impact.",
        icon: <Globe className="w-8 h-8" />,
        color: "from-blue-600 to-indigo-600",
        bg: "bg-blue-50",
        accent: "text-blue-600",
        shadow: "shadow-blue-500/10"
    },
    {
        id: "ecommerce",
        title: "eCommerce Stores",
        description: "Scalable online shopping experiences with seamless payment integrations and conversion-focused design.",
        icon: <ShoppingCart className="w-8 h-8" />,
        color: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
        accent: "text-emerald-600",
        shadow: "shadow-emerald-500/10"
    },
    {
        id: "systems",
        title: "Company Systems",
        description: "Custom internal tools, ERPs, and dashboards designed to streamline your business operations.",
        icon: <LayoutDashboard className="w-8 h-8" />,
        color: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
        accent: "text-amber-600",
        shadow: "shadow-amber-500/10"
    },
    {
        id: "apps",
        title: "Mobile Apps",
        description: "Native-quality iOS and Android applications that deliver exceptional user experiences on any device.",
        icon: <Smartphone className="w-8 h-8" />,
        color: "from-sky-500 to-blue-500",
        bg: "bg-sky-50",
        accent: "text-sky-600",
        shadow: "shadow-sky-500/10"
    },
    {
        id: "extensions",
        title: "Extensions",
        description: "Powerful Chrome and browser extensions that add unique functionality and value to the web.",
        icon: <Chrome className="w-8 h-8" />,
        color: "from-red-500 to-rose-600",
        bg: "bg-red-50",
        accent: "text-red-600",
        shadow: "shadow-red-500/10"
    },
    {
        id: "games",
        title: "Games",
        description: "Engaging 2D and 3D web-based games and interactive experiences that captivate your audience.",
        icon: <Gamepad2 className="w-8 h-8" />,
        color: "from-violet-500 to-purple-600",
        bg: "bg-violet-50",
        accent: "text-violet-600",
        shadow: "shadow-violet-500/10"
    }
];

const ServicesSection = () => {
    const [hoveredService, setHoveredService] = useState(null);

    return (
        <section id="services" className="relative py-32 overflow-hidden bg-white">
            {/* Dynamic Background Glow */}
            <AnimatePresence>
                {hoveredService && (
                    <motion.div
                        key={hoveredService.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className={`absolute inset-0 opacity-[0.03] pointer-events-none -z-10 ${hoveredService.bg}`}
                        style={{
                            background: `radial-gradient(circle at center, var(--tw-bg-opacity) 0%, transparent 70%)`
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <div className="w-8 h-[2px] bg-indigo-600" />
                            <span className="text-sm font-black uppercase tracking-widest text-indigo-600">Our Capabilities</span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]"
                        >
                            What We <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 italic">Do Best</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Turning complex requirements into seamless digital products. 
                        We build everything you need to dominate your market.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredService(service)}
                            onMouseLeave={() => setHoveredService(null)}
                            className="relative group p-1 shadow-sm rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Animated Border Background */}
                            <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.color}`} />
                            
                            {/* Main Card Content */}
                            <div className="relative h-full bg-white rounded-[1.9rem] p-10 flex flex-col justify-between overflow-hidden">
                                {/* Service Icon */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${service.bg} ${service.accent} group-hover:bg-white group-hover:scale-110 shadow-lg ${service.shadow}`}>
                                    {service.icon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-500 leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className={`h-1 w-0 group-hover:w-12 bg-gradient-to-r ${service.color} transition-all duration-700 rounded-full`} />
                                    <div className={`opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ${service.accent}`}>
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
