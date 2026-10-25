import siteConfig from '../config/site';
import servicesData from '../data/services';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-12 sm:py-16">
      <div className="section-container !py-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <a
              href="#home"
              className="text-fg font-heading font-bold text-xl tracking-tight transition-colors hover:opacity-90 inline-block mb-3"
            >
              Team <span className="text-primary font-bold">Nexora</span>
            </a>
            <p className="text-fg-muted text-[14px] leading-relaxed max-w-sm mb-4">
              A developer team and digital studio building websites, web applications, and brand identities that move businesses forward.
            </p>
            {(siteConfig.social.github || siteConfig.social.linkedin) && (
              <div className="flex items-center gap-3">
                {siteConfig.social.github && (
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted hover:text-primary text-[14px] transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted hover:text-primary text-[14px] transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-bold text-fg uppercase tracking-wider mb-3 font-heading">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-fg-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-bold text-fg uppercase tracking-wider mb-3 font-heading">
              Services
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-[14px] text-fg-muted hover:text-primary transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark — quiet brand moment, theme-var colour only */}
        <div aria-hidden="true" className="mt-14 select-none overflow-hidden">
          <div className="font-heading font-black text-center leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 11vw, 8.5rem)', color: 'color-mix(in srgb, var(--fg) 7%, transparent)' }}>
            NEXORA
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-fg-muted">
          <p>© {currentYear} Team Nexora. All rights reserved.</p>
          <p className="opacity-70">Crafted with clean code and purpose.</p>
        </div>
      </div>
    </footer>
  );
}
