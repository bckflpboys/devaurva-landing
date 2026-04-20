import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
    const { scrollY, scrollYProgress } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && !scrolled) {
            setScrolled(true);
        } else if (latest <= 50 && scrolled) {
            setScrolled(false);
        }
    });

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center transition-all duration-500 py-4 h-auto pointer-events-none">
            <nav 
                className={`
                    relative flex items-center justify-between px-6 lg:px-12 py-3 transition-all duration-500 pointer-events-auto overflow-hidden
                    ${scrolled 
                        ? "w-[95%] max-w-screen-xl bg-white/95 backdrop-blur-2xl border-2 border-indigo-600/40 shadow-2xl rounded-full" 
                        : "w-[98%] max-w-screen-xl bg-white/30 backdrop-blur-lg border-2 border-indigo-500/30 rounded-full shadow-xl"
                    }
                `}
                aria-label="Main Navigation"
            >
                {/* Scroll Progress Fill */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 -z-10 origin-left"
                    style={{ scaleX: scrollYProgress }}
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
            </nav>
        </div>
    );
};

export default NavBar;
