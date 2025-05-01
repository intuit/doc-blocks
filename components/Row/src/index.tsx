import React from "react";

import styles from "./Row.module.css";

export interface RowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** The space between items in the row */
  gap?: number;
  /** A specific type of row */
  type?: "large-text";
  /** Vertical alignment */
  align?: string;
}

/** Render a story in an iframe so it"s responsive */
export const Row = ({
  gap = 40,
  align = "self-start",
  type,
  className,
  style,
  ...props
}: RowProps) => {
  // Define CSS variables
  const cssVars = {
    "--gap": `${gap}px`,
    "--align": align,
    "--grid-template":
      type === "large-text"
        ? "2fr 1fr"
        : "repeat(auto-fit, minmax(200px, 1fr))",
  } as React.CSSProperties;

  return (
    <div
      {...props}
      style={{ ...style, ...cssVars }}
      className={`${styles.row} ${className}`}
    />
  );
};
