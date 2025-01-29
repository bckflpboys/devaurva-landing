import { pricingPlans } from "../data/pricing";
import PlanCard from "./PlanCard";
import TagLine from "./TagLine";

const PricingSection = () => {
    return (
        <section id="pricing" className="flex text-center py-20 px-6 items-center justify-center flex-col">
            <TagLine>Pricing</TagLine>
            <h2 className="font-extrabold text-3xl mb-8 pt-3">Flexible Pricing to Fit Your Growth</h2>
            <div className="grid mt-12 items-start grid-cols-1 gap-8 md:grid-cols-3 max-w-screen-xl w-full">
                {pricingPlans.map((plan, index) => (
                    <PlanCard
                        key={index}
                        {...plan}
                    />
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
