"use client";

import React from "react";
import Link from "next/link";

import { useSizes } from "@/constants/sizes";
import fonts from "@/constants/fonts";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { colors } from "@/constants/colors";
import { useLanguage } from "@/contexts/language-context";

const linkStyleBase: React.CSSProperties = {
    fontFamily: fonts.family.Semibold,
    textDecoration: "none",
    color: colors.gray[4],
    cursor: "pointer",
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

        // Diagnostics (remove after fixing): helps see if something is covering the links
        position: "relative",
        zIndex: 100000,
        pointerEvents: "auto",
    });

    const logPointer = (
        label: string,
        e:
            | React.MouseEvent<HTMLAnchorElement>
            | React.PointerEvent<HTMLAnchorElement>,
    ) => {
        // If you DON'T see these logs, the click isn't reaching the <a> (overlay is intercepting)
        // If you DO see them but navigation doesn't happen, something is preventing default globally.
        // eslint-disable-next-line no-console
        console.log("[TermsNav]", label, "event", e.type);
    };

    return (
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

                // Diagnostics: ensure nav itself is not blocked
                position: "relative",
                zIndex: 100000,
                pointerEvents: "auto",
            }}
        >
            <Link
                href="/community-guidelines"
                style={linkStyle(isMobile)}
                onPointerDown={(e) => logPointer("community-guidelines", e)}
                onClick={(e) => logPointer("community-guidelines", e)}
            >
                {t("Community Guidelines")}
            </Link>

            <Link
                href="/terms-of-service"
                style={linkStyle(isMobile)}
                onPointerDown={(e) => logPointer("terms-of-service", e)}
                onClick={(e) => logPointer("terms-of-service", e)}
            >
                {t("Terms")}
            </Link>

            <Link
                href="/privacy-policy"
                style={linkStyle(isMobile)}
                onPointerDown={(e) => logPointer("privacy-policy", e)}
                onClick={(e) => logPointer("privacy-policy", e)}
            >
                {t("Privacy Policy")}
            </Link>

            <Link
                href="/contact-us"
                style={linkStyle(isMobile)}
                onPointerDown={(e) => logPointer("contact-us", e)}
                onClick={(e) => logPointer("contact-us", e)}
            >
                {t("Contact Us")}
            </Link>
            <Link
                href="/help"
                className="termsNavLink"
                style={linkStyle(isMobile)}
                onPointerDown={(e) => logPointer("help", e)}
                onClick={(e) => logPointer("help", e)}
            >
                {t("Help")}
            </Link>
        </nav>
    );
}
