import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Footer } from "@/sections/footer";
import { Screen } from "@/components/screen";

export const metadata: Metadata = {
  title: "Circle App",
  description: "Social app to create moments and share your memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Providers>
            <Screen>{children}</Screen>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
