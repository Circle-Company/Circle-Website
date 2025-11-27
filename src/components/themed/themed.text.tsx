import * as React from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { colors } from "@/constants/colors";

export type TextStyle = CSSProperties;
export type ViewStyle = CSSProperties;

type TextTag = "span" | "p" | "div" | "strong";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  style?: CSSProperties;
  as?: TextTag;
}

export function Text({ style, as = "span", ...otherProps }: TextProps) {
  const Component = as;

  return (
    <Component
      style={{
        color: colors.gray.white,
        ...(style ?? {}),
      }}
      {...otherProps}
    />
  );
}

