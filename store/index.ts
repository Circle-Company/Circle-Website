// Wrapper síncrono simples usando localStorage (ambiente web / React)
// Mantém uma interface parecida com a do MMKV usada no app.
export const storage = {
    setItem(key: string, value: string) {
        if (typeof window === "undefined") return
        window.localStorage.setItem(key, value)
    },
    getItem(key: string): string | null {
        if (typeof window === "undefined") return null
        return window.localStorage.getItem(key)
    },
    deleteItem(key: string) {
        if (typeof window === "undefined") return
        window.localStorage.removeItem(key)
    },
}

export function storageKeys() {
    const baseKey = "@circleapp:"
    return {
        preferences: {
            language: baseKey + "preferences:language",
            haptics: baseKey + "preferences:haptics",
        },
        deviceMetadata: {
            deviceId: baseKey + "device:metadata:id",
            deviceName: baseKey + "device:metadata:name",
            platform: baseKey + "device:metadata:platform",
        },
    }
}
