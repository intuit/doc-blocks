import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Row } from ".";

const meta: Meta<typeof Row> = {
  title: "Components/Row",
  component: Row,
  parameters: {
    docs: {
      description: {
        component:
          "The `Row` component makes it simple to lay out any piece of content next to each other.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Row>;

export const BasicUsage: Story = {
  render: () => (
    <Row>
      <div style={{ height: 60, width: "100%", background: "black" }} />
      <div style={{ height: 60, width: "100%", background: "black" }} />
      <div style={{ height: 60, width: "100%", background: "black" }} />
    </Row>
  ),
};

export const LargeText: Story = {
  render: () => (
    <Row type="large-text">
      <div style={{ height: 60, width: "100%", background: "black" }} />
      <div style={{ height: 60, width: "100%", background: "black" }} />
    </Row>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'If you have a story you want to add a bit of context to, you can use the `type="large-text"` prop to add a large text area.',
      },
    },
  },
};

export const WithContent: Story = {
  render: () => (
    <Row type="large-text">
      <div>
        <h1>Title</h1>
        <p>
          Sed mollis elit dictum ligula suscipit, ac luctus quam mattis. Aliquam
          lectus quam, fringilla vel molestie vitae, iaculis suscipit dolor.
          Nulla tristique egestas tortor, eget sollicitudin arcu convallis et.
          Duis placerat nibh justo, nec accumsan metus sollicitudin bibendum.
          Integer gravida elementum dui, at facilisis libero gravida a. Ut
          lobortis justo et quam lobortis tristique. Pellentesque arcu mauris,
          efficitur tempus lorem vitae, condimentum gravida sapien. Pellentesque
          sed accumsan felis, non mollis metus. Mauris sollicitudin facilisis
          gravida. Nulla varius, lacus quis ornare malesuada, dolor magna semper
          turpis, ut placerat mi enim vel leo.
        </p>
      </div>
      <div
        style={{
          height: 200,
          width: "100%",
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Content Preview
      </div>
    </Row>
  ),
  parameters: {
    docs: {
      description: {
        story: "Here is what it looks like with some mock content.",
      },
    },
  },
};
