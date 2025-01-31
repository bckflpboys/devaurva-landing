import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from "./components/HeroSection";
import { techStack } from "./data/partners";
import Slider from './components/Slider';
import RoadMapSection from './components/RoadMapSection';
import FeaturesSection from './components/FeaturesSection';
import ProjectsSection from './components/ProjectsSection';
import PricingSection from './components/PricingSection';
import Footer from "./components/Footer";
import Contact from './components/Contact';
import CustomPlanBuilder from './pages/custom-plan';
import ScrollToTop from './components/ScrollToTop';

// Home page component
const Home = () => {
  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => { 
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen fixed z-0 justify-center px-6 py-40 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-55"></div>
        <img src="/mesh.svg" className="opacity-15 absolute bottom-1 h-[600px] z-10" alt="mesh background" />
        <div className='bg-gradient-to-c from-transparent via-transparent to-white absolute inset-0 z-20'></div>
      </div>
      <div className="relative z-20">
        <div className='container mx-auto'>
          <HeroSection />
          <Slider />
          <RoadMapSection />
          <FeaturesSection />
          <ProjectsSection />
          <PricingSection />
          <Contact />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/custom-plan" element={<CustomPlanBuilder />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
