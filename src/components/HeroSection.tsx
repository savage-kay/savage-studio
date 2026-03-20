import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2,
}));

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const letters = "SAVAGE".split("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture bg-background">
      {/* Radial glow that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(600px circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, hsl(var(--gold) / 0.08), transparent 60%)`,
        }}
        transition={{ type: "tween", duration: 0.3 }}
      />

      {/* Floating gold particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -60, -120],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Rotating gold ring */}
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-gold/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-gold/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal slashes */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent origin-top"
        style={{ transform: `rotate(15deg) translateX(${mousePos.x * 10}px)` }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-gold/15 to-transparent origin-top"
        style={{ transform: `rotate(-10deg) translateX(${mousePos.x * -8}px)` }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4" style={{ perspective: "1000px" }}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-body text-sm md:text-base uppercase text-gold-light mb-6"
        >
          UI/UX Designer · Frontend Developer
        </motion.p>

        {/* 3D letter-by-letter reveal */}
        <div
          className="font-display font-black text-gradient-gold text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-tight flex justify-center"
          style={{ perspective: "800px" }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{
                scale: 1.2,
                textShadow: "0 0 40px hsl(43 72% 54% / 0.6)",
                transition: { duration: 0.2 },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Expanding gold line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="gold-line max-w-md mx-auto my-8"
        />

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-display text-xl md:text-3xl italic text-card-foreground mb-12"
        >
          Designs that hit different.
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 60px hsl(43 72% 54% / 0.4), 0 0 120px hsl(43 72% 54% / 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-[0.2em] uppercase gold-glow transition-all duration-300 hover:bg-gold-light"
        >
          View My Work
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
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
