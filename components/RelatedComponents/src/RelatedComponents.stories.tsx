import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RelatedComponents } from ".";

const meta: Meta<typeof RelatedComponents> = {
  title: "Components/Related Components",
  component: RelatedComponents,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (args) => (
    <RelatedComponents components={args.components} {...args} />
  ),
  args: {
    components: ["Components/Responsive Story", "Components/Row"],
  },
};
