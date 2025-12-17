import "./globals.css";

import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "Circle App",
    description: "Social app to create moments and share your memories",
    icons: {
        icon: [
            { url: "/favicon.ico", type: "image/x-icon" },
            { url: "/favicon.png", type: "image/png" },
        ],
        shortcut: ["/favicon.ico"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body
                style={{
                    margin: 0,
                    background: `linear-gradient(to bottom, #101010 0%, #000000 33%, #000000 100%)`,
                    minHeight: "100vh",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                }}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
