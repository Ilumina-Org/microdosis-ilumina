import { useState, useEffect, type RefObject } from 'react';

interface propTypes{
sectionRefs: RefObject<HTMLElement | null>[];
}

const useIntersectionObserver = ({sectionRefs}:propTypes) => {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              setVisibleSection(id);
              console.log('Visible Section:', id); // Log the visible section
            }
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    // Observe each section
    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup observer
    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  return { visibleSection };
};

export default useIntersectionObserver;