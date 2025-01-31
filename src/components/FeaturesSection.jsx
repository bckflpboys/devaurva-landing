import { features } from "../data/features";
import TagLine from "./TagLine";
import { motion } from "framer-motion";
import { Code2, Smartphone, Search, ShoppingBag, Cable, Layout } from "lucide-react";

const getFeatureIcon = (title) => {
    switch (title) {
        case "UI and UX Design":
            return <Layout className="w-6 h-6 text-indigo-600" />;
        case "Responsive Web Design":
            return <Smartphone className="w-6 h-6 text-indigo-600" />;
        case "SEO Optimization":
            return <Search className="w-6 h-6 text-indigo-600" />;
        case "E-commerce Development":
            return <ShoppingBag className="w-6 h-6 text-indigo-600" />;
        case "API Creation":
            return <Cable className="w-6 h-6 text-indigo-600" />;
        case "Custom Web Applications":
            return <Code2 className="w-6 h-6 text-indigo-600" />;
        default:
            return null;
    }
};

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-orange-50 border border-indigo-400/30 rounded-xl p-6 h-full group transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100"
        >
            <div className="flex flex-col space-y-4">
                <div className="p-3 bg-indigo-50 rounded-lg w-fit group-hover:bg-white transition-colors duration-300">
                    {getFeatureIcon(feature.title)}
                </div>
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
        </motion.div>
    );
};

const FeaturesSection = () => {
    return (
        <section id="features" className="flex items-center py-20 px-6 justify-center flex-col bg-gradient-to-b from-white to-indigo-50/30">
            <TagLine>Our Services</TagLine>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-extrabold text-4xl mb-4 md:mb-8 text-center pt-3"
            >
                Comprehensive Web Solutions
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-600 text-center max-w-2xl mb-12"
            >
                From design to deployment, we offer end-to-end web development services to bring your vision to life
            </motion.p>

            <div className="mt-10 grid items-stretch grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
