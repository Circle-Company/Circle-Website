"use client";

import React, { CSSProperties } from "react";
import { useSizes } from "@/constants/sizes";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use.platform.detection";
import Image from "next/image";

type LangCode = "en" | "pt";

export function HomeIllustration() {
    const { atualAppLanguage } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    const desktopImages: Record<LangCode, string> = {
        en: "/images/illustration_desktop_en.png",
        pt: "/images/illustration_desktop_pt.png",
    };

    const mobileImages: Record<LangCode, string> = {
        en: "/images/illustration_mobile_en.png",
        pt: "/images/illustration_mobile_pt.png",
    };

    function pickMaxWidth(mobile: boolean, width: number) {
        if (!width || width < 200) return mobile ? 480 : 600;
        return mobile ? width * 1.25 : width * 0.48;
    }

    const lang: LangCode = atualAppLanguage.code === "pt" ? "pt" : "en";

    const screenWidth =
        sizes?.screen?.width && sizes.screen.width > 200
            ? sizes.screen.width
            : typeof window !== "undefined"
              ? window.innerWidth
              : 400;

    const img = isMobile ? mobileImages[lang] : desktopImages[lang];
    const maxW = pickMaxWidth(isMobile, screenWidth);

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

    const imageStyle = React.useMemo(() => {
        if (isMobile) {
            return {
                width: "110%",
                maxWidth: maxW,
                height: "auto",
                objectFit: "contain",
                transition: "max-width 0.3s ease",
                maxHeight: "100%",
                marginLeft: -10,
                marginTop: -10,
            } as CSSProperties;
        } else {
            return {
                width: 600,
                height: "auto",
                objectFit: "contain",
                transition: "none",
                maxHeight: "100%",
                marginLeft: atualAppLanguage.code == "pt" ? 50 : 40,
                marginTop: 0,
            } as CSSProperties;
        }
    }, [isMobile, maxW, atualAppLanguage.code]);

    return (
        <div style={container}>
            <Image
                src={img}
                alt={isMobile ? "Mobile illustration" : "Desktop illustration"}
                width={isMobile ? maxW : 600}
                height={isMobile ? maxW * 0.6 : 400}
                style={imageStyle}
            />
        </div>
    );
}
