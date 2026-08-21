import { forwardRef, type LabelHTMLAttributes } from "react";
import "./primitives.css";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label({ className, ...nativeProps }, ref) {
  return <label {...nativeProps} ref={ref} className={["sf-label", className].filter(Boolean).join(" ")} />;
});
