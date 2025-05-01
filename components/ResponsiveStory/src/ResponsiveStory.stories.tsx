import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ResponsiveStory } from ".";

const meta: Meta<typeof ResponsiveStory> = {
  title: "Components/Responsive Story",
  component: ResponsiveStory,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `The \`ResponsiveStory\` lets you render any story in an \`iframe\` with a fancy device wrapper.
Since it is in an \`iframe\` all of the media queries work and your component will actually render at that screen size.
It will also display the source for the story you are documenting.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveStory>;

/**
 * Basic example of the ResponsiveStory component.
 */
export const BasicUsage: Story = {
  args: {
    id: "components-row--basic-usage",
  },
};

/**
 * Example with a label for additional context.
 */
export const WithLabel: Story = {
  args: {
    id: "components-row--basic-usage",
    label: "A label for the story",
  },
};

/**
 * Examples showing different device options.
 */
export const Devices: Story = {
  render: () => (
    <div>
      <ResponsiveStory id="components-row--basic-usage" />
      <ResponsiveStory id="components-row--basic-usage" device="iPad" />
      <ResponsiveStory id="components-row--basic-usage" device="mac" />
    </div>
  ),
};

/**
 * Let the user choose which device to render on.
 */
export const ChooseDevice: Story = {
  args: {
    id: "components-row--basic-usage",
    device: "choose",
  },
};

/**
 * Different alignment options for the device.
 */
export const Align: Story = {
  render: () => (
    <div>
      <ResponsiveStory id="components-row--basic-usage" />
      <ResponsiveStory id="components-row--basic-usage" align="center" />
      <ResponsiveStory id="components-row--basic-usage" align="end" />
    </div>
  ),
};

/**
 * Examples showing only portions of the device.
 */
export const TopOrBottom: Story = {
  render: () => (
    <div>
      <ResponsiveStory id="components-row--basic-usage" top={200} />
      <ResponsiveStory id="components-row--basic-usage" bottom={200} />
    </div>
  ),
};

/**
 * Examples showing devices in landscape mode.
 */
export const RotateMobile: Story = {
  render: () => (
    <div>
      <ResponsiveStory isLandscape id="components-row--basic-usage" />
      <ResponsiveStory
        isLandscape
        id="components-row--basic-usage"
        device="iPad"
      />
    </div>
  ),
};

/**
 * Example showing customized header colors.
 */
export const MobileHeader: Story = {
  args: {
    id: "components-row--basic-usage",
    headerColor: "black",
    headerText: "white",
  },
};

/**
 * Example showing device with custom screen styles.
 */
export const DeviceStyles: Story = {
  args: {
    id: "components-row--basic-usage",
    headerColor: "black",
    headerText: "white",
    screenStyles: { paddingTop: 20 },
  },
};

/**
 * Inline example story for demonstrating a simple button.
 */
export const Test: Story = {
  render: () => <button>foo</button>,
};

/**
 * Example showing how to reference an inline story.
 */
export const InlineReference: Story = {
  render: () => (
    <ResponsiveStory
      id="components-responsive-story--test"
      headerColor="black"
      headerText="white"
    />
  ),
};
