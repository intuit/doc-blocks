import React from "react";
import LinkTo from "@storybook/addon-links/react";

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

export interface RelatedComponentsProps {
  /** Stories that are related to this one */
  components: string[];
}

/** A component to list related components */
export const RelatedComponents = (props: RelatedComponentsProps) => (
  <blockquote
    style={{
      margin: "20px 0 40px",
      border: "0 solid #ddd",
      borderWidth: "0 0 0 4px",
      paddingLeft: "20px",
    }}
  >
    <span
      style={{
        fontWeight: "500",
        marginRight: "10px",
      }}
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
