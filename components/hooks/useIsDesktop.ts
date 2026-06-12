"use client";

import { useEffect, useState } from "react";

// True at >=1024px. Starts false (SSR-safe) and updates after mount, so
// window dragging is enabled on desktop only and disabled on mobile.
export function useIsDesktop(query = "(min-width: 1024px)"): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return isDesktop;
}
