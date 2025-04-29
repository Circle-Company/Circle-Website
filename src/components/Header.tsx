import { useEffect, useState } from "react";
import { DownloadButton } from "./DownloadButton";

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 50);
    };

    // Executa uma vez para definir o estado inicial
    handleScroll();

    // Adiciona o listener com { passive: true } para melhor performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] ${
        hasScrolled
          ? "bg-black/90 backdrop-blur-sm border-b border-gray-800 shadow-lg"
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px] border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-2xl font-bold text-white drop-shadow-md">
            Circle App
          </a>
          <DownloadButton href="#download" size="small" />
        </div>
      </div>
    </header>
  );
}
