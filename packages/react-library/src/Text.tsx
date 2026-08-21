import type { HTMLAttributes } from "react";
import "./primitives.css";

export type TextElement = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextSize = "sm" | "md" | "lg";
export type TextWeight = "regular" | "medium" | "bold";
export type TextTone = "default" | "muted" | "danger";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
}

export function Text({ as: Element = "p", className, size = "md", tone = "default", weight = "regular", ...nativeProps }: TextProps) {
  return <Element {...nativeProps} className={["sf-text", className].filter(Boolean).join(" ")} data-size={size} data-tone={tone} data-weight={weight} />;
}
