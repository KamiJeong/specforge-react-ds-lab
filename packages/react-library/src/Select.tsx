import { forwardRef, type OptionHTMLAttributes, type SelectHTMLAttributes } from "react";
import "./primitives.css";

export type SelectSize = "sm" | "md" | "lg";
export type SelectTone = "default" | "danger";
export interface SelectOption extends Pick<OptionHTMLAttributes<HTMLOptionElement>, "disabled" | "label" | "value"> {
  label: string;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options?: readonly SelectOption[];
  /**
   * A native numeric row count, or a token-led presentation size. Numeric
   * values retain native multi-row select/listbox semantics.
   */
  size?: number | SelectSize;
  tone?: SelectTone;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, className, options, size = "md", tone = "default", ...nativeProps },
  ref,
) {
  const nativeSize = typeof size === "number" ? size : undefined;
  const designSize = typeof size === "string" ? size : "md";

  return <select {...nativeProps} ref={ref} size={nativeSize} className={["sf-select", className].filter(Boolean).join(" ")} data-size={designSize} data-tone={tone}>
    {children ?? options?.map(({ label, ...option }) => <option key={String(option.value)} {...option}>{label}</option>)}
  </select>;
});
