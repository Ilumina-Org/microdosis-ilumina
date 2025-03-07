import { useMediaQuery } from 'react-responsive';

const useResponsiveness = () => {
  const desktop = useMediaQuery({ query: "(min-width: 1920px)" });
  const laptop = useMediaQuery({ query: "(min-width: 1399px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const handleResponsiveness = (values:any) => {
    if (desktop) {
      return values[0];
    }else if (laptop) {
      return values[1];
    } else if (isTabletOrMobile) {
      return values[2];
    } else if (isPortrait) {
      return values[3];
    }
    return values[0];
  };

  return { handleResponsiveness };
};

export default useResponsiveness;