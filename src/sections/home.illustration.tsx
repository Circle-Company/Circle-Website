"use client";

import React from "react";
import { useSizes } from "@/constants/sizes";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use.platform.detection";

export function HomeIllustration() {
  const { atualAppLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const sizes = useSizes();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const desktopImages = {
    en: "/images/illustration_desktop_en.png",
    pt: "/images/illustration_desktop_pt.png",
  };

  const mobileImages = {
    en: "/images/illustration_mobile_en.png",
    pt: "/images/illustration_mobile_pt.png",
  };

  function pickImage(mobile, lang) {
    const code = lang === "pt" ? "pt" : "en";
    return mobile ? mobileImages[code] : desktopImages[code];
  }

  function pickMaxWidth(mobile: boolean, width: number) {
    if (!width || width < 200) return mobile ? 480 : 600;
    return mobile ? width * 1.25 : width * 0.48;
  }

  function getReliableWidth() {
    const fromSizes = sizes?.screen?.width;
    if (fromSizes && fromSizes > 200) return fromSizes;
    if (typeof window !== "undefined") return window.innerWidth;
    return 400;
  }

  const computeState = React.useCallback(() => {
    const w = getReliableWidth();
    return {
      img: pickImage(isMobile, atualAppLanguage.code),
      maxW: pickMaxWidth(isMobile, w),
    };
  }, [isMobile, atualAppLanguage.code, sizes.screen.width]);

  const [state, setState] = React.useState(() => computeState());

  React.useEffect(() => {
    if (!mounted) return;
    setState(computeState());
  }, [mounted, computeState]);

  React.useEffect(() => {
    if (!mounted) return;
    const handler = () => setState(computeState());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [mounted, computeState]);

  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: isMobile ? "100%" : "44%",
    padding: isMobile ? "0 10px 10px 10px" : 20, // MENOS espaço em cima no mobile

    overflow: "hidden",
    maxHeight: isMobile ? "none" : "80vh",
    borderRadius: isMobile ? 0 : 24,
    position: "relative",
    marginTop: isMobile ? -10 : 0, // puxa ainda mais a imagem para cima
  };

  const imageStyle = {
    width: isMobile ? "110%" : "100%",
    maxWidth: state.maxW,
    height: "auto",
    objectFit: "contain",
    transition: "max-width 0.3s ease",
    maxHeight: "100%",
    marginLeft: isMobile ? -10 : 30,
    marginTop: isMobile ? -10 : 0, // aproxima ainda mais do topo
  };

  return (
    <div style={container}>
      <img src={state.img} style={imageStyle} />
    </div>
  );
}
