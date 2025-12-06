"use client";

import React, { CSSProperties } from "react";
import { useSizes } from "@/constants/sizes";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use.platform.detection";
import Image from "next/image";
import { attachTimeline } from "framer-motion";

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

  function pickMaxWidth(mobile: boolean, width: number) {
    if (!width || width < 200) return mobile ? 480 : 600;
    return mobile ? width * 1.25 : width * 0.48;
  }

  const computeState = React.useCallback(() => {
    function getReliableWidth() {
      const fromSizes = sizes?.screen?.width;
      if (fromSizes && fromSizes > 200) return fromSizes;
      if (typeof window !== "undefined") return window.innerWidth;
      return 400;
    }
    function pickImage(mobile: boolean, lang: string) {
      const code = lang === "pt" ? "pt" : "en";
      return mobile ? mobileImages[code] : desktopImages[code];
    }
    const w = getReliableWidth();
    return {
      img: pickImage(isMobile, atualAppLanguage.code),
      maxW: pickMaxWidth(isMobile, w),
    };
  }, [isMobile, atualAppLanguage.code, sizes]);

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

  const container: CSSProperties = {
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

  const imageStyle = React.useMemo(() => {
    if (isMobile) {
      return {
        width: "110%",
        maxWidth: state.maxW,
        height: "auto",
        objectFit: "contain",
        transition: "max-width 0.3s ease",
        maxHeight: "100%",
        marginLeft: -10,
        marginTop: -10,
      } as CSSProperties;
    } else {
      return {
        width: 600,
        height: "auto",
        objectFit: "contain",
        transition: "none",
        maxHeight: "100%",
        marginLeft: atualAppLanguage.code == "pt" ? 50 : 40,
        marginTop: 0,
      } as CSSProperties;
    }
  }, [isMobile, state.maxW, atualAppLanguage]);

  return (
    <div style={container}>
      <Image
        src={state.img}
        alt={isMobile ? "Mobile illustration" : "Desktop illustration"}
        width={isMobile ? state.maxW : 600}
        height={isMobile ? state.maxW * 0.6 : 400}
        style={imageStyle}
      />
    </div>
  );
}
