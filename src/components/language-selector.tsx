"use client";

import { useIsMobile } from "@/hooks/use.platform.detection";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useSizes } from "@/constants/sizes";
import React, { type CSSProperties, useEffect, useState } from "react";
import { Text } from "@/components/themed";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./buttons/standart.animated";

export function LanguageSelector({ preHandler }: { preHandler?: () => void }) {
  const { languagesList, atualAppLanguage, changeAppLanguage } = useLanguage();
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
    fontSize: isMobile ? fonts.size.body * 0.8 : fonts.size.body,
    color: colors.gray[4],
    textDecoration: "underline",
  };

  const selectorContainer: CSSProperties = {
    bottom: "100%",
    alignSelf: "center",
    zIndex: 100,
    position: "absolute",
    borderRadius: sizes.borderRadius[10] + 4,
    overflow: "hidden",
    backgroundColor: colors.gray.white,
    padding: 5,
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    minWidth: 140,
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
        <Text style={title}>{atualAppLanguage.nativeName}</Text>
      </Button>

      {showLanguageModal && (
        <div style={selectorContainer}>
          {languagesList.map((item) => {
            const isActive = item.code === atualAppLanguage.code;

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
                  backgroundColor: isActive ? colors.gray.black : "transparent",
                }}
              >
                <Text
                  style={{
                    ...languageText,
                    color: isActive ? colors.gray.white : colors.gray.black,
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
        </div>
      )}
    </div>
  );
}
