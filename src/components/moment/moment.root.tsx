"use client";

import React, { useCallback, useMemo, useState } from "react";
import { MomentContext, type MomentState } from "./moment.context";

type MomentRootProps = {
    children: React.ReactNode;
    count: number;
};

export function MomentRoot({ children, count }: MomentRootProps) {
    const [durationsMs, setDurationsMs] = useState<number[]>(
        Array.from({ length: count }, () => 0),
    );
    const [currentTimesMs, setCurrentTimesMs] = useState<number[]>(
        Array.from({ length: count }, () => 0),
    );
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [focused, setFocusedState] = useState<boolean>(true);

    const setDurationMs = useCallback((index: number, durationMs: number) => {
        setDurationsMs((prev) => {
            if (index < 0 || index >= prev.length) return prev;
            if (prev[index] === durationMs) return prev;
            const next = [...prev];
            next[index] = durationMs;
            return next;
        });
    }, []);

    const setCurrentTimeMs = useCallback(
        (index: number, currentTimeMs: number) => {
            setCurrentTimesMs((prev) => {
                if (index < 0 || index >= prev.length) return prev;
                const next = [...prev];
                next[index] = currentTimeMs;
                return next;
            });
        },
        [],
    );

    const setMuted = useCallback((muted: boolean) => {
        setIsMuted(muted);
    }, []);

    const toggleMuted = useCallback(() => {
        setIsMuted((prev) => !prev);
    }, []);

    const resetCurrentTimes = useCallback(() => {
        setCurrentTimesMs((prev) => prev.map(() => 0));
    }, []);

    const resetIndex = useCallback((index: number) => {
        setCurrentTimesMs((prev) => {
            if (index < 0 || index >= prev.length) return prev;
            const next = [...prev];
            next[index] = 0;
            return next;
        });
    }, []);

    const setFocused = useCallback((nextFocused: boolean) => {
        setFocusedState(nextFocused);
    }, []);

    const value = useMemo<MomentState>(
        () => ({
            durationsMs,
            currentTimesMs,
            isMuted,
            setMuted,
            toggleMuted,
            setDurationMs,
            setCurrentTimeMs,
            resetCurrentTimes,
            resetIndex,
            focused,
            setFocused,
        }),
        [
            durationsMs,
            currentTimesMs,
            isMuted,
            setMuted,
            toggleMuted,
            setDurationMs,
            setCurrentTimeMs,
            resetCurrentTimes,
            resetIndex,
            focused,
            setFocused,
        ],
    );

    return (
        <MomentContext.Provider value={value}>
            {children}
        </MomentContext.Provider>
    );
}
