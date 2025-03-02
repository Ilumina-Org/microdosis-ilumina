import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (sections: any, options = { threshold: 0.5 }) => {
  const [visibleSection, setVisibleSection] = useState<any>(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      options
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [sections, options]);

  return { visibleSection, sectionRefs };
};

export default useIntersectionObserver;