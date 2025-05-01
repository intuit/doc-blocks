import type { Meta, StoryObj } from "@storybook/react";

import { Version } from ".";
import { version } from "../package.json";

const meta: Meta<typeof Version> = {
  title: "Shields/Version",
  component: Version,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays the current version of the component.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Version>;

export const BasicUsage: Story = {
  args: {
    current: version,
  },
};
