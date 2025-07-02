import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { Tabs, TabsProps } from ".";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  args: { onChange: fn() },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TabsDemo = (args: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>();

  return (
    <Tabs
      active={activeTab}
      onChange={(selectedId) => {
        setActiveTab(selectedId);
        args.onChange?.(selectedId);
      }}
    >
      <Tabs.Title id="one" activeClassName="test1">
        Title 1
      </Tabs.Title>
      <Tabs.Content id="one">Content 1</Tabs.Content>
      <Tabs.Title id="two" activeClassName="test2">
        Title 2
      </Tabs.Title>
      <Tabs.Content id="two">Content 2</Tabs.Content>
    </Tabs>
  );
};

export const BasicUsage: Story = {
  render: (args) => <TabsDemo {...args} />,
};
