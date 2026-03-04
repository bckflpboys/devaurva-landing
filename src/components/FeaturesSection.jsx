import { features } from "../data/features";
import TagLine from "./TagLine";
import { motion } from "framer-motion";
import { Code2, Smartphone, Search, ShoppingBag, Cable, Layout } from "lucide-react";

const getFeatureIcon = (title) => {
    switch (title) {
        case "UI and UX Design":
            return <Layout className="w-8 h-8 text-white relative z-10" />;
        case "Responsive Web Design":
            return <Smartphone className="w-8 h-8 text-white relative z-10" />;
        case "SEO Optimization":
            return <Search className="w-8 h-8 text-white relative z-10" />;
        case "E-commerce Development":
            return <ShoppingBag className="w-8 h-8 text-white relative z-10" />;
        case "API Creation":
            return <Cable className="w-8 h-8 text-white relative z-10" />;
        case "Custom Web Applications":
            return <Code2 className="w-8 h-8 text-white relative z-10" />;
        default:
            return null;
    }
};

const getFeatureColor = (index) => {
    const colors = [
        "from-blue-500 to-cyan-400",
        "from-purple-600 to-indigo-500",
        "from-orange-500 to-amber-400",
        "from-emerald-500 to-teal-400",
        "from-pink-500 to-rose-400",
        "from-indigo-500 to-blue-600"
    ];
    return colors[index % colors.length];
};

const FeatureCard = ({ feature, index }) => {
    const colorGradient = getFeatureColor(index);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-white rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col items-start"
            role="listitem"
        >
            {/* Background Blob effect on hover */}
            <div className={`absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br ${colorGradient} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none`}></div>

            <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-100 rounded-2xl scale-110 -z-10 group-hover:scale-125 transition-transform duration-300"></div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorGradient} flex items-center justify-center shadow-md transform group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300`}>
                    {getFeatureIcon(feature.title)}
                </div>
            </div>

            <h3 className="font-extrabold text-2xl text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                {feature.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-800 transition-colors duration-300">
                {feature.description}
            </p>

            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-in-out"></div>
        </motion.div>
    );
};

const FeaturesSection = () => {
    return (
        <section id="features" className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white" role="region" aria-labelledby="features-heading">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-200/40 to-transparent blur-[100px] pointer-events-none rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-200/40 to-transparent blur-[120px] pointer-events-none rounded-full"></div>

            <div className="max-w-screen-xl mx-auto relative z-10">
                <div className="text-center flex flex-col items-center mb-16">
                    <TagLine>Features</TagLine>
                    <motion.h2
                        id="features-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="font-extrabold text-4xl md:text-5xl mt-4 mb-6 text-gray-900"
                    >
                        Comprehensive Web Solutions
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-gray-600 text-lg md:text-xl max-w-2xl"
                    >
                        From design to deployment, we offer end-to-end web development services to bring your vision to life and fuel your growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4" role="list" aria-label="Features list">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
