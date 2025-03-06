import { useMediaQuery } from "react-responsive";

const useResponsiveness = () => {
  // Breakpoints optimizados para una mejor detección
  const isLargeDesktop = useMediaQuery({ query: "(min-width: 1601px)" });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1201px) and (max-width: 1600px)",
  });
  const isSmallDesktop = useMediaQuery({
    query: "(min-width: 993px) and (max-width: 1200px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 992px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 481px) and (max-width: 768px)",
  });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  /**
   * Devuelve el valor según el tamaño de pantalla actual
   * @param values Array con valores para cada tamaño
   * [largeDesktop, desktop, smallDesktop, tablet, mobile, smallMobile]
   */
  const handleResponsiveness = (values: any[]) => {
    if (values.length === 0) return null;

    // Asegurarse de que hay suficientes valores, si no, usar el último
    const completeValues = [...values];
    while (completeValues.length < 6) {
      completeValues.push(completeValues[completeValues.length - 1]);
    }

    if (isLargeDesktop) {
      return completeValues[0];
    } else if (isDesktop) {
      return completeValues[1];
    } else if (isSmallDesktop) {
      return completeValues[2];
    } else if (isTablet) {
      return completeValues[3];
    } else if (isMobile) {
      return completeValues[4];
    } else if (isSmallMobile) {
      return completeValues[5];
    }

    // Si por alguna razón no hay coincidencia, usar el valor para desktop
    return completeValues[1];
  };

  // Detectar el tamaño actual de pantalla (cualquier tamaño)
  const getCurrentScreenSize = () => {
    if (isLargeDesktop) return "largeDesktop";
    if (isDesktop) return "desktop";
    if (isSmallDesktop) return "smallDesktop";
    if (isTablet) return "tablet";
    if (isMobile) return "mobile";
    if (isSmallMobile) return "smallMobile";
    return "desktop"; // Valor por defecto
  };

  return {
    handleResponsiveness,
    getCurrentScreenSize,
    isLargeDesktop,
    isDesktop,
    isSmallDesktop,
    isTablet,
    isMobile,
    isSmallMobile,
    isPortrait,
  };
};

export default useResponsiveness;
