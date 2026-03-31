import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const ProjectsSection = () => {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
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
          {projects && projects.map((project: any, i: number) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <a 
                href={project.link_url || "#"} 
                target={project.link_url ? "_blank" : undefined}
                rel={project.link_url ? "noopener noreferrer" : undefined}
                className="block group relative bg-card border border-gold/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-gold/40 hover:gold-glow"
              >
                {/* Project image placeholder */}
                <div className="aspect-[16/10] bg-secondary relative overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display font-black text-3xl md:text-5xl text-gold/10 group-hover:text-gold/20 transition-colors duration-500 tracking-tight text-center px-4">
                          {project.title}
                        </span>
                      </div>
                    </>
                  )}
                  {/* Gold corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-px h-8 bg-gold/40 group-hover:h-12 transition-all duration-500" />
                    <div className="absolute top-0 right-0 h-px w-8 bg-gold/40 group-hover:w-12 transition-all duration-500" />
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6">
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-2 break-words">
                    {project.category}
                  </p>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-card-foreground mb-2 group-hover:text-gold transition-colors duration-300 truncate">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 h-px bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 group-hover:via-gold/60 transition-all duration-500" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
        
        {(!projects || projects.length === 0) && (
          <div className="text-center text-muted-foreground py-20 font-body border border-gold/10 bg-card/50">
            No projects have been published yet. Check the Admin Dashboard.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
