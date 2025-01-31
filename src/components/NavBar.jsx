import { useState } from "react";
import { Link } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 0 && !scrolled) {
            setScrolled(true);
        } else if (latest === 0 && scrolled) {
            setScrolled(false);
        }
    });

    const defaultClasses = "transition-all h-full w-full -z-1";
    let navBarClasses = scrolled 
        ? `${defaultClasses} border-b border-black/10 bg-white/75 backdrop-blur-sm` 
        : `${defaultClasses} bg-transparent`;

    return (
        <div className="sticky inset-x-0 top-0 w-full z-30 h-16">
            <div className={navBarClasses}></div>
            <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 absolute inset-0">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="relative group">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                                DevAura
                            </span>
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex flex-row space-x-4 p-4 font-semibold">
                            <li>
                                <Link to="/#features" className="text-grey-600">Features</Link>
                            </li>
                            <li>
                                <Link to="/#projects" className="text-grey-600">Projects</Link>
                            </li>
                            <li>
                                <Link to="/#pricing" className="text-grey-600">Pricing</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="hidden md:block">
                        <Link to="/#contact" className="bg-black px-4 py-2 rounded-md text-white cursor-pointer ml-2">Contact</Link>
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
