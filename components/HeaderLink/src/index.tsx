import React from 'react';
import styled from '@emotion/styled';

/** A space to display links at the top of a story */
export const HeaderLinks = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  & > a {
    color: #1fa7fd;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    line-height: normal;
  }

  & > *:not(:last-child) {
    margin-right: 12px;
  }

  a + a {
    border: solid #ddd;
    border-width: 0 0 0 2px;
    padding-left: 12px;
  }
`;

interface HeaderLinkProps {
  /** Where the link should go */
  to: string;
  /** The text to display for the link */
  children: string;
}

/** A link that points a use towards our designer docs */
export const HeaderLink = ({ to, children }: HeaderLinkProps) => (
  <a target="_blank" rel="noopener noreferrer" href={to}>
    {children}
  </a>
);
