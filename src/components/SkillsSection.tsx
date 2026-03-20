import { motion } from "framer-motion";

const skills = [
  { name: "UI/UX Design", level: 95 },
  { name: "Branding & Identity", level: 90 },
  { name: "Typography", level: 92 },
  { name: "Figma", level: 96 },
  { name: "Visual Design", level: 88 },
  { name: "Motion Design", level: 78 },
];

const SkillsSection = () => {
  return (
    <section className="relative py-24 md:py-36 px-6 bg-card noise-texture">
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
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
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
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
