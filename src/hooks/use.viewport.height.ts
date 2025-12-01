"use client";

import { useEffect, useState } from "react";

export function useViewportHeight() {
  const get = () => {
    if (typeof window === "undefined") return 0;
    return window.visualViewport?.height ?? window.innerHeight;
  };

  const [vh, setVh] = useState(get());

  useEffect(() => {
    const handleResize = () => setVh(get());

    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  return vh;
}
