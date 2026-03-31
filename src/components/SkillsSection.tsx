import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const SkillsSection = () => {
  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  return (
    <section id="skills" className="relative py-24 md:py-36 px-6 bg-card noise-texture">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Expertise
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-gradient-gold">
            The Arsenal
          </h2>
        </motion.div>

        <div className="space-y-8">
          {skills && skills.map((skill: any, i: number) => (
            <motion.div
              key={skill.id || skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm md:text-base tracking-wide text-card-foreground">
                  {skill.name}
                </span>
                <span className="font-body text-xs tracking-widest text-gold">
                  {skill.level}%
                </span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)))`,
                  }}
                />
              </div>
            </motion.div>
          ))}
          {(!skills || skills.length === 0) && (
            <div className="text-center text-muted-foreground py-10 font-body">No skills available yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
