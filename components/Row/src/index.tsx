import React from "react";
import { Element } from "@design-systems/utils";
import { css, cx } from "emotion";

export interface RowProps extends Element<"div"> {
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
  ...props
}: RowProps) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        align-items: ${align};
        display: grid;
        grid-auto-flow: row;
        grid-gap: ${gap}px;
        margin: 45px 0;

        > * {
          margin: 0 !important;
        }

        @media (min-width: 992px) {
          grid-auto-flow: column;
          grid-template-columns: ${type === "large-text"
            ? "2fr 1fr"
            : "repeat(auto-fit, minmax(200px, 1fr))"};
        }
      `
    )}
  />
);
