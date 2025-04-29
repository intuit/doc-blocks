/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

import styles from "./Shield.module.css";

export interface ShieldProps {
  /** The current label */
  label?: string;
  /** The current message */
  message?: string;
  /** The color behind the message */
  color?: string;
  /** A link to open when the shield is clicked */
  url?: string;
  /** A title for the link */
  title?: string;
}

type AnchorProps = JSX.LibraryManagedAttributes<
  "a",
  React.ComponentPropsWithoutRef<"a">
>;

/** A simple component. */
export const Shield = ({
  label,
  message,
  color = "orange",
  title,
  url,
}: ShieldProps) => {
  const Wrapper = url
    ? (p: AnchorProps) => (
        <a
          {...p}
          href={url}
          title={title}
          target="_blank"
          rel="noopener noreferrer"
        />
      )
    : "span";

  return (
    <Wrapper className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <span className={styles.message} style={{ background: color }}>
        {message}
      </span>
    </Wrapper>
  );
};
