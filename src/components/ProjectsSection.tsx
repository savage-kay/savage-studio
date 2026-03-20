import { motion } from "framer-motion";

const projects = [
  {
    title: "NOIR APPAREL",
    category: "Branding / Identity",
    description: "A luxury streetwear brand identity built on contrast, edge, and unapologetic confidence.",
  },
  {
    title: "VANTA STUDIOS",
    category: "UI/UX Design",
    description: "Dark-mode-first creative studio platform. Sleek dashboards, seamless flows, zero friction.",
  },
  {
    title: "CROWN & CO",
    category: "Web Design",
    description: "High-end barbershop experience — from brand to booking, dripping in premium finesse.",
  },
  {
    title: "ECLIPSE MAG",
    category: "Editorial / Layout",
    description: "Digital magazine layout that reads like art. Bold grids, cinematic imagery, typographic drama.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="work" className="relative py-24 md:py-36 px-6 noise-texture">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Portfolio
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl text-gradient-gold">
            Selected Work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group relative bg-card border border-gold/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-gold/40 hover:gold-glow">
                {/* Project image placeholder */}
                <div className="aspect-[16/10] bg-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-black text-3xl md:text-5xl text-gold/10 group-hover:text-gold/20 transition-colors duration-500 tracking-tight">
                      {project.title}
                    </span>
                  </div>
                  {/* Gold corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-px h-8 bg-gold/40 group-hover:h-12 transition-all duration-500" />
                    <div className="absolute top-0 right-0 h-px w-8 bg-gold/40 group-hover:w-12 transition-all duration-500" />
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6">
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-card-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 h-px bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 group-hover:via-gold/60 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
