import React from "react";
import { Element } from "@design-systems/utils";

import { css } from "emotion";

interface IntendedUsageProps {
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
}: Element<"div"> & IntendedUsageProps) => (
  <div
    {...props}
    className={css`
      margin: 40px 0;

      ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
      }

      li {
        padding: 5px 0 5px 30px;
        position: relative;
        line-height: 24px;
      }

      li:before {
        content: "${icon}";
        position: absolute;
        left: 0;
        top: 6px;
      }
    `}
  >
    <div
      className={css`
        font-weight: 500;
        margin-bottom: 10px;
        font-size: 24px;
      `}
    >
      {sectionTitle}
    </div>
    {children}
  </div>
);

/** A component that lists what the component being documented is intended to be used like. */
export const BestFor = (props: Element<"div">) => (
  <IntendedUsage sectionTitle="Best For" icon="✅" {...props} />
);

/** A component that lists what the component being documented is not intended to be used like. */
export const NotFor = (props: Element<"div">) => (
  <IntendedUsage sectionTitle="Not For" icon="❌" {...props} />
);
