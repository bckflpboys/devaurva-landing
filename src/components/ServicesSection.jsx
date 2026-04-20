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
            className={`md:col-span-${colSpan} md:row-span-${rowSpan} rounded-[3rem] border transition-colors duration-300 relative overflow-hidden ${className}`}
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
        <section ref={containerRef} className="relative min-h-screen py-40 mb-20 scroll-mt-20">
            <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full auto-rows-[minmax(200px,auto)]">

                    {/* Main Title & Description - Hero Cell */}
                    <BentoCard colSpan="8" className="bg-gradient-to-br from-indigo-800/40 via-zinc-800/40 to-black/80 backdrop-blur-3xl p-12 flex flex-col justify-between group hover:border-white/40 duration-700">
                        <div className="relative z-10">
                            <span className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 block">iOS and Android</span>
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                                APP <br /> DEVELOPMENT
                            </h2>
                            <p className="text-zinc-400 text-base md:text-xl font-medium leading-relaxed max-w-xl">
                                Native-quality mobile applications engineered for peak performance and unparalleled user experience on every device.
                            </p>
                        </div>
                        <button className="relative z-10 w-fit mt-12 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                            Explore Solutions <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Animated background element */}
                        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/10 blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700 rounded-full" />
                    </BentoCard>

                    {/* Quality Assurance - Video Cell */}
                    <BentoCard colSpan="4" className="bg-gradient-to-br from-purple-800/30 to-black relative group">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                        >
                            <source src="/devaura/tick.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                            <h3 className="text-2xl font-black text-white tracking-tight">Uncompromising <br /> Quality</h3>
                        </div>
                    </BentoCard>

                    {/* VOX Integration Cell */}
                    <BentoCard colSpan="4" className="bg-gradient-to-br from-blue-700/40 to-black flex items-center justify-center p-8 relative group">
                        <img
                            src="/devaura/vox.png"
                            alt="Vox"
                            className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-8 left-8">
                            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white tracking-widest uppercase">Integration</span>
                        </div>
                    </BentoCard>

                    {/* Immersive Experience - Video Cell */}
                    <BentoCard colSpan="4" className="bg-black relative group flex flex-col items-center justify-center">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain relative z-10 scale-125"
                        >
                            <source src="/devaura/vox.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-x-0 bottom-8 text-center px-6">
                            <h3 className="text-xl font-bold text-zinc-500 tracking-tight">Immersive 3D Interfaces</h3>
                        </div>
                        {/* Background light */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                    </BentoCard>

                    {/* App Showcase Cell */}
                    <BentoCard colSpan="4" className="bg-gradient-to-br from-slate-800/40 to-black relative group p-0">
                        <img
                            src="/devaura/trans%20tick%20app.png"
                            alt="Mockup"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                    </BentoCard>

                    {/* Additional Creative Cells - Row 3 */}
                    <BentoCard colSpan="6" rowSpan="1" className="bg-white/10 backdrop-blur-2xl p-8 flex flex-col md:flex-row items-center gap-8 group transition-all border border-white/20 shadow-2xl overflow-hidden">
                        <div className="w-40 h-40 relative flex-shrink-0">
                            <img src="/devaura/vox%202.png" className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" alt="vox 2" />
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[50px] -z-10" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-extrabold text-2xl tracking-tight mb-2">Scalable Architecture</h4>
                            <p className="text-zinc-400 font-medium text-base leading-relaxed">Engineered to seamlessly handle millions of active users with zero latency.</p>
                        </div>
                    </BentoCard>

                    <BentoCard colSpan="6" rowSpan="1" className="bg-white/10 backdrop-blur-2xl p-8 flex flex-col md:flex-row items-center gap-8 group transition-all border border-white/20 shadow-2xl overflow-hidden">
                        <div className="w-40 h-40 relative flex-shrink-0">
                            <img src="/devaura/vox%203.png" className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" alt="vox 3" />
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] -z-10" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-extrabold text-2xl tracking-tight mb-2">Cross-Platform Sync</h4>
                            <p className="text-zinc-400 font-medium text-base leading-relaxed">Real-time data parity ensured across all iOS and Android devices.</p>
                        </div>
                    </BentoCard>

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

                <ServiceFeature
                    title="WEBSITES"
                    subtitle="Performance & SEO"
                    description="High-performance, SEO-optimized digital presence built with modern frameworks for maximum impact and visibility."
                    image="/devaura/trans tick app 2.png"
                    color="from-indigo-400 via-purple-300 to-pink-100"
                />

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
