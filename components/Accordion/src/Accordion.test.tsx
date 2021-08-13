import React from "react";
import { render } from "@testing-library/react";
import Accordion from ".";

describe("Accordion", () => {
  test("It matches the snapshot", () => {
    const { container } = render(<Accordion />);
    expect(container).toMatchSnapshot();
  });
});
