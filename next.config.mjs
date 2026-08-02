import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        // Alias "@" explícito: o Next só deriva os `paths` do tsconfig.json
        // quando o pacote `typescript` está instalado. Em builds que instalam
        // apenas dependências de produção o alias sumia e todo import "@/..."
        // falhava com "Module not found".
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.join(projectRoot, "src"),
        };

        return config;
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination:
                    "https://circle-app-0d1288f2636e.herokuapp.com/:path*",
            },
        ];
    },
};

export default nextConfig;
