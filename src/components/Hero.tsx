import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center bg-[#FAF9F6] pt-16 border-b border-gray-100 overflow-hidden">
      {/* Decorative vertical grid lines for architectural structure */}
      <div className="absolute inset-y-0 left-12 w-px bg-gray-100/60 z-0 hidden lg:block" />
      <div className="absolute inset-y-0 right-1/2 w-px bg-gray-100/60 z-0 hidden lg:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-gray-100/60 z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Editorial Copy Column */}
        <div className="lg:col-span-5 pr-4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Edición Limitada 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl text-stone-950 font-light leading-[1.1] mb-6 tracking-tight"
          >
            La belleza de la <br />
            <span className="font-medium italic text-stone-900">simplicidad.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-gray-500 text-base md:text-lg leading-relaxed max-w-sm mb-8 font-light"
          >
            Curamos objetos cotidianos con un diseño atemporal, materiales ecológicos de primer nivel y una honestidad formal que perdura.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              id="cta-explore"
              onClick={onExploreClick}
              className="group flex items-center gap-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300 px-10 py-4 text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              Comprar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            
            <a
              href="#filosofia"
              className="font-mono text-[10px] tracking-widest text-gray-400 hover:text-black transition-colors duration-300 uppercase py-2 border-b border-transparent hover:border-black"
            >
              Nuestra Filosofía
            </a>
          </motion.div>
        </div>

        {/* Right High-impact Image Column */}
        <div className="lg:col-span-7 relative flex justify-center lg:justify-end h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md lg:max-w-full aspect-[4/3] lg:aspect-[16/10] bg-gradient-to-tr from-gray-200 to-gray-50 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200&auto=format&fit=crop"
              alt="Hogar minimalista con luz ambiental"
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full opacity-90 scale-101 hover:scale-104 duration-1000 transition-transform ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none"></div>
            
            {/* Minimal aesthetic floating information badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-5 border border-white/40 shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Próximo lanzamiento</p>
              <p className="font-serif text-lg font-medium text-stone-950">Silla Nordik Oak</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
