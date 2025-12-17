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

export function HomeCta() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    const container: CSSProperties = {
        maxWidth: isMobile ? sizes.screen.width : "50%",
        marginRight: isMobile ? 0 : -100,
        padding: isMobile ? 0 : sizes.paddings[15],
        display: "flex",
        flexDirection: "column",

        // centro total no mobile
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
    };

    const title: CSSProperties = {
        fontSize: isMobile ? fonts.size.title1 * 1.55 : fonts.size.title1 * 3,
        fontFamily: isMobile ? fonts.family.Black : fonts.family.Black,
        lineHeight: isMobile ? 1 : 0.8,
        marginBottom: isMobile ? sizes.margins[20] : sizes.margins[28],
    };

    const featureRow: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginLeft: 5,
        marginBottom: isMobile ? 8 : 12,
        justifyContent: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
    };

    const featureText: CSSProperties = {
        fontSize: isMobile ? fonts.size.body * 1.15 : fonts.size.body * 1.4,
        fontFamily: isMobile ? fonts.family.Medium : fonts.family.Semibold,
        color: "#E3E3E3",
    };

    return (
        <div style={container}>
            <Text style={title}>{t("Connect with real people.")}</Text>

            <div
                style={{
                    marginBottom: 20,
                    alignSelf: isMobile ? "center" : "flex-start",

                    // camada externa (borda com gradiente 45°)
                    padding: 2, // espessura da “borda”
                    borderRadius: 15,
                    background:
                        "linear-gradient(20deg, #161616 0%, #323232 100%)",
                    width: "fit-content",
                }}
            >
                {/* camada interna */}
                <div
                    style={{
                        padding: "8px 14px",
                        borderRadius: 13,
                        background:
                            "linear-gradient(30deg, #090909 0%, #161616 50%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: fonts.size.body * 1.2,
                            fontFamily: fonts.family.Semibold,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "#D7D7D7",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {t("Drag, comment, and have fun...")}
                    </Text>
                </div>
            </div>

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
                        width={21}
                        height={21}
                        style={{ height: 21, width: 21 }}
                    />
                    <Text style={featureText}>
                        {t("No filter, just authenticity")}
                    </Text>
                </div>

                <div style={featureRow}>
                    <Image
                        src="/icons/png/bell.png"
                        alt=""
                        width={21}
                        height={21}
                        style={{ height: 21, width: 21 }}
                    />
                    <Text style={featureText}>
                        {t("Interactions all the time")}
                    </Text>
                </div>

                <div style={featureRow}>
                    <Image
                        src="/icons/png/v_hand.png"
                        alt=""
                        width={21}
                        height={21}
                        style={{ height: 21, width: 21 }}
                    />
                    <Text style={featureText}>
                        {t("The vibe that matches")}
                    </Text>
                </div>
            </div>

            <div
                style={{
                    marginTop: 30,
                    width: isMobile ? "100%" : "auto",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    action={async () => console.log("Baixar app")}
                    style={{
                        height: sizes.button.height * 1.2,
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
                    <Text
                        style={{
                            fontSize: fonts.size.body * 1.4,
                            fontFamily: fonts.family.Black,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "inherit",
                        }}
                    >
                        {t("Download and make friends")}
                    </Text>
                </Button>
            </div>
        </div>
    );
}
