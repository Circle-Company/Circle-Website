import React from "react";
import { useViewportHeight } from "@/hooks/use.viewport.height";

function getViewportWidth() {
    if (typeof window === "undefined") return 375;
    return window.innerWidth || 375;
}

export function useSizes() {
    const viewportHeight = useViewportHeight();

    // Track width in state so it updates on resize (and so consumers can depend on it safely)
    const [viewportWidth, setViewportWidth] = React.useState<number>(() =>
        getViewportWidth(),
    );

    React.useEffect(() => {
        const onResize = () => setViewportWidth(getViewportWidth());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const header = React.useMemo(
        () => ({
            height: 80,
            width: viewportWidth,
        }),
        [viewportWidth],
    );

    const footer = React.useMemo(
        () => ({
            height: 60,
            width: viewportWidth,
            padding: 10 / 2,
        }),
        [viewportWidth],
    );

    const screen = React.useMemo(
        () => ({
            width: viewportWidth,
            height: Math.max(viewportHeight - header.height - footer.height, 0),
            overflow: "hidden",
            padding: 10 / 2,
        }),
        [viewportWidth, viewportHeight, header.height, footer.height],
    );

    return React.useMemo(
        () => ({
            borderRadius: {
                10: 10,
                20: 20,
                28: 28,
                40: 40,
                72: 72,
            },

            paddings: {
                10: 10,
                15: 15,
                20: 20,
                26: 26,
                28: 28,
                40: 40,
                72: 72,
            },

            borders: { 0.5: 0.5, 1: 1, 2: 2, 4: 4, 5: 5 },

            margins: {
                5: 5,
                10: 10,
                15: 15,
                20: 20,
                26: 26,
                28: 28,
                40: 40,
                72: 72,
            },

            spaces: {
                10: 10,
                15: 15,
                20: 20,
                30: 30,
                40: 40,
                50: 50,
                70: 70,
                80: 80,
                100: 100,
                150: 150,
                200: 200,
                250: 250,
                300: 300,
            },

            window: {
                width: viewportWidth,
                height: viewportHeight,
            },

            header,
            footer,
            screen,

            button: {
                width: viewportWidth - 60,
                height: 40,
                borderRadius: 40,
                paddingHorizontal: 28,
                marginHorizontal: 33,
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "center",
            },

            input: {
                width: viewportWidth - (10 / 2) * 2,
                height: 56,
                paddingHorizontal: 15,
                paddingVertical: 10 / 2,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
            },

            icon: {
                12: { width: 12, height: 12, padding: 1 },
                17: { width: 17, height: 17, padding: 2 },
                24: { width: 24, height: 24, padding: 10 },
                32: { width: 32, height: 32, padding: 15 },
            },

            isSmallDevice: viewportWidth < 375,
        }),
        [viewportWidth, viewportHeight, header, footer, screen],
    );
}
