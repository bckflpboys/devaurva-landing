import { motion } from "framer-motion";
import { techStack } from "../data/partners";
import { useState } from "react";
import TagLine from "./TagLine";

const Slider = () => {
  const [imageErrors, setImageErrors] = useState({});
  // Triple the array to ensure smooth looping
  const imagesArr = [...techStack, ...techStack, ...techStack];

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredImages = imagesArr.filter(tech => !imageErrors[tech.id]);

  return (
    <section className="py-12">
      <TagLine>Our Tech Stack</TagLine>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center mb-8"
      >
        <h2 className="font-extrabold text-4xl mb-4 pt-3">Powered by Modern Technology</h2>
        <p className="text-gray-600">We use cutting-edge technologies to deliver scalable and reliable solutions</p>
      </motion.div>

      <div className="h-[120px] relative overflow-hidden mx-auto max-w-screen-xl my-12">
        <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent
              after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent"></div>
        <motion.div 
          className="flex"
          animate={{
            x: [`0%`, `-${100/3}%`]
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            width: `${filteredImages.length * 160}px`
          }}
        >
          {filteredImages.map((tech, index) => (
            <div key={`${tech.id}-${index}`} className="h-full flex-shrink-0">
              <div className="flex flex-col items-center justify-center h-[120px] w-[160px] px-4">
                <div className="h-[40px] w-[80px] flex items-center justify-center mb-2 bg-white rounded-lg">
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="max-h-[40px] max-w-[80px] w-auto object-contain"
                    onError={() => handleImageError(tech.id)}
                  />
                </div>
                <span className="text-xs text-gray-600 text-center font-medium">{tech.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Slider;
