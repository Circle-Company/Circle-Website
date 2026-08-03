import { TermsDocument, RawParagraph } from "@/services/api/terms/types";
import { Text } from "../themed";
import { useLanguage } from "@/contexts/language-context";
import { useTextLibrary } from "@/hooks/use.text.library";
import fonts from "@/constants/fonts";
import { colors } from "@/constants/colors";
import { useSizes } from "@/constants/sizes";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { CSSProperties } from "react";

interface RenderTermsProps {
    doc: TermsDocument;
}

// (Mantido) utilitário pode ser útil em outras variações de tema/estilo
function hexToRgba(hex: string, alpha: number) {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export function RenderTerms({ doc }: RenderTermsProps) {
    const { t } = useLanguage();
    const textLibrary = useTextLibrary();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    // Layout/Tipografia (visual sóbrio, sem fundos/bordas; foco em leitura)
    const headerContainerStyle: CSSProperties = {
        textAlign: isMobile ? "center" : "left",
        marginBottom: isMobile ? sizes.spaces[20] : "2rem",
        justifyContent: isMobile ? "center" : "flex-start",
        alignItems: isMobile ? "center" : "flex-start",
    };

    const titleStyle: CSSProperties = {
        fontSize: isMobile
            ? fonts.size.extraLargeTitle * 0.85
            : fonts.size.extraLargeTitle * 1.4,
        fontFamily: fonts.family.Black,
        color: colors.gray[1],
        lineHeight: "1.1",
        letterSpacing: "-0.02em",
        marginBottom: isMobile ? sizes.spaces[15] : "1.25rem",
        textAlign: isMobile ? "center" : "left",
    };

    // Metadados discretos em linha (sem “badge”, sem borda/fundo)
    const metadataContainerStyle: CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: isMobile ? "center" : "flex-start",
        alignItems: "center",
        gap: isMobile ? sizes.spaces[10] : sizes.spaces[15],
        maxWidth: isMobile ? "100%" : "720px",
    };

    const metadataItemStyle: CSSProperties = {
        fontSize: isMobile ? fonts.size.caption1 : fonts.size.body * 1.4,
        fontFamily: fonts.family.Medium,
        color: colors.gray[4],
        lineHeight: "1.4",
        whiteSpace: "nowrap",
        textAlign: isMobile ? "center" : "left",
    };

    // Content wrapper (largura confortável para leitura)
    const contentContainerStyle: CSSProperties = {
        maxWidth: isMobile ? "100%" : "880px",
        margin: "0 auto",
        padding: isMobile ? `0 ${sizes.spaces[10]}px` : "1rem",
        height: "auto",
        maxHeight: "none",
        overflow: "visible",
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: isMobile ? fonts.size.title1 * 0.95 : fonts.size.title1 * 1.2,
        fontFamily: fonts.family.Semibold,
        color: colors.gray[2],
        lineHeight: isMobile ? "1" : "1.25",
        marginTop: isMobile ? sizes.spaces[20] : "0.5rem",
        marginBottom: isMobile ? sizes.spaces[15] : sizes.spaces[10] * 0.05,
        textAlign: (isMobile ? "left" : "left") as any,
    };

    // Parágrafos sem “cards”: apenas espaçamento e tipografia
    const paragraphContainerStyle: CSSProperties = {
        marginTop: sizes.margins[20],
        marginBottom: isMobile ? sizes.spaces[10] : "0.6rem",
        padding: 0,
        backgroundColor: "transparent",
        borderRadius: 0,
        border: "none",
    };

    const paragraphTextStyle: CSSProperties = {
        fontSize: isMobile ? fonts.size.callout : fonts.size.callout,
        fontFamily: fonts.family.Regular,
        lineHeight: isMobile ? "1.4" : "1.85",
        color: colors.gray[3],
        margin: 0,
        textAlign: isMobile ? "justify" : "left",
    };

    const paragraphWithTopicsStyle: CSSProperties = {
        fontSize: isMobile ? fonts.size.callout : fonts.size.callout,
        fontFamily: fonts.family.Regular,
        lineHeight: isMobile ? "1.4" : "1.85",
        textAlign: isMobile ? "justify" : "left",
        margin: 0,
        color: colors.gray[3],
    };

    // Lista de tópicos (mais compacta, com distinção sóbria e clara)
    const topicListContainerStyle: CSSProperties = {
        marginTop: isMobile ? sizes.spaces[10] : "0.65rem",
        marginBottom: 0,
        padding: 0,
        paddingLeft: isMobile ? "0.6rem" : "0.85rem",
    };

    const topicItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "flex-start",
        gap: isMobile ? "0.5rem" : "0.6rem",
        marginTop: isMobile ? sizes.spaces[10] * 0.5 : "0.3rem",
    };

    const topicBulletStyle: CSSProperties = {
        width: "5px",
        height: "5px",
        backgroundColor: colors.gray[5],
        borderRadius: "50%",
        marginTop: "0.6rem",
        flexShrink: 0,
        opacity: 0.95,
    };

    const topicTextStyle: CSSProperties = {
        fontSize: isMobile ? fonts.size.callout : fonts.size.callout,
        fontFamily: fonts.family.Regular,
        color: colors.gray[3],
        margin: 0,
    };

    const renderParagraph = (paragraph: RawParagraph, index: number) => {
        if (typeof paragraph === "string") {
            return (
                <div key={index} style={paragraphContainerStyle}>
                    <Text style={paragraphTextStyle}>{paragraph}</Text>
                </div>
            );
        }

        return (
            <div key={index} style={paragraphContainerStyle}>
                <Text style={paragraphWithTopicsStyle}>{paragraph.text}</Text>

                {Array.isArray(paragraph.topics) &&
                    paragraph.topics.length > 0 && (
                        <div style={topicListContainerStyle}>
                            {paragraph.topics.map((topic, topicIndex) => (
                                <div key={topicIndex} style={topicItemStyle}>
                                    <div style={topicBulletStyle} />
                                    <Text style={topicTextStyle}>{topic}</Text>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        );
    };

    return (
        <div style={contentContainerStyle}>
            {/* Header Section */}
            <div style={headerContainerStyle}>
                <div style={{ marginBottom: sizes.margins[5] }}>
                    <Text style={titleStyle}>{doc.title}</Text>
                </div>

                <div style={metadataContainerStyle}>
                    {!!doc.metadata?.updatedAt && (
                        <Text style={metadataItemStyle}>
                            {t("Updated")}{" "}
                            {textLibrary.date.toRelativeTime(
                                new Date(doc.metadata.updatedAt),
                            )}
                        </Text>
                    )}
                </div>
            </div>

            {/* Content Sections */}
            {doc.body.map((section, sectionIndex) => (
                <div
                    key={sectionIndex}
                    style={{
                        marginBottom: isMobile
                            ? sizes.spaces[30]
                            : sizes.spaces[40],
                    }}
                >
                    <Text style={sectionTitleStyle}>{section.title}</Text>
                    {section.paragraphs.map((p, pi) => renderParagraph(p, pi))}
                </div>
            ))}
        </div>
    );
}
