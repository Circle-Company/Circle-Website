import React, { type CSSProperties, type MouseEvent } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useSizes } from "@/constants/sizes";
import { useIsMobile } from "@/hooks/use.platform.detection";

/**
 * Interface de propriedades de animação customizáveis
 */
export interface AnimationConfig {
  enabled?: boolean;
  tap?: {
    scale?: number;
    duration?: number;
    bounciness?: number;
  };
  hover?: {
    scale?: number;
    scaleDuration?: number;
    colorDuration?: number;
    scaleExitDuration?: number;
    colorExitDuration?: number;
    backgroundColor?: string;
    textColor?: string;
  };
}

/**
 * Interface de propriedades para o componente Button
 */
export interface ButtonStandartProps {
  style?: CSSProperties;
  testID?: string;
  children: React.ReactNode;
  action: () => void | Promise<void>;
  animation?: AnimationConfig;
  disabled?: boolean;
  className?: string;
}

export function Button({
  style,
  testID,
  children,
  action,
  animation,
  disabled = false,
  className,
}: ButtonStandartProps) {
  const sizes = useSizes();
  const isMobile = useIsMobile();

  const DEFAULT_ANIMATION: Required<AnimationConfig> = {
    enabled: true,
    tap: {
      scale: !isMobile ? 0.87 : 0.9,
      duration: !isMobile ? 0.2 : 0.25,
      bounciness: !isMobile ? 7 : 12,
    },
    hover: {
      scale: 1.1,
      scaleDuration: 0.5,
      colorDuration: 0.5,
      scaleExitDuration: 0.2,
      colorExitDuration: 0.4,
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
  };

  // Merge das configurações de animação com os padrões
  const animConfig: Required<AnimationConfig> = {
    enabled: animation?.enabled ?? DEFAULT_ANIMATION.enabled,
    tap: {
      ...DEFAULT_ANIMATION.tap,
      ...animation?.tap,
    },
    hover: {
      ...DEFAULT_ANIMATION.hover,
      ...animation?.hover,
    },
  };

  const baseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: sizes.button.height * 0.5,
    borderRadius: sizes.button.height * 0.5,
    paddingInline: sizes.paddings[20],
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    background: "transparent",
    opacity: disabled ? 0.6 : 1,

    // FIXES MOBILE HIGHLIGHT
    WebkitTapHighlightColor: "transparent",
    outline: "none",
    userSelect: "none",
    touchAction: "manipulation",
    ...style,
  };

  async function onPress(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    event.preventDefault();
    await action?.();

    // remove o foco nativo após tap
    (event.target as HTMLButtonElement)?.blur();
  }

  // Se animações estão desabilitadas, renderiza um botão HTML padrão
  if (!animConfig.enabled) {
    return (
      <button
        type="button"
        data-testid={testID}
        style={baseStyle}
        onClick={onPress}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    );
  }

  // Configurações de animação para o Framer Motion
  const tapAnimation = disabled ? {} : { scale: animConfig.tap.scale };

  const hoverAnimation = disabled
    ? {}
    : {
        scale: animConfig.hover.scale,
        backgroundColor: animConfig.hover.backgroundColor,
      };

  const tapTransition = {
    type: "spring" as const,
    bounce: (animConfig.tap.bounciness ?? 12) / 20,
    duration: animConfig.tap.duration,
  };

  const hoverScaleTransition = {
    duration: animConfig.hover.scaleDuration,
  };

  const hoverScaleExitTransition = {
    duration: animConfig.hover.scaleExitDuration ?? 0.2,
  };

  const hoverColorTransition = {
    duration: animConfig.hover.colorDuration,
  };

  const hoverColorExitTransition = {
    duration: animConfig.hover.colorExitDuration ?? 0.4,
  };

  return (
    <motion.button
      type="button"
      data-testid={testID}
      style={baseStyle}
      className={className}
      disabled={disabled}
      whileTap={tapAnimation}
      whileHover={
        disabled
          ? {}
          : {
              scale: animConfig.hover.scale,
              backgroundColor: animConfig.hover.backgroundColor,
              color: animConfig.hover.textColor,
            }
      }
      transition={{
        scale: {
          type: "spring",
          bounce: (animConfig.tap.bounciness ?? 12) / 20,
          duration: animConfig.tap.duration,
        },
        backgroundColor: {
          duration: animConfig.hover.colorDuration,
          ease: "easeInOut",
        },
        color: {
          duration: animConfig.hover.colorDuration,
          ease: "easeInOut",
        },
      }}
      onClick={onPress}
    >
      <div
        style={{
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </motion.button>
  );
}

// Componente alternativo sem animações para casos onde Framer Motion não é necessário
export function StaticButton({
  style,
  testID,
  children,
  action,
  disabled = false,
  className,
}: Omit<ButtonStandartProps, "animation">) {
  const sizes = useSizes();
  const baseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: sizes.button.height * 0.5,
    borderRadius: sizes.button.height * 0.5,
    paddingInline: sizes.paddings[20],
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    background: "transparent",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease",
    ...style,
  };

  async function onPress(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    event.preventDefault();
    await action?.();
  }

  return (
    <button
      type="button"
      data-testid={testID}
      style={baseStyle}
      className={className}
      onClick={onPress}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Export do componente padrão (com animações) e alternativo (sem animações)
export { Button as AnimatedButton };
export default Button;
