"use client";

import React, { type CSSProperties, type ReactNode } from "react";
import sizes from "@/constants/sizes";

interface ScreenProps {
  children: ReactNode;
  style?: CSSProperties;
}

// Área principal da tela, ocupando o espaço entre header e footer.
// Use este componente ao redor do conteúdo de cada página.
export function Screen({ children, style }: ScreenProps) {
  const baseStyle: CSSProperties = {
    width: "100vw",
    maxWidth: "100vw",
    height: sizes.screens.height,
    maxHeight: "100vh",
    boxSizing: "border-box",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  };

  return <div style={{ ...baseStyle, ...(style ?? {}) }}>{children}</div>;
}

