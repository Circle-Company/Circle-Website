import React from "react";
import { useMomentContext } from "./moment.context";

export interface VideoSliderProps {
    index?: number;
    totalTimeMs?: number;
    currentTimeMs?: number;
    style: React.CSSProperties;
}

export function VideoSlider({
    index = 0,
    totalTimeMs,
    currentTimeMs,
    style,
}: VideoSliderProps) {
    const { durationsMs, currentTimesMs } = useMomentContext();

    const resolvedTotalTimeMs = totalTimeMs ?? durationsMs[index] ?? 0;
    const resolvedCurrentTimeMs = currentTimeMs ?? currentTimesMs[index] ?? 0;
    const container = {
        width: "96%",
        height: "7px",
        backgroundColor: "rgba(204, 204, 204, 0.4)",
        borderRadius: "5px",
        marginLeft: "auto",
        marginRight: "auto",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        ...style,
    };

    const hasDuration =
        Number.isFinite(resolvedTotalTimeMs) && resolvedTotalTimeMs > 0;
    const safeTotal = hasDuration ? resolvedTotalTimeMs : 1;
    const safeCurrent = Math.min(Math.max(resolvedCurrentTimeMs, 0), safeTotal);
    const progress = hasDuration ? (safeCurrent / safeTotal) * 100 : 0;

    const slider = {
        width: `${progress}%`,
        height: "100%",
        background: "linear-gradient(90deg, #9b9b9b 0%, #ffffff 100%)",
        borderRadius: "5px",
        transition: "width 600ms ease-out",
    };

    return (
        <div style={container}>
            <div style={slider} />
        </div>
    );
}
