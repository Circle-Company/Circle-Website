import { useSizes } from "@/constants/sizes";
import fonts from "@/constants/fonts";
import { useIsMobile } from "@/hooks/use.platform.detection";
import Link from "next/link";
import { colors } from "@/constants/colors";
import { useLanguage } from "@/contexts/language-context";

const linkStyleBase = {
    fontFamily: fonts.family.Semibold,
    textDecoration: "none",
    color: colors.gray[4],
} as const;

export function TermsNav() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const sizes = useSizes();

    return (
        <nav
            style={{
                display: "flex",

                // Mobile: empilha e centraliza para não quebrar "torto"
                flexDirection: isMobile ? "column" : "row",
                flexWrap: isMobile ? "nowrap" : "wrap",

                gap: isMobile ? sizes.paddings[10] * 0.6 : sizes.spaces[30],
                alignItems: isMobile ? "center" : "center",
                justifyContent: isMobile ? "center" : "flex-end",
                textAlign: isMobile ? "center" : "right",
            }}
        >
            <Link
                href="/community-guidelines"
                style={{
                    ...linkStyleBase,
                    fontSize: isMobile
                        ? fonts.size.body * 0.8
                        : fonts.size.body,
                    width: isMobile ? "100%" : "auto",
                }}
            >
                {t("Community Guidelines")}
            </Link>

            <Link
                href="/terms-of-service"
                style={{
                    ...linkStyleBase,
                    fontSize: isMobile
                        ? fonts.size.body * 0.8
                        : fonts.size.body,
                    width: isMobile ? "100%" : "auto",
                }}
            >
                {t("Terms")}
            </Link>

            <Link
                href="/privacy-policy"
                style={{
                    ...linkStyleBase,
                    fontSize: isMobile
                        ? fonts.size.body * 0.8
                        : fonts.size.body,
                    width: isMobile ? "100%" : "auto",
                }}
            >
                {t("Privacy Policy")}
            </Link>
            <Link
                href="/contact-us"
                style={{
                    ...linkStyleBase,
                    fontSize: isMobile
                        ? fonts.size.body * 0.8
                        : fonts.size.body,
                    width: isMobile ? "100%" : "auto",
                }}
            >
                {t("Contact Us")}
            </Link>
        </nav>
    );
}
