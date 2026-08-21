import type { HTMLAttributes } from "react";
import "./primitives.css";

export interface ListProps extends HTMLAttributes<HTMLOListElement | HTMLUListElement> {
  ordered?: boolean;
}

export function List({ ordered = false, className, ...nativeProps }: ListProps) {
  const Element = ordered ? "ol" : "ul";
  return <Element {...nativeProps} className={["sf-list", className].filter(Boolean).join(" ")} />;
}
