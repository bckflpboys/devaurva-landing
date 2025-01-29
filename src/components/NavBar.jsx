import { useState } from "react";
import logoUrl from "../assets/logo.png";
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

    const defaultClasses = "transition-all absolute inset-0 -z-1";
    let navBarClasses = scrolled 
        ? `${defaultClasses} border-b border-black/10 bg-white/75 backdrop-blur-sm` 
        : `${defaultClasses} bg-transparent`;

    return (
        <div className="sticky inset-x-0 top-0 w-full z-30">
            <div className={navBarClasses}></div>
            <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 relative">
                <div className="flex items-center justify-between">
                    <div>
                        <a href="/">
                            <img src={logoUrl} alt="logo" className="h-20 w-20" />
                        </a>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex flex-row space-x-4 p-4 font-semibold">
                            <li>
                                <a href="#features" className="text-grey-600">Features</a>
                            </li>
                            <li>
                                <a href="#projects" className="text-grey-600">Projects</a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-grey-600">Pricing</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="hidden md:block">
                        <a href="#contact" className="bg-black px-4 py-2 rounded-md text-white cursor-pointer ml-2">Contact</a>
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
