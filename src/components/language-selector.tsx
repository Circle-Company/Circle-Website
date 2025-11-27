 "use client";

import Image from "next/image";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import sizes from "@/constants/sizes";
import React, { type CSSProperties, useEffect, useState } from "react";
import { Text } from "@/components/themed";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./buttons/standart.animated";

export function LanguageSelector({ preHandler }: { preHandler?: () => void }) {
  const { languagesList, atualAppLanguage, changeAppLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

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
    gap: sizes.paddings[10] * 0.5,
    opacity: showLanguageModal ? 0.6 : 1,
    cursor: "pointer",
    paddingInline: sizes.paddings[20],
    paddingBlock: sizes.paddings[10] * 0.4,
    borderRadius: sizes.borderRadius[10],
    border: `1px solid ${colors.gray[3]}`,
    backgroundColor: colors.gray[1],
  };

  const title: CSSProperties = {
    alignSelf: "center",
    fontFamily: fonts.family.Semibold,
    fontSize: fonts.size.body,
    color: colors.gray.black,
  };

  const selectorContainer: CSSProperties = {
    top: "110%",
    right: 0,
    zIndex: 100,
    position: "absolute",
    borderRadius: sizes.borderRadius[10] + 4,
    overflow: "hidden",
    backgroundColor: colors.gray[8],
    padding: 4,
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    minWidth: 140,
  };

  const languageContainer: CSSProperties = {
    paddingBlock: sizes.paddings[10] * 0.4,
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
    fontFamily: fonts.family.Medium,
    fontSize: fonts.size.body * 0.9,
    letterSpacing: -0.4,
  };

  return (
    <div style={container}>
      <Button
        action={handlePress}
        testID="language-selector-button"
        animationProps={{
          bounciness: 12,
          animationScale: 0.8,
        }}
        style={atualLanguageContainer}
      >
        <Text style={title}>{atualAppLanguage.nativeName}</Text>
        <Image
          src="/icons/svg/arrow-thic-down.svg"
          alt="Abrir seletor de idioma"
          width={sizes.icons[12].width * 0.6}
          height={sizes.icons[12].height * 0.6}
          style={{
            marginLeft: 4,
            transform: `rotate(${showLanguageModal ? 180 : 0}deg)`,
            transition: "transform 0.2s ease",
            color: colors.gray.white,
          }}
        />
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
                  backgroundColor: isActive ? colors.gray[7] : "transparent",
                }}
              >
                <Text
                  style={{
                    ...languageText,
                    color: isActive ? colors.gray.white : colors.gray[1],
                    fontFamily: isActive
                      ? fonts.family.Bold
                      : fonts.family.Medium,
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
