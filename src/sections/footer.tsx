"use client";

import { LanguageSelector } from "@/components/language-selector";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { TermsNav } from "@/components/terms.nav";
import { Text } from "@/components/themed";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useSizes } from "@/constants/sizes";

export function Footer() {
  const isMobile = useIsMobile();
  const sizes = useSizes();
  return (
    <footer
      style={{
        width: "100vw",
        height: isMobile ? sizes.footer.height * 1.4 : sizes.footer.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100vw",
          maxWidth: isMobile ? "95vw" : "70vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: sizes.paddings[10],
          paddingInline: sizes.paddings[20],
          boxSizing: "border-box",
          flexWrap: "wrap",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? sizes.paddings[10] * 0.3 : sizes.paddings[10],
          }}
        >
          <Text
            style={{
              fontSize: isMobile ? fonts.size.body * 0.8 : fonts.size.body,
              fontFamily: fonts.family.Semibold,
              color: colors.gray[4],
            }}
          >
            © 2025 Circle Company
          </Text>
          <LanguageSelector />
        </div>

        <TermsNav />
      </div>
    </footer>
  );
}
