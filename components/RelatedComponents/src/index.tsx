import React from "react";
import LinkTo from "@storybook/addon-links/react";
import { css } from "emotion";

interface KindLinkProps {
  /** Text of the link */
  children: string;
  /** The kind to link to */
  kind: string;
}

/** A link to a story kind */
const KindLink = ({ kind, children }: KindLinkProps) => (
  <LinkTo story={kind}>{children}</LinkTo>
);

interface RelatedComponentsProps {
  /** Stories that are related to this one */
  components: string[];
}

/** A component to list related components */
export const RelatedComponents = (props: RelatedComponentsProps) => (
  <blockquote
    className={css`
      margin: 20px 0 40px;
      border: 0 solid #ddd;
      border-width: 0 0 0 4px;
      padding-left: 20px;
    `}
  >
    <span
      className={css`
        font-weight: 500;
        margin-right: 10px;
      `}
    >
      Related Components:
    </span>
    <span>
      {props.components.map((component, i) => (
        <React.Fragment key={component}>
          <KindLink kind={component}>{component.split("/")[1]}</KindLink>
          {i !== props.components.length - 1 && ", "}
        </React.Fragment>
      ))}
    </span>
  </blockquote>
);
