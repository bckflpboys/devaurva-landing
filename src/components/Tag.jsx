import { motion } from "framer-motion";

const Tag =({ children }) => {
    return (
        <motion.div 
            className="tag text-xs leading-5 font-medium text-indigo-600 rounded-full py-1 px-3 flex items-center w-fit mx-auto mb-4 relative"
            initial={{ 
                borderColor: "#818cf8",
                backgroundColor: "rgba(99, 102, 241, 0.15)"
            }}
            animate={{
                borderColor: ["#818cf8", "#fb923c", "#818cf8"],
            }}
            whileHover={{
                backgroundColor: ["rgba(99, 102, 241, 0.2)", "rgba(249, 115, 22, 0.2)", "rgba(99, 102, 241, 0.2)"],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            }}
            style={{
                border: "1.5px solid",
            }}
        >
            {children}
        </motion.div>
   );
};

export default Tag;