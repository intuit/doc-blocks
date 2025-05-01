import type { Meta, StoryObj } from "@storybook/react";

import { BundleSize } from "./index";

const meta: Meta<typeof BundleSize> = {
  title: "Shields/Bundle Size",
  component: BundleSize,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    size: "1.2 kB",
  },
};
