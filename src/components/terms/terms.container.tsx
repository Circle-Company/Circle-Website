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
//
// IMPORTANTE (telas de termos):
// - O footer está FIXO (sobrepondo).
// - Então este container precisa rolar internamente, mas com altura = viewport - header - footer,
//   senão o conteúdo cobre o footer e você nunca "vê" o footer.
// - As alturas de header/footer devem vir via CSS variables no elemento/na página:
//   --app-header-height: 72px;
//   --app-footer-height: 140px;
// (Pode ajustar esses valores no layout/página conforme o seu Header/Footer reais.)
export function TermsContainer({ children, style }: ScreenProps) {
    const isMobile = useIsMobile();
    const sizes = useSizes();

    // Fallback caso as CSS variables não sejam setadas.
    // Ideal: a página/layout setar corretamente --app-header-height e --app-footer-height.
    const fallbackHeaderH = 72;
    const fallbackFooterH = 140;

    const baseStyle: CSSProperties = {
        alignItems: "center",
        alignSelf: "center",

        // largura do container (fixa e previsível)
        width: isMobile ? "100vw" : "60vw",
        maxWidth: "100vw",

        // altura e overflow livres para renderizar todo o conteúdo
        height: "auto",
        minHeight: "auto",
        maxHeight: "none",
        overflow: "visible",

        // padding não deve "estourar" o height
        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",

        paddingLeft: sizes.paddings[20],
        paddingRight: sizes.paddings[20],
        paddingTop: sizes.paddings[10],

        // garante um respiro no final do texto
        paddingBottom: sizes.paddings[20],
    } as CSSProperties;

    return (
        <div
            style={{
                ...baseStyle,
                ...(style ?? {}),
            }}
        >
            {children}
        </div>
    );
}
