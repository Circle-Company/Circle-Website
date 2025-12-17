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

        {!isMobile && (
          <Button
            action={async () => {
              window.open(
                "https://play.google.com/store/apps/details?id=com.circlecompany.circleapp",
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
          </Button>
        )}
      </div>
    </header>
  );
}
