import { forwardRef, type FormHTMLAttributes } from "react";
import "./primitives.css";

export type FormProps = FormHTMLAttributes<HTMLFormElement>;

/** A styled native form with no validation or submission policy. */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form({ className, ...nativeProps }, ref) {
  return <form {...nativeProps} ref={ref} className={["sf-form", className].filter(Boolean).join(" ")} />;
});
