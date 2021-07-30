import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs } from ".";

const TabStub = () => (
  <Tabs>
    <Tabs.Title id="one">Title 1</Tabs.Title>
    <Tabs.Content id="one">Content 1</Tabs.Content>
    <Tabs.Title id="two">Title 2</Tabs.Title>
    <Tabs.Content id="two">Content 2</Tabs.Content>
  </Tabs>
);

afterEach(cleanup);

describe("Tabs", () => {
  test("It matches the snapshot", () => {
    const { container } = render(<TabStub />);
    expect(container).toMatchSnapshot();
  });

  test("It renders both tabs", () => {
    const { queryByText } = render(<TabStub />);
    expect(queryByText("Title 1")).toBeInTheDocument();
    expect(queryByText("Title 2")).toBeInTheDocument();
  });

  test("It renders first tab content by default", () => {
    const { queryByText } = render(<TabStub />);
    expect(queryByText("Content 1")).toBeInTheDocument();
    expect(queryByText("Content 2")).not.toBeInTheDocument();
  });

  test("It changes tab content when unselected title is clicked", () => {
    const { queryByText } = render(<TabStub />);
    expect(queryByText("Content 2")).not.toBeInTheDocument();

    userEvent.click(screen.getByText("Title 2"));

    expect(queryByText("Content 2")).toBeInTheDocument();
  });

  test("It changes tab content when unselected title is key pressed", () => {
    const { queryByText } = render(<TabStub />);
    expect(queryByText("Content 2")).not.toBeInTheDocument();
    expect(queryByText("Title 2")).not.toHaveClass("selected");

    userEvent.type(screen.getByText("Title 2"), "{space}");

    expect(queryByText("Content 2")).toBeInTheDocument();
  });
});
