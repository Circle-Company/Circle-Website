import { TermsDocument, RawParagraph } from "@/services/api/terms/types";
import { Text } from "./themed";
import { useLanguage } from "@/contexts/language-context";
import { useTextLibrary } from "@/hooks/use.text.library";
import fonts from "@/constants/fonts";
import { colors } from "@/constants/colors";
import { useSizes } from "@/constants/sizes";
import { useIsMobile } from "@/hooks/use.platform.detection";

interface RenderTermsProps {
    doc: TermsDocument;
}

export function RenderTerms({ doc }: RenderTermsProps) {
    const { t } = useLanguage();
    const textLibrary = useTextLibrary();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    // Header container
    const headerContainerStyle = {
        textAlign: "center" as const,
        marginBottom: isMobile ? sizes.margins[20] : "3rem",
    };

    const titleStyle = {
        fontSize: isMobile
            ? fonts.size.extraLargeTitle * 0.9
            : fonts.size.extraLargeTitle * 1.2,
        fontFamily: fonts.family.Black,

        marginBottom: isMobile ? sizes.margins[28] : "6rem",
    };

    const metadataContainerStyle = {
        width: isMobile ? "70vw" : "fit-content",
        padding: isMobile ? "0.4rem 1.2rem" : "0.6rem 2rem",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray[8] + 60,
        borderRadius: sizes.borderRadius[20],
        border: `2px solid ${colors.gray[8] + 90}`,
        textAlign: "center" as const,
        alignSelf: "center",
        display: "flex",
        flexDirection: "row" as const,
        gap: isMobile ? sizes.spaces[10] : "4rem",
        margin: "0 auto",
    };

    const metadataItemStyle = {
        fontSize: fonts.size.body,
        fontFamily: fonts.family.Medium,
        color: colors.gray[4],
        lineHeight: "1.4",
    };

    // Content wrapper
    const contentContainerStyle = {
        maxWidth: isMobile ? "100%" : "800px",
        margin: "0 auto",
        padding: isMobile ? `0 ${sizes.spaces[10]}px` : "0 1rem",
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: isMobile ? fonts.size.title1 * 1 : fonts.size.title1,
        fontFamily: fonts.family.Semibold,
        marginTop: isMobile ? sizes.margins[10] : "1rem",
        marginLeft: isMobile ? 20 : 20,
        marginBottom: isMobile ? sizes.margins[20] : "4rem",
        textAlign: isMobile ? "center" : "left",
    };

    const paragraphContainerStyle: React.CSSProperties = {
        marginTop: isMobile ? sizes.margins[5] : "0.8rem",
        marginBottom: isMobile ? sizes.margins[10] : "1.5rem",
    };

    const paragraphTextStyle: React.CSSProperties = {
        fontSize: fonts.size.callout,
        fontFamily: fonts.family.Regular,
        lineHeight: "1.75",
        color: colors.gray[3],
        marginBottom: "1rem",
        textAlign: isMobile ? "left" : "left",
    };

    const paragraphWithTopicsStyle: React.CSSProperties = {
        fontSize: fonts.size.callout,
        fontFamily: fonts.family.Regular,
        lineHeight: "1.75",
        marginBottom: "0.75rem",
        color: colors.gray[3],
    };

    // Topic list styles
    const topicListContainerStyle: React.CSSProperties = {
        marginTop: isMobile ? sizes.margins[15] : "2rem",
        marginBottom: isMobile ? sizes.margins[20] : "3rem",
        padding: isMobile ? "1rem" : "1.5rem",
    };

    const topicItemStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "0.75rem",
        paddingLeft: "0.5rem",
    };

    const topicBulletStyle: React.CSSProperties = {
        width: "6px",
        height: "6px",
        backgroundColor: colors.gray[4],
        borderRadius: "50%",
        marginRight: "1rem",
        marginTop: "0.6rem",
        flexShrink: 0,
    };

    const topicTextStyle: React.CSSProperties = {
        fontSize: fonts.size.callout,
        fontFamily: fonts.family.Regular,
        color: colors.gray[3],
        lineHeight: "1.6",
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
            <div
                key={index}
                style={{
                    ...paragraphContainerStyle,
                    marginBottom: "0.5rem",
                    marginTop: "0.5rem",
                }}
            >
                <Text style={paragraphWithTopicsStyle}>{paragraph.text}</Text>
                {paragraph.topics && paragraph.topics.length > 0 && (
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
                <div style={{ marginBottom: sizes.margins[10] }}>
                    <Text style={titleStyle}>{doc.title}</Text>
                </div>

                <div style={metadataContainerStyle}>
                    <Text style={metadataItemStyle}>{doc.metadata.author}</Text>
                    <Text style={metadataItemStyle}>
                        {t("Version")} {doc.metadata.version}
                    </Text>
                    <Text style={metadataItemStyle}>
                        {doc.metadata.updatedAt
                            ? `${t("Updated")} ${textLibrary.date.toRelativeTime(
                                  new Date(doc.metadata.updatedAt),
                              )}`
                            : ""}
                    </Text>
                </div>
            </div>

            {/* Content Sections */}
            {doc.body.map((section, sectionIndex) => (
                <div
                    key={sectionIndex}
                    style={{
                        marginBottom: isMobile
                            ? sizes.spaces[40]
                            : sizes.spaces[70],
                    }}
                >
                    <Text style={sectionTitleStyle}>{section.title}</Text>

                    <div
                        style={{
                            marginTop: sizes.spaces[20],
                            backgroundColor: colors.gray[9],
                            paddingTop: "0.2rem",
                            paddingBottom: "0.2rem",
                            paddingLeft: isMobile ? "1rem" : "1.8rem",
                            paddingRight: isMobile ? "1rem" : "1.8rem",
                            borderRadius: sizes.borderRadius[20],
                            border: `2px solid ${colors.gray[8] + 50}`,
                        }}
                    >
                        {section.paragraphs.map((p, pi) =>
                            renderParagraph(p, pi),
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
