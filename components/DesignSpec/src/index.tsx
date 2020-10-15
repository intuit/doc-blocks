import React from 'react';
import { Shield } from '@doc-blocks/shield';

const typeMap: Record<string, string> = {
  figma: '#a259ff',
  zeplin: '#f69833',
  abstract: '#191a1b'
};

interface DesignSpecProps {
  /** Where the spec came from */
  type: string;
  /** Link to a spec */
  url: string;
}

/** A simple component. */
export const DesignSpec = ({ type, url }: DesignSpecProps) => (
  <Shield
    label="spec"
    title="Open the design spec"
    message={type}
    color={typeMap[type] || typeMap.figma}
    url={url}
  />
);
