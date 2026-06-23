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

    const container: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 8 : 10,
        paddingLeft: isMobile ? sizes.paddings[10] : 0,
    };

    const title: React.CSSProperties = {
        fontFamily: isMobile ? fonts.family.Bold : fonts.family.Black,
        fontSize: isMobile ? fonts.size.title2 * 0.7 : fonts.size.title2,
        color: colors.gray.white,
        marginBottom: isMobile ? sizes.margins[10] * 0.4 : sizes.margins[10],
    };

    return (
        <aside style={container}>
            <div style={title}>Legal Pages</div>
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
