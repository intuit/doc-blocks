import React from "react";

import styles from "./IntendedUsage.module.css";

export interface IntendedUsageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** The title of the section */
  sectionTitle: string;
  /** The icon for the list */
  icon: string;
}

/** A fancy list */
export const IntendedUsage = ({
  children,
  sectionTitle,
  icon,
  ...props
}: IntendedUsageProps) => {
  const uid = Math.random().toString(36).substring(2, 15);

  // Add the icon dynamically with a style element
  const iconStyle = `
    .${styles["intended-usage"]}#${uid} li:before {
      content: "${icon}";
    }
  `;

  return (
    <div {...props} className={styles["intended-usage"]} id={uid}>
      <style>{iconStyle}</style>
      <div className={styles["intended-usage-title"]}>{sectionTitle}</div>
      {children}
    </div>
  );
};

/** A component that lists what the component being documented is intended to be used like. */
export const BestFor = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => <IntendedUsage sectionTitle="Best For" icon="✅" {...props} />;

/** A component that lists what the component being documented is not intended to be used like. */
export const NotFor = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => <IntendedUsage sectionTitle="Not For" icon="❌" {...props} />;
