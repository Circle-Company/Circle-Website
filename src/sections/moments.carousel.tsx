"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { VideoRender } from "@/components/moment/video.render";
import { isMobile } from "react-device-detect";
import { VideoSlider } from "@/components/moment/video.slider";
import { MomentRoot } from "@/components/moment/moment.root";
import { useMomentContext } from "@/components/moment/moment.context";
import { MomentContainer } from "@/components/moment/moment.container";
import { AudioControl } from "@/components/moment/moment.audio";
import { Text } from "@/components/themed";
import fonts from "@/constants/fonts";

type Moment = {
    url: string;
    username: string;
    description: string;
    date: string;
};

type Props = {
    moments: Moment[];
    initialIndex?: number;
};

export function MomentsCarousel({ moments, initialIndex = 0 }: Props) {
    return (
        <MomentRoot key={moments.length} count={moments.length}>
            <MomentsCarouselContent
                moments={moments}
                initialIndex={initialIndex}
            />
        </MomentRoot>
    );
}

function MomentsCarouselContent({ moments, initialIndex = 0 }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRefs = useRef<HTMLVideoElement[]>([]);

    const { resetCurrentTimes, resetIndex, setFocused } = useMomentContext();

    const [activeIndex, setActiveIndex] = useState(initialIndex);

    const ITEM_WIDTH = isMobile ? 280 : 360;
    const GAP = isMobile ? 20 : 80;
    const FOCUSED_SCALE = isMobile ? 0.8 : 1.1;
    const UNFOCUSED_SCALE = isMobile ? 0.6 : 0.8;

    const [edgeGap, setEdgeGap] = useState(GAP);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateEdgeGap = () => {
            const half = container.clientWidth / 2 - ITEM_WIDTH / 2;
            setEdgeGap(Math.max(GAP, Math.floor(half)));
        };

        updateEdgeGap();

        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(updateEdgeGap);
            ro.observe(container);
        }

        return () => {
            if (ro) ro.disconnect();
        };
    }, [GAP, ITEM_WIDTH]);

    const STEP = ITEM_WIDTH + GAP;

    /** Play/Pause controlado */
    const syncVideos = useCallback(
        (index: number) => {
            resetCurrentTimes();

            videoRefs.current.forEach((video, i) => {
                if (!video) return;
                if (i === index) {
                    video.currentTime = 0;
                    video.play().catch(() => {});
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
                        transition:
                            "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
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
                                        transition:
                                            "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                >
                                    <MomentContainer
                                        width={ITEM_WIDTH}
                                        overlayPadding={0}
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
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        opacity: 0.9,
                                                    }}
                                                >
                                                    {moment.description}
                                                </div>
                                                <Text
                                                    style={{
                                                        fontSize:
                                                            fonts.size.body,
                                                        opacity: 0.75,
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    {moment.date}
                                                </Text>
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
            `}</style>
        </>
    );
}
