import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MileStone = ({ title, description, lastItem, icon, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "center center"]
    });

    return (
        <div ref={ref} className="flex w-full mb-16 last:mb-0 relative">
            {/* Timeline dot and line */}
            <div className="relative flex flex-col items-center mr-8">
                {/* Glowing background for icon */}
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 via-orange-500/10 to-pink-500/20 rounded-full blur-xl" />
                
                {/* Icon container */}
                <motion.div 
                    className="relative z-20 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/20 overflow-hidden"
                    style={{
                        scale: useTransform(scrollYProgress, [0, 1], [0.5, 1]),
                        opacity: useTransform(scrollYProgress, [0, 1], [0.3, 1]),
                        rotate: useTransform(scrollYProgress, [0, 1], [-20, 0])
                    }}
                >
                    {/* Animated background patterns */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
                    
                    {/* Icon */}
                    <span className="relative text-2xl text-white filter drop-shadow-lg transform -rotate-12">{icon}</span>
                </motion.div>

                {/* Connecting line */}
                {!lastItem && (
                    <motion.div 
                        className="absolute top-16 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                        style={{
                            height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                            opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.8]),
                            filter: "drop-shadow(0 4px 6px rgb(99 102 241 / 0.3))"
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <motion.div 
                className="flex-1 pt-2"
                style={{
                    opacity: useTransform(scrollYProgress, [0, 1], [0.5, 1]),
                    x: useTransform(scrollYProgress, [0, 1], [-20, 0])
                }}
            >
                <div className="flex items-center mb-3">
                    {/* Step indicator */}
                    <motion.div
                        className="relative mr-4 group"
                        style={{
                            scale: useTransform(scrollYProgress, [0, 1], [0.8, 1])
                        }}
                    >
                        {/* Glowing background for step number */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-lg group-hover:opacity-75 transition-opacity" />
                        
                        {/* Step number container */}
                        <div className="relative flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg shadow-indigo-500/20">
                            {/* Animated background patterns */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.2)_0%,transparent_50%)] rounded-lg" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.2)_0%,transparent_50%)] rounded-lg" />
                            
                            {/* Step text */}
                            <span className="relative font-bold text-white">Step {index}</span>
                        </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                </div>

                {/* Description card */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-lg shadow-indigo-500/5 border border-indigo-50">
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default MileStone;