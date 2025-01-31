import { pricingPlans } from "../data/pricing";
import PlanCard from "./PlanCard";
import TagLine from "./TagLine";
import { motion } from "framer-motion";

const PricingSection = () => {
    return (
        <section id="pricing" className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
            <TagLine>Pricing Plans</TagLine>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
            >
                <h2 className="font-extrabold text-4xl mb-4 pt-3">Choose Your Perfect Plan</h2>
                <p className="text-gray-600">Select the perfect plan that aligns with your business goals and budget. All plans include our quality assurance guarantee.</p>
            </motion.div>
            
            <div className="flex justify-center mb-8 mt-12">
                <a 
                    href="/custom-plan" 
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                >
                    <span className="relative z-10">Customize Your Plan</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </a>
            </div>
            
            <div className="grid mt-16 items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto px-4">
                {pricingPlans.map((plan, index) => (
                    <PlanCard
                        key={index}
                        {...plan}
                    />
                ))}
            </div>
            
            <div className="mt-12 text-center max-w-2xl mx-auto px-4">
                <p className="text-sm text-gray-600">
                    * All prices are in South African Rand (ZAR). Prices may vary based on specific requirements and customizations. Contact us for a detailed quote.
                </p>
            </div>
        </section>
    );
};

export default PricingSection;
