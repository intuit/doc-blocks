import React from "react";
import { Shield } from "@doc-blocks/shield";
import "@doc-blocks/shield/style.css";

export interface BundleSizeProps {
  /** The current BundleSize */
  size: string;
}

/** A simple component. */
export const BundleSize = ({ size }: BundleSizeProps) => (
  <Shield label="size" message={size} color="#0077C5" />
);
