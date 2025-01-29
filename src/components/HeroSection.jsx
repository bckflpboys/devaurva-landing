import demoUrl from "../assets/demo.png";
import Tag from "./Tag";
import {ChevronRight} from "lucide-react"
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section className="hero-section text-center mt-32 flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Tag>
                    <div className="flex items-center cursor-pointer">
                        <span>Nexx v0.12</span>
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
                    Launch Your Website
                </span>
            </motion.h1>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-5 text-gray-600 sm:text-xl max-w-2xl mx-auto flex flex-col gap-2"
            >
                <span>Pay only for the features you need and scale as your business grows.</span>
                <span>Launch your professional website in weeks, not months, with our streamlined development process.</span>
            </motion.h2>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mx-auto mt-5 max-w-fit space-x-4"
            >
                <a href="#get-started" className="rounded-full mx-auto max-w-fit px-5 py-2 text-sm font-medium shadow-sm border-black bg-black text-white hover:ring-gray-400 hover:ring-2">Get Started</a>
                <a href="#features" className="rounded-full mx-auto max-w-fit px-5 py-2 text-sm font-medium shadow-sm border-gray-300 bg-white text-black hover:ring-gray-400 hover:ring-2">Learn More</a>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-5 items-center justify-center"
            >
                <img src={demoUrl} alt="Demo" className="mx-auto max-h-[300px] sm:max-h-[500px]" />
            </motion.div>
        </section>
    );
};

export default HeroSection;