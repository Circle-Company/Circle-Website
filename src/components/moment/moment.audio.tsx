import { useState } from "react";
import { useMomentContext } from "./moment.context";

export function AudioControl() {
    const { isMuted, toggleMuted } = useMomentContext();
    const [isPressed, setIsPressed] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);

    const handleRelease = () => {
        setIsPressed(false);
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 180);
        toggleMuted();
    };

    return (
        <div
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={handleRelease}
            onPointerLeave={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
            style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                border: "1px solid transparent",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                cursor: "pointer",
                userSelect: "none",
                touchAction: "manipulation",
                transform: isPressed
                    ? "scale(0.94)"
                    : isBouncing
                      ? "scale(1.03)"
                      : "scale(1)",
                transition: isPressed
                    ? "transform 80ms ease-out"
                    : "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
            }}
        >
            {isMuted ? "Muted" : "Audio"}
        </div>
    );
}
