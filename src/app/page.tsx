"use client";

import { AnimatedText } from "@/components/AnimatedText";
import { DownloadButton } from "@/components/DownloadButton";
import { DownloadCallToAction } from "@/components/DownloadCallToAction";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { ManifestoSection } from "@/components/ManifestoSection";
import { PartnersShowcase } from "@/components/PartnersShowcase";
import { QRCodeSection } from "@/components/QRCodeSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SocialImagePost } from "@/components/SocialImagePost";
import { VideoHeroSection } from "@/components/VideoHeroSection";
import { VideoSection } from "@/components/VideoSection";

export default function Home() {
  return (
    <>
      {/* Barra de Progresso - Primeiro elemento absoluto */}
      
      <ScrollProgress />
      <main className="min-h-screen bg-black text-white relative font-regular">
        <VideoHeroSection />
        <SocialImagePost />
        <ManifestoSection />
        <PartnersShowcase />
        <FeaturesSection />
        <DownloadCallToAction />
        <QRCodeSection />
        <Footer />
      </main>
    </>
  );
}
