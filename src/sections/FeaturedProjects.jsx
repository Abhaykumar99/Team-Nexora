import { useState, useMemo, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import TiltCard from '../components/motion/TiltCard';
import SectionHeader from '../components/SectionHeader';
/* Lazy: modal code loads only when a customer first opens a project */
const ProjectModal = lazy(() => import('../components/ProjectModal'));
import projects, { CATEGORIES } from '../data/projects';
import { easeOutExpo, useMotionSafe } from '../lib/motion';

/**
 * Thumbnail component with subtle scroll parallax
 */
function ParallaxThumbnail({ src, alt, name }) {
  const containerRef = useRef(null);
  const { allowComplexMotion } = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] bg-surface-2 border-b border-border overflow-hidden flex items-center justify-center"
    >
      {src ? (
        <>
        <motion.img
          src={src}
          alt={alt}
          style={{ y: allowComplexMotion ? y : 0, scale: 1.15 }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover reveal — tells the customer exactly what a click does */}
        <span className="absolute inset-0 z-[5] flex items-end justify-start p-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--bg) 72%, transparent), transparent 55%)' }}>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-full" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' }}>
            View case study →
          </span>
        </span>
        </>
      ) : (
        <span className="font-heading font-bold text-2xl text-fg/70">
          {name.split(' ').pop()}
        </span>
      )}

      {/* Placeholder pill tag */}
      <span className="absolute top-2.5 left-2.5 text-xs font-semibold px-2 py-0.5 rounded-[6px] bg-secondary text-bg shadow-sm z-10">
        Placeholder
      </span>
    </div>
  );
}

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="work" className="section-container">
      <SectionHeader
        eyebrow="Selected work"
        title="Work that speaks"
        highlight="before we do"
        description="Browse by what you need. Click any project to see the problem, our solution and what was delivered — exactly the clarity you'll get on your own project. Sample entries are marked Placeholder until real projects are added."
      />

      {/* Filter Chips */}
      <motion.div
        layout
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter projects"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              className={`chip relative ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActiveFilter(cat)}
            >
              {isActive && (
                <motion.span
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Projects Grid with layout animations & AnimatePresence */}
      {filtered.length === 0 ? (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[14px] border border-dashed border-border p-12 text-center text-fg-muted"
        >
          No projects in this category yet.{' '}
          <a href="#contact" className="text-primary hover:underline font-medium">
            Start one with us.
          </a>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                <TiltCard maxTilt={6}>
                  <Card
                    variant="interactive"
                    data-cursor="view"
                    className="flex flex-col group h-full cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Parallax Thumbnail Header */}
                    <ParallaxThumbnail
                      src={project.thumbnail}
                      alt={`${project.name} preview`}
                      name={project.name}
                    />

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 gap-2.5">
                      <span className="text-primary text-[13px] font-semibold">
                        {project.category}
                      </span>

                      <h3 className="text-lg font-bold text-fg leading-snug group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-fg-muted text-[14px] leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 rounded-[6px] border border-border text-fg-muted bg-surface-2/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div
                        className="flex items-center gap-2 pt-3 mt-auto border-t border-border"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedProject(project)}
                          className="flex-1"
                        >
                          View Details
                        </Button>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-[10px] border border-border text-fg-muted hover:text-primary hover:border-primary transition-colors"
                            aria-label={`Live demo of ${project.name}`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {project.sourceUrl && (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-[10px] border border-border text-fg-muted hover:text-fg hover:border-fg-muted transition-colors"
                            aria-label={`Source code for ${project.name}`}
                          >
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Accessible Project Details Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
