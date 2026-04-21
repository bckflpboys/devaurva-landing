import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    {
        title: "Our Services",
        isDropdown: true,
        subItems: [
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
        ]
    },
    {
        title: "Client Projects",
        url: "/#projects",
    },
    {
        title: "Pricing",
        url: "/#pricing",
    },
    {
        title: "Customized Pricing",
        url: "/custom-plan",
        isCustomLink: true
    },
    {
        title: "Contact Us",
        url: "/#contact",
    },
];

const MobileMenu = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (navOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setServicesOpen(false); // Reset services when closing main menu
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [navOpen]);

    const menuOverlay = (
        <AnimatePresence>
            {navOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="fixed inset-0 z-[9999] bg-white flex flex-col p-8 overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            DevAurva
                        </span>
                        <button 
                            onClick={() => setNavOpen(false)}
                            className="p-2 bg-gray-100 rounded-full transition-transform active:scale-90"
                            aria-label="Close Menu"
                        >
                            <X size={28} className="text-gray-900" />
                        </button>
                    </div>

                    <ul className="flex flex-col space-y-4">
                        {navItems.map((item, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                {item.isDropdown ? (
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => setServicesOpen(!servicesOpen)}
                                            className={`block w-full p-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-between group
                                                ${servicesOpen ? "bg-indigo-50 text-indigo-600 border-2 border-indigo-200" : "bg-gray-50 text-gray-900"}`}
                                        >
                                            {item.title}
                                            <motion.div
                                                animate={{ rotate: servicesOpen ? 180 : 0 }}
                                                className="text-indigo-400"
                                            >
                                                ^
                                            </motion.div>
                                        </button>
                                        
                                        <AnimatePresence>
                                            {servicesOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-gray-50/50 rounded-3xl border border-gray-100 mt-2"
                                                >
                                                    <div className="p-2 grid grid-cols-1 gap-1">
                                                        {item.subItems.map((sub, sIdx) => (
                                                            <a
                                                                key={sIdx}
                                                                href={`/#${sub.id}`}
                                                                onClick={() => setNavOpen(false)}
                                                                className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all flex items-center justify-between group"
                                                            >
                                                                {sub.name}
                                                                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : item.isCustomLink ? (
                                    <Link
                                        to={item.url}
                                        className="block w-full p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-indigo-200"
                                        onClick={() => setNavOpen(false)}
                                    >
                                        <div className="flex items-center justify-between">
                                            {item.title}
                                            <ChevronRight size={20} />
                                        </div>
                                    </Link>
                                ) : (
                                    <a
                                        href={item.url}
                                        className={`block w-full p-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-between group
                                            ${item.title === "Contact Us" 
                                                ? "bg-black text-white shadow-xl shadow-gray-200" 
                                                : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setNavOpen(false)}
                                    >
                                        {item.title}
                                        <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-12 pt-10 text-center border-t border-gray-100">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Leading Digital Agency</p>
                        <div className="flex justify-center gap-6">
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 font-black text-[10px]">FB</div>
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 font-black text-[10px]">IG</div>
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 font-black text-[10px]">LN</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="block md:hidden">
            <button 
                onClick={() => setNavOpen(true)}
                className="p-2 transition-transform active:scale-90"
                aria-label="Open Menu"
            >
                <Menu size={32} className="text-gray-900" />
            </button>
            {typeof document !== 'undefined' && createPortal(menuOverlay, document.body)}
        </div>
    );
};

export default MobileMenu;