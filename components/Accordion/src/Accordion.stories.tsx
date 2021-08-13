import React from "react";

import Accordion from ".";
import notes from "../README.md";

export default {
  title: "Components/Accordion",
  parameters: { notes },
};

export const BasicUsage = () => (
  <Accordion>
    <Accordion.Title id="one" activeClassName="test1">
      Title 1
    </Accordion.Title>
    <Accordion.Panel id="one">Panel 1</Accordion.Panel>
    <Accordion.Title id="two" activeClassName="test2">
      Title 2
    </Accordion.Title>
    <Accordion.Panel id="two">Panel 2</Accordion.Panel>
  </Accordion>
);
