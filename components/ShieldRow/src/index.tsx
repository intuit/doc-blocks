import React from 'react';
import { Element } from '@design-systems/utils';
import { css } from 'emotion';

/** Render a story in an iframe so it's responsive */
export const ShieldRow = (props: Element<'div'>) => (
  <div
    {...props}
    className={css`
      display: flex;

      > *:not(:last-child) {
        margin-right: 12px;
      }
    `}
  />
);

export default ShieldRow;
