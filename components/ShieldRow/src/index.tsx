import React from "react";

import styles from "./ShieldRow.module.css";

/** Render a story in an iframe so it's responsive */
export const ShieldRow = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => <div {...props} className={styles.container} />;
