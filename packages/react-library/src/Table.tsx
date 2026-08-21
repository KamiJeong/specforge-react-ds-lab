import { forwardRef, type TableHTMLAttributes } from "react";
import "./primitives.css";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  caption?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ caption, children, className, ...nativeProps }, ref) {
  return <table {...nativeProps} ref={ref} className={["sf-table", className].filter(Boolean).join(" ")}>{caption ? <caption>{caption}</caption> : null}{children}</table>;
});
