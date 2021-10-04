import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Accordion from ".";

const AccordionStub = ({ spy }: { spy?: jest.Mock<any, any> }) => (
  <Accordion onChange={(selectedId) => spy(selectedId)}>
    <Accordion.Title
      id="one"
      activeClassName="title-1-selected"
      className="title-1-default"
    >
      Title 1
    </Accordion.Title>
    <Accordion.Panel
      id="one"
      activeClassName="panel-1-selected"
      className="panel-1-default"
    >
      Panel 1
    </Accordion.Panel>
    <Accordion.Title
      id="two"
      activeClassName="title-2-selected"
      className="title-2-default"
    >
      Title 2
    </Accordion.Title>
    <Accordion.Panel
      id="two"
      activeClassName="panel-2-selected"
      className="panel-2-default"
    >
      Panel 2
    </Accordion.Panel>
  </Accordion>
);

afterEach(cleanup);

describe("Accordion", () => {
  test("It matches the snapshot", () => {
    const { container } = render(<AccordionStub />);
    expect(container).toMatchSnapshot();
  });

  test("It renders all accordions", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Title 1")).toBeInTheDocument();
    expect(queryByText("Title 2")).toBeInTheDocument();
  });

  test("It renders with all accordions collapsed", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
    expect(queryByText("Panel 1")).not.toHaveClass("expanded");
    expect(queryByText("Panel 2")).toHaveClass("collapsed");
    expect(queryByText("Panel 2")).not.toHaveClass("expanded");
  });

  test("It applies the provided className to the accordion title & panel", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Title 1")).toHaveClass("title-1-default");
    expect(queryByText("Panel 1")).toHaveClass("panel-1-default");
  });

  test("It expands and collapses the accordion panel when selected", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
    expect(queryByText("Panel 1")).not.toHaveClass("expanded");

    userEvent.click(screen.getByText("Title 1"));

    expect(queryByText("Panel 1")).toHaveClass("expanded");
    expect(queryByText("Panel 1")).not.toHaveClass("collapsed");

    userEvent.click(screen.getByText("Title 1"));

    expect(queryByText("Panel 1")).not.toHaveClass("expanded");
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
  });

  test("It expands and collapses the accordion panel with keyboard events", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
    expect(queryByText("Panel 1")).not.toHaveClass("expanded");

    userEvent.type(screen.getByText("Title 1"), "{space}");

    expect(queryByText("Panel 1")).toHaveClass("expanded");
    expect(queryByText("Panel 1")).not.toHaveClass("collapsed");

    userEvent.type(screen.getByText("Title 1"), "{space}");

    expect(queryByText("Panel 1")).not.toHaveClass("expanded");
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
  });

  test("It collapses all other panels when another title is selected", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
    expect(queryByText("Panel 1")).not.toHaveClass("expanded");

    userEvent.click(screen.getByText("Title 1"));

    expect(queryByText("Panel 1")).toHaveClass("expanded");
    expect(queryByText("Panel 1")).not.toHaveClass("collapsed");

    userEvent.click(screen.getByText("Title 2"));

    expect(queryByText("Panel 1")).not.toHaveClass("expanded");
    expect(queryByText("Panel 1")).toHaveClass("collapsed");
    expect(queryByText("Panel 2")).not.toHaveClass("collapsed");
    expect(queryByText("Panel 2")).toHaveClass("expanded");
  });

  test("It toggles the activeClassName to the selected accordion title & panel", () => {
    const { queryByText } = render(<AccordionStub />);
    expect(queryByText("Title 1")).not.toHaveClass("title-1-selected");
    expect(queryByText("Panel 1")).not.toHaveClass("panel-1-selected");

    userEvent.click(screen.getByText("Title 1"));

    expect(queryByText("Title 1")).toHaveClass("title-1-selected");
    expect(queryByText("Panel 1")).toHaveClass("panel-1-selected");

    userEvent.click(screen.getByText("Title 1"));

    expect(queryByText("Title 1")).not.toHaveClass("title-1-selected");
    expect(queryByText("Panel 1")).not.toHaveClass("panel-1-selected");
  });

  test("It calls onChange when a tab is clicked", () => {
    const spy = jest.fn();
    const { queryByText } = render(<AccordionStub spy={spy} />);
    expect(queryByText("Title 1")).toBeInTheDocument();
    expect(queryByText("Title 2")).toBeInTheDocument();

    userEvent.click(screen.getByText("Title 2"));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("two");
  });
});
