import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import {
    TrendingUp,
    Share2,
    MessageSquare,
    BarChart3,
    Target,
    Zap,
    CheckCircle2,
    ArrowRight,
    Search,
    DollarSign
} from "lucide-react";
import { marketingServices } from "../data/marketing";

const MarketingCard = ({ item, index, isDark, isOrange, isGreen, onContactClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative backdrop-blur-3xl border rounded-[2rem] p-8 transition-all duration-700 overflow-hidden ${isDark
                    ? "bg-zinc-900/40 border-white/5 hover:border-white/20"
                    : "bg-white/40 border-zinc-100 hover:border-zinc-300 shadow-xl"
                } ${isOrange ? 'hover:border-orange-500/30' : (isGreen ? 'hover:border-emerald-500/30' : 'hover:border-indigo-500/30')}`}
        >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-2xl font-black tracking-tight transition-colors duration-700 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                    <div className="text-right">
                        <div className={`text-xl font-black leading-none ${isOrange ? 'text-orange-500' : (isGreen ? 'text-emerald-500' : 'text-indigo-600')}`}>{item.price}</div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{item.unit}</div>
                    </div>
                </div>

                <p className={`text-sm font-medium mb-8 leading-relaxed transition-colors duration-700 ${isDark ? "text-zinc-400" : "text-gray-600"}`}>
                    {item.description}
                </p>

                <ul className="space-y-3 mb-8">
                    {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isOrange ? 'text-orange-500' : (isGreen ? 'text-emerald-500' : 'text-indigo-600')}`} />
                            <span className={`text-sm font-medium transition-colors duration-700 ${isDark ? "text-zinc-300" : "text-gray-700"}`}>{detail}</span>
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={onContactClick}
                    className={`w-full py-4 rounded-xl border font-bold text-sm uppercase tracking-widest transition-all ${isDark
                    ? `bg-white/5 border-white/10 text-white ${isOrange ? 'hover:bg-orange-500/10 hover:border-orange-500/50' : (isGreen ? 'hover:bg-emerald-500/10 hover:border-emerald-500/50' : 'hover:bg-white/10 hover:border-indigo-500/50')}`
                    : `${isOrange ? 'bg-orange-600 border-orange-600 hover:bg-orange-700 shadow-orange-500/20' : (isGreen ? 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20')} text-white shadow-lg`
                    }`}>
                    Get Started
                </button>
            </div>

            {/* Decorative background glow */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[50px] transition-all duration-700 rounded-full ${isDark
                ? (isOrange ? "bg-orange-600/5 group-hover:bg-orange-600/10" : (isGreen ? "bg-emerald-600/5 group-hover:bg-emerald-600/10" : "bg-indigo-600/5 group-hover:bg-indigo-600/10"))
                : (isOrange ? "bg-orange-500/10" : (isGreen ? "bg-emerald-500/10" : "bg-indigo-500/10"))}`} />
        </motion.div>
    );
};

const MarketingSalesSection = ({ onEnquire }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start center"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5],
        ["#ffffff", "#ffffff", "#080808"]
    );

    const textColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5],
        ["#111827", "#111827", "#ffffff"]
    );

    const mutedTextColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5],
        ["#4b5563", "#4b5563", "#71717a"]
    );

    // Boolean to switch component styles
    const [isDark, setIsDark] = useState(false);

    // Update isDark state based on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.4 && !isDark) setIsDark(true);
        if (latest <= 0.4 && isDark) setIsDark(false);
    });

    // Removed local scrollToContact to use parent onEnquire logic


    return (
        <motion.section
            ref={containerRef}
            id="marketing-services"
            style={{ backgroundColor }}
            className="relative py-24 md:py-40 overflow-hidden transition-colors duration-1000"
        >
            {/* Top Transition Gradient - User Liked This */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent opacity-100 z-[1] pointer-events-none" />

            {/* Background Ambient Effects - only visible when dark */}
            <motion.div
                style={{ opacity: isDark ? 1 : 0 }}
                className="absolute inset-0 transition-opacity duration-1000 z-0"
            >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-black uppercase tracking-[0.5em] text-emerald-600 mb-6 block"
                    >
                        Growth & Presence
                    </motion.span>
                    <motion.h2
                        style={{ color: textColor }}
                        className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10 transition-colors duration-700"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            DOMINATE
                        </motion.span> <br />
                        <span className={`transition-colors duration-1000 ${isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-white" : "text-emerald-600"}`}>
                            DIGITALLY
                        </span>
                    </motion.h2>
                    <motion.p
                        style={{ color: mutedTextColor }}
                        className="text-xl md:text-2xl font-medium max-w-3xl mx-auto transition-colors duration-700"
                    >
                        Custom-engineered digital marketing and paid advertising ecosystem designed to scale your brand and outperform competition.
                    </motion.p>
                </div>

                {/* Categories */}
                {marketingServices.map((category, catIdx) => {
                    const isAds = category.category === "Digital Paid Advertising";
                    const isGrowth = category.category === "Digital Marketing";
                    return (
                        <div 
                            key={catIdx} 
                            id={category.category === "Digital Paid Advertising" ? "paid-advertising" : "digital-marketing"}
                            className={(catIdx > 0 ? "mt-32 md:mt-48" : "") + " scroll-mt-24"}
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-1 rounded-full ${isAds ? 'bg-orange-600' : 'bg-emerald-600'}`} />
                                        <span className={`font-black uppercase tracking-[0.3em] text-sm ${isAds ? 'text-orange-600' : 'text-emerald-600'}`}>{category.category}</span>
                                    </div>
                                    <motion.h3
                                        style={{ color: textColor }}
                                        className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 transition-colors duration-700"
                                    >
                                        {category.category === "Digital Marketing" ? "Social Velocity" : "Precision Advertising"}
                                    </motion.h3>
                                    <motion.p
                                        style={{ color: mutedTextColor }}
                                        className="text-lg md:text-xl font-medium leading-relaxed transition-colors duration-700"
                                    >
                                        {category.description}
                                    </motion.p>
                                </div>

                                <div className="flex gap-4">
                                    <div className={`p-4 rounded-2xl border flex items-center justify-center transition-all duration-700 ${isDark
                                        ? "bg-zinc-900 border-white/5"
                                        : (isAds ? "bg-orange-50 border-orange-100" : "bg-emerald-50 border-emerald-100")}`}>
                                        {category.category === "Digital Marketing" ? <Share2 className="text-emerald-600 w-8 h-8" /> : <Target className="text-orange-600 w-8 h-8" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl border flex items-center justify-center transition-all duration-700 ${isDark
                                        ? "bg-zinc-900 border-white/5"
                                        : (isAds ? "bg-orange-50 border-orange-100" : "bg-emerald-50 border-emerald-100")}`}>
                                        {category.category === "Digital Marketing" ? <MessageSquare className="text-emerald-600 w-8 h-8" /> : <BarChart3 className="text-orange-600 w-8 h-8" />}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                {category.items.map((item, idx) => (
                                    <MarketingCard 
                                        key={idx} 
                                        item={item} 
                                        index={idx} 
                                        isDark={isDark} 
                                        isOrange={isAds} 
                                        isGreen={isGrowth} 
                                        onContactClick={() => onEnquire({
                                            category: isAds ? "Digital Paid Ads" : (item.title.includes("Social") || item.title.includes("Distribution") ? "Social Media Management" : "Digital Marketing/Branding"),
                                            message: item.title
                                        })}
                                    />
                                ))}
                            </div>

                            {/* Summary Matrix for the category */}
                            <motion.div
                                className={`mt-12 overflow-hidden rounded-[2.5rem] border backdrop-blur-2xl px-8 py-10 transition-all duration-1000 ${isDark
                                    ? "bg-zinc-900/20 border-white/10"
                                    : (isAds ? "bg-orange-50/50 border-orange-100" : "bg-emerald-50/50 border-emerald-100")
                                    }`}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {[
                                        { label: "Industry Standard", value: "Optimized" },
                                        { label: "Targeting", value: "Precision" },
                                        { label: "Support", value: "Priority" },
                                        { label: "Delivery", value: "Rapid" }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-700 ${isDark
                                                ? "text-zinc-500"
                                                : (isAds ? "text-orange-500/60" : "text-emerald-500/60")}`}>{stat.label} Stat</div>
                                            <motion.div
                                                style={{ color: textColor }}
                                                className="font-black text-2xl tracking-tighter italic transition-colors duration-700"
                                            >
                                                {stat.value}
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}

                {/* Final CTA / Contact Bridge */}
                <motion.div
                    className={`mt-32 md:mt-48 text-center rounded-[3rem] p-12 md:p-24 border backdrop-blur-3xl relative overflow-hidden group transition-all duration-1000 ${isDark
                        ? "bg-gradient-to-b from-orange-600/40 via-black/40 to-black/90 border-orange-500/20 shadow-2xl shadow-orange-500/10"
                        : "bg-gradient-to-b from-orange-50 to-white border-orange-100 shadow-2xl shadow-orange-500/5"
                        }`}
                >
                    <div className="relative z-10">
                        <motion.h3
                            style={{ color: textColor }}
                            className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-8 transition-colors duration-700"
                        >
                            READY TO SCALE <br /> YOUR EMPIRE?
                        </motion.h3>
                        <motion.p
                            style={{ color: mutedTextColor }}
                            className="text-xl font-medium max-w-2xl mx-auto mb-12 transition-colors duration-700"
                        >
                            Our team is ready to deploy custom marketing solutions tailored to your unique business objectives. Let's start the journey.
                        </motion.p>
                        <motion.button
                            onClick={() => onEnquire({ 
                                category: ["Digital Marketing/Branding", "Digital Paid Ads"], 
                                message: "Ready to scale my brand" 
                            })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-4 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-700 ${isDark
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "bg-orange-600 text-white hover:bg-orange-700 shadow-xl shadow-orange-500/20"
                                }`}
                        >
                            Launch Campaign <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Background decorations */}
                    <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors duration-1000 ${isDark ? "bg-emerald-500/20" : "bg-emerald-200/20"}`} />
                    <div className={`absolute bottom-0 left-0 w-64 h-64 blur-[100px] rounded-full -ml-32 -mb-32 transition-colors duration-1000 ${isDark ? "bg-orange-500/20" : "bg-orange-200/20"}`} />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default MarketingSalesSection;
