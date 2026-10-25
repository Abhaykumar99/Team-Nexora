import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { easeOutExpo, springs } from '../lib/motion';

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    setCurrentScreenshot(0);
  }, [project]);

  // Focus trap & Escape listener
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const focusable = el.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === el) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  if (!project) return null;
  const { details = {} } = project;

  const contentContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      ref={overlayRef}
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 78%, transparent)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={springs.gentle}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-surface border border-border rounded-[18px] p-6 sm:p-8 shadow-2xl focus:outline-none"
      >
        {/* Close Button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-4 top-4 w-9 h-9 rounded-[10px] border border-border bg-surface-2 text-fg flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <motion.div variants={contentContainer} initial="hidden" animate="visible">
          {/* Category & Title */}
          <motion.div variants={itemVariant}>
            <span className="text-primary text-[13px] font-semibold">
              {project.category}
            </span>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-fg font-heading mt-1 mb-2">
              {project.name}
            </h3>
          </motion.div>

          {/* Overview */}
          <motion.p variants={itemVariant} className="text-fg-muted text-[15px] leading-relaxed mb-5">
            {details.overview || project.description}
          </motion.p>

          {/* Problem & Solution */}
          {(details.problem || details.solution) && (
            <motion.div variants={itemVariant} className="grid sm:grid-cols-2 gap-4 mb-5">
              {details.problem && (
                <div className="p-4 rounded-[12px] bg-surface-2 border border-border">
                  <h4 className="text-sm font-bold text-fg font-heading mb-1.5 uppercase tracking-wide">
                    Problem
                  </h4>
                  <p className="text-fg-muted text-[14px] leading-relaxed">
                    {details.problem}
                  </p>
                </div>
              )}
              {details.solution && (
                <div className="p-4 rounded-[12px] bg-surface-2 border border-border">
                  <h4 className="text-sm font-bold text-fg font-heading mb-1.5 uppercase tracking-wide">
                    Solution
                  </h4>
                  <p className="text-fg-muted text-[14px] leading-relaxed">
                    {details.solution}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Key Features */}
          {details.features?.length > 0 && (
            <motion.div variants={itemVariant} className="mb-5">
              <h4 className="text-[15px] font-bold text-fg font-heading mb-2">
                Key Features
              </h4>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {details.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-fg-muted text-[14px]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <motion.div variants={itemVariant} className="mb-5">
              <h4 className="text-[15px] font-bold text-fg font-heading mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-[6px] border border-border text-fg-muted bg-surface-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Screenshots Gallery */}
          {details.screenshots?.length > 0 ? (
            <motion.div variants={itemVariant} className="mb-5">
              <h4 className="text-[15px] font-bold text-fg font-heading mb-2">
                Screenshots
              </h4>
              <div className="relative rounded-[12px] overflow-hidden bg-surface-2 border border-border aspect-video flex items-center justify-center">
                <img
                  src={details.screenshots[currentScreenshot]}
                  alt={`${project.name} screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {details.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentScreenshot(
                          (p) => (p - 1 + details.screenshots.length) % details.screenshots.length
                        )
                      }
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 text-fg flex items-center justify-center hover:bg-bg transition-colors"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentScreenshot((p) => (p + 1) % details.screenshots.length)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 text-fg flex items-center justify-center hover:bg-bg transition-colors"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {details.screenshots.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentScreenshot(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentScreenshot ? 'w-4 bg-primary' : 'bg-fg-muted/40'
                          }`}
                          aria-label={`Screenshot ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div variants={itemVariant} className="mb-5">
              <h4 className="text-[15px] font-bold text-fg font-heading mb-1">
                Screenshots
              </h4>
              <p className="text-fg-muted text-[14px]">No screenshots added yet.</p>
            </motion.div>
          )}

          {/* Team Contributions */}
          {details.teamContributions?.length > 0 && (
            <motion.div variants={itemVariant} className="mb-6">
              <h4 className="text-[15px] font-bold text-fg font-heading mb-1.5">
                Team Contribution
              </h4>
              <p className="text-fg-muted text-[14px] leading-relaxed">
                {details.teamContributions.join(' • ')}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div variants={itemVariant} className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border">
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                <ExternalLink size={15} />
                Live Demo
              </Button>
            )}
            {project.sourceUrl && (
              <Button
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
              >
                <Github size={15} />
                Source Code
              </Button>
            )}
            <Button size="sm" href="#contact" onClick={onClose}>
              Start a project like this
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto">
              Close
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
