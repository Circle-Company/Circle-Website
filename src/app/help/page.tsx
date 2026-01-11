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

    const pill: React.CSSProperties = {
        width: "fit-content",
        paddingInline: 10,
        paddingBlock: 5,
        borderRadius: 999,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        color: colors.gray.white,
        fontFamily: fonts.family.Semibold,
        fontSize: fonts.size.body * 0.75,
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
                        minHeight: isMobile
                            ? "auto"
                            : `calc(100vh - ${sizes.header.height}px - ${sizes.footer.height}px)`,
                    }}
                >
                    <div style={container}>
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
                        </div>

                        <div style={card}>
                            <Text as="div" style={sectionTitle}>
                                {t("What do you need?")}
                            </Text>

                            <div style={ctaRow}>
                                <Link
                                    href="/help/report-account"
                                    style={linkCardBase}
                                    aria-label={t("Report an account")}
                                >
                                    <div style={ctaInner}>
                                        <div style={pill}>{t("Report")}</div>

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
                                            {t("Go to report")} →
                                        </Text>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div style={card} id="delete-account">
                            <Text as="div" style={sectionTitle}>
                                {t("Delete your account in the app")}
                            </Text>

                            <Text as="p" style={sectionBody}>
                                {t(
                                    "Inside the Circle app, follow these steps:",
                                )}
                            </Text>

                            <ol
                                style={{
                                    margin: 0,
                                    paddingLeft: isMobile ? 18 : 22,
                                    color: colors.gray[4],
                                    lineHeight: 1.55,
                                    fontFamily:
                                        fonts.family.Semibold ??
                                        fonts.family.Medium,
                                    fontSize: isMobile
                                        ? fonts.size.body * 0.9
                                        : fonts.size.body,
                                    textAlign: "left",
                                    alignSelf: isMobile ? "stretch" : "auto",
                                }}
                            >
                                <li>
                                    {t("Open the app and go to your Profile.")}
                                </li>
                                <li>{t("Tap Settings.")}</li>
                                <li>{t("Open Account.")}</li>
                                <li>{t('Tap "Delete account".')}</li>
                                <li>
                                    {t("Confirm the deletion when prompted.")}
                                </li>
                            </ol>

                            <Text
                                as="p"
                                style={{
                                    ...sectionBody,
                                    marginTop: isMobile ? 8 : 10,
                                    maxWidth: isMobile ? 520 : 780,
                                    alignSelf: isMobile
                                        ? "center"
                                        : "flex-start",
                                }}
                            >
                                {t(
                                    "If you cannot access the app, use the report/contact option above so we can help you.",
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
        </div>
    );
}
