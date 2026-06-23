"use client";

import React, { createContext, useContext } from "react";

export type MomentState = {
    durationsMs: number[];
    currentTimesMs: number[];
    isMuted: boolean;
    setMuted: (muted: boolean) => void;
    toggleMuted: () => void;
    setDurationMs: (index: number, durationMs: number) => void;
    setCurrentTimeMs: (index: number, currentTimeMs: number) => void;
    resetCurrentTimes: () => void;
    resetIndex: (index: number) => void;
    focused: boolean;
    setFocused: (focused: boolean) => void;
};

export const MomentContext = createContext<MomentState | null>(null);

export function useMomentContext() {
    const ctx = useContext(MomentContext);
    if (!ctx) {
        throw new Error("useMomentContext must be used within MomentRoot");
    }
    return ctx;
}
