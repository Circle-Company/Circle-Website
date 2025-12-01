"use client";

import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Screen } from "@/components/screen";
import { HomeCta } from "@/sections/home.cta";
import { HomeIllustration } from "@/sections/home.illustration";
import { useIsMobile } from "@/hooks/use.platform.detection";

export default function Home() {
  const isMobile = useIsMobile();

  const wrapperStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    maxWidth: 1400,
    margin: "0 auto",

    paddingLeft: isMobile ? 10 : 60,
    paddingRight: isMobile ? 10 : 60,

    gap: isMobile ? 40 : 20,

    // força que esse bloco nunca passe da tela no desktop
    maxHeight: isMobile ? "none" : "100vh",
    overflow: isMobile ? "visible" : "hidden",
  };

  const absoluteImageStyle = {
    position: "absolute",
    bottom: -250,
    left: -20,
    width: 700,
    height: 700,
    opacity: 0.4,
    pointerEvents: "none",
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",

    // prevenir expansão no desktop
    maxHeight: isMobile ? "none" : "100vh",
    overflow: isMobile ? "visible" : "hidden",
  };

  return (
    <div
      style={{
        overflow: isMobile ? "auto" : "hidden",
        height: isMobile ? "auto" : "100vh",
        position: "relative",
      }}
    >
      {!isMobile && (
        <img src="/images/bg_desktop.png" style={absoluteImageStyle} />
      )}

      <Header />

      <Screen>
        <div style={containerStyle}>
          <div style={wrapperStyle}>
            <HomeCta />
            <HomeIllustration />
          </div>
        </div>
      </Screen>

      <Footer />
    </div>
  );
}
