"use client";

import React, { type CSSProperties } from "react";
import Image from "next/image";
import { Text } from "@/components/themed";
import fonts from "@/constants/fonts";
import { colors } from "@/constants/colors";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/buttons/standart.animated";
import { useSizes } from "@/constants/sizes";
import { useIsMobile } from "@/hooks/use.platform.detection";
import Link from "next/link";

export function HomeCta() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    const iconSize = isMobile ? 23 : 25;

    const container: CSSProperties = {
        maxWidth: isMobile ? sizes.screen.width : "50%",
        marginRight: isMobile ? 0 : -100,
        padding: isMobile ? 0 : sizes.paddings[15],
        display: "flex",
        flexDirection: "column",
        paddingTop: isMobile ? "80px" : 0,

        // centro total no mobile
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
    };

    const title: CSSProperties = {
        fontSize: isMobile ? fonts.size.title1 * 1.8 : fonts.size.title1 * 3.5,
        fontFamily: isMobile ? fonts.family.Black : fonts.family.Black,
        lineHeight: isMobile ? 1 : 0.8,
        marginBottom: isMobile ? sizes.margins[20] : sizes.margins[72],
    };

    const featureRow: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: isMobile ? 8 : 12,
        marginLeft: 5,
        marginBottom: isMobile ? 8 : 6,
        justifyContent: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
    };

    const featureText: CSSProperties = {
        fontSize: isMobile ? fonts.size.body * 1.15 : fonts.size.body * 2,
        fontFamily: isMobile ? fonts.family.Medium : fonts.family.Semibold,
        color: "#E3E3E3",
    };

    return (
        <div style={container}>
            <Link href="/">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        margin: isMobile ? "0 auto" : undefined,
                        marginBottom: isMobile ? 50 : 60,
                    }}
                >
                    <Image
                        src="/icons/png/circleApp-iOS-Default-1024x1024@1x.png"
                        alt="Circle Logo"
                        width={isMobile ? 30 : 40}
                        height={isMobile ? 30 : 140}
                        style={{ height: isMobile ? 30 : 40, width: "auto" }}
                        priority
                    />
                    <Text
                        style={{
                            fontSize: isMobile
                                ? fonts.size.title1 * 0.8
                                : fonts.size.title1,
                            fontFamily: fonts.family.Black,
                            fontStyle: "italic",
                            color: colors.gray.white,
                        }}
                    >
                        Circle App
                    </Text>
                </div>
            </Link>
            <Text style={title}>{t("Meet people near to you.")}</Text>

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMobile ? "center" : "flex-start",
                    justifyContent: "center",
                }}
            >
                <div style={featureRow}>
                    <Image
                        src="/icons/png/winking_face.png"
                        alt=""
                        width={iconSize}
                        height={iconSize}
                        style={{ height: iconSize, width: iconSize }}
                    />
                    <Text style={featureText}>
                        {t("No filter, just authenticity")}
                    </Text>
                </div>

                <div style={featureRow}>
                    <Image
                        src="/icons/png/bell.png"
                        alt=""
                        width={iconSize}
                        height={iconSize}
                        style={{ height: iconSize, width: iconSize }}
                    />
                    <Text style={featureText}>
                        {t("Interactions all the time")}
                    </Text>
                </div>

                <div style={featureRow}>
                    <Image
                        src="/icons/png/v_hand.png"
                        alt=""
                        width={iconSize}
                        height={iconSize}
                        style={{ height: iconSize, width: iconSize }}
                    />
                    <Text style={featureText}>
                        {t("The vibe that matches")}
                    </Text>
                </div>
            </div>

            {isMobile && (
                <div
                    style={{
                        marginTop: 30,
                        width: isMobile ? "100%" : "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                    }}
                >
                    <Button
                        action={async () => {
                            window.open(
                                "https://testflight.apple.com/join/ZATKxY4d",
                                "_blank",
                                "noopener,noreferrer",
                            );
                        }}
                        style={{
                            height: isMobile
                                ? sizes.button.height * 1.3
                                : sizes.button.height * 1.3,
                            backgroundColor: colors.gray.white,
                            color: colors.gray.black,
                            borderRadius: 100,
                        }}
                        animation={{
                            enabled: true,
                            tap: { scale: 0.9, duration: 0.8, bounciness: 8 },
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
                        <span
                            aria-hidden="true"
                            style={{
                                top: isMobile ? 0 : "-3px",
                                width: isMobile ? 24 : 28,
                                height: isMobile ? 24 : 28,
                                display: "block",
                                backgroundColor: "currentColor",
                                WebkitMaskImage:
                                    "url(/icons/svg/apple-logo.svg)",
                                maskImage: "url(/icons/svg/apple-logo.svg)",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                                maskPosition: "center",
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                                marginRight: isMobile ? 4 : 0,
                            }}
                        />
                        <Text
                            style={{
                                fontSize:
                                    fonts.size.body * (isMobile ? 1.3 : 1.4),
                                fontFamily: fonts.family.Black,
                                fontStyle: "italic",
                                fontWeight: isMobile ? "black" : "bold",
                                color: "inherit",
                            }}
                        >
                            {t("Download and make friends")}
                        </Text>
                    </Button>
                </div>
            )}
        </div>
    );
}
