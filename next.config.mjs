/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|ogv)$/,
            use: {
                loader: "file-loader",
                options: {
                    publicPath: "/_next/static/videos/",
                    outputPath: "static/videos/",
                    name: "[name].[hash].[ext]",
                },
            },
        });

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
