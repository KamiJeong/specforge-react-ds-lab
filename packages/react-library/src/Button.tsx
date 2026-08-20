import { Children, forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

function hasVisibleText(node: ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") return String(node).trim().length > 0;
  if (!isValidElement<{ children?: ReactNode }>(node)) return false;
  return Children.toArray(node.props.children).some(hasVisibleText);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading = false, disabled = false, children, className, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...nativeProps },
  ref,
) {
  if (!hasVisibleText(children) && !ariaLabel && !ariaLabelledBy) {
    throw new Error("Button icon-only content requires aria-label or aria-labelledby.");
  }

  const isDisabled = disabled || loading;
  const classes = ["sf-button", className].filter(Boolean).join(" ");

  return (
    <button
      {...nativeProps}
      ref={ref}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classes}
      data-size={size}
      data-variant={variant}
      disabled={isDisabled}
      type={nativeProps.type ?? "button"}
    >
      {loading ? <span aria-hidden="true" className="sf-button__spinner" /> : null}
      {children}
    </button>
  );
});
