import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const ServiceFeature = ({ title, subtitle, description, image, color = "from-indigo-400 to-purple-400", isFirst = false }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(
        scrollYProgress,
        [0, 0.5],
        isFirst ? [1.25, 1] : [0.8, 1]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.2]);
    const buttonTextColor = useTransform(scrollYProgress, [0, 0.5], ["rgba(0,0,0,1)", "rgba(255,255,255,1)"]);
    const buttonBorderColor = useTransform(scrollYProgress, [0, 0.5], ["rgba(0,0,0,0.1)", "rgba(255,255,255,0.2)"]);

    return (
        <section ref={containerRef} className={`relative min-h-[90vh] flex flex-col items-center justify-center py-24 ${isFirst ? 'pt-40' : ''}`}>
            <motion.div
                style={{ opacity, y }}
                className="text-center z-10 px-6 max-w-4xl"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 block"
                >
                    {subtitle}
                </motion.span>
                <motion.h2
                    className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8 text-transparent bg-clip-text bg-gradient-to-b ${color}`}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-zinc-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto mb-12"
                >
                    {description}
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ color: buttonTextColor, borderColor: buttonBorderColor }}
                    className="flex items-center gap-2 group font-bold text-lg border-b-2 pb-2 transition-all duration-300"
                >
                    Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>

            <motion.div
                style={{ scale, opacity }}
                className="relative mt-20 w-full max-w-6xl px-6"
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none pointer-events-none"
                    loading="lazy"
                />

                {/* Decorative glow */}
                <motion.div
                    style={{ opacity: glowOpacity }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br ${color} blur-[120px] -z-10`}
                />
            </motion.div>
        </section>
    );
};

const BentoCard = ({ children, className, colSpan = "4", rowSpan = "2" }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const colSpans = {
        "1": "col-span-1",
        "2": "col-span-2",
        "4": "col-span-4",
        "6": "col-span-6",
        "8": "col-span-8",
        "12": "col-span-12"
    };

    const rowSpans = {
        "1": "row-span-1",
        "2": "row-span-2",
        "3": "row-span-3",
        "4": "row-span-4",
        "5": "row-span-5",
        "6": "row-span-6",
        "7": "row-span-7",
        "8": "row-span-8",
        "9": "row-span-9",
        "10": "row-span-10"
    };

    // Border shine effect that peaks when card is centered
    const borderColor = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5, 0.6, 1],
        ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]
    );

    const glowOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5, 0.6, 1],
        [0, 0, 0.3, 0, 0]
    );

    return (
        <motion.div
            ref={cardRef}
            style={{ borderColor }}
            className={`${colSpans[colSpan] || "col-span-4"} ${rowSpans[rowSpan] || "row-span-2"} rounded-[2rem] md:rounded-[3rem] border transition-colors duration-300 relative overflow-hidden ${className}`}
        >
            <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
            />
            {children}
        </motion.div>
    );
};

const AppDevelopmentBento = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="relative min-h-screen py-20 md:py-40 mb-20 scroll-mt-20">
            <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 h-full auto-rows-[minmax(160px,auto)] md:auto-rows-[minmax(200px,auto)]">

                    {/* Main Title & Description - Hero Cell */}
                    <BentoCard colSpan="2" className="md:col-span-8 bg-gradient-to-br from-indigo-800/40 via-zinc-800/40 to-black/80 backdrop-blur-3xl p-8 md:p-12 flex flex-col justify-between group hover:border-white/40 duration-700">
                        <div className="relative z-10">
                            <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 block">iOS and Android</span>
                            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 md:mb-8">
                                APP <br /> DEVELOPMENT
                            </h2>
                            <p className="text-zinc-400 text-sm md:text-xl font-medium leading-relaxed max-w-xl">
                                Native-quality mobile applications engineered for peak performance and unparalleled user experience on every device.
                            </p>
                        </div>
                        <button className="relative z-10 w-fit mt-10 md:mt-12 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform flex items-center gap-2">
                            Explore Solutions <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Animated background element */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/10 blur-[80px] md:blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700 rounded-full" />
                    </BentoCard>

                    {/* Quality Assurance - Video Cell */}
                    <BentoCard colSpan="1" className="md:col-span-4 bg-gradient-to-br from-purple-800/30 to-black relative group">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                        >
                            <source src="/devaura/tick.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 md:p-10 flex flex-col justify-end">
                            <h3 className="text-base md:text-2xl font-black text-white tracking-tight">Uncompromising <br /> Quality</h3>
                        </div>
                    </BentoCard>

                    {/* VOX Integration Cell */}
                    <BentoCard colSpan="1" className="md:col-span-4 bg-gradient-to-br from-blue-700/40 to-black flex items-center justify-center p-6 md:p-8 relative group">
                        <img
                            src="/devaura/vox.png"
                            alt="Vox"
                            className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                            <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold text-white tracking-widest uppercase">Integration</span>
                        </div>
                    </BentoCard>

                    {/* Immersive Experience - Video Cell */}
                    <BentoCard colSpan="1" className="md:col-span-4 bg-black relative group flex flex-col items-center justify-center overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain relative z-10 scale-110 md:scale-125"
                        >
                            <source src="/devaura/vox.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-x-0 bottom-4 md:bottom-8 text-center px-4 md:px-6 z-20 font-bold text-zinc-500 text-[10px] md:text-xl tracking-tight">
                            Immersive 3D Interfaces
                        </div>
                        {/* Background light */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                    </BentoCard>

                    {/* App Showcase Cell */}
                    <BentoCard colSpan="1" className="md:col-span-4 bg-gradient-to-br from-slate-800/40 to-black relative group p-0">
                        <img
                            src="/devaura/trans tick app.png"
                            alt="Mockup"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                    </BentoCard>

                    {/* Additional Creative Cells - Row 3 */}
                    <BentoCard colSpan="2" className="md:col-span-6 md:row-span-1 bg-white/10 backdrop-blur-2xl p-8 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 group transition-all border border-white/20 shadow-2xl overflow-hidden">
                        <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0">
                            <img src="/devaura/vox 2.png" className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" alt="vox 2" />
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[50px] -z-10" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-extrabold text-xl md:text-2xl tracking-tight mb-2">Scalable Architecture</h4>
                            <p className="text-zinc-400 font-medium text-sm md:text-base leading-relaxed">Engineered to seamlessly handle millions of active users with zero latency.</p>
                        </div>
                    </BentoCard>

                    <BentoCard colSpan="2" className="md:col-span-6 md:row-span-1 bg-white/10 backdrop-blur-2xl p-8 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 group transition-all border border-white/20 shadow-2xl overflow-hidden">
                        <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0">
                            <img src="/devaura/vox 3.png" className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" alt="vox 3" />
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] -z-10" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-extrabold text-xl md:text-2xl tracking-tight mb-2">Cross-Platform Sync</h4>
                            <p className="text-zinc-400 font-medium text-sm md:text-base leading-relaxed">Real-time data parity ensured across all iOS and Android devices.</p>
                        </div>
                    </BentoCard>

                </div>
            </motion.div>
        </section>
    );
};

const WebsiteDevelopmentBento = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} id="websites-bento" className="relative min-h-screen py-20 bg-[#06060c]">
            <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 md:px-6 relative">

                {/* 3-Column Layout Grouping for Strict Lane Alignment */}
                <div className="flex flex-col md:grid md:grid-cols-12 gap-6">

                    {/* LEFT COLUMN (3/12) - Contains Effortless, 12K, Generate */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between group transition-all duration-700 hover:border-white/10 h-[480px]">
                            <div>
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-12 shadow-2xl shadow-indigo-500/20">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                                    </svg>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white/90 tracking-tighter leading-[0.9] mb-8">
                                    Effortless <br /> Prompt <br /> Perfection
                                </h2>
                            </div>
                            <div className="space-y-1">
                                <span className="text-white/80 text-sm font-black uppercase tracking-widest block">14 days trial</span>
                                <span className="text-zinc-500 text-xs font-medium italic">after - $5/month</span>
                            </div>
                        </div>

                        <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-center group hover:border-white/10 transition-duration-700 h-[280px]">
                            <div className="text-6xl font-black text-white text-center md:text-left leading-none tracking-tighter mb-4">12K</div>
                            <div className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-8 text-center md:text-left">happy users</div>
                            <div className="flex justify-center md:justify-start -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-[4px] border-[#11121d] bg-zinc-800 overflow-hidden shadow-2xl">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-6 flex items-center justify-center group hover:border-white/10 h-[110px]">
                            <button className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-purple-500/20 hover:scale-[1.02] transition-transform">
                                Generate
                            </button>
                        </div>
                    </div>

                    {/* CENTER COLUMN (6/12) - Contains Hero, Sphere, Features */}
                    <div className="md:col-span-6 flex flex-col relative">
                        {/* Hero Purple Scoop - Matched to Effortless card height */}
                        <div className="bg-[#6b46f7] rounded-[2.5rem] relative overflow-hidden flex flex-col items-center pt-24 group shadow-lg h-[480px] z-10">
                            <div className="flex items-center gap-2 mb-8 z-10">
                                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-[#6b46f7] rounded-full" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-white/80">PromptPal</span>
                            </div>
                            <h2 className="text-5xl md:text-[5.5rem] font-black text-white text-center tracking-tighter leading-[0.8] mb-12 z-10">
                                Your AI Prompt <br /> Companion
                            </h2>

                            {/* The BOTTOM Scoop (Hole in Purple) */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[280px] h-36 bg-[#06060c] rounded-t-full shadow-[inset_0_4px_25px_rgba(0,0,0,0.5)] z-20" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Features Container - Aligned with 12K card top */}
                        <div className="flex flex-col relative z-20 mt-6">
                            {/* The Stem */}
                            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-[#06060c] z-10" />

                            {/* The TOP Scoop (Hole in Dark Cards) */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[280px] h-36 bg-[#06060c] rounded-b-full shadow-[inset_0_-4px_25px_rgba(0,0,0,0.5)] z-30" />

                            {/* The Floating Sphere - Centered on the seam */}
                            <div className="w-72 h-72 rounded-full bg-black border-[12px] border-[#06060c] absolute -top-40 left-1/2 -translate-x-1/2 z-40 shadow-[0_0_100px_rgba(107,70,247,0.4),inset_0_0_40px_rgba(107,70,247,0.2)] overflow-hidden">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover scale-110 opacity-90 transition-transform duration-1000"
                                >
                                    <source src="/web-sec/Wed 2.webm" type="video/webm" />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Features Side-by-Side - Adjusted height to align with Generate card */}
                            <div className="grid grid-cols-2 gap-6 z-20">
                                <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-10 pt-32 flex flex-col justify-end group hover:border-white/10 h-[414px]">
                                    <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500 mb-6 border border-orange-500/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Branching paths</h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed">Explore multiple prompt directions with branching.</p>
                                </div>
                                <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-10 pt-32 flex flex-col justify-end group hover:border-white/10 h-[414px]">
                                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-500 mb-6 border border-purple-500/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Keyword enhancer</h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed">Boost your prompt precision with keywords.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (3/12) - Contains Toggle, 25M, Templates */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-8 flex items-center justify-center group h-[120px]">
                            <div className="h-14 w-28 bg-zinc-900 rounded-full relative p-2 shadow-inner border border-white/5">
                                <div className="h-10 w-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-center h-[336px]">
                            <div className="text-7xl font-black text-white text-center tracking-tighter mb-2">25M</div>
                            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                                <div className="w-px h-4 bg-purple-500/50" />
                                created prompts
                                <div className="w-px h-4 bg-purple-500/50" />
                            </div>
                        </div>

                        <div className="bg-[#11121d] rounded-[2.5rem] border border-white/5 p-10 flex flex-col group overflow-hidden relative h-[414px]">
                            <div className="z-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Prompt templates</h3>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-12">Use pre-made structures to jumpstart your launch.</p>
                            </div>
                            <div className="flex-grow relative h-64">
                                <div className="absolute right-0 top-0 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-[10px] text-white font-black uppercase rotate-6">14 days trial</div>
                                <div className="absolute left-0 bottom-16 px-4 py-2 bg-zinc-900 border border-white/10 rounded-full text-[10px] text-white/50 rotate-[-12deg] flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Rewrite
                                </div>
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </div>
                                <div className="absolute right-0 bottom-0 py-4 px-2 bg-black rounded-full flex flex-col gap-4 border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
};

const ServicesSection = ({ onInView, onOutView }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start center"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#ffffff", "#ffffff", "#050505"]
    );

    return (
        <motion.div
            ref={sectionRef}
            id="services"
            onViewportEnter={onInView}
            onViewportLeave={onOutView}
            viewport={{ amount: 0.6 }}
            style={{ backgroundColor }}
            className="relative z-10"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Bento Grid replaces the first ServiceFeature */}
                <AppDevelopmentBento />

                <WebsiteDevelopmentBento />

                <ServiceFeature
                    title="ECOMMERCE"
                    subtitle="Digital Commerce Platform"
                    description="Scalable online shopping experiences with seamless payment integrations and conversion-focused design for global brands."
                    image="/devaura/trans tick app 3.png"
                    color="from-emerald-400 via-emerald-300 to-teal-100"
                />

                <ServiceFeature
                    title="SYSTEMS"
                    subtitle="Enterprise Solutions"
                    description="Custom internal tools, ERPs, and dashboards designed to automate workflows and streamline your business operations."
                    image="/devaura/trans tick app 4.png"
                    color="from-sky-400 via-blue-300 to-indigo-100"
                />

                <ServiceFeature
                    title="EXTENSIONS"
                    subtitle="Browser Capabilities"
                    description="Powerful Chrome and browser extensions that add unique functionality and value to your user's web experience."
                    image="/devaura/trans tick app 2.png"
                    color="from-rose-400 via-red-300 to-orange-100"
                />

                <ServiceFeature
                    title="GAMES"
                    subtitle="Interactive Experiences"
                    description="Engaging 2D and 3D web-based games and interactive experiences that captivating your audience and drive engagement."
                    image="/devaura/trans tick app 3.png"
                    color="from-violet-400 via-purple-300 to-fuchsia-100"
                />
            </div>
        </motion.div>
    );
};

export default ServicesSection;
