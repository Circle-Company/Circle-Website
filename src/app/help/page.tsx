"use client";

import React from "react";
import Link from "next/link";

import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { Screen } from "@/components/screen";
import { Text } from "@/components/themed";

import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useLanguage } from "@/contexts/language-context";

export default function HelpPage() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    const container: React.CSSProperties = {
        width: "100%",
        maxWidth: 980,
        margin: "0 auto",
        paddingInline: isMobile ? sizes.paddings[10] * 1.6 : sizes.paddings[28],
        paddingBlock: isMobile ? sizes.paddings[10] * 1.8 : sizes.paddings[28],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 12 : 18,
    };

    const card: React.CSSProperties = {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderRadius: isMobile ? 18 : 24,
        padding: isMobile ? 16 : 28,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 10 : 14,
    };

    const title: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title2 * 1.05 : fonts.size.title2 * 1.3,
        lineHeight: 1.05,
        color: colors.gray.white,
        textAlign: isMobile ? "center" : "left",
    };

    const subtitle: React.CSSProperties = {
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: isMobile
            ? fonts.size.subheadline * 0.95
            : fonts.size.subheadline * 1.05,
        color: colors.gray[4],
        textAlign: isMobile ? "center" : "left",
        maxWidth: isMobile ? "100%" : 780,
        margin: 0,
    };

    const sectionTitle: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.body : fonts.size.body * 1.15,
        color: colors.gray.white,
        margin: 0,
        textAlign: isMobile ? "center" : "left",
    };

    const sectionBody: React.CSSProperties = {
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: isMobile ? fonts.size.body * 0.9 : fonts.size.body,
        color: colors.gray[4],
        margin: 0,
        lineHeight: 1.5,
        textAlign: isMobile ? "center" : "left",
    };

    const linkCardBase: React.CSSProperties = {
        textDecoration: "none",
        display: "block",
        width: "100%",
        borderRadius: isMobile ? 16 : 18,
        padding: isMobile ? 14 : 18,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition:
            "transform 180ms ease, background-color 180ms ease, border-color 180ms ease",
        boxSizing: "border-box",
        transform: "translateZ(0)",
        willChange: "transform, border-color",
    };

    const ctaRow: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 10 : 12,
        marginTop: isMobile ? 4 : 6,
    };

    const ctaInner: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
    };

    const ctaTitle: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile
            ? fonts.size.subheadline * 1.02
            : fonts.size.subheadline * 1.15,
        color: colors.gray.white,
        textAlign: isMobile ? "center" : "left",
    };

    const ctaHint: React.CSSProperties = {
        ...sectionBody,
        color: colors.gray.white,
        marginTop: 2,
    };

    const helperText: React.CSSProperties = {
        fontFamily: fonts.family.Medium ?? fonts.family.Semibold,
        fontSize: fonts.size.body * 0.82,
        color: colors.gray[4],
        margin: 0,
        lineHeight: 1.45,
        textAlign: isMobile ? "center" : "left",
        opacity: 0.85,
    };

    return (
        <div>
            <Header />

            <Screen>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",

                        // Allow scrolling when content exceeds available viewport height
                        minHeight: isMobile
                            ? "auto"
                            : `calc(100vh - ${sizes.header.height}px - ${sizes.footer.height}px)`,
                        maxHeight: isMobile
                            ? "auto"
                            : `calc(100vh - ${sizes.header.height}px - ${sizes.footer.height}px)`,
                        overflowY: isMobile ? "visible" : "auto",
                        overflowX: "hidden",

                        // Hide scroll indicator (while keeping scroll enabled)
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge legacy
                    }}
                >
                    <div style={container} className="hide-scrollbar">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: isMobile ? 8 : 10,
                                alignItems: isMobile ? "center" : "flex-start",
                                textAlign: isMobile ? "center" : "left",
                            }}
                        >
                            <Text as="div" style={title}>
                                {t("Help")}
                            </Text>

                            <Text as="p" style={subtitle}>
                                {t(
                                    "This page redirects you to two common actions: reporting accounts and learning how to delete your account inside the app.",
                                )}
                            </Text>
                            <Text as="p" style={helperText}>
                                <Link
                                    href="/help"
                                    style={{
                                        color: colors.gray.white,
                                        textDecoration: "none",
                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.35)",
                                    }}
                                >
                                    {t("Back to Home")}
                                </Link>
                            </Text>
                        </div>

                        <div style={card}>
                            <Text as="div" style={sectionTitle}>
                                {t("What do you need?")}
                            </Text>

                            <div style={ctaRow}>
                                <Link
                                    href="/help/report-account"
                                    style={linkCardBase}
                                    className={
                                        isMobile ? undefined : "help-link-card"
                                    }
                                    aria-label={t("Report an account")}
                                >
                                    <div style={ctaInner}>
                                        <Text as="div" style={ctaTitle}>
                                            {t("Report an account")}
                                        </Text>

                                        <Text
                                            as="p"
                                            style={{
                                                ...sectionBody,
                                                maxWidth: isMobile ? 520 : 780,
                                            }}
                                        >
                                            {t(
                                                "If you found suspicious behavior, impersonation, spam, or harassment, send a report to our team.",
                                            )}
                                        </Text>

                                        <Text as="p" style={ctaHint}>
                                            {t("Go to report")} {t("Arrow")}
                                        </Text>
                                    </div>
                                </Link>
                            </div>
                            <div style={ctaRow}>
                                <Link
                                    href="/help/export-account-data"
                                    style={linkCardBase}
                                    className={
                                        isMobile ? undefined : "help-link-card"
                                    }
                                    aria-label={t("Personal Data")}
                                >
                                    <div style={ctaInner}>
                                        <Text as="div" style={ctaTitle}>
                                            {t("Access your personal data")}
                                        </Text>

                                        <Text
                                            as="p"
                                            style={{
                                                ...sectionBody,
                                                maxWidth: isMobile ? 520 : 780,
                                            }}
                                        >
                                            {t(
                                                "If you want to access your personal data, see here how to do that.",
                                            )}
                                        </Text>

                                        <Text as="p" style={ctaHint}>
                                            {t("Go to export account data")}{" "}
                                            {t("Arrow")}
                                        </Text>
                                    </div>
                                </Link>
                            </div>
                            <div style={ctaRow}>
                                <Link
                                    href="/help/exclude-account"
                                    style={linkCardBase}
                                    className={
                                        isMobile ? undefined : "help-link-card"
                                    }
                                    aria-label={t("Account")}
                                >
                                    <div style={ctaInner}>
                                        <Text as="div" style={ctaTitle}>
                                            {t("Exclude account data")}
                                        </Text>

                                        <Text
                                            as="p"
                                            style={{
                                                ...sectionBody,
                                                maxWidth: isMobile ? 520 : 780,
                                            }}
                                        >
                                            {t(
                                                "If you want to exclude your account from Circle App, see here how to do that.",
                                            )}
                                        </Text>

                                        <Text as="p" style={ctaHint}>
                                            {t("Go to exclude account")}{" "}
                                            {t("Arrow")}
                                        </Text>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div
                            style={{
                                opacity: 0.75,
                                textAlign: "center",
                            }}
                        >
                            <Text
                                as="p"
                                style={{
                                    fontFamily:
                                        fonts.family.Semibold ??
                                        fonts.family.Medium,
                                    fontSize: fonts.size.body * 0.85,
                                    color: colors.gray[4],
                                    margin: 0,
                                }}
                            >
                                {t("Need more help?")}{" "}
                                <Link
                                    href="/contact-us"
                                    style={{
                                        color: colors.gray.white,
                                        textDecoration: "none",
                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.35)",
                                    }}
                                >
                                    {t("Contact us")}
                                </Link>
                                .
                            </Text>
                        </div>
                    </div>
                </div>
            </Screen>

            <Footer />

            {/* Local CSS to hide scrollbars without disabling scroll */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    width: 0px;
                    height: 0px;
                }
                .hide-scrollbar::-webkit-scrollbar-thumb {
                    background: transparent;
                }
                .hide-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }

                /* Desktop hover effect for help link cards */
                .help-link-card:hover {
                    transform: scale(1.02);
                    border-color: rgba(255, 255, 255, 0.95);
                }
            `}</style>
        </div>
    );
}
