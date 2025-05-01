import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Row } from "@doc-blocks/row";
import "@doc-blocks/row/style.css";

import { Do, Dont } from ".";

const meta: Meta = {
  title: "Components/Guideline",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * The `Do` guideline should show the right way to use the component.
 */
export const DoExample: Story = {
  name: "Do",
  render: () => (
    <Do label="Keep button text to 1-2 words">
      <button>Click me</button>
    </Do>
  ),
};

/**
 * The `Don't` guideline should show the wrong way to use the component.
 */
export const DontExample: Story = {
  name: "Dont",
  render: () => (
    <Dont label="Have buttons with more than 2 words">
      <button>Click me to do the thing that is a</button>
    </Dont>
  ),
};

/**
 * Used with `@doc-blocks/row` you can display a pair of `Do/Don't` on one line.
 */
export const DoAndDontRow: Story = {
  name: "A Row of Do/Dont",
  render: () => (
    <Row>
      <Do label="Keep button text to 1-2 words">
        <button>Click me</button>
      </Do>
      <Dont label="Have buttons with more than 2 words">
        <button>Click me to do the thing that is a</button>
      </Dont>
    </Row>
  ),
};
