import React from 'react';
import { Shield } from '@doc-blocks/shield';

interface VersionProps {
  /** The current version */
  current?: string;
  /** Url to the component's changelog */
  url?: string;
}

/** A simple component. */
export const Version = ({ current, url }: VersionProps) => (
  <Shield
    label="version"
    message={`v${current}`}
    color="#2CA01C"
    url={url}
    title="Open component's changelog"
  />
);
