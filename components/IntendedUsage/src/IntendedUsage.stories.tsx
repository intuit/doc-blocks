import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BestFor, NotFor } from ".";

const meta: Meta = {
  title: "Components/Intended Usage",
  component: BestFor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BestFor>;

export const BestForStory: Story = {
  name: "Best For",
  render: () => (
    <BestFor>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    </BestFor>
  ),
};

export const NotForStory: Story = {
  name: "Not For",
  render: () => (
    <NotFor>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>
          With a really really really really really really really really really
          really really really really really really really really really really
          really really really really really long line
        </li>
      </ul>
    </NotFor>
  ),
};

export const Together: Story = {
  name: "Together",
  render: () => (
    <>
      <BestFor>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </BestFor>
      <NotFor>
        <ul>
          <li>four</li>
          <li>five</li>
          <li>six</li>
        </ul>
      </NotFor>
    </>
  ),
};
