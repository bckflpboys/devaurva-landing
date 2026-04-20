import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

const MileStone = ({ title, description, lastItem, icon, index, gif, side }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    return (
        <div ref={ref} className="flex flex-col md:flex-row w-full mb-32 last:mb-0 relative group items-start">
            {/* Timeline track and node */}
            <div className="flex md:flex-col items-center mr-0 md:mr-12 mb-8 md:mb-0">
                <div className="relative flex flex-col items-center">
                    {/* Node Aura */}
                    <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
                    
                    {/* Main Node */}
                    <motion.div 
                        className="relative z-20 flex items-center justify-center w-14 h-14 rounded-2xl bg-white border-2 border-indigo-100 shadow-xl overflow-hidden group-hover:scale-110 transition-transform duration-500"
                        style={{
                            scale: useTransform(scrollYProgress, [0, 1], [0.8, 1]),
                            opacity: useTransform(scrollYProgress, [0, 1], [0.5, 1]),
                            rotateZ: useTransform(scrollYProgress, [0, 1], [-15, 0])
                        }}
                    >
                        {icon}
                    </motion.div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 z-30 bg-black text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        {index}
                    </div>

                    {/* Vertical Connecting Line (Desktop) */}
                    {!lastItem && (
                        <div className="hidden md:block absolute top-14 bottom-[-140px] w-0.5 bg-gray-100">
                            <motion.div 
                                className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent"
                                style={{
                                    height: useTransform(scrollYProgress, [0, 1], ["0%", "150%"]),
                                    opacity: useTransform(scrollYProgress, [0, 1], [0.3, 1])
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Container (Card + GIF) with Zoom Effect */}
            <motion.div 
                className={`flex-1 flex flex-col md:flex-row gap-8 items-center ${side === 'left' ? 'md:flex-row-reverse' : ''}`}
                style={{
                    scale: useTransform(scrollYProgress, [0, 0.8, 1], [0.85, 1, 1.05]),
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
                }}
            >
                {/* Content Card (2/3 width) */}
                <motion.div 
                    className="w-full md:w-2/3"
                    style={{
                        x: useTransform(scrollYProgress, [0, 1], [side === 'right' ? 50 : -50, 0])
                    }}
                >
                    <div className="relative p-8 rounded-3xl bg-white/40 backdrop-blur-md border-2 border-indigo-100/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] transition-all duration-500 group-hover:border-indigo-500/30">
                        {/* Corner Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                            <CheckCircle2 className="w-12 h-12 text-indigo-600" />
                        </div>

                        <div className="mb-4">
                            <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 mb-1 block">Phase 0{index}</span>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h3>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                            {description}
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-indigo-200 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-400 flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
                                Quality Checks Active <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Animation/GIF side (1/3 width) */}
                <div className="w-full md:w-1/3">
                    <div className="relative group/gif">
                        <img 
                            src={gif} 
                            alt={`${title} process animation`} 
                            className="relative z-10 w-full h-auto rounded-[1.5rem] hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MileStone;