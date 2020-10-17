import React from "react";
import * as dsPreview from "@design-systems/storybook/preview";

const compare = (order) => (a, b) => {
  let first = order.findIndex((str) => str === a.toLowerCase());
  let second = order.findIndex((str) => str === b.toLowerCase());

  if (first === -1) first = order.length;
  if (second === -1) second = order.length;

  return first < second ? -1 : second < first ? 1 : 0;
};

const sectionOrder = ["gallery", "examples", "components"];

const sectionCompare = compare(sectionOrder);

export const decorators = dsPreview.decorators;

export const parameters = {
  ...dsPreview.parameters,
  options: {
    storySort: ([, a], [, b]) => {
      const [aSection, aComponent] = a.kind.split("/");
      const [bSection, bComponent] = b.kind.split("/");

      if (aSection === bSection) {
        // Sort components alphabetically
        return aComponent.localeCompare(bComponent);
      }

      // Sort sections according to order defined above
      return sectionCompare(aSection, bSection);
    },
  },
};
