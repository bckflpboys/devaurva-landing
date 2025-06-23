import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const features = [
  {
    title: 'Lightning Fast Delivery',
    description: 'Get your website up and running in record time with our streamlined process.',
    icon: '⚡',
  },
  {
    title: 'Stunning Animations',
    description: 'Modern, interactive, and smooth animations that wow your visitors.',
    icon: '✨',
  },
  {
    title: 'Mobile First',
    description: 'Fully responsive and beautiful on every device, from phones to desktops.',
    icon: '📱',
  },
  {
    title: 'SEO Optimized',
    description: 'Rank higher and get found with our built-in SEO best practices.',
    icon: '🚀',
  },
];

const bgVariants = {
  animate: {
    backgroundPosition: [
      '0% 50%',
      '100% 50%',
      '0% 50%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black"
      variants={bgVariants}
      animate="animate"
      style={{
        background: 'linear-gradient(120deg, #000 0%, #222 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute w-72 h-72 bg-indigo-700/30 rounded-full blur-3xl left-[-5rem] top-[-5rem]"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl right-[-6rem] top-1/3"
          animate={{ y: [0, -30, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl left-1/2 bottom-[-4rem]"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4">
        {/* Animated SVG Computer Drawing */}
        <motion.svg
          width="220" height="160" viewBox="0 0 220 160" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-10"
        >
          {/* Monitor */}
          <motion.rect
            x="30" y="30" width="160" height="90" rx="10"
            stroke="#6366f1" strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Stand */}
          <motion.line
            x1="110" y1="120" x2="110" y2="140"
            stroke="#6366f1" strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease: 'easeInOut' }}
          />
          {/* Base */}
          <motion.rect
            x="90" y="140" width="40" height="10" rx="3"
            stroke="#6366f1" strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 1.5, ease: 'easeInOut' }}
          />
          {/* Keyboard */}
          <motion.rect
            x="60" y="155" width="100" height="5" rx="2"
            stroke="#6366f1" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 1.8, ease: 'easeInOut' }}
          />
        </motion.svg>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="underline decoration-wavy decoration-indigo-500">DevAura</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Elevate your business with a website that dazzles, converts, and grows with you. Experience the next level of web design—crafted for impact.
        </motion.p>
        <motion.button
          className="px-8 py-4 rounded-full bg-indigo-600 text-white text-lg font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 mb-8"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/custom-plan')}
        >
          Get Your Custom Plan
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-4">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            className="bg-white/10 rounded-2xl p-8 shadow-xl border-2 border-indigo-700 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <span className="text-4xl mb-4 animate-bounce-slow text-indigo-400">{feature.icon}</span>
            <h3 className="text-2xl font-bold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-200 text-base">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Animated CTA Section */}
      <motion.section
        className="relative z-10 flex flex-col items-center justify-center py-20 px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="bg-white/5 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center border border-indigo-700"
          initial={{ scale: 0.95 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent text-center">
            Ready to make your mark online?
          </h2>
          <p className="text-lg text-gray-200 mb-6 text-center max-w-xl">
            Let us build you a website that stands out, performs, and grows your business. No templates. No limits. Just results.
          </p>
          <motion.button
            className="px-8 py-4 rounded-full bg-indigo-600 text-white text-lg font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/custom-plan')}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Landing; 