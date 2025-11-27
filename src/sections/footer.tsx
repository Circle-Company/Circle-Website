import sizes from "@/constants/sizes";
import { LanguageSelector } from "@/components/language-selector";
import { TermsNav } from "@/components/terms.nav";
import { colors } from "@/constants/colors";
import { Text } from "@/components/themed";

export function Footer() {
  return (
    <footer
      style={{
        width: "100vw",
        height: sizes.footer.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: `1px solid ${colors.gray[3]}`,
        backgroundColor: colors.gray[1],
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: sizes.paddings[10],
          paddingInline: sizes.paddings[20],
          boxSizing: "border-box",
          flexWrap: "wrap",
        }}
      >
        <Text>@CircleCompany 2025</Text>
        <LanguageSelector />
        <TermsNav />
      </div>
    </footer>
  );
}


