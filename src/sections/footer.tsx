"use client";

import { LanguageSelector } from "@/components/language-selector";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { TermsNav } from "@/components/terms/terms.nav";
import { Text } from "@/components/themed";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useSizes } from "@/constants/sizes";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export function Footer() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();
    return (
        <footer
            style={{
                width: "100vw",
                // No mobile, a altura fixa estava causando "aperto" e sobreposição.
                // Deixa a altura crescer conforme o conteúdo e adiciona padding.
                height: isMobile ? "auto" : sizes.footer.height,
                minHeight: isMobile
                    ? sizes.footer.height * 1.4
                    : sizes.footer.height,
                paddingBlock: isMobile ? sizes.paddings[10] : 0,
                paddingTop: isMobile
                    ? sizes.paddings[20] * 1.5
                    : sizes.paddings[10],
                paddingBottom: isMobile ? sizes.paddings[72] : 0,
                paddingLeft: isMobile ? sizes.paddings[10] : 0,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: isMobile ? "flex-start" : "center",

                // Garante que o footer fique acima de qualquer overlay/elemento absoluto
                // e permaneça clicável.
                position: "relative",
                zIndex: 9999,
                pointerEvents: "auto",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: isMobile ? "95vw" : "97vw",
                    display: "flex",
                    alignItems: isMobile ? "stretch" : "center",
                    justifyContent: isMobile ? "center" : "space-between",
                    gap: isMobile
                        ? sizes.paddings[10] * 1.2
                        : sizes.paddings[10],
                    paddingInline: sizes.paddings[20],
                    boxSizing: "border-box",
                    // No mobile, evita wrap "estranho" e empilha com alinhamento consistente
                    flexWrap: isMobile ? "nowrap" : "wrap",
                    flexDirection: isMobile ? "column" : "row",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: isMobile ? "flex-start" : "center",
                        gap: isMobile
                            ? sizes.paddings[10] * 0.4
                            : sizes.paddings[10] * 0.5,
                        // No mobile, centraliza e permite quebrar linha com espaçamento consistente
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        textAlign: "center",
                        flexDirection: "column",
                    }}
                >
                    <Link href="/terms-of-service">
                        {!isMobile && (
                            <Text
                                style={{
                                    fontSize: isMobile
                                        ? fonts.size.body * 0.9
                                        : fonts.size.body * 1.1,
                                    fontFamily: fonts.family.Semibold,
                                    color: colors.gray[3],
                                    marginLeft: 3
                                }}
                            >
                                Terms & Privacy
                            </Text>
                        )}
                    </Link>
                    {!isMobile && (
                        <Text
                            style={{
                                fontSize: isMobile
                                    ? fonts.size.body * 0.8
                                    : fonts.size.body * 0.9,
                                fontFamily: fonts.family.Medium,
                                color: colors.gray[5],
                            }}
                        >
                            © 2026 Circle LLC
                        </Text>
                    )}
                </div>

                <TermsNav />

                {!isMobile && (
                    <a
                        href="https://apps.apple.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            alignSelf: "flex-start",
                            alignItems: "flex-start",
                            display: "inline-block",
                            transition: "transform 0.5s ease",
                            transform: "scale(1)",
                        }}
                        onMouseEnter={(event) => {
                            event.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(event) => {
                            event.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <Image
                            src="/icons/svg/download-on-app-store.svg"
                            alt={t("Available on the App Store")}
                            width={180}
                            height={60}
                            style={{
                                height: 44,
                                width: "auto",
                            }}
                            priority
                        />
                    </a>
                )}
                {isMobile && (
                    <Text
                        style={{
                            fontSize: isMobile
                                ? fonts.size.body * 0.8
                                : fonts.size.body * 0.9,
                            fontFamily: fonts.family.Medium,
                            color: colors.gray[5],
                        }}
                    >
                        © 2025 Circle LLC
                    </Text>
                )}
            </div>
        </footer>
    );
}
