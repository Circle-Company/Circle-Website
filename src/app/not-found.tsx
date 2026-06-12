"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Screen } from "@/components/screen";
import { AnimatedButton as Button } from "@/components/buttons/standart.animated";
import { Text } from "@/components/themed";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { TermsNav } from "@/components/terms/terms.nav";

export default function NotFoundPage() {
    const isMobile = useIsMobile();
    const sizes = useSizes();
    const { t } = useLanguage();
    const router = useRouter();

    const container: React.CSSProperties = {
        width: "100%",
        maxWidth: 980,
        margin: "0 auto",
        paddingInline: isMobile ? sizes.paddings[20] : sizes.paddings[28],
        paddingBlock: isMobile ? sizes.paddings[20] : sizes.paddings[28],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 14 : 18,
        textAlign: "center",
    };

    const card: React.CSSProperties = {
        width: "100%",
        maxWidth: 860,
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderRadius: 24,
        paddingTop: isMobile ? 18 : 40,
        paddingBottom: isMobile ? 18 : 32,
        paddingLeft: isMobile ? 18 : 40,
        paddingRight: isMobile ? 18 : 40,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 12 : 16,
    };

    const big: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title1 * 2.2 : fonts.size.title1 * 3,
        lineHeight: 1,
        letterSpacing: -1.2,

        // evita "cortar" o gradiente nas extremidades do texto
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 10,

        // gradiente vertical (branco em cima, cinza em baixo)
        background: `linear-gradient(to bottom, ${colors.gray.white} 0%, ${colors.gray[4]} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
    };

    const title: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title2 * 1.1 : fonts.size.title2 * 1.4,
        lineHeight: 1.05,
        color: colors.gray.white,
    };

    const desc: React.CSSProperties = {
        fontFamily: fonts.family.Semibold ?? fonts.family.Medium,
        fontSize: isMobile
            ? fonts.size.subheadline * 0.95
            : fonts.size.subheadline,
        color: colors.gray[4],
        maxWidth: 720,
    };

    const btn: React.CSSProperties = {
        height: sizes.button.height * 1.1,
        borderRadius: 100,
        marginTop: sizes.margins[15],
        paddingInline: isMobile ? sizes.paddings[20] : sizes.paddings[28],
        backgroundColor: colors.gray.white,
        color: colors.gray.black,
        width: isMobile ? "100%" : "auto",
        maxWidth: isMobile ? 520 : "none",
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                overflowY: isMobile ? "auto" : "hidden",
                height: isMobile ? "auto" : "100vh",
            }}
        >
            <Screen>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: isMobile
                            ? "auto"
                            : `calc(100vh - ${sizes.header.height}px - ${sizes.footer.height}px)`,
                    }}
                >
                    <div style={container}>
                        <Link
                            href="/"
                            style={{
                                textDecoration: "none",
                                width: "fit-content",
                                alignSelf: "center",
                                marginBottom: isMobile ? 12 : 16,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 8,
                                }}
                            >
                                <Image
                                    src="/icons/svg/icon_default_light.svg"
                                    alt="Circle Logo"
                                    width={32}
                                    height={32}
                                    style={{ height: 32, width: "auto" }}
                                    priority
                                />

                                <Text
                                    style={{
                                        fontSize: fonts.size.title2,
                                        fontFamily: fonts.family.Black,
                                        fontStyle: "italic",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Circle App
                                </Text>
                            </div>
                        </Link>

                        <div style={card}>
                            <Text as="div" style={big}>
                                404
                            </Text>

                            <Text as="div" style={title}>
                                {t("Not Found Title")}
                            </Text>

                            <Text as="p" style={desc}>
                                {t("Not Found Description")}
                            </Text>

                            <Button
                                action={async () => {
                                    router.push("/");
                                }}
                                style={btn}
                                animation={{
                                    enabled: true,
                                    tap: {
                                        scale: 0.9,
                                        duration: 0.8,
                                        bounciness: 8,
                                    },
                                    hover: {
                                        scale: 1.1,
                                        scaleDuration: 1,
                                        colorDuration: 0.5,
                                        scaleExitDuration: 0.6,
                                        colorExitDuration: 0.2,
                                        backgroundColor: colors.purple[5],
                                        textColor: colors.gray.white,
                                    },
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: isMobile
                                            ? fonts.size.body * 1.1
                                            : fonts.size.body * 1.25,
                                        fontFamily: fonts.family.Black,
                                        fontStyle: "italic",
                                        fontWeight: "bold",
                                        color: "inherit",
                                    }}
                                >
                                    {t("Not Found CTA")}
                                </Text>
                            </Button>
                        </div>
                        <div style={{ marginTop: 20, opacity: 0.7 }}>
                            <TermsNav />
                        </div>
                    </div>
                </div>
            </Screen>
        </div>
    );
}
