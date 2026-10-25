import { motion } from 'framer-motion';
import { Globe, AppWindow, ShoppingCart, Palette, PenTool, Wrench, Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import Magnetic from '../components/motion/Magnetic';
import servicesData from '../data/services';
import { easeOutExpo, staggerContainer, viewportOnce } from '../lib/motion';

const iconMap = { Globe, AppWindow, ShoppingCart, Palette, PenTool, Wrench };

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

export default function Services() {
  return (
    <section id="services" className="section-band py-16 sm:py-24">
      <div className="section-container !py-0">
        <SectionHeader
          eyebrow="What we do for you"
          title="Services built around"
          highlight="your customers"
          description="Pick what your business needs today. Every service is explained in plain language — what you get, who it's for, and why it matters to the people paying you."
          reveal="clip"
        />

        <motion.div
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div key={service.id} variants={cardVariants} className="h-full">
                <Card variant="interactive" className="p-6 flex flex-col group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                      className="w-12 h-12 rounded-[12px] bg-surface-2 border border-border flex items-center justify-center text-primary shadow-sm group-hover:border-primary/60 transition-colors"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <span aria-hidden="true" className="font-heading font-bold text-sm text-fg-muted/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-fg mb-2 font-heading group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-fg-muted text-[14px] leading-relaxed">{service.description}</p>

                  {service.bestFor && (
                    <p className="mt-3.5 text-[13px] leading-relaxed rounded-[10px] bg-surface-2/70 border border-border/70 px-3 py-2.5 text-fg">
                      <span className="font-semibold text-primary">Best for: </span>{service.bestFor}
                    </p>
                  )}

                  {service.includes?.length > 0 && (
                    <ul className="mt-3.5 flex flex-col gap-1.5 list-none p-0 m-0">
                      {service.includes.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[13px] text-fg-muted">
                          <Check size={14} className="text-primary shrink-0 mt-0.5" /> {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href="#contact"
                    className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fg hover:text-primary transition-colors"
                    aria-label={`Discuss ${service.title} with us`}
                  >
                    Start with this service
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.2}>
            <Button href="#contact" size="md" className="rounded-full">
              Not sure what you need? Talk to us <ArrowRight size={16} />
            </Button>
          </Magnetic>
          <p className="text-sm text-fg-muted">We&apos;ll recommend the smallest thing that solves your problem — honestly.</p>
        </div>
      </div>
    </section>
  );
}
