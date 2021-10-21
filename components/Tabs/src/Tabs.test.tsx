import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs } from ".";

const TabStub = ({
  spy,
  active,
}: {
  spy?: jest.Mock<any, any>;
  active?: string;
}) => (
  <Tabs
    active={active || undefined}
    data-testid="tabsWrapper"
    className="tabs-wrapper"
    onChange={(selectedId) => spy && spy(selectedId)}
  >
    <Tabs.Title
      id="one"
      activeClassName="title-1-selected"
      className="title-1-default"
    >
      Title 1
    </Tabs.Title>
    <Tabs.Content id="one">Content 1</Tabs.Content>
    <Tabs.Title
      id="two"
      activeClassName="title-2-selected"
      className="title-2-default"
    >
      Title 2
    </Tabs.Title>
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
    const { queryByTestId } = render(<TabStub />);
    expect(queryByText("Content 2")).not.toBeInTheDocument();

    userEvent.type(screen.getByText("Title 2"), "{space}");

    expect(queryByText("Content 2")).toBeInTheDocument();
  });

  test("It applies the activeClassName to the currently selected title", () => {
    const { queryByText } = render(<TabStub />);
    expect(queryByText("Title 2")).toHaveClass("title-2-default");
    expect(queryByText("Title 2")).not.toHaveClass("title-2-selected");
    expect(queryByText("Title 1")).toHaveClass("title-1-selected");
    expect(queryByText("Title 1")).toHaveClass("title-1-default");

    userEvent.click(screen.getByText("Title 2"));

    expect(queryByText("Title 2")).toHaveClass("title-2-selected");
    expect(queryByText("Title 2")).toHaveClass("title-2-default");
    expect(queryByText("Title 1")).toHaveClass("title-1-default");
    expect(queryByText("Title 1")).not.toHaveClass("title-1-selected");
  });

  test("It calls onChange when a tab is clicked", () => {
    const spy = jest.fn();
    const { queryByText } = render(<TabStub spy={spy} />);
    expect(queryByText("Title 1")).toBeInTheDocument();
    expect(queryByText("Title 2")).toBeInTheDocument();

    userEvent.click(screen.getByText("Title 2"));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("two");
  });

  test("It sets initial tab state based on active prop", () => {
    const { queryByText } = render(<TabStub active="two" />);
    expect(queryByText("Content 2")).toBeInTheDocument();
    expect(queryByText("Content 1")).not.toBeInTheDocument();
  });

  test("It applies tabs wrapper class name", () => {
    const { queryByTestId } = render(<TabStub />);
    expect(queryByTestId("tabsWrapper")).toHaveClass("tabs-wrapper");
  });
});
