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

        // ocupa apenas o espaço visível (descontando header e footer fixos)
        height: `calc(100vh - var(--app-header-height, ${fallbackHeaderH}px) - var(--app-footer-height, ${fallbackFooterH}px))`,
        minHeight: `calc(100vh - var(--app-header-height, ${fallbackHeaderH}px) - var(--app-footer-height, ${fallbackFooterH}px))`,
        maxHeight: `calc(100vh - var(--app-header-height, ${fallbackHeaderH}px) - var(--app-footer-height, ${fallbackFooterH}px))`,

        // padding não deve "estourar" o height
        boxSizing: "border-box",

        // rolagem interna do conteúdo
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",

        display: "flex",
        flexDirection: "column",

        paddingLeft: sizes.paddings[20],
        paddingRight: sizes.paddings[20],
        paddingTop: sizes.paddings[10],

        // garante que o final do texto não fique por trás do footer fixo
        // (extra pequeno apenas para respiro; a altura do footer já foi descontada acima)
        paddingBottom: sizes.paddings[20],

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
