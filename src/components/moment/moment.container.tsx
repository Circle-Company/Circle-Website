import React from "react";
import {
    MOMENT_REQUIRED_WIDTH,
    MOMENT_REQUIRED_RATIO,
    MOMENT_BORDER_RADIUS,
} from "./moment.constants";
import { useMomentContext } from "./moment.context";

export type MomentContainerProps = {
    width?: number;
    children: React.ReactNode;
    topOverlay?: React.ReactNode;
    bottomOverlay?: React.ReactNode;
    overlayPadding?: number;
    // Foco POR CARD. Quando definido, sobrepõe o valor do contexto (que é
    // global). É o que garante que só o card em foco (sem blur) mostre o nome
    // de usuário, o slider e os gradientes — cards borrados não exibem nada.
    focused?: boolean;
};

export function MomentContainer({
    width = MOMENT_REQUIRED_WIDTH,
    children,
    topOverlay,
    bottomOverlay,
    overlayPadding = 12,
    focused: focusedProp,
}: MomentContainerProps) {
    const ctx = useMomentContext();
    const focused = focusedProp ?? ctx.focused;
    const calculatedHeight = width * MOMENT_REQUIRED_RATIO;

    return (
        <div
            style={{
                position: "relative",
                width,
                height: calculatedHeight,
                borderRadius: MOMENT_BORDER_RADIUS,
                overflow: "hidden",
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    position: "relative",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>

            {focused && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "35%",
                        zIndex: 1,
                        background:
                            "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
                        pointerEvents: "none",
                    }}
                />
            )}
            {focused && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "35%",
                        zIndex: 1,
                        background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
                        pointerEvents: "none",
                    }}
                />
            )}

            {focused && topOverlay && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: overlayPadding,
                        boxSizing: "border-box",
                        color: "#fff",
                        textAlign: "left",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                        pointerEvents: "auto",
                    }}
                >
                    {topOverlay}
                </div>
            )}

            {focused && bottomOverlay && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: overlayPadding,
                        boxSizing: "border-box",
                        color: "#fff",
                        textAlign: "left",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                        pointerEvents: "auto",
                    }}
                >
                    {bottomOverlay}
                </div>
            )}
        </div>
    );
}
