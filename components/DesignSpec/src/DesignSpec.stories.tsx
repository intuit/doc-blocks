import type { Meta, StoryObj } from "@storybook/react";

import { DesignSpec } from ".";

const meta: Meta<typeof DesignSpec> = {
  title: "Shields/Design Spec",
  component: DesignSpec,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DesignSpec>;

export const BasicUsage: Story = {
  args: {
    type: "figma",
    url: "http://figma.com/",
  },
};
