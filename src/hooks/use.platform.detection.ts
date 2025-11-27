const isBrowser =
    typeof window !== "undefined" && typeof navigator !== "undefined"

const userAgent = isBrowser ? navigator.userAgent || "" : ""

// Heurística básica de mobile baseada em userAgent
const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
)

// Heurística adicional baseada em touch e largura de tela
const isTouchCapable =
    isBrowser &&
    ("ontouchstart" in window ||
        (typeof navigator.maxTouchPoints === "number" &&
            navigator.maxTouchPoints > 0))

const isNarrowViewport = isBrowser ? window.innerWidth <= 1024 : false

export const isWeb = true
export const isWebMobile = isBrowser && (isMobileUA || (isTouchCapable && isNarrowViewport))
export const isWebDesktop = isBrowser && !isWebMobile

export const devicePlatform: "web-mobile" | "web-desktop" | "unknown" = !isBrowser
    ? "unknown"
    : isWebMobile
    ? "web-mobile"
    : "web-desktop"
