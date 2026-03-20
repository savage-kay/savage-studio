import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture">
      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/4 gold-line-vertical h-32 opacity-40" />
      <div className="absolute bottom-0 right-1/3 gold-line-vertical h-48 opacity-30" />
      <div className="absolute top-1/3 left-0 gold-line w-32 opacity-40" />
      <div className="absolute bottom-1/4 right-0 gold-line w-24 opacity-30" />

      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-sm md:text-base tracking-[0.4em] uppercase text-gold-light mb-6"
        >
          UI/UX &amp; Graphic Designer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-gradient-gold text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-tight"
        >
          SAVAGE
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="gold-line max-w-md mx-auto my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-display text-xl md:text-3xl italic text-card-foreground mb-12"
        >
          Designs that hit different.
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-[0.2em] uppercase gold-glow transition-all duration-300 hover:bg-gold-light"
        >
          View My Work
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
