import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

const MileStone = ({ title, description, lastItem, icon, index, gif, side }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={ref} className="flex flex-col md:flex-row w-full mb-20 md:mb-48 last:mb-0 relative group items-start perspective-1000">
            {/* Timeline track and node */}
            <div className="flex md:flex-col items-center mr-0 md:mr-16 mb-4 md:mb-0">
                <div className="relative flex flex-col items-center">
                    {/* Node Aura - Peaking at Center */}
                    <motion.div 
                        className="absolute -inset-8 bg-indigo-500/20 rounded-full blur-3xl" 
                        style={{
                            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5]),
                            opacity: useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0, 0, 0.6, 0, 0]),
                        }}
                    />
                    
                    {/* Main Node - Popping at Center */}
                    <motion.div 
                        className="relative z-20 flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-indigo-100 shadow-2xl overflow-hidden group-hover:scale-125 transition-transform duration-500"
                        style={{
                            scale: useTransform(scrollYProgress, [0, 0.45, 0.5, 0.55, 1], [0.5, 0.8, 1.3, 1, 0.9]),
                            opacity: useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0, 0.8, 1, 0.8, 0]),
                            rotateY: useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45])
                        }}
                    >
                        {icon}
                    </motion.div>

                    {/* Step Number Badge */}
                    <motion.div 
                        className="absolute -top-4 -right-4 z-30 bg-black text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                        style={{
                            scale: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1.2, 1]),
                            rotate: useTransform(scrollYProgress, [0.4, 0.5], [-90, 0])
                        }}
                    >
                        {index}
                    </motion.div>

                    {/* Vertical Connecting Line */}
                    {!lastItem && (
                        <div className="hidden md:block absolute top-16 bottom-[-180px] w-1 bg-gray-100/50 rounded-full overflow-hidden">
                            <motion.div 
                                className="w-full h-full bg-gradient-to-b from-indigo-500 via-orange-500 to-transparent"
                                style={{
                                    scaleY: useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1.2, 1]),
                                    opacity: useTransform(scrollYProgress, [0.4, 0.5], [0.1, 1]),
                                    originY: 0
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Container (Card + GIF) - Popping at Center */}
            <motion.div 
                className={`flex-1 flex flex-col md:flex-row gap-8 md:gap-12 items-center ${side === 'left' ? 'md:flex-row-reverse' : ''}`}
                style={{
                    scale: useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.8, 0.9, 1.05, 1, 0.9]),
                    opacity: useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0, 0.5, 1, 0.8, 0]),
                    y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0]),
                    rotateX: useTransform(scrollYProgress, [0.3, 0.5], [10, 0]),
                    transformPerspective: 1000
                }}
            >
                {/* Content Card (2/3 width) */}
                <motion.div 
                    className="w-full md:w-2/3"
                    style={{
                        x: typeof window !== 'undefined' && window.innerWidth > 768 
                            ? useTransform(scrollYProgress, [0.3, 0.5], [side === 'right' ? 80 : -80, 0])
                            : 0
                    }}
                >
                    <div className="relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/60 backdrop-blur-xl border-2 border-indigo-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] transition-all duration-700 group-hover:border-indigo-400 group-hover:-translate-y-2">
                        {/* Corner Decoration */}
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                            <CheckCircle2 className="w-16 h-16 text-indigo-600" />
                        </div>

                        <div className="mb-4 md:mb-6">
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-1 md:mb-2 block">PHASE 0{index}</span>
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">{title}</h3>
                        </div>

                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 md:mb-8 font-medium">
                            {description}
                        </p>

                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-indigo-50 shadow-sm flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                                LIVE QUALITY TRACKING
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Animation/GIF side (1/3 width) */}
                <motion.div 
                    className="w-full md:w-1/3"
                    style={{
                        rotate: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [side === 'right' ? 10 : -10, 0, side === 'right' ? -10 : 10]),
                        scale: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.8, 1.2, 0.9])
                    }}
                >
                    <div className="relative group/gif">
                        <img 
                            src={gif} 
                            alt={`${title} process animation`} 
                            className="relative z-10 w-full h-auto rounded-[2rem] hover:scale-110 transition-transform duration-700 select-none pointer-events-none"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MileStone;