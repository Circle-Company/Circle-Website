"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";

type TermsLink = {
    label: string;
    href: string;
};

const TERMS_LINKS: TermsLink[] = [
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Community Guidelines", href: "/community-guidelines" },
];

export function TermsSidebar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    // No mobile o menu deixa de ser lateral e vira um bloco no fim da página:
    // largura total, links em linha centrados e um separador acima.
    const container: React.CSSProperties = {
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        flexWrap: isMobile ? "wrap" : "nowrap",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "flex-start",
        gap: isMobile ? sizes.paddings[10] : 10,
        width: isMobile ? "100%" : "auto",
        boxSizing: "border-box",
        paddingInline: isMobile ? sizes.paddings[20] : 0,
        paddingTop: isMobile ? sizes.paddings[20] : 0,
        borderTop: isMobile ? "1px solid rgba(255,255,255,0.12)" : "none",
        textAlign: isMobile ? "center" : "left",
    };

    // Renderizado apenas no desktop.
    const title: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontSize: fonts.size.title2,
        color: colors.gray.white,
        marginBottom: sizes.margins[10],
    };

    return (
        <aside style={container}>
            {/* No mobile o menu vira uma faixa de links no fim da página, sem título. */}
            {!isMobile && <div style={title}>Legal Pages</div>}
            {TERMS_LINKS.map((item) => {
                const isActive =
                    pathname === item.href ||
                    (pathname?.startsWith(item.href) ?? false);

                const linkStyle: React.CSSProperties = {
                    textDecoration: "none",
                    color: isActive
                        ? colors.gray.white
                        : "rgba(255,255,255,0.65)",
                    fontFamily: fonts.family.Medium ?? fonts.family.Semibold,
                    fontSize: isMobile
                        ? fonts.size.subheadline * 0.8
                        : fonts.size.subheadline,
                    transition: "color 160ms ease",
                };

                return (
                    <Link key={item.href} href={item.href} style={linkStyle}>
                        {item.label}
                    </Link>
                );
            })}
        </aside>
    );
}
