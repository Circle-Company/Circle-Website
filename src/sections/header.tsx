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
            <Link href="/">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        margin: isMobile ? "0 auto" : undefined,
                    }}
                >
                    <Image
                        src="/icons/png/circleApp-iOS-Default-1024x1024@1x.png"
                        alt="Circle Logo"
                        width={34}
                        height={34}
                        style={{ height: 34, width: "auto" }}
                        priority
                    />
                    <Text
                        style={{
                            fontSize: fonts.size.title3 * 1.2,
                            fontFamily: fonts.family.Black,
                            fontStyle: "italic",
                            color: colors.gray.white,
                        }}
                    >
                        Circle App
                    </Text>
                </div>
            </Link>
        </header>
    );
}
