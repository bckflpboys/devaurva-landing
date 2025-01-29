import demoUrl from "../assets/demo.png";
import Tag from "./Tag";
import {ChevronRight} from "lucide-react"

const HeroSection = () => {
        return (
            <section className="hero-section text-center mt-32 flex flex-col">
                <Tag>
                    <div className="flex items-center cursor-pointer">
                        <span>
                    Nexx v0.12
                        </span>
                        <ChevronRight className="w-6 h-6 ml-1 text-indigo-300 overflow-visible"/>
                    </div>
                    </Tag>
                <h1 className="text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl" >With DevAura
                <br />
                <span className="bg-gradient-to-r from-indigo-500 via-orange-600 to-indigo-500 bg-clip-text text-transparent">
                    Launch Your Website
                </span>
                </h1>
                <h2 className="mt-5 text-gray-600 sm:text-xl">
                Build a modern and responsive landing page for your SAAS with React and Tailwind 
                </h2>
                <div className="mx-auto mt-5 max-w-fit space-x-4">
                    <a href="#get-started" className="rounded-full mx-auto max-w-fit px-5 py-2 text-sm font-medium shadow-sm border-black bg-black text-white hover:ring-gray-400 hover:ring-2">Get Started</a>
                    <a href="#features" className="rounded-full mx-auto max-w-fit px-5 py-2 text-sm font-medium shadow-sm border-gray-300 bg-white text-black hover:ring-gray-400 hover:ring-2">Learn More</a>
                </div>
                <div className="mt-5 items-center justify-center">
                    <img src={demoUrl} alt="Demo" className="mx-auto max-h-[300px] sm:max-h-[500px] "> 
                    
                    </img>
                    
                </div>
            </section>
        );
};

export default HeroSection;