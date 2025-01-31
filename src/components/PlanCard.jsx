import { Check, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PlanCard = ({ priceRange, title, description, features, isPopular, isCustom, tag }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (isCustom) {
            navigate('/custom-plan');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`plan-card ring-1 ${
                isCustom 
                    ? 'ring-purple-500 shadow-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50' 
                    : isPopular 
                        ? 'ring-indigo-500 shadow-indigo-100' 
                        : 'ring-gray-300'
            } shadow-lg flex flex-col justify-between ${!isCustom && 'bg-white'} rounded-2xl h-full p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 text-left relative`}
        >
            {tag && (
                <div className={`tag absolute -top-4 left-1/2 -translate-x-1/2 ${
                    isCustom 
                        ? 'bg-purple-600' 
                        : isPopular 
                            ? 'bg-indigo-600' 
                            : 'bg-gray-700'
                } text-white px-4 py-1 rounded-full text-sm font-medium`}>
                    {tag}
                </div>
            )}
            <div>
                <h2 className="font-bold text-2xl mt-3 text-gray-900">
                    {title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <div className="mt-4 mb-6">
                    <div className="text-4xl font-extrabold text-gray-900">
                        {priceRange}
                    </div>
                </div>
                <div className="border-t border-gray-200 my-6"></div>
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                            <div className="mt-1">
                                <div className={`w-4 h-4 ${
                                    isCustom 
                                        ? 'bg-purple-600' 
                                        : isPopular 
                                            ? 'bg-indigo-600' 
                                            : 'bg-gray-700'
                                } rounded-full flex items-center justify-center flex-shrink-0`}>
                                    {isCustom ? <Plus className="text-white w-3 h-3" /> : <Check className="text-white w-3 h-3" />}
                                </div>
                            </div>
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button 
                onClick={handleClick}
                className={`group flex items-center justify-center gap-2 w-full mt-8 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isCustom 
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : isPopular 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                {isCustom ? 'Build Your Plan' : 'Get Started'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
        </motion.div>
    );
};

export default PlanCard;