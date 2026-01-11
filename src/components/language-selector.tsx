"use client";

import { useIsMobile } from "@/hooks/use.platform.detection";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useSizes } from "@/constants/sizes";
import React, { type CSSProperties, useEffect, useState } from "react";
import { Text } from "@/components/themed";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./buttons/standart.animated";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

function getFlagSrc(code: string) {
    switch (code) {
        case "pt":
            return "/icons/svg/br_flag.svg";
        case "en":
            return "/icons/svg/us_flag.svg";
        default:
            return null;
    }
}

const FLAGWIDTH = 18;
const FLAGHEIGHT = 14;

export function LanguageSelector({ preHandler }: { preHandler?: () => void }) {
    const { languagesList, atualAppLanguage, changeAppLanguage } =
        useLanguage();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const isMobile = useIsMobile();
    const sizes = useSizes();

    useEffect(() => {
        setShowLanguageModal(false);
    }, []);

    function handlePress() {
        preHandler?.();
        setShowLanguageModal((prev) => !prev);
    }

    const container: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    };

    const atualLanguageContainer: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        opacity: showLanguageModal ? 0.4 : 1,
        cursor: "pointer",
        backgroundColor: "#00000000",
    };

    const title: CSSProperties = {
        alignSelf: "center",
        fontFamily: fonts.family.Semibold,
        fontSize: isMobile ? fonts.size.body * 0.8 : fonts.size.body * 0.95,
        color: colors.gray[4],
        textDecoration: "underline",
    };

    const flagStyle: CSSProperties = {
        width: FLAGWIDTH * 0.8,
        height: FLAGHEIGHT * 0.8,
        borderRadius: 4,
        objectFit: "cover",
        overflow: "hidden",
        flexShrink: 0,
    };

    const selectorContainer: CSSProperties = {
        bottom: "100%",
        alignSelf: "center",
        zIndex: 100,
        position: "absolute",
        borderRadius: sizes.borderRadius[10] + 4,
        overflow: "hidden",
        backgroundColor: colors.gray.white,
        padding: 6,

        // sombra mais "premium" (camadas) + leve borda para destacar no fundo escuro
        boxShadow: "0 18px 48px rgba(0,0,0,0.45), 0 6px 18px rgba(0,0,0,0.25)",
        border: "1px solid rgba(0,0,0,0.08)",

        minWidth: 150,
        minHeight: 50,
    };

    const languageContainer: CSSProperties = {
        paddingBlock: sizes.paddings[10] * 0.8,
        paddingInline: sizes.paddings[20],
        borderRadius: sizes.borderRadius[10],
        overflow: "hidden",
        border: "none",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        cursor: "pointer",
    };

    const languageText: CSSProperties = {
        alignSelf: "center",
        fontFamily: fonts.family.Semibold,
        fontSize: fonts.size.body * 0.9,
        letterSpacing: -0.4,
    };

    return (
        <div style={container}>
            <Button
                action={handlePress}
                testID="language-selector-button"
                animation={{
                    enabled: true,
                    tap: {
                        scale: 0.9,
                        duration: 0.2,
                        bounciness: 12,
                    },
                    hover: {
                        scale: 1.0,
                        scaleDuration: 0,
                        colorDuration: 0,
                        backgroundColor: "transparent",
                        textColor: "inherit",
                    },
                }}
                style={atualLanguageContainer}
            >
                {getFlagSrc(atualAppLanguage.code) && (
                    <Image
                        src={getFlagSrc(atualAppLanguage.code)!}
                        alt=""
                        aria-hidden="true"
                        width={Math.round((flagStyle.width as number) ?? 14)}
                        height={Math.round((flagStyle.height as number) ?? 11)}
                        style={{
                            ...flagStyle,
                            marginTop: 2,
                            marginRight: 8,
                        }}
                    />
                )}
                <Text style={title}>{atualAppLanguage.nativeName}</Text>
            </Button>

            <AnimatePresence>
                {showLanguageModal && (
                    <motion.div
                        style={selectorContainer}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        {languagesList.map((item) => {
                            const isActive =
                                item.code === atualAppLanguage.code;

                            return (
                                <button
                                    key={item.code}
                                    type="button"
                                    onClick={() => {
                                        changeAppLanguage(item.code);
                                        setShowLanguageModal(false);
                                    }}
                                    style={{
                                        ...languageContainer,
                                        backgroundColor: isActive
                                            ? colors.gray.black
                                            : "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    {getFlagSrc(item.code) && (
                                        <Image
                                            src={getFlagSrc(item.code)!}
                                            alt=""
                                            aria-hidden="true"
                                            width={Math.round(
                                                (flagStyle.width as number) ??
                                                    14,
                                            )}
                                            height={Math.round(
                                                (flagStyle.height as number) ??
                                                    11,
                                            )}
                                            style={{
                                                ...flagStyle,
                                                scale: 1.2,
                                            }}
                                        />
                                    )}
                                    <Text
                                        style={{
                                            ...languageText,
                                            color: isActive
                                                ? colors.gray.white
                                                : colors.gray.black,
                                            fontFamily: isActive
                                                ? fonts.family.Semibold
                                                : fonts.family.Bold,
                                        }}
                                    >
                                        {item.nativeName}
                                    </Text>
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
