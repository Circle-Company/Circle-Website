import React, { forwardRef } from "react";
import { useMomentContext } from "./moment.context";
import {
    MOMENT_REQUIRED_WIDTH,
    MOMENT_REQUIRED_RATIO,
    MOMENT_BORDER_RADIUS,
} from "./moment.constants";
import { colors } from "@/constants/colors";

type VideoRenderProps = Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "ref" | "width" | "height"
> & {
    /**
     * URL do vídeo.
     */
    src: string;

    /**
     * Índice do vídeo no contexto compartilhado.
     */
    index?: number;

    /**
     * Largura desejada do vídeo em pixels.
     * A altura será calculada automaticamente pelo aspect ratio 1080x1674.
     * Default: 1080
     */
    width?: number;

    /**
     * Define se o momento está focado (sem blur).
     * Default: true
     */
    focused?: boolean;
};

/**
 * Visualizador de vídeo vertical com aspect ratio fixo 1080x1674.
 *
 * - Recebe uma largura (width) e calcula a altura (height) como:
 *   height = width * (1674 / 1080)
 * - Pode receber quaisquer props padrão de <video> (controls, muted, loop, etc.)
 * - Exposto como forwardRef<HTMLVideoElement> para controle externo (play/pause, currentTime...)
 */
export const VideoRender = forwardRef<HTMLVideoElement, VideoRenderProps>(
    (
        {
            src,
            index,
            width = MOMENT_REQUIRED_WIDTH,
            focused = true,
            style,
            autoPlay = false,
            playsInline = true,
            onLoadedMetadata,
            onTimeUpdate,
            ...videoProps
        },
        ref,
    ): JSX.Element => {
        const calculatedHeight = width * MOMENT_REQUIRED_RATIO;
        const { setDurationMs, setCurrentTimeMs, isMuted } = useMomentContext();
        const hasIndex = typeof index === "number" && index >= 0;

        const handleLoadedMetadata: React.VideoHTMLAttributes<HTMLVideoElement>["onLoadedMetadata"] =
            (event) => {
                if (hasIndex) {
                    const rawDuration = event.currentTarget.duration;
                    const durationMs = Number.isFinite(rawDuration)
                        ? rawDuration * 1000
                        : 0;
                    setDurationMs(index, durationMs);
                }
                onLoadedMetadata?.(event);
            };

        const handleTimeUpdate: React.VideoHTMLAttributes<HTMLVideoElement>["onTimeUpdate"] =
            (event) => {
                if (hasIndex) {
                    const rawCurrentTime = event.currentTarget.currentTime;
                    if (Number.isFinite(rawCurrentTime)) {
                        setCurrentTimeMs(index, rawCurrentTime * 1000);
                    }
                }
                onTimeUpdate?.(event);
            };

        return (
            <div
                style={{
                    width,
                    height: calculatedHeight,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: MOMENT_BORDER_RADIUS,
                    backgroundColor: colors.gray[9],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <video
                    ref={ref}
                    src={src}
                    autoPlay={autoPlay}
                    muted={isMuted}
                    playsInline={playsInline}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: MOMENT_BORDER_RADIUS,
                        objectFit: "cover",
                        objectPosition: "center center",
                        pointerEvents: "none",
                        filter: focused ? "none" : "blur(6px)",
                        transition: "filter 240ms ease",
                        ...style,
                    }}
                    {...videoProps}
                />
            </div>
        );
    },
);

VideoRender.displayName = "VideoRender";
