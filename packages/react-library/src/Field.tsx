import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { Label } from "./Label";
import "./primitives.css";

export interface FieldControlProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-errormessage"?: string;
  "aria-invalid"?: boolean | "true" | "false";
}

export interface FieldProps {
  children: ReactElement<FieldControlProps>;
  className?: string;
  error?: ReactNode;
  helpText?: ReactNode;
  id?: string;
  label?: ReactNode;
}

function mergeIds(...ids: Array<string | undefined>) {
  const result = ids.filter(Boolean).join(" ");
  return result || undefined;
}

export function Field({ children, className, error, helpText, id, label }: FieldProps) {
  const generatedId = useId();
  // A control's explicit id is the association source of truth. This keeps a
  // caller-provided native id aligned with the generated label/help/error ids.
  const controlId = children.props.id ?? id ?? `sf-field-${generatedId.replace(/:/g, "")}`;
  const helpId = helpText ? `${controlId}-help` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const control = isValidElement<FieldControlProps>(children)
    ? cloneElement(children, {
      id: children.props.id ?? controlId,
      "aria-describedby": mergeIds(children.props["aria-describedby"], helpId, errorId),
      "aria-errormessage": errorId ?? children.props["aria-errormessage"],
      "aria-invalid": error ? true : children.props["aria-invalid"],
    })
    : children;

  return <div className={["sf-field", className].filter(Boolean).join(" ")}>
    {label ? <Label htmlFor={controlId}>{label}</Label> : null}
    {control}
    {helpText ? <div className="sf-field__help" id={helpId}>{helpText}</div> : null}
    {error ? <div className="sf-field__error" id={errorId} role="alert">{error}</div> : null}
  </div>;
}
