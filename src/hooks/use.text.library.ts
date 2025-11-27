import { CircleTextProps, DateFormatLocale, TextLibrary } from "circle-text-library"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useMemo } from "react"

function createSentimentConfig(): CircleTextProps["sentimentConfig"] {
    return {
        enableCache: false,
        enableEmojiAnalysis: true,
        enablePunctuationAnalysis: true,
        enableRepetitionAnalysis: true,
        enableContextAnalysis: true,
        enableIronyDetection: true,
        enableConnectorsAnalysis: true,
        enablePositionWeight: true,
    }
}

function createRulesConfig(): CircleTextProps["richTextConfig"] {
    return {
        mentionPrefix: "@",
        hashtagPrefix: "#",
    }
}

function createExtractConfig(): CircleTextProps["extractorConfig"] {
    return {
        mentionPrefix: "@",
        hashtagPrefix: "#",
    }
}

function createConversorConfig(): CircleTextProps["conversorConfig"] {
    return {
        defaultSliceLength: 100,
        sliceSuffix: "...",
        thousandsSeparator: ".",
    }
}

function createDateConfig(locale: DateFormatLocale, recentTimeLabel: string): CircleTextProps["dateFormatterConfig"] {
    return {
        style: "full",
        locale,
        usePrefix: true,
        useSuffix: true,
        capitalize: true,
        useApproximateTime: true,
        recentTimeThreshold: 60,
        recentTimeLabel,
    }
}

export function useTextLibrary() {
    const { language, t } = useLanguage()

    const locale: DateFormatLocale = language === "pt" ? "pt" : "en"
    const recentTimeLabel = t("now")

    const textLibrary = useMemo(
        () =>
            new TextLibrary({
                validationRules: {},
                sentimentConfig: createSentimentConfig(),
                richTextConfig: createRulesConfig(),
                extractorConfig: createExtractConfig(),
                conversorConfig: createConversorConfig(),
                dateFormatterConfig: createDateConfig(locale, recentTimeLabel),
            }),
        [locale, recentTimeLabel],
    )

    // Config extra que queremos garantir sempre
    useEffect(() => {
        textLibrary.date.setCapitalize(false)
    }, [textLibrary])

    return textLibrary
}

export type { CircleTextProps, ConversorConfig, DateFormatLocale, DateFormatStyle, DateFormatterConfig, EntityMapping, ExtractOptions, ExtractorConfig, PartialExtractResult, RichTextConfig, RichTextEntity, RichTextUIFormat, SentimentExtractorConfig, SentimentReturnProps, Timezone, ValidationRule } from "circle-text-library"

