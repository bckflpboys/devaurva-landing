import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { ChevronDown } from "lucide-react";

const NavBar = ({ isHidden }) => {
    const { scrollY, scrollYProgress } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [showServices, setShowServices] = useState(false);
    const dropdownRef = useRef(null);

    const servicesList = [
        { name: "App Development", id: "apps-bento" },
        { name: "Website Development", id: "websites-bento" },
        { name: "Internal Systems", id: "systems-bento" },
        { name: "Browser Extensions", id: "extensions-bento" },
        { name: "Roadmap", id: "roadmap" },
        { name: "Client Projects", id: "projects" },
        { name: "Pricing Plans", id: "pricing" },
        { name: "Standalone Services", id: "quick-services" },
        { name: "Digital Marketing", id: "digital-marketing" },
        { name: "Paid Advertising", id: "paid-advertising" }
    ];

    // Track the right edge of the fill for the "wave" effect
    const edgePosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const handleOrientation = (e) => {
            const x = Math.max(-10, Math.min(10, (e.gamma || 0) / 4));
            const y = Math.max(-5, Math.min(5, (e.beta - 45 || 0) / 6));
            setTilt({ x, y });
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowServices(false);
            }
        };

        if (typeof window !== "undefined") {
            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", handleOrientation);
            }
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                initial={false}
                animate={{
                    y: isHidden ? -120 : (tilt.y * 2),
                    opacity: isHidden ? 0 : 1,
                    rotateY: isHidden ? 0 : tilt.x,
                    rotateX: isHidden ? 0 : tilt.y,
                    x: isHidden ? 0 : (tilt.x * 2)
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className={`
                    relative flex items-center justify-between px-6 lg:px-12 py-3 transition-shadow duration-500 pointer-events-auto overflow-visible
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

                <div className="flex items-center gap-2 relative z-10">
                    <Link to="/" className="relative group flex items-center transition-transform hover:scale-105 active:scale-95">
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient tracking-tight">
                            DevAurva
                        </span>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all group-hover:w-full"></div>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8 relative overflow-visible">
                    <ul className="flex flex-row items-center space-x-8 font-medium text-gray-700">
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowServices(!showServices)}
                                className={`flex items-center gap-1 transition-colors hover:text-indigo-600 group py-1 font-black uppercase text-xs tracking-widest ${showServices ? 'text-indigo-600' : ''}`}
                            >
                                Our Services
                                <motion.span
                                    animate={{ rotate: showServices ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-bold text-lg leading-none mb-1"
                                >
                                    ^
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {showServices && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-4 w-64 bg-white/95 backdrop-blur-3xl rounded-3xl border-2 border-indigo-500/20 shadow-2xl overflow-hidden p-2"
                                    >
                                        <div className="grid grid-cols-1 gap-1">
                                            {servicesList.map((service) => (
                                                <a
                                                    key={service.id}
                                                    href={`/#${service.id}`}
                                                    onClick={() => setShowServices(false)}
                                                    className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white hover:bg-indigo-600 rounded-2xl transition-all duration-300 flex items-center justify-between group"
                                                >
                                                    {service.name}
                                                    <ChevronDown className="w-3 h-3 -rotate-90 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                        {["Client Projects", "Pricing"].map((item) => (
                            <li key={item}>
                                <a
                                    href={`/#${item.toLowerCase().replace(" ", "")}`}
                                    className="relative transition-colors hover:text-indigo-600 group py-1 font-black uppercase text-xs tracking-widest"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/portfolio"
                                className="relative transition-colors hover:text-indigo-600 group py-1 font-black uppercase text-xs tracking-widest"
                            >
                                Portfolio
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/custom-plan"
                        className="text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-indigo-600 transition-colors px-4 py-2"
                    >
                        Customized Pricing
                    </Link>
                    <a
                        href="/#contact"
                        className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-black text-white transition duration-300 ease-out bg-black rounded-full shadow-md group border border-zinc-800"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-600 group-hover:translate-x-0 ease text-xs uppercase tracking-widest">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease text-[10px] uppercase tracking-widest">Contact</span>
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
