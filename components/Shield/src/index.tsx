/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { css } from 'emotion';

interface ShieldProps {
  /** The current label */
  label?: string;
  /** The current message */
  message?: string;
  /** The color behind the message */
  color?: string;
  /** A link to open when the shield is clicked */
  url?: string;
  /** A title for the link */
  title?: string;
}

type AnchorProps = JSX.LibraryManagedAttributes<
  'a',
  React.ComponentPropsWithoutRef<'a'>
>;

/** A simple component. */
export const Shield = ({
  label,
  message,
  color = 'orange',
  title,
  url
}: ShieldProps) => {
  const Wrapper = url
    ? (p: AnchorProps) => (
        <a
          {...p}
          href={url}
          title={title}
          target="_blank"
          rel="noopener noreferrer"
        />
      )
    : 'span';

  return (
    <Wrapper
      className={css`
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        width: fit-content;
        font-size: 12px;
        text-decoration: none;
      `}
    >
      <span
        className={css`
          background: gray;
          color: white;
          padding: 4px 6px 4px 8px;
        `}
      >
        {label}
      </span>
      <span
        className={css`
          background: ${color};
          color: white;
          padding: 4px 8px 4px 6px;
        `}
      >
        {message}
      </span>
    </Wrapper>
  );
};

export default Shield;
