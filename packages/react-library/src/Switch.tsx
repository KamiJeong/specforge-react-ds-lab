import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
import "./primitives.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "defaultChecked" | "onChange" | "type"> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { checked, className, defaultChecked, disabled, label, onChange, onCheckedChange, ...nativeProps },
  ref,
) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.currentTarget.checked);
  };
  return <label className={["sf-switch", className].filter(Boolean).join(" ")}>
    <input {...nativeProps} ref={ref} checked={checked} defaultChecked={defaultChecked} disabled={disabled} className="sf-switch__input" onChange={handleChange} role="switch" type="checkbox" />
    <span aria-hidden="true" className="sf-switch__control"><span className="sf-switch__thumb" /></span>
    {label ? <span>{label}</span> : null}
  </label>;
});
