import React from "react";

import { Tabs } from ".";
import notes from "../README.md";

export default {
  title: "Components/Tabs",
  parameters: { notes },
  argTypes: { onChange: { action: "Selected" } },
};

export const BasicUsage = ({
  onChange,
}: {
  onChange: (selectedId: string | null) => void;
}) => (
  <Tabs onChange={(selectedId) => onChange(selectedId)}>
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
