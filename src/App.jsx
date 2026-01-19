
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import HeroSection from "./components/HeroSection";

import Slider from './components/slider';
import RoadMapSection from './components/RoadMapSection';
import FeaturesSection from './components/FeaturesSection';
import ProjectsSection from './components/ProjectsSection';
import PricingSection from './components/PricingSection';
import Footer from "./components/Footer";
import Contact from './components/Contact';
import CustomPlanBuilder from './pages/custom-plan';
import ScrollToTop from './components/ScrollToTop';
import Terms from './pages/terms';
import Refund from './pages/refund';
import Privacy from './pages/privacy';
import Landing from './pages/landing';
import PartnersSection from './components/PartnersSection';

// Home page component
const Home = () => {


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
          <PartnersSection />
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
