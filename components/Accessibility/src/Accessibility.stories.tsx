import type { Meta, StoryObj } from "@storybook/react";

import { Accessibility } from "./index";

const meta: Meta<typeof Accessibility> = {
  title: "Shields/Accessibility",
  component: Accessibility,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    tag: "a11y",
  },
};
