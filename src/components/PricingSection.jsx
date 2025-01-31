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
            
            <div className="grid mt-16 items-start grid-cols-1 gap-8 lg:grid-cols-4 max-w-screen-xl mx-auto px-4">
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
