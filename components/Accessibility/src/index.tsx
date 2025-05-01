import { Shield } from "@doc-blocks/shield";
import "@doc-blocks/shield/style.css";

export interface AccessibilityProps {
  /** The current accessibility tag */
  tag?: string;
}

/** A simple component. */
export const Accessibility = ({ tag }: AccessibilityProps) => (
  <Shield label="a11y" message={tag} color="#c9007a" />
);
