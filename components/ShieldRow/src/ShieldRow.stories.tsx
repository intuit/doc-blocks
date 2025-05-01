import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accessibility } from "@doc-blocks/accessibility";
import { DesignSpec } from "@doc-blocks/design-spec";
import { Version } from "@doc-blocks/version";
import "@doc-blocks/shield/style.css";

import { ShieldRow } from ".";

const meta: Meta<typeof ShieldRow> = {
  title: "Shields/ShieldRow",
  component: ShieldRow,
  parameters: {
    // You can keep notes as part of the docs description or in parameters
    docs: {
      description: {
        component: "Use to display a row of shields.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShieldRow>;

/**
 * Basic usage example of the ShieldRow component
 */
export const BasicUsage: Story = {
  render: () => (
    <ShieldRow>
      <Version current="1.0.0" />
      <DesignSpec type="abstract" url="http://abstract.com/" />
      <Accessibility tag="reduced-motion" />
    </ShieldRow>
  ),
};
