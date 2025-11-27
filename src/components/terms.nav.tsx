import sizes from "@/constants/sizes";
import fonts from "@/constants/fonts";
import Link from "next/link";

export function TermsNav() {
  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: sizes.paddings[10],
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Link
        href="/community-guidelines"
        style={{
          fontFamily: fonts.family.Semibold,
          fontSize: fonts.size.body,
          textDecoration: "none",
        }}
      >
        Community Guidelines
      </Link>
      <Link
        href="/terms-of-service"
        style={{
          fontFamily: fonts.family.Semibold,
          fontSize: fonts.size.body,
          textDecoration: "none",
        }}
      >
        Terms of Service
      </Link>
      <Link
        href="/privacy-policy"
        style={{
          fontFamily: fonts.family.Semibold,
          fontSize: fonts.size.body,
          textDecoration: "none",
        }}
      >
        Privacy Policy
      </Link>
    </nav>
  );
}

