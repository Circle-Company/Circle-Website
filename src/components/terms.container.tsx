"use client";

import React, { type CSSProperties, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";

interface ScreenProps {
  children: ReactNode;
  style?: CSSProperties;
}

// Área principal da tela, ocupando o espaço entre header e footer.
// Use este componente ao redor do conteúdo de cada página.
export function TermsContainer({ children, style }: ScreenProps) {
  const isMobile = useIsMobile();
  const sizes = useSizes();
  const baseStyle: CSSProperties = {
    alignItems: "center",
    alignSelf: "center",
    width: isMobile ? "100vw" : "60vw",
    height: sizes.screen.height,
    maxHeight: "100vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    paddingLeft: sizes.paddings[20],
    paddingRight: sizes.paddings[20],
    paddingTop: sizes.paddings[10],
    paddingBottom: sizes.paddings[10],
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  } as CSSProperties;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .terms-container-no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `,
        }}
      />
      <div
        className="terms-container-no-scrollbar"
        style={{
          ...baseStyle,
          ...(style ?? {}),
        }}
      >
        {children}
      </div>
    </>
  );
}
