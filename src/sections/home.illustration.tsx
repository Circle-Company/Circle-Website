"use client";

import React from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { useSizes } from "@/constants/sizes";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use.platform.detection";

type LangCode = "en" | "pt";

export function HomeIllustration() {
    const { atualAppLanguage } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const desktopImages = React.useMemo<Record<LangCode, string>>(
        () => ({
            en: "/images/illustration_desktop_en.png",
            pt: "/images/illustration_desktop_pt.png",
        }),
        [],
    );

    const mobileImages = React.useMemo<Record<LangCode, string>>(
        () => ({
            en: "/images/illustration_mobile_en.png",
            pt: "/images/illustration_mobile_pt.png",
        }),
        [],
    );

    const pickImage = React.useCallback(
        (mobile: boolean, lang: LangCode) => {
            const code: LangCode = lang === "pt" ? "pt" : "en";
            return mobile ? mobileImages[code] : desktopImages[code];
        },
        [desktopImages, mobileImages],
    );

    function pickMaxWidth(mobile: boolean, width: number) {
        if (!width || width < 200) return mobile ? 480 : 600;
        return mobile ? width * 1.25 : width * 0.48;
    }

    const getReliableWidth = React.useCallback(() => {
        const fromSizes = sizes?.screen?.width;
        if (fromSizes && fromSizes > 200) return fromSizes;
        if (typeof window !== "undefined") return window.innerWidth;
        return 400;
    }, [sizes?.screen?.width]);

    const computeState = React.useCallback(() => {
        const w = getReliableWidth();
        const lang: LangCode = atualAppLanguage.code === "pt" ? "pt" : "en";
        return {
            img: pickImage(isMobile, lang),
            maxW: pickMaxWidth(isMobile, w),
        };
    }, [atualAppLanguage.code, getReliableWidth, isMobile, pickImage]);

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

    const imageStyle: CSSProperties = {
        width: isMobile ? "110%" : "100%",
        maxWidth: state.maxW,
        height: "auto",
        objectFit: "contain",
        transition: "max-width 0.3s ease",
        maxHeight: "100%",
        marginLeft: isMobile ? -10 : 30,
        marginTop: isMobile ? -10 : 0, // aproxima ainda mais do topo
    };

    return (
        <div style={container}>
            <Image
                src={state.img}
                alt=""
                width={1400}
                height={1400}
                style={imageStyle}
                priority={!isMobile}
            />
        </div>
    );
}
