import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Circle App - Making the World More Human",
  description: "Social app to create moments and share your memories",
  other: {
    // Força 32 bits de cor para evitar serrilhado de gradiente
    'color-scheme': 'dark light',
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // Força renderização em alta qualidade
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta tags para forçar 32 bits de cor */}
        <meta name="color-depth" content="32" />
        <meta name="color-gamut" content="p3" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Força renderização em alta qualidade */}
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        
        {/* Configurações para melhor renderização de gradientes */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media screen and (color-depth: 32bit) {
              * {
                color-depth: 32;
              }
            }
            
            @media screen and (color-gamut: p3) {
              * {
                color-gamut: p3;
              }
            }
          `
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
