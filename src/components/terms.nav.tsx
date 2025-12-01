import { useSizes } from "@/constants/sizes";
import fonts from "@/constants/fonts";
import { useIsMobile } from "@/hooks/use.platform.detection";
import Link from "next/link";
import { colors } from "@/constants/colors";
import { useLanguage } from "@/contexts/language-context";

export function TermsNav() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const sizes = useSizes();

  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: isMobile ? sizes.paddings[10] : sizes.spaces[30],
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Link
        href="/community-guidelines"
        style={{
          fontFamily: fonts.family.Semibold,
          fontSize: isMobile ? fonts.size.body * 0.8 : fonts.size.body,
          textDecoration: "none",
          color: colors.gray[4],
        }}
      >
        {t("Community Guidelines")}
      </Link>
      <Link
        href="/terms-of-service"
        style={{
          fontFamily: fonts.family.Semibold,
          fontSize: isMobile ? fonts.size.body * 0.8 : fonts.size.body,
          textDecoration: "none",
          color: colors.gray[4],
        }}
      >
        {t("Terms of Service")}
      </Link>
      <Link
        href="/privacy-policy"
        style={{
          fontFamily: fonts.family.Semibold,
          fontSize: isMobile ? fonts.size.body * 0.8 : fonts.size.body,
          textDecoration: "none",
          color: colors.gray[4],
        }}
      >
        {t("Privacy Policy")}
      </Link>
    </nav>
  );
}
