"use client";

import React, { useEffect } from "react";
import { Footer } from "@/sections/footer";
import { AnimatedButton as Button } from "@/components/buttons/standart.animated";
import { Text } from "@/components/themed";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import { useLanguage } from "@/contexts/language-context";

function EmailIcon({
    size = 18,
    color = "currentColor",
}: {
    size?: number;
    color?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            style={{ display: "block" }}
        >
            {/* Envelope preenchido (fill) com cantos arredondados */}
            <path
                fill={color}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75 5C5.23122 5 4 6.23122 4 7.75V16.25C4 17.7688 5.23122 19 6.75 19H17.25C18.7688 19 20 17.7688 20 16.25V7.75C20 6.23122 18.7688 5 17.25 5H6.75ZM6.25 7.75C6.25 7.61193 6.36193 7.5 6.5 7.5H17.5C17.6381 7.5 17.75 7.61193 17.75 7.75V8.11484L12.4472 11.7905C12.1697 11.9828 11.8303 11.9828 11.5528 11.7905L6.25 8.11484V7.75Z"
            />
            {/* "Dobra" interna para dar contraste sutil mantendo preenchido */}
            <path
                d="M6.25 9.78516V16.25C6.25 16.5261 6.47386 16.75 6.75 16.75H17.25C17.5261 16.75 17.75 16.5261 17.75 16.25V9.78516L13.4326 12.7768C12.5451 13.3917 11.4549 13.3917 10.5674 12.7768L6.25 9.78516Z"
                fill="rgba(0, 0, 0, 0)"
            />
        </svg>
    );
}

export default function ContactUsPage() {
    const isMobile = useIsMobile();
    const sizes = useSizes();
    const { t } = useLanguage();

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        const prevHtmlOverflowY = html.style.overflowY;
        const prevBodyOverflowY = body.style.overflowY;
        const prevHtmlHeight = html.style.height;
        const prevBodyHeight = body.style.height;
        const prevHtmlMaxHeight = html.style.maxHeight;
        const prevBodyMaxHeight = body.style.maxHeight;

        html.style.overflowY = "auto";
        body.style.overflowY = "auto";
        html.style.height = "auto";
        body.style.height = "auto";
        html.style.maxHeight = "none";
        body.style.maxHeight = "none";

        return () => {
            html.style.overflowY = prevHtmlOverflowY;
            body.style.overflowY = prevBodyOverflowY;
            html.style.height = prevHtmlHeight;
            body.style.height = prevBodyHeight;
            html.style.maxHeight = prevHtmlMaxHeight;
            body.style.maxHeight = prevBodyMaxHeight;
        };
    }, []);

    const EMAIL = "contact@circleapp.com.br";
    const mailto = `mailto:${EMAIL}`;

    const pageStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        height: "auto",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
    };

    const contentWrapStyle: React.CSSProperties = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBlock: isMobile ? sizes.paddings[20] : sizes.paddings[40],
    };

    const contentStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: 980,
        paddingInline: isMobile ? sizes.paddings[20] : sizes.paddings[28],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? sizes.paddings[15] : sizes.paddings[20],
        textAlign: "center",
    };

    const cardStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: 860,
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderRadius: 24,
        paddingTop: isMobile ? 18 : 50,
        paddingBottom: isMobile ? 18 : 40,
        paddingLeft: isMobile ? 18 : 50,
        paddingRight: isMobile ? 18 : 50,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 14 : 18,
        textAlign: "center",
    };

    const buttonStyle: React.CSSProperties = {
        height: sizes.button.height * 1.4,
        width: "100%",
        borderRadius: sizes.button.height,

        // não pode parecer "outline" e deve manter cantos arredondados
        border: "none",
        outline: "none",
        boxShadow: "none",
        overflow: "hidden",

        // garante padding horizontal visível mesmo quando o botão está width: 100%
        paddingLeft: isMobile ? sizes.paddings[20] : sizes.paddings[20] * 1.4,
        paddingRight: isMobile ? sizes.paddings[20] : sizes.paddings[20] * 1.4,
        boxSizing: "border-box",

        backgroundColor: colors.gray[8],
        color: colors.gray.white,
    };

    return (
        <div style={pageStyle}>
            <div style={contentWrapStyle}>
                <div style={contentStyle}>
                    <div style={cardStyle}>
                        <Text
                            as="div"
                            style={{
                                fontFamily: fonts.family.Black,
                                fontStyle: "italic",
                                fontWeight: "bold",
                                fontSize: isMobile
                                    ? fonts.size.title1 * 1.2
                                    : fonts.size.title1 * 1.6,
                                lineHeight: 1.05,
                            }}
                        >
                            {t("Contact Title")}
                        </Text>

                        <Text
                            as="p"
                            style={{
                                fontFamily:
                                    fonts.family.Medium ??
                                    fonts.family.Semibold,
                                fontSize: isMobile
                                    ? fonts.size.subheadline * 0.95
                                    : fonts.size.subheadline,
                                color: colors.gray[4],
                                maxWidth: 700,
                                lineHeight: 1.6,
                                whiteSpace: "pre-line",
                                textAlign: "center",
                            }}
                        >
                            {t("Contact Description")}
                        </Text>

                        <a
                            href={mailto}
                            style={{
                                textDecoration: "none",
                                width: isMobile ? "100%" : "auto",
                                maxWidth: isMobile ? 520 : "none",
                            }}
                        >
                            <Button
                                action={async () => {
                                    // Mantém comportamento nativo do <a>. Nada a fazer aqui.
                                }}
                                style={{
                                    ...buttonStyle,

                                    // padding do botão (mantém altura/visual), o padding específico do ícone está no próprio span
                                    paddingTop: sizes.paddings[20],
                                    paddingBottom: sizes.paddings[20],
                                    paddingLeft: 8,
                                }}
                                className="contact-email-button"
                                animation={{
                                    enabled: true,
                                    tap: {
                                        scale: 0.9,
                                        duration: 0.8,
                                        bounciness: 8,
                                    },
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
                                <span
                                    className="contact-email-icon"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,

                                        // margem do bloco do ícone: 5px topo/baixo/esquerda e 10px direita
                                        marginTop: 5,
                                        marginBottom: 5,
                                        marginLeft: 5,
                                        marginRight: 16,
                                        padding: 6,
                                        scale: 1.4,

                                        // arredonda o "container" do ícone e remove qualquer aparência de outline
                                        borderRadius: 999,
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.08)",
                                        outline: "none",
                                        border: "none",
                                        boxShadow: "none",
                                        overflow: "hidden",
                                    }}
                                >
                                    <EmailIcon
                                        size={isMobile ? 16 : 18}
                                        color="currentColor"
                                    />
                                </span>

                                <Text
                                    style={{
                                        fontFamily: fonts.family.Bold,
                                        fontWeight: "bold",
                                        fontSize: isMobile
                                            ? fonts.size.body
                                            : fonts.size.body * 1.4,
                                        color: "inherit",
                                    }}
                                >
                                    {EMAIL}
                                </Text>
                            </Button>
                        </a>

                        <Text
                            as="p"
                            style={{
                                marginTop: 20,
                                fontFamily:
                                    fonts.family.Medium ??
                                    fonts.family.Semibold,
                                fontSize: isMobile
                                    ? fonts.size.body * 0.85
                                    : fonts.size.body * 1.1,
                                color: colors.gray[5],
                                maxWidth: 760,
                            }}
                        >
                            {t("Contact Hint")}
                        </Text>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
