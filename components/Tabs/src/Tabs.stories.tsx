import React from "react";

import { Tabs } from ".";
import notes from "../README.md";

export default {
  title: "Components/Tabs",
  parameters: { notes },
};

export const BasicUsage = () => (
  <Tabs>
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
