import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const ContactSection = () => {
  const { data: socials } = useQuery({
    queryKey: ["socials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_links").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  return (
    <section id="contact" className="relative py-24 md:py-36 px-6 noise-texture">
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
            href="tel:+233500865112"
            className="block font-display text-2xl md:text-4xl text-card-foreground hover:text-gold transition-colors duration-300"
          >
            +233 50 086 5112
          </a>

          <div className="gold-line max-w-xs mx-auto my-8" />

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {socials && socials.map((social: any) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {social.platform}
              </motion.a>
            ))}
            {(!socials || socials.length === 0) && (
              <span className="text-muted-foreground text-sm">No social links yet.</span>
            )}
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
            © 2026 <a href="/admin" className="hover:text-gold transition-colors duration-300 cursor-pointer">Savage</a>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
