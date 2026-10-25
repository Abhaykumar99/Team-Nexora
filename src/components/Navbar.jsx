import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Palette, Check, Sparkles } from 'lucide-react';
import siteConfig from '../config/site';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { easeOutExpo } from '../lib/motion';
import Button from './Button';
import Magnetic from './motion/Magnetic';

const sectionIds = siteConfig.navLinks.map((l) => l.href.replace('#', ''));

/* No hex here: each swatch is rendered inside a data-theme scope, so
   var(--primary) inside it resolves to THAT theme's own primary colour. */
const THEME_SUBS = {
  'midnight-studio': 'Obsidian & Neon Lime',
  'daylight-studio': 'Warm Cream & Coral',
  'retro-sunset': 'Deep Violet & Sunset Pink',
  'forest-tech': 'Emerald & Mint',
};

export default function Navbar({ theme, setTheme, themes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const themeRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const activeId = useScrollSpy(sectionIds);

  // Smooth scroll progress bar with useScroll & useSpring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Scroll detection for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close theme menu and mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (themeMenuOpen) setThemeMenuOpen(false);
        if (isOpen) {
          setIsOpen(false);
          toggleBtnRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, themeMenuOpen]);

  // Click outside listener for theme popover
  useEffect(() => {
    if (!themeMenuOpen) return;
    const onClickOutside = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [themeMenuOpen]);

  // Focus trap in mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', trap);
    first.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    toggleBtnRef.current?.focus();
  }, []);

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <>
      {/* Hardware-Accelerated Spring Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[100] pointer-events-none"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-bg/85 backdrop-blur-xl border-b border-border/80 shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Brand Logo & Studio Availability Pill */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="flex items-center gap-2.5 text-fg font-heading font-bold text-xl tracking-tight transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="w-8 h-8 rounded-lg bg-primary text-primary-fg font-heading font-black text-sm flex items-center justify-center shadow-md">
                N
              </span>
              <span>
                Team <span className="text-primary font-bold">Nexora</span>
              </span>
            </a>

            {/* Studio Open Pill */}
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2/80 border border-border text-[11px] font-medium text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Open for Projects
            </span>
          </div>

          {/* Desktop Floating Center Navigation Capsule */}
          <nav
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface/75 backdrop-blur-md border border-border/80 shadow-sm"
            aria-label="Main navigation"
          >
            {siteConfig.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeId === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-colors ${
                    isActive ? 'text-fg font-semibold' : 'text-fg-muted hover:text-fg'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-surface-2 rounded-full -z-10 shadow-sm border border-border"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-primary transition-transform duration-300 origin-left ${
                        isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: Custom Theme Switcher + CTA Button */}
          <div className="flex items-center gap-2.5">
            {/* Custom Theme Switcher Popover */}
            <div className="relative" ref={themeRef}>
              <button
                type="button"
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="h-10 px-3.5 rounded-full border border-border bg-surface/90 text-fg text-xs font-semibold flex items-center gap-2 hover:border-primary transition-all cursor-pointer shadow-sm active:scale-95"
                aria-expanded={themeMenuOpen}
                aria-haspopup="true"
                aria-label="Choose color theme"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-border shadow-xs shrink-0"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
                <span className="hidden sm:inline">{currentThemeObj.name}</span>
                <Palette size={14} className="text-fg-muted" />
              </button>

              {/* Floating Theme Options Menu */}
              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: easeOutExpo }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface border border-border p-2 shadow-2xl z-50 overflow-hidden"
                    role="menu"
                  >
                    <div className="px-2.5 py-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-fg-muted">
                      Studio Themes
                    </div>
                    {themes.map((t) => {
                      const isCurrent = t.id === theme;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTheme(t.id);
                            setThemeMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-surface-2 text-fg font-semibold'
                              : 'text-fg-muted hover:text-fg hover:bg-surface-2/60'
                          }`}
                          role="menuitem"
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              data-theme={t.id}
                              className="w-3 h-3 rounded-full shrink-0 shadow-xs ring-1 ring-border"
                              style={{ backgroundColor: 'var(--primary)' }}
                            />
                            <span>
                              <span className="font-heading block">{t.name}</span>
                              <span className="text-[10px] text-fg-muted/70 block">{THEME_SUBS[t.id]}</span>
                            </span>
                          </span>
                          {isCurrent && <Check size={14} className="text-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop "Let's Talk" CTA Button with Magnetic physics */}
            <div className="hidden lg:block">
              <Magnetic strength={0.22}>
                <Button href="#contact" size="sm" className="rounded-full shadow-md">
                  Let&apos;s Talk
                </Button>
              </Magnetic>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={toggleBtnRef}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border bg-surface text-fg hover:border-primary transition-colors cursor-pointer active:scale-95 shadow-sm"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="lg:hidden fixed inset-x-4 top-[74px] z-40 bg-surface/98 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <nav className="flex flex-col gap-1.5">
                {siteConfig.navLinks.map((link, i) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeId === sectionId;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, ease: easeOutExpo }}
                      className={`px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'text-fg bg-surface-2 font-semibold shadow-xs'
                          : 'text-fg-muted hover:text-fg hover:bg-surface-2/60'
                      }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-border">
                  <Button
                    href="#contact"
                    className="w-full rounded-full"
                    onClick={closeMobileMenu}
                  >
                    Let&apos;s Talk
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
