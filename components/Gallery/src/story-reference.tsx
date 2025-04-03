/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import LinkTo from "@storybook/addon-links/react";
import { hrefTo, navigate } from "@storybook/addon-links";
import { Element } from "@design-systems/utils";

interface StorybookLinkProps extends Element<"a"> {
  /** Story kind to link to */
  kind: string;
  /** Story title to link to */
  story: string;
}

/** Link to a part of storybook using a cgds link */
export const StorybookReference = ({
  kind,
  story,
  style = {},
  ...html
}: StorybookLinkProps) => {
  return (
    // @ts-ignore
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...html}
      // @ts-ignore
      style={{ ...style, textDecoration: "none" }}
      href="_blank"
      onClick={(e) => {
        if (e.metaKey) {
          hrefTo(kind, story).then((resolvedHref: any) => {
            window.open(
              resolvedHref
                .replace("?id=", "?path=/story/")
                .replace("iframe", "index")
                .replace("--", "-")
                .replace("&viewMode=story", "--page")
            );
          });

          return;
        }

        e.preventDefault();
        navigate({ kind, story });
      }}
    />
  );
};

/** Link to a part of storybook using a cgds link */
export const StorybookLink = (props: StorybookLinkProps) => (
  // @ts-ignore
  <LinkTo as={StorybookReference} {...props} />
);
