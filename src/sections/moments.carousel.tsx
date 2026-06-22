"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { VideoRender } from "@/components/moment/video.render";
import { VideoSlider } from "@/components/moment/video.slider";
import { MomentRoot } from "@/components/moment/moment.root";
import { useMomentContext } from "@/components/moment/moment.context";
import { MomentContainer } from "@/components/moment/moment.container";

type Moment = {
    url: string;
    username: string;
    description: string;
    date: string;
};

type Props = {
    moments: Moment[];
    initialIndex?: number;
    // Mesma detecção (por largura) usada na página, para evitar divergência
    // com o react-device-detect (que é por user-agent).
    isMobile: boolean;
};

// Timing único para todo o movimento do carrossel (slide, escala, opacidade e
// blur do vídeo usam os mesmos valores) — é o que dá a sensação de fluidez:
// nada "estala" mais rápido que o resto.
const CAROUSEL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const CAROUSEL_TRANSITION_MS = 520;

export function MomentsCarousel({
    moments,
    initialIndex = 0,
    isMobile,
}: Props) {
    return (
        <MomentRoot key={moments.length} count={moments.length}>
            <MomentsCarouselContent
                moments={moments}
                initialIndex={initialIndex}
                isMobile={isMobile}
            />
        </MomentRoot>
    );
}

function MomentsCarouselContent({
    moments,
    initialIndex = 0,
    isMobile,
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRefs = useRef<HTMLVideoElement[]>([]);

    const { resetCurrentTimes, resetIndex, setFocused } = useMomentContext();

    const [activeIndex, setActiveIndex] = useState(initialIndex);

    // Mede a largura real do container para dimensionar o carrossel.
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const update = () => setContainerWidth(container.clientWidth);
        update();

        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(update);
            ro.observe(container);
        }

        return () => {
            if (ro) ro.disconnect();
        };
    }, []);

    // Desktop: card fixo de 360px com os vizinhos "espiando" e desfocados.
    // Mobile: o card focado ocupa toda a largura (full-bleed, um por vez),
    // por isso a largura é derivada do container medido.
    const ITEM_WIDTH = isMobile ? containerWidth || 280 : 360;
    const GAP = isMobile ? 0 : 80;
    const FOCUSED_SCALE = isMobile ? 1 : 1.1;
    const UNFOCUSED_SCALE = isMobile ? 0.9 : 0.8;

    // Padding nas pontas que centraliza o card ativo dentro do container.
    // Quando o card ocupa a largura inteira (mobile), o resultado é 0.
    const edgeGap =
        containerWidth > 0
            ? Math.max(0, Math.floor(containerWidth / 2 - ITEM_WIDTH / 2))
            : GAP;

    const STEP = ITEM_WIDTH + GAP;

    /** Play/Pause controlado */
    const syncVideos = useCallback(
        (index: number) => {
            resetCurrentTimes();

            videoRefs.current.forEach((video, i) => {
                if (!video) return;
                if (i === index) {
                    // Autoplay sem gesto do usuário só é permitido com o vídeo
                    // MUDO no instante do play(). Garantimos isso aqui de forma
                    // imperativa (o atributo `muted` via JSX do React às vezes
                    // não chega a tempo). Sem o play, não há `timeupdate` e o
                    // slider de progresso fica preso em 0% (invisível).
                    video.muted = true;
                    video.playsInline = true;
                    video.currentTime = 0;
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === "function") {
                        // Se for rejeitado (ex.: ainda carregando), tenta de novo
                        // assim que houver dados suficientes para tocar.
                        playPromise.catch(() => {
                            const retry = () => {
                                video.removeEventListener("canplay", retry);
                                video.play().catch(() => {});
                            };
                            video.addEventListener("canplay", retry);
                        });
                    }
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        },
        [resetCurrentTimes],
    );

    /** Autoplay sequencial */
    const handleEnded = () => {
        resetIndex(activeIndex);

        const next = activeIndex + 1 < moments.length ? activeIndex + 1 : 0;
        setActiveIndex(next);
    };

    /** Sempre que muda o foco */
    useEffect(() => {
        syncVideos(activeIndex);
    }, [activeIndex, syncVideos]);

    const offset = -activeIndex * STEP;

    return (
        <>
            <div
                ref={containerRef}
                className="moments-carousel__scroll"
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "hidden",
                    width: "100%",
                    alignItems: "center",
                    padding: isMobile ? "0px 0px" : "40px 0",
                }}
            >
                <div
                    className="moments-carousel__track"
                    style={{
                        display: "flex",
                        gap: GAP,
                        paddingLeft: edgeGap,
                        paddingRight: edgeGap,
                        transform: `translateX(${offset}px)`,
                        transition: `transform ${CAROUSEL_TRANSITION_MS}ms ${CAROUSEL_EASING}`,
                        willChange: "transform",
                    }}
                >
                    {moments.map((moment, index) => {
                        const isActive = index === activeIndex;
                        const scale = isActive
                            ? FOCUSED_SCALE
                            : UNFOCUSED_SCALE;

                        return (
                            <div
                                key={moment.url}
                                style={{
                                    width: ITEM_WIDTH,
                                    flexShrink: 0,
                                }}
                            >
                                <div
                                    style={{
                                        alignItems: "center",
                                        transform: `scale(${scale})`,
                                        transformOrigin: "center center",
                                        transition: `transform ${CAROUSEL_TRANSITION_MS}ms ${CAROUSEL_EASING}, opacity ${CAROUSEL_TRANSITION_MS}ms ${CAROUSEL_EASING}`,
                                        opacity: isActive ? 1 : 0.35,
                                        willChange: "transform, opacity",
                                    }}
                                >
                                    <MomentContainer
                                        width={ITEM_WIDTH}
                                        overlayPadding={0}
                                        focused={isActive}
                                        topOverlay={
                                            <div
                                                style={{
                                                    paddingTop: "25px",
                                                    paddingLeft: "28px",
                                                    paddingRight: "28px",
                                                    boxSizing: "border-box",
                                                    display: "flex",
                                                    flex: 1,
                                                    alignItems: "center",
                                                    gap: 8,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 600,
                                                        flex: 1,
                                                    }}
                                                >
                                                    {moment.username}
                                                </div>
                                            </div>
                                        }
                                        bottomOverlay={
                                            <div
                                                style={{
                                                    width: "100%",
                                                    padding: "0 40px 25px",
                                                    boxSizing: "border-box",
                                                }}
                                            >
                                                <VideoSlider
                                                    index={index}
                                                    style={{ marginTop: 12 }}
                                                />
                                            </div>
                                        }
                                    >
                                        <VideoRender
                                            ref={(el) => {
                                                if (el)
                                                    videoRefs.current[index] =
                                                        el;
                                            }}
                                            index={index}
                                            width={ITEM_WIDTH}
                                            src={moment.url}
                                            muted
                                            playsInline
                                            focused={isActive}
                                            blurPx={isMobile ? 8 : 16}
                                            onEnded={
                                                isActive
                                                    ? handleEnded
                                                    : undefined
                                            }
                                        />
                                    </MomentContainer>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style jsx>{`
                .moments-carousel__scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .moments-carousel__scroll::-webkit-scrollbar {
                    display: none;
                }
                @media (prefers-reduced-motion: reduce) {
                    .moments-carousel__track {
                        transition: none !important;
                    }
                }
            `}</style>
        </>
    );
}
