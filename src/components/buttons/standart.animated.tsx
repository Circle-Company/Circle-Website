import React, { type CSSProperties, type MouseEvent } from "react"
import { motion } from "framer-motion"
import sizes from "@/constants/sizes"
import { devicePlatform } from "@/hooks/use.platform.detection"

/**
 * Interface de propriedades para o componente ButtonStandart
 *
 * @property {StyleProp<ViewStyle>} style - Estilo adicional para customização do botão
 * @property {string} testID - ID para testes
 * @property {Object} animationProps - Propriedades de animação { bounciness: number, animationScale: number }
 * @property {React.ReactNode} children - Conteúdo do botão
 * @property {Function} action - Função executada ao pressionar o botão
 * @property {Function} vibrate - Função opcional para feedback háptico
 */
export interface ButtonStandartProps {
    style?: CSSProperties
    testID?: string
    animationProps?: {
        bounciness?: number
        animationScale?: number
    }
    children: React.ReactNode
    action: () => void | Promise<void>
}


export function Button({
    style,
    animationProps = {
        bounciness: 12,
        animationScale: 0.8,
    },
    children,
    testID,
    action,
}: ButtonStandartProps) {
    const container: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: sizes.buttons.height * 0.5,
        borderRadius: sizes.buttons.height * 0.5,
        paddingInline: sizes.paddings[20],
        cursor: "pointer",
        border: "none",
        background: "transparent",
        ...style,
    }

    async function onPress(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        await action?.()
    }

    // Para web-desktop usamos uma animação mais sutil e constante,
    // independente da "intensidade" do clique; em mobile mantemos
    // uma animação um pouco mais elástica.
    const isDesktop = devicePlatform === "web-desktop"

    const scale = isDesktop
        ? 0.87
        : animationProps.animationScale ?? 0.9

    const bounciness = isDesktop
        ? 7 // bem suave no desktop
        : animationProps.bounciness ?? 12

    const duration = isDesktop ? 0.2 : 0.25

    return (
        <motion.button
            type="button"
            data-testid={testID}
            style={container}
            whileTap={{ scale }}
            transition={{
                type: "spring",
                bounce: bounciness / 20,
                duration,
            }}
            onClick={onPress}
        >
            {children}
        </motion.button>
    )
}
