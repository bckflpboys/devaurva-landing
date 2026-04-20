import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
    const { scrollY, scrollYProgress } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    // Track the right edge of the fill for the "wave" effect
    const edgePosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const handleOrientation = (e) => {
            const x = Math.max(-10, Math.min(10, (e.gamma || 0) / 4));
            const y = Math.max(-5, Math.min(5, (e.beta - 45 || 0) / 6));
            setTilt({ x, y });
        };

        if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation);
        }
        return () => window.removeEventListener("deviceorientation", handleOrientation);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && !scrolled) {
            setScrolled(true);
        } else if (latest <= 50 && scrolled) {
            setScrolled(false);
        }
    });

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center transition-all duration-500 py-4 h-auto pointer-events-none">
            <motion.nav 
                style={{
                    rotateY: tilt.x,
                    rotateX: tilt.y,
                    x: tilt.x * 2,
                    y: tilt.y * 2
                }}
                className={`
                    relative flex items-center justify-between px-6 lg:px-12 py-3 transition-shadow duration-500 pointer-events-auto overflow-hidden
                    ${scrolled 
                        ? "w-[95%] max-w-screen-xl bg-white/90 backdrop-blur-2xl border-2 border-indigo-600/40 shadow-2xl rounded-full" 
                        : "w-[98%] max-w-screen-xl bg-white/20 backdrop-blur-lg border-2 border-indigo-500/30 rounded-full shadow-xl"
                    }
                `}
                aria-label="Main Navigation"
            >
                {/* Horizontal Liquid Progress Fill */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-400/25 to-indigo-600/30 -z-10 origin-left"
                    style={{ 
                        scaleX: scrollYProgress,
                    }}
                />

                {/* Shimmering Surface Movement */}
                <motion.div 
                    className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] -z-10 origin-left"
                    style={{ 
                        scaleX: scrollYProgress,
                        backgroundSize: "200% 100%"
                    }}
                    animate={{
                        backgroundPosition: ["200% 0%", "-200% 0%"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Leading Edge "Wave" Glow */}
                <motion.div 
                    className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent -z-5 blur-sm"
                    style={{ left: edgePosition }}
                />

                <div className="flex items-center gap-2 relative z-10">
                    <Link to="/" className="relative group flex items-center transition-transform hover:scale-105 active:scale-95">
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient tracking-tight">
                            DevAurva
                        </span>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all group-hover:w-full"></div>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex flex-row items-center space-x-8 font-medium text-gray-700">
                        {["Features", "Client Projects", "Pricing"].map((item) => (
                            <li key={item}>
                                <a 
                                    href={`/#${item.toLowerCase().replace(" ", "")}`} 
                                    className="relative transition-colors hover:text-indigo-600 group py-1"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link 
                        to="/custom-plan" 
                        className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-4 py-2"
                    >
                        Customized Pricing
                    </Link>
                    <a 
                        href="/#contact" 
                        className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-black rounded-full shadow-md group border border-zinc-800"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-600 group-hover:translate-x-0 ease">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">Contact</span>
                        <span className="relative invisible">Contact</span>
                    </a>
                </div>

                <div className="md:hidden pointer-events-auto">
                    <MobileMenu />
                </div>
            </motion.nav>
        </div>
    );
};

export default NavBar;
