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

    /**
     * Intensidade do desfoque (em px) aplicado quando NÃO está focado.
     * Default: 6
     */
    blurPx?: number;
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
            blurPx = 6,
            style,
            autoPlay = false,
            playsInline = true,
            onLoadedMetadata,
            onDurationChange,
            onTimeUpdate,
            ...videoProps
        },
        ref,
    ): JSX.Element => {
        const calculatedHeight = width * MOMENT_REQUIRED_RATIO;
        const { setDurationMs, setCurrentTimeMs, isMuted } = useMomentContext();
        const hasIndex = typeof index === "number" && index >= 0;

        // Grava a duração quando finita e > 0. Importante: os eventos
        // loadedmetadata/durationchange podem disparar ANTES do React hidratar
        // (o navegador começa a carregar o <video> do HTML do SSR antes dos
        // handlers serem anexados), sendo perdidos. Por isso também chamamos
        // isto no timeupdate, que dispara durante a reprodução já hidratado.
        const syncDuration = (el: HTMLVideoElement) => {
            if (!hasIndex) return;
            const rawDuration = el.duration;
            if (Number.isFinite(rawDuration) && rawDuration > 0) {
                setDurationMs(index, rawDuration * 1000);
            }
        };

        const handleLoadedMetadata: React.VideoHTMLAttributes<HTMLVideoElement>["onLoadedMetadata"] =
            (event) => {
                syncDuration(event.currentTarget);
                onLoadedMetadata?.(event);
            };

        const handleDurationChange: React.VideoHTMLAttributes<HTMLVideoElement>["onDurationChange"] =
            (event) => {
                syncDuration(event.currentTarget);
                onDurationChange?.(event);
            };

        const handleTimeUpdate: React.VideoHTMLAttributes<HTMLVideoElement>["onTimeUpdate"] =
            (event) => {
                if (hasIndex) {
                    const el = event.currentTarget;
                    // Recupera a duração aqui também: os eventos de metadata
                    // costumam disparar antes da hidratação e se perdem.
                    syncDuration(el);
                    const rawCurrentTime = el.currentTime;
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
                    onDurationChange={handleDurationChange}
                    onTimeUpdate={handleTimeUpdate}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: MOMENT_BORDER_RADIUS,
                        objectFit: "cover",
                        objectPosition: "center center",
                        pointerEvents: "none",
                        filter: focused ? "none" : `blur(${blurPx}px)`,
                        // Mesmo timing do slide/escala do carrossel: o vídeo
                        // entra em foco em sincronia com o card assentando.
                        transition: "filter 520ms cubic-bezier(0.22, 1, 0.36, 1)",
                        ...style,
                    }}
                    {...videoProps}
                />
            </div>
        );
    },
);

VideoRender.displayName = "VideoRender";
