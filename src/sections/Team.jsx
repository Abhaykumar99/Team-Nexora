import { motion } from 'framer-motion';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import TiltCard from '../components/motion/TiltCard';
import teamMembers from '../data/team';
import { easeOutExpo } from '../lib/motion';

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOutExpo },
    },
  };

  return (
    <section id="team" className="section-container">
      <SectionHeader
        eyebrow="The people behind the work"
        title="Meet the team"
        highlight="you'll actually talk to"
        description="No account managers relaying messages. You work directly with the people who design, build and ship your project."
        reveal="clip"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.id} variants={itemVariants} className="h-full">
            <TiltCard maxTilt={5} className="h-full">
              <Card
                variant="interactive"
                className="p-6 flex flex-col h-full group hover:border-primary/50 transition-colors"
              >
                {/* Avatar with primary border */}
                <div
                  className="w-16 h-16 rounded-full bg-surface-2 border-2 border-primary flex items-center justify-center font-heading font-bold text-xl text-fg overflow-hidden mb-4 shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    getInitials(member.name)
                  )}
                </div>

                <h3 className="text-lg font-bold text-fg font-heading group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-fg-muted text-[14px] mt-0.5">{member.role}</p>

                {/* Skills Tags */}
                {member.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 my-3.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded-[6px] border border-border text-fg-muted bg-surface-2/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Conditional Social Actions */}
                {(member.github || member.linkedin || member.portfolio) && (
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-[8px] border border-border text-fg text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-[8px] border border-border text-fg text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-[8px] border border-border text-fg text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                      >
                        Portfolio
                      </a>
                    )}
                  </div>
                )}

                {/* Notice for placeholder member */}
                <p className="text-xs text-fg-muted/70 mt-3 pt-2 border-t border-border/50">
                  Placeholder: add real members in the TEAM data file.
                </p>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
