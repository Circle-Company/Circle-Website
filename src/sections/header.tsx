"use client";

import Image from "next/image";
import { Button } from "@/components/buttons/standart.animated";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { useLanguage } from "@/contexts/language-context";
import { Text } from "@/components/themed";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useSizes } from "@/constants/sizes";
import Link from "next/link";

export function Header() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    return (
        <header
            style={{
                width: "100%",
                height: sizes.header.height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: isMobile ? "100%" : "70%",
                    maxWidth: isMobile ? "100%" : "70%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isMobile ? "center" : "space-between",
                    gap: sizes.paddings[10],
                    paddingInline: sizes.paddings[10],
                    boxSizing: "border-box",
                    position: "relative",
                }}
            >
                <Link href="/">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                            margin: isMobile ? "0 auto" : undefined,
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
                                fontSize: fonts.size.title3,
                                fontFamily: fonts.family.Black,
                                fontStyle: "italic",
                                fontWeight: "bold",
                                color: colors.gray.white,
                            }}
                        >
                            Circle App
                        </Text>
                    </div>
                </Link>

                {!isMobile && (
                    <Button
                        action={async () => {
                            window.open(
                                "https://testflight.apple.com/join/ZATKxY4d",
                                "_blank",
                                "noopener,noreferrer",
                            );
                        }}
                        style={{
                            height: sizes.button.height,
                            backgroundColor: colors.gray[8],
                            color: colors.gray.white,
                        }}
                        animation={{
                            enabled: true,
                            tap: {
                                scale: 0.9,
                                duration: 0.2,
                                bounciness: 8,
                            },
                            hover: {
                                scale: 1.05,
                                scaleDuration: 1,
                                colorDuration: 0.5,
                                scaleExitDuration: 0.6,
                                colorExitDuration: 0.2,
                                backgroundColor: colors.gray[1],
                                textColor: "#000000",
                            },
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: fonts.size.body,
                                    fontFamily: fonts.family.Black,
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                    color: "inherit",
                                }}
                            >
                                {t("Download App")}
                            </Text>
                            <span
                                aria-hidden="true"
                                style={{
                                    width: 18,
                                    height: 18,
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
                                }}
                            />
                        </div>
                    </Button>
                )}
            </div>
        </header>
    );
}
