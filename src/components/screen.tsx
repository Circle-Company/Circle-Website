"use client";

import React, { CSSProperties, ReactNode } from "react";
import { useSizes } from "@/constants/sizes";
import { useIsMobile } from "@/hooks/use.platform.detection";

interface ScreenProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Screen({ children, style }: ScreenProps) {
  const sizes = useSizes();
  const isMobile = useIsMobile();

  const headerHeight = sizes.header.height;
  const footerHeight = isMobile
    ? sizes.footer.height * 1.4
    : sizes.footer.height;

  const baseStyle: CSSProperties = {
    width: "100%", // largura correta
    maxWidth: "100vw", // impede overflow horizontal

    minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`, // fórmula corrigida

    boxSizing: "border-box",
    overflowY: "auto", // scroll vertical limpo
    display: "flex",
    flexDirection: "column",

    paddingLeft: isMobile ? sizes.paddings[10] * 0.5 : sizes.paddings[20],
    paddingRight: isMobile ? sizes.paddings[10] * 0.5 : sizes.paddings[20],
  };

  return <div style={{ ...baseStyle, ...(style ?? {}) }}>{children}</div>;
}
