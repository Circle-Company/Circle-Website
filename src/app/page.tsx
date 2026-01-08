"use client";

import React, {
    CSSProperties,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Image from "next/image";

import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { Screen } from "@/components/screen";
import { HomeCta } from "@/sections/home.cta";
import { HomeIllustration } from "@/sections/home.illustration";
import { useIsMobile } from "@/hooks/use.platform.detection";

/**
 * Home layout rules:
 * - Desktop: NO vertical scroll (html/body locked by globals.css). So this page MUST fit in 100vh.
 * - Mobile: vertical scroll allowed.
 *
 * Strategy:
 * - Measure actual rendered Header/Footer heights.
 * - Set the main area height to: 100vh - header - footer (desktop only).
 * - On desktop, hide overflow-y inside main to avoid scrollbars.
 * - On mobile, let main height be auto and allow vertical scrolling.
 */
export default function Home() {
    const isMobile = useIsMobile();

    const headerRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);

    const [headerH, setHeaderH] = useState<number>(0);
    const [footerH, setFooterH] = useState<number>(0);

    // Fallback seguro (evita calc negativo antes das medições estabilizarem)
    const fallbackHeaderH = 80;
    const fallbackFooterH = 60;

    const measure = () => {
        const h = headerRef.current?.getBoundingClientRect().height ?? 0;
        const f = footerRef.current?.getBoundingClientRect().height ?? 0;
        setHeaderH(h);
        setFooterH(f);
    };

    // Measure ASAP after layout, and on resize.
    useLayoutEffect(() => {
        measure();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    useEffect(() => {
        measure();

        if (typeof window === "undefined") return;

        const onResize = () => measure();
        window.addEventListener("resize", onResize);

        // ResizeObserver catches font load / wrapping changes.
        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(() => measure());
            if (headerRef.current) ro.observe(headerRef.current);
            if (footerRef.current) ro.observe(footerRef.current);
        }

        return () => {
            window.removeEventListener("resize", onResize);
            if (ro) ro.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    const pageStyle: CSSProperties = {
        position: "relative",
        width: "100%",
        height: isMobile ? "auto" : "100vh",
        minHeight: "100vh",
        overflowX: "hidden",
        // Desktop: trava scroll no body; aqui só garantimos que não "corte" cliques nem crie container estranho
        overflowY: isMobile ? "auto" : "hidden",
        display: "flex",
        flexDirection: "column",

        // Create an explicit stacking context so we can safely push the background behind everything
        isolation: "isolate",
    };

    const bgImageStyle: CSSProperties = {
        position: "absolute",
        left: "50%",
        bottom: "20vh",
        transform: "translateX(-50%)",
        width: "140%",
        height: "140%",
        opacity: 0.4,
        pointerEvents: "none",
        zIndex: -1,
        objectFit: "contain",
        display: "block",
    };

    const headerWrapStyle: CSSProperties = {
        position: "relative",
        zIndex: 1,
        flex: "0 0 auto",
        width: "100%",
    };

    const footerWrapStyle: CSSProperties = {
        position: "relative",
        zIndex: 1,
        flex: "0 0 auto",
        width: "100%",
    };

    const safeHeaderH = headerH > 0 ? headerH : fallbackHeaderH;
    const safeFooterH = footerH > 0 ? footerH : fallbackFooterH;

    const mainStyle: CSSProperties = {
        position: "relative",
        zIndex: 1,
        flex: isMobile ? "0 0 auto" : "1 1 auto",
        width: "100%",
        overflowX: "hidden",
        // Desktop: lock to remaining viewport height; Mobile: natural height
        height: isMobile
            ? "auto"
            : `calc(100vh - ${safeHeaderH}px - ${safeFooterH}px)`,
        // Desktop: no vertical scroll; Mobile: allow
        overflowY: isMobile ? "visible" : "hidden",
        // Avoid flex children forcing overflow
        minHeight: 0,

        // Desktop: center main content vertically within the remaining viewport height
        display: isMobile ? "block" : "flex",
        alignItems: isMobile ? "stretch" : "center",
    };

    const contentWrapStyle: CSSProperties = {
        width: "100%",
        maxWidth: 1400,
        margin: "0 auto",
        paddingLeft: isMobile ? 10 : 60,
        paddingRight: isMobile ? 10 : 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 40 : 40,
        minWidth: 0,

        // Não clipa no desktop: clipping pode gerar hit-testing bizarro em algumas combinações de layout,
        // e não é necessário pro footer ser clicável.
        overflow: isMobile ? "visible" : "visible",
    };

    return (
        <div style={pageStyle}>
            {!isMobile && (
                <Image
                    src="/images/bg_desktop.png"
                    alt="Background desktop"
                    width={2000}
                    height={2000}
                    priority
                    style={bgImageStyle}
                />
            )}

            <div ref={headerRef} style={headerWrapStyle}>
                <Header />
            </div>

            <main style={mainStyle}>
                <Screen>
                    <div style={contentWrapStyle}>
                        <HomeCta />
                        <HomeIllustration />
                        {isMobile && (
                            <a
                                href="https://apps.apple.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginTop: -50,
                                    marginBottom: 20,
                                    alignSelf: "center",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Image
                                    src="/icons/svg/download-on-app-store.svg"
                                    alt="Download on App Store"
                                    width={180}
                                    height={60}
                                    style={{
                                        height: 30,
                                        width: "auto",
                                    }}
                                    priority
                                />
                            </a>
                        )}
                    </div>
                </Screen>
            </main>

            <div ref={footerRef} style={footerWrapStyle}>
                <Footer />
            </div>
        </div>
    );
}
