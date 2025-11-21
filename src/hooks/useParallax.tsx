import { useEffect, useRef, useState } from "react";


export function usePapallax() {

            const containerRef = useRef<HTMLDivElement>(null);
            const headerRef = useRef<HTMLDivElement>(null);
          //   const searchBgRef = useRef<HTMLDivElement>(null);
            const fadeBgRef = useRef<HTMLDivElement>(null);

            const [checkBG, setCheckBG] = useState(false);
            const ticking = useRef(false);

              useEffect(() => {
                    const observer = new IntersectionObserver(
                         (entries) => {
                         entries.forEach((entry) => {
                              // if (!searchBgRef.current) return;

                              if (entry.isIntersecting) {
                              // элемент ещё виден → убираем фон
                              // searchBgRef.current.style.backgroundImage = "";
                              setCheckBG(false);
                              } else {
                              // элемент вышел из зоны видимости → ставим фон
                              // searchBgRef.current.style.backgroundImage = 'url("/assets/Day.jpg")';
                              setCheckBG(true);
                              }
                         });
                         },
                          {
                              root: null, // следим за viewport
                              threshold: 0.1, // процент видимости (0.1 = 10%)
                         });
                    if (headerRef.current) {
                         observer.observe(headerRef.current);
                    }

                    return () => {
                         if (headerRef.current) {
                         observer.unobserve(headerRef.current);
                         }
                    };
               }, []);
     
     
               const updateParallax = () => {
                    const container = containerRef.current;
     
                    const scrollTop = container.scrollTop;
                    headerRef.current.style.backgroundPositionY = `${scrollTop * 0.5}px`; 
                    // 0.5 — коэффициент параллакса (меньше = медленнее фон)
     
     
                    ticking.current = false;
               
               };
     
               const handleScroll = () => {
                    if (!ticking.current) {
                         requestAnimationFrame(updateParallax);
                         ticking.current = true;
                    }
               };
     
     
             //убираем ticking при размонтировании
                 useEffect(() => {
                    return () => {
                         ticking.current = false;
                    };
                 }, []);


                 return {containerRef, headerRef, fadeBgRef, handleScroll, checkBG}

}