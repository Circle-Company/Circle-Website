"use client";

import React from "react";
import Link from "next/link";

import { useSizes } from "@/constants/sizes";
import fonts from "@/constants/fonts";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { colors } from "@/constants/colors";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSelector } from "../language-selector";

const linkStyleBase: React.CSSProperties = {
    fontFamily: fonts.family.Semibold,
    textDecoration: "none",
    color: colors.gray[4],
    cursor: "pointer",
    transition: "color 0.2s ease",
};

export function TermsNav() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    const linkStyle = (mobile: boolean): React.CSSProperties => ({
        ...linkStyleBase,
        fontSize: mobile ? fonts.size.body * 0.8 : fonts.size.body * 0.9,
        width: mobile ? "100%" : "auto",
        textAlign: mobile ? "center" : "right",
        display: "inline-block",
        position: "relative",
        zIndex: 100000,
        pointerEvents: "auto",
    });

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .termsNavLink:hover {
                        color: ${colors.gray.white};
                    }
                `,
                }}
            />
            <nav
                aria-label="Footer navigation"
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    flexWrap: isMobile ? "nowrap" : "wrap",
                    gap: isMobile
                        ? sizes.paddings[10] * 0.6
                        : sizes.spaces[30] * 0.8,
                    alignItems: "center",
                    justifyContent: isMobile ? "center" : "flex-end",
                    textAlign: isMobile ? "center" : "right",
                    position: "relative",
                    zIndex: 100000,
                    pointerEvents: "auto",
                }}
            >
                <div style={linkStyle(isMobile)}>
                    <LanguageSelector />
                </div>
                <Link
                    href="/contact-us"
                    className={isMobile ? undefined : "termsNavLink"}
                    style={linkStyle(isMobile)}
                >
                    {t("Contact Us")}
                </Link>
                <Link
                    href="/help"
                    className={isMobile ? undefined : "termsNavLink"}
                    style={linkStyle(isMobile)}
                >
                    {t("Help")}
                </Link>
            </nav>
        </>
    );
}
