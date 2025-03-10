import { useMediaQuery } from 'react-responsive';

const useResponsiveness = () => {

  const mobile = useMediaQuery({ orientation: "portrait" });
  const large = useMediaQuery({
    query: "(min-width: 2400px)",
  });
  const desktop = useMediaQuery({
    query: "(min-width: 1920px) and (max-width: 2399px)",
  });
  const medium = useMediaQuery({
    query: "(min-width: 1250px) and (max-width: 1919px)",
  });
  const small = useMediaQuery({
    query: "(max-width: 1370px)",
  });

  //@ts-ignore
  const handleResponsiveness = (s, m, l, xl, mob) => {
    console.log("queso1", small, medium, desktop, large);
    if (small) return s;
    if (medium) return m;
    if (desktop) return l;
    if (large) return xl;
    if (mobile) return mob;
  };


  // const desktop = useMediaQuery({ query: "(min-width: 1920px)" });
  // const laptop = useMediaQuery({ query: "(min-width: 1399px)" });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  // const handleResponsiveness = (values:any) => {
  //   if (desktop) {
  //     return values[0];
  //   }else if (laptop) {
  //     return values[1];
  //   } else if (isTabletOrMobile) {
  //     return values[2];
  //   } else if (isPortrait) {
  //     return values[3];
  //   }
  //   return values[0];
  // };

  return { handleResponsiveness, mobile, large, desktop, medium, small };
};

export default useResponsiveness;