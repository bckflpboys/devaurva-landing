import { motion } from "framer-motion";
import { quickServices } from "../data/quickServices";
import TagLine from "./TagLine";
import { Mail, Server, TrendingUp, Share2, Check, ChevronRight } from "lucide-react";

const iconMap = {
    Mail: <Mail className="w-8 h-8 text-indigo-600" />,
    Server: <Server className="w-8 h-8 text-indigo-600" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-indigo-600" />,
    Share2: <Share2 className="w-8 h-8 text-indigo-600" />
};

const QuickServicesSection = ({ onEnquire }) => {
    const serviceCategoryMap = {
        "Business Email Setup": "Email Hosting",
        "Premium Hosting": "Webhosting",
        "SEO Boost": "SEO Boost",
        "Social Media Management": "Social Media Management"
    };

    return (
        <section id="quick-services" className="py-20 bg-gradient-to-b from-indigo-50/30 to-white relative" role="region" aria-labelledby="quick-services-heading">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] -top-32 -right-32"></div>
                <div className="absolute w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[80px] -bottom-32 -left-32"></div>
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-16">
                    <TagLine>Standalone Services</TagLine>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto mt-4"
                    >
                        <h2 id="quick-services-heading" className="font-extrabold text-4xl mb-4 text-gray-900">
                            Quick Service Solutions
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Don't need a full website package? We offer targeted services to enhance your existing online presence. Get precisely what you need, fast.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickServices.map((service, index) => {
                        const isMain = index === 1 || index === 2; // Making Hosting & SEO highlighted as examples, or just check tag
                        const isPrimary = service.tag === 'Essential' || service.tag === 'Growth';
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`bg-white rounded-2xl p-8 ring-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col relative group text-left h-full ${isPrimary
                                    ? 'ring-indigo-200 border border-indigo-200 shadow-indigo-100'
                                    : 'ring-gray-200 border border-gray-200'
                                    }`}
                            >
                                {/* We no longer need the gradient line if we mirror the pricing cards, or we can keep it inside for flavor */}

                                {service.tag && (
                                    <div className={`tag absolute -top-4 left-1/2 -translate-x-1/2 ${isPrimary
                                        ? 'bg-indigo-600'
                                        : 'bg-gray-700'
                                        } text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
                                        {service.tag}
                                    </div>
                                )}

                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {iconMap[service.icon]}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                                    {service.description}
                                </p>

                                <div className="mb-6 pb-6 border-b border-gray-200 mt-2">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {service.priceRange}
                                    </span>
                                </div>

                                <ul className="space-y-4 flex-grow mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700">
                                            <div className="mt-1">
                                                <div className={`w-4 h-4 ${isPrimary ? 'bg-indigo-600' : 'bg-gray-700'
                                                    } rounded-full flex items-center justify-center flex-shrink-0`}>
                                                    <Check className="text-white w-3 h-3" />
                                                </div>
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => onEnquire({
                                        category: serviceCategoryMap[service.title] || "Enquire/Get Quotes",
                                        message: `I'm interested in: ${service.features.join(', ')}`
                                    })}
                                    className={`group flex items-center justify-center gap-2 w-full mt-8 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${isPrimary
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-gray-400 text-white hover:bg-gray-500'
                                        }`}
                                >
                                    Request Service
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default QuickServicesSection;
