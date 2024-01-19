import React from "react";
import { Shield } from "@amalik2/shield";

interface AccessibilityProps {
  /** The current accessibility tag */
  tag?: string;
}

/** A simple component. */
export const Accessibility = ({ tag }: AccessibilityProps) => (
  <Shield label="a11y" message={tag} color="#c9007a" />
);
