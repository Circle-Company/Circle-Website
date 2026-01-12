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

export default function ExcludeAccountPage() {
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
        background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.075) 0%, rgba(255, 255, 255, 0.045) 100%)",
        borderRadius: isMobile ? 18 : 24,
        padding: isMobile ? 16 : 28,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 10 : 14,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 18px 42px rgba(0, 0, 0, 0.25)",
    };

    const title: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title2 * 1.05 : fonts.size.title2 * 1.3,
        lineHeight: 1.05,
        color: colors.gray.white,
        textAlign: isMobile ? "center" : "left",
        margin: 0,
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
        lineHeight: 1.45,
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

    const warningBox: React.CSSProperties = {
        width: "100%",
        borderRadius: 16,
        padding: isMobile ? 12 : 14,
        backgroundColor: "rgba(255, 193, 7, 0.10)",
        border: "1px solid rgba(255, 193, 7, 0.22)",
        boxSizing: "border-box",
    };

    const warningText: React.CSSProperties = {
        margin: 0,
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: isMobile ? fonts.size.body * 0.9 : fonts.size.body,
        color: colors.gray.white,
        lineHeight: 1.45,
        textAlign: isMobile ? "center" : "left",
    };

    const stepsGrid: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: isMobile ? 10 : 12,
        marginTop: 2,
    };

    const stepCard: React.CSSProperties = {
        width: "100%",
        borderRadius: 16,
        padding: isMobile ? 14 : 16,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 8,
    };

    const stepHeaderRow: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: 10,
    };

    const stepNumberPill: React.CSSProperties = {
        width: 28,
        height: 28,
        borderRadius: 999,
        backgroundColor: "rgba(255, 255, 255, 0.10)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.gray.white,
        fontFamily: fonts.family.Black,
        fontSize: fonts.size.body * 0.8,
        flex: "0 0 auto",
    };

    const stepTitle: React.CSSProperties = {
        margin: 0,
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.body * 1.0 : fonts.size.body * 1.05,
        color: colors.gray.white,
        textAlign: "left",
        lineHeight: 1.2,
    };

    const stepDesc: React.CSSProperties = {
        margin: 0,
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: isMobile ? fonts.size.body * 0.88 : fonts.size.body * 0.92,
        color: colors.gray[4],
        lineHeight: 1.55,
        textAlign: "left",
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
                                {t("How to delete your account?")}
                            </Text>

                            <Text as="p" style={subtitle}>
                                {t(
                                    "To delete your account in the Circle app, follow these steps:",
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
                                    {t("Back to Help")}
                                </Link>
                            </Text>
                        </div>

                        <div style={card} id="exclude-account">
                            <div style={warningBox}>
                                <Text as="p" style={warningText}>
                                    {t(
                                        "For security reasons, account deletion can only be done inside the app while you are logged into your account.",
                                    )}
                                </Text>
                            </div>

                            <Text as="div" style={sectionTitle}>
                                {t("Steps")}
                            </Text>

                            <div style={stepsGrid}>
                                <div style={stepCard}>
                                    <div style={stepHeaderRow}>
                                        <span style={stepNumberPill}>1</span>
                                        <Text as="p" style={stepTitle}>
                                            {t("Open Settings")}
                                        </Text>
                                    </div>

                                    <Text as="p" style={stepDesc}>
                                        {t(
                                            "In the tab bar (bottom navigation), tap the Settings tab to open the app settings.",
                                        )}
                                    </Text>
                                </div>

                                <div style={stepCard}>
                                    <div style={stepHeaderRow}>
                                        <span style={stepNumberPill}>2</span>
                                        <Text as="p" style={stepTitle}>
                                            {t("Open Logout")}
                                        </Text>
                                    </div>

                                    <Text as="p" style={stepDesc}>
                                        {t(
                                            'Inside Settings, find the "Logout" section and tap it. The delete option is located at the very bottom of this flow.',
                                        )}
                                    </Text>
                                </div>

                                <div style={stepCard}>
                                    <div style={stepHeaderRow}>
                                        <span style={stepNumberPill}>3</span>
                                        <Text as="p" style={stepTitle}>
                                            {t(
                                                "Choose “I want to delete my account”",
                                            )}
                                        </Text>
                                    </div>

                                    <Text as="p" style={stepDesc}>
                                        {t(
                                            'On the Logout screen, scroll to the last option and tap "I want to delete my account".',
                                        )}
                                    </Text>
                                </div>

                                <div style={stepCard}>
                                    <div style={stepHeaderRow}>
                                        <span style={stepNumberPill}>4</span>
                                        <Text as="p" style={stepTitle}>
                                            {t("Confirm deletion")}
                                        </Text>
                                    </div>

                                    <Text as="p" style={stepDesc}>
                                        {t(
                                            "On the next screen, tap the delete option again to confirm you want to proceed.",
                                        )}
                                    </Text>
                                </div>

                                <div style={stepCard}>
                                    <div style={stepHeaderRow}>
                                        <span style={stepNumberPill}>5</span>
                                        <Text as="p" style={stepTitle}>
                                            {t("Final confirmation")}
                                        </Text>
                                    </div>

                                    <Text as="p" style={stepDesc}>
                                        {t(
                                            "A final confirmation dialog will appear. Confirm once more to complete the deletion.",
                                        )}
                                    </Text>
                                </div>
                            </div>

                            <Text as="p" style={sectionBody}>
                                {t(
                                    "If you cannot access the app, use the contact option below so we can help you.",
                                )}
                            </Text>
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
            `}</style>
        </div>
    );
}
