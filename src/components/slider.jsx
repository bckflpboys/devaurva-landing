
import { motion } from "framer-motion";

const Slider = ({ images }) => {
  const imagesArr = [...images, ...images]; // Duplicating the array for a smoother loop

  return (
    <div className="h-[200px] relative overflow-hidden mx-auto max-w-screen-xl">
      <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent
            after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent"></div>
      <motion.div className="flex" animate={{
        x: ["0%", `-${(images.length) * 100}%`], // Adjust x translation to cover all images
        transition: {
          ease: "linear",
          duration: images.length * 10, // Adjust duration based on the number of images
          repeat: Infinity,
        }
      }}>
        {imagesArr.map((image, index) => (
          <div key={index} className="h-full flex-shrink-0">
            <div className="flex items-center justify-center h-[200px]">
              <img src={image.logo} alt={image.name} className="h-full object-contain opacity-75 max-w-full" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;





