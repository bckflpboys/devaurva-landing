import { Milestone } from "lucide-react";
import MileStone from "./MileStone";

const roadmap = [
    {
    id: 1,
    name: "Project KickOff",
    description: "Kick-off meeting and requirement gathering",
    },
    {
        id: 2,
        name: "Design",
        description: "Design and prototype",
        },
        {
            id: 3,
            name: "Deployment",
            description: "Deploy and Final Testing",
            },
            {
                id: 1,
                name: "Maintenance",
                description: "Maintain and Support",
                },
];

const RoadMapSection = () => {
    return (
        <section className="max-w-80 mx-auto">
            <h1 className="font-semibold test-3xl text-center mb-16">Roadmap</h1>
            {
                roadmap.map((roadmapItem, index) => (
                <MileStone
            key={index}
            title={roadmapItem.name}
            description={roadmapItem.description}
            lastItem={index === roadmap.length - 1}
            />
            ))
            }
        </section>
    );
};

export default RoadMapSection;