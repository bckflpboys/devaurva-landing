import { motion } from "framer-motion";
import { quickServices } from "../data/quickServices";
import TagLine from "./TagLine";
import { Mail, Server, TrendingUp, Share2, Check } from "lucide-react";

const iconMap = {
    Mail: <Mail className="w-8 h-8 text-indigo-600" />,
    Server: <Server className="w-8 h-8 text-indigo-600" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-indigo-600" />,
    Share2: <Share2 className="w-8 h-8 text-indigo-600" />
};

const QuickServicesSection = () => {
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
                    {quickServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col relative group overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {service.tag && (
                                <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
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

                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <span className="text-2xl font-extrabold text-indigo-600">
                                    {service.priceRange}
                                </span>
                            </div>

                            <ul className="space-y-3 flex-grow mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => {/* Will usually redirect to contact or open form */ window.location.href = '#contact' }}
                                className="w-full py-3 px-4 bg-gray-50 hover:bg-indigo-600 text-gray-900 hover:text-white font-semibold rounded-xl transition-colors duration-300 border border-gray-200 hover:border-transparent mt-auto"
                            >
                                Request Service
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickServicesSection;
