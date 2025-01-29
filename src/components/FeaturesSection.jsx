import { features } from "../data/features";
import TagLine from "./TagLine";
import { motion } from "framer-motion";

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-indigo-400/30 rounded-lg p-6 h-full flex space-x-4"
        >
            <div>
                <h3 className="font-bold text-xl">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
            </div>
        </motion.div>
    );
};

const FeaturesSection = () => {
    return (
        <section id="features" className="flex items-center p-10 justify-center flex-col">
            <TagLine>Features</TagLine>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-extrabold text-3xl mb-4 md:mb-8 text-center pt-3"
            >
                Intelligent Form Building
            </motion.h2>

            <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-3 max-w-screen-xl">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
