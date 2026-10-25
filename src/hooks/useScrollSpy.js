import { useState, useEffect } from 'react';

/**
 * Returns the ID of the section currently in the viewport (for scroll-spy).
 * @param {string[]} sectionIds - array of section IDs to observe
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        if (sectionIds.length > 0) {
          setActiveId(sectionIds[sectionIds.length - 1]);
          return;
        }
      }

      // If at top of the page
      if (window.scrollY < 100) {
        setActiveId(sectionIds[0] || 'home');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible sections
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          // If at the very top, keep home active
          if (window.scrollY < 150) {
            setActiveId(sectionIds[0] || 'home');
          } else {
            setActiveId(visible[0].target.id);
          }
        }
      },
      { rootMargin: '-70px 0px -40% 0px', threshold: [0, 0.2, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
