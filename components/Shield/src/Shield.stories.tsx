// components/Shield/src/shield.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Shield } from ".";

const meta: Meta<typeof Shield> = {
  title: "Shields/Shield",
  component: Shield,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Shield>;

/**
 * A shield displaying a version number
 */
export const Version: Story = {
  args: {
    label: "version",
    message: "1.0.0",
  },
};

/**
 * A shield with a custom color
 */
export const Accessibility: Story = {
  args: {
    label: "a11y",
    message: "reduced-motion",
    color: "#c9007a",
  },
};

/**
 * A shield with a link
 */
export const Url: Story = {
  args: {
    label: "search",
    message: "google",
    url: "https://google.com",
  },
};
