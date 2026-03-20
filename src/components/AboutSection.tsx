import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 md:py-36 px-6 noise-texture">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-4">
              About
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-gradient-gold leading-tight">
              Who is<br />Savage?
            </h2>
            <div className="gold-line mt-6 max-w-[80px]" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-body text-lg md:text-xl leading-relaxed text-card-foreground">
              I don't design to blend in. I design to{" "}
              <span className="text-gold font-semibold">dominate</span>.
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              Savage is a UI/UX Designer and Frontend Developer who builds brands
              and products that refuse to be ignored. With an obsession for bold
              typography, ruthless layouts, and pixel-perfect code — every project
              is a statement.
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
              No templates. No trends for the sake of trends. Just raw, intentional
              design backed by clean, performant code. If your brand needs a
              heartbeat — you found the right one.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              <span className="font-display italic text-sm text-gold">
                "Average is the enemy."
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
