import MileStone from "./MileStone";
import TagLine from "./TagLine";
import { motion } from "framer-motion";

const roadmap = [
    {
        id: 1,
        name: "Project KickOff",
        description: "Kick-off meeting and requirement gathering"
    },
    {
        id: 2,
        name: "Design",
        description: "Design and prototype"
    },
    {
        id: 3,
        name: "Deployment",
        description: "Deploy and Final Testing"
    },
    {
        id: 4,
        name: "Maintenance",
        description: "Maintain and Support"
    }
];

const RoadMapSection = () => {
    return (
        <section className="py-20">
            <div className="text-center">
                <TagLine>Roadmap</TagLine>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-extrabold text-3xl mb-8 pt-3"
                >
                    Our Development Journey
                </motion.h2>
            </div>
            <div className="max-w-3xl mx-auto px-4">
                {roadmap.map((milestone, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <MileStone
                            title={milestone.name}
                            description={milestone.description}
                            lastItem={index === roadmap.length - 1}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RoadMapSection;