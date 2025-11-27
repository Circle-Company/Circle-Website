"use client";

import { Button } from "@/components/buttons/standart.animated";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/contexts/language-context";
import fonts from "@/constants/fonts";
import { colors } from "@/constants/colors";
import sizes from "@/constants/sizes";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <h1
        style={{
          fontSize: fonts.size.extraLargeTitle,
          fontFamily: fonts.family.Black,
          fontWeight: 800,
        }}
      >
        {t("Welcome to Circle")}
      </h1>
      <p>{t("Starting from scratch with Next.js")}</p>
    </main>
  );
}
