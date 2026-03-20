import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="relative py-24 md:py-36 px-6 noise-texture">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Get in Touch
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-gradient-gold mb-6">
            Let's Create<br />Something Savage
          </h2>
          <div className="gold-line max-w-xs mx-auto mb-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <a
            href="mailto:hello@savagedesigns.co"
            className="block font-display text-2xl md:text-4xl text-card-foreground hover:text-gold transition-colors duration-300"
          >
            hello@savagedesigns.co
          </a>

          <div className="gold-line max-w-xs mx-auto my-8" />

          <div className="flex items-center justify-center gap-8">
            {["Dribbble", "Behance", "Instagram", "LinkedIn"].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ y: -2 }}
                className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-8 border-t border-gold/10"
        >
          <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">
            © 2026 Savage. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
