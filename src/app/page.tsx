"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import { HomeCta } from "@/sections/home.cta";
import { HomeIllustration } from "@/sections/home.illustration";
import { useIsMobile } from "@/hooks/use.platform.detection";

/**
 * Objetivo:
 * - Desktop: sem scroll (nem vertical nem horizontal) e sem cortar o Footer.
 * - Mobile: apenas scroll vertical.
 * - Calcular altura real do Header e Footer (renderizados) para reservar espaço correto.
 *
 * Estratégia:
 * - Renderiza Header/Footer dentro de wrappers com refs.
 * - Mede altura real via ResizeObserver (e fallback).
 * - No desktop, o conteúdo principal ganha altura: calc(100vh - header - footer).
 * - Mantém o Footer full-width sem ficar "preso" ao maxWidth do conteúdo.
 */
export default function Home() {
    const isMobile = useIsMobile();

    const headerRef = useRef<HTMLElement | null>(null);
    const footerRef = useRef<HTMLElement | null>(null);

    const [headerH, setHeaderH] = useState(0);
    const [footerH, setFooterH] = useState(0);

    useLayoutEffect(() => {
        const headerEl = headerRef.current;
        const footerEl = footerRef.current;

        const measure = () => {
            if (headerEl)
                setHeaderH(Math.ceil(headerEl.getBoundingClientRect().height));
            if (footerEl)
                setFooterH(Math.ceil(footerEl.getBoundingClientRect().height));
        };

        measure();

        // Observa mudanças reais (font load, wrap no footer, responsividade, etc.)
        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(() => measure());
            if (headerEl) ro.observe(headerEl);
            if (footerEl) ro.observe(footerEl);
        }

        window.addEventListener("resize", measure);
        window.addEventListener("orientationchange", measure);

        return () => {
            window.removeEventListener("resize", measure);
            window.removeEventListener("orientationchange", measure);
            ro?.disconnect();
        };
    }, []);

    // Desktop: reserva exata = viewport - header - footer
    const desktopMainHeight =
        headerH > 0 || footerH > 0
            ? `calc(100vh - ${headerH}px - ${footerH}px)`
            : "100vh";

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "100vw",

                // Mobile: scroll vertical; Desktop: trava tudo.
                overflowX: "hidden",
                overflowY: isMobile ? "auto" : "hidden",

                // Desktop: fixa em 100vh para não permitir scroll.
                height: isMobile ? "auto" : "100vh",
            }}
        >
            {/* CSS global da home (mantido aqui para ficar auto-contido) */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
/* Imagem de fundo estável (sem depender de hooks) */
.home-bg {
  position: absolute;
  left: clamp(-220px, -10vw, -40px);
  bottom: clamp(-280px, -18vh, -140px);
  width: clamp(620px, 55vw, 1200px);
  height: clamp(620px, 55vw, 1200px);
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
  object-fit: contain;
  display: block;
}

@media (min-width: 1024px) {
  .home-bg {
    width: clamp(900px, 60vw, 1400px);
    height: clamp(900px, 60vw, 1400px);
    left: clamp(-260px, -8vw, -60px);
    bottom: clamp(-320px, -22vh, -160px);
  }
}

/* Footer full-width mesmo dentro de layouts centralizados */
.home-footer-full {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
`,
                }}
            />

            <Image
                src="/images/bg_desktop.png"
                className="home-bg"
                alt=""
                aria-hidden="true"
                draggable={false}
                width={1400}
                height={1400}
                priority
            />

            {/* Mede o Header real (altura dinâmica via sizes/header.height) */}
            <header
                ref={headerRef as any}
                style={{ position: "relative", zIndex: 1 }}
            >
                <Header />
            </header>

            <Screen>
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,

                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: isMobile ? "stretch" : "center",

                        // Desktop: altura exata para não cortar footer e não ter scroll
                        height: isMobile ? "auto" : desktopMainHeight,

                        // Evita overflow horizontal gerando scroll
                        overflowX: "hidden",

                        // Desktop: não deixa estourar verticalmente (scroll travado)
                        overflowY: isMobile ? "visible" : "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            alignItems: "center",
                            justifyContent: "center",

                            width: "100%",
                            maxWidth: 1400,
                            margin: "0 auto",
                            paddingLeft: isMobile ? 10 : 60,
                            paddingRight: isMobile ? 10 : 60,
                            gap: isMobile ? 40 : 20,

                            // Importantíssimo pra evitar que flex-children causem overflow no desktop
                            minWidth: 0,
                            overflowX: "hidden",
                            overflowY: isMobile ? "visible" : "hidden",
                        }}
                    >
                        <HomeCta />
                        <HomeIllustration />
                    </div>
                </div>
            </Screen>

            {/* Mede o Footer real (altura pode mudar com wrap/idioma) */}
            <footer
                ref={footerRef as any}
                style={{ position: "relative", zIndex: 1 }}
            >
                <div className="home-footer-full">
                    <Footer />
                </div>
            </footer>
        </div>
    );
}
