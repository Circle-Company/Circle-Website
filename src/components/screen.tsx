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
        maxWidth: "100%", // evita 100vw (inclui scrollbar e pode causar overflow/hit-testing estranho)

        // Desktop: não crie um scroll container (o projeto trava scroll no html/body).
        // Mobile: permite scroll vertical normalmente.
        minHeight: isMobile
            ? "auto"
            : `calc(100vh - ${headerHeight + footerHeight}px)`,

        boxSizing: "border-box",
        overflowY: isMobile ? "auto" : "visible",

        // Desktop: allow true vertical centering by centering children within this container.
        // Mobile: keep default flow.
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "center",

        paddingLeft: isMobile ? sizes.paddings[10] * 0.5 : sizes.paddings[20],
        paddingRight: isMobile ? sizes.paddings[10] * 0.5 : sizes.paddings[20],
    };

    return <div style={{ ...baseStyle, ...(style ?? {}) }}>{children}</div>;
}
