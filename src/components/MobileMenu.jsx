import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
    {
        title: "Features",
        url: "#features",
    },
    {
        title: "Projects",
        url: "#projects",
    },
    {
        title: "Pricing",
        url: "#pricing",
    },
    {
        title: "Customized Pricing",
        url: "/custom-plan",
        isCustomLink: true
    },
    {
        title: "Contact Us",
        url: "#contact",
    },
];

const MobileMenu = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className="block md:hidden">
            {!navOpen ? (
                <button onClick={() => setNavOpen(true)}>
                    <Menu size={32} />
                </button>
            ) : (
                <>
                    <button onClick={() => setNavOpen(false)}>
                        <X size={32} />
                    </button>
                    <div className="absolute left-0 w-full top-20 bg-white/60 backdrop-blur-lg border-b border-t">
                        <ul className="flex flex-col space-y-4 mt-4">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    {item.isCustomLink ? (
                                        <Link
                                            to={item.url}
                                            className="block p-4 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
                                            onClick={() => setNavOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.url}
                                            className="block text-gray-600 p-4 font-semibold"
                                            onClick={() => setNavOpen(false)}
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default MobileMenu;