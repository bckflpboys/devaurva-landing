import demoUrl from "../assets/demo.png";
import Tag from "./Tag";
import {ChevronRight} from "lucide-react"
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const SubtitleWord = ({ word, index, totalWords, lineDelay }) => {
    const controls = useAnimationControls();
    const duration = 0.3; 
    const wordDelay = 1; 

    const shouldHighlight = word === "Pay" || word === "only" || 
                          word === "features" || word === "you" || word === "need";

    useEffect(() => {
        const animate = async () => {
            await controls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.3,
                    delay: lineDelay + index * 0.05,
                }
            });

            // Start both animations
            controls.start({
                color: ["#6366f1", "#f97316", "#6366f1"],
                backgroundColor: shouldHighlight 
                    ? ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.15)", "rgba(0, 0, 0, 0)"]
                    : ["rgba(0, 0, 0, 0)"],
                transition: {
                    color: {
                        duration: duration * totalWords,
                        delay: wordDelay + (index * duration),
                        repeat: Infinity,
                        ease: "linear"
                    },
                    backgroundColor: shouldHighlight ? {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                    } : {}
                }
            });
        };
        
        animate();
    }, [controls, index, totalWords]);

    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className={`inline-block ${shouldHighlight ? "px-1 rounded" : ""}`}
        >
            {word}
        </motion.span>
    );
};

const HeroSection = () => {
    const subtitleWords1 = "Pay only for the features you need and scale as your business grows.".split(" ");

    return (
        <section className="hero-section text-center mt-32 flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Tag>
                    <div className="flex items-center cursor-pointer" onClick={() => document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' })}>
                        <span>Create Now</span>
                        <ChevronRight className="w-6 h-6 ml-1 text-indigo-300 overflow-visible"/>
                    </div>
                </Tag>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl"
            >
                With DevAura
                <br />
                <span className="bg-gradient-to-r from-indigo-500 via-orange-600 to-indigo-500 bg-clip-text text-transparent">
                    Launch in Weeks
                </span>
            </motion.h1>

            <motion.div 
                className="mt-5 text-gray-600 sm:text-xl max-w-2xl mx-auto flex flex-col gap-4"
            >
                <div className="flex flex-wrap justify-center gap-x-2">
                    {subtitleWords1.map((word, index) => (
                        <SubtitleWord
                            key={index}
                            word={word}
                            index={index}
                            totalWords={subtitleWords1.length}
                            lineDelay={0.4}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="mx-auto mt-8 max-w-fit space-x-4"
            >
                <a href="#pricing" className="rounded-full mx-auto max-w-fit px-5 py-2 text-sm font-medium shadow-sm border-black bg-black text-white hover:ring-gray-400 hover:ring-2">Get Started</a>
                <a href="#features" className="rounded-full mx-auto max-w-fit px-5 py-2 text-sm font-medium shadow-sm border-gray-300 bg-white text-black hover:ring-gray-400 hover:ring-2">Learn More</a>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="mt-5 items-center justify-center"
            >
                <img src={demoUrl} alt="Demo" className="mx-auto max-h-[300px] sm:max-h-[500px]" />
            </motion.div>
        </section>
    );
};

export default HeroSection;