"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import { HomeCta } from "@/sections/home.cta";
import { HomeIllustration } from "@/sections/home.illustration";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { CSSProperties } from "react";
import Image from "next/image";

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

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: isMobile ? "flex-start" : "center",

    width: "100%",
    maxWidth: 1400,
    margin: "0 auto",

    paddingLeft: isMobile ? 10 : 60,
    paddingRight: isMobile ? 10 : 60,

    gap: isMobile ? 40 : 40, // maior gap para telas grandes

    minHeight: isMobile ? "auto" : "70vh", // garante área mínima centralizada no desktop
    height: isMobile ? "auto" : "calc(100vh - 120px)", // 120px para header/footer

    // força que esse bloco nunca passe da tela no desktop
    maxHeight: isMobile ? "none" : "100vh",
    overflowX: "hidden",
    overflowY: isMobile ? "auto" : "hidden",
    boxSizing: "border-box",
  };

  const absoluteImageStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "auto",
    maxWidth: "100vw",
    opacity: 0.4,
    pointerEvents: "none" as React.CSSProperties["pointerEvents"],
    overflow: "hidden",
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100vw",
    height: isMobile ? "auto" : "calc(100vh - 120px)",
    display: "flex",
    justifyContent: isMobile ? "flex-start" : "center",
    alignItems: "center",
    overflowX: "hidden",
    overflowY: isMobile ? "auto" : "hidden",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  };

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: isMobile ? "auto" : "hidden",
        height: isMobile ? "auto" : "100vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: "center",
        boxSizing: "border-box",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
        margin: 0,
        padding: 0,
      }}
    >
      {!isMobile && (
        <Image
          src="/images/bg_desktop.png"
          alt="Background desktop"
          style={absoluteImageStyle}
        />
      )}

      <Header />

      <Screen>
        <div style={containerStyle}>
          <div style={wrapperStyle}>
            <HomeCta />
            <HomeIllustration />
          </div>
        </div>
      </Screen>

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
