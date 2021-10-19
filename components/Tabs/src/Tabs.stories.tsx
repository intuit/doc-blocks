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
}) => {
  const defaultTab: string | null = React.useMemo(
    () => new URLSearchParams(window.location.search).get("tab"),
    []
  );

  const [activeTab, setActiveTab] = React.useState(defaultTab || undefined);

  return (
    <Tabs
      active={activeTab}
      onChange={(selectedId) => {
        setActiveTab(selectedId);
        onChange(selectedId);
      }}
    >
      <Tabs.Title id="one" activeClassName="test1">
        Title 1
      </Tabs.Title>
      <Tabs.Content id="one">
        You can change the default active tab using a query param -- try it now
        by adding &quot;<b>&tab=two</b>&quot; to the end of the URL in your
        browser!
      </Tabs.Content>
      <Tabs.Title id="two" activeClassName="test2">
        Title 2
      </Tabs.Title>
      <Tabs.Content id="two">Content 2</Tabs.Content>
    </Tabs>
  );
};
