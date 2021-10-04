import React from "react";

import Accordion from ".";
import notes from "../README.md";

export default {
  title: "Components/Accordion",
  parameters: { notes },
  argTypes: { onChange: { action: "Selected" } },
};

export const BasicUsage = ({
  onChange,
}: {
  onChange: (selectedId: string | null) => void;
}) => (
  <Accordion onChange={(selectedId) => onChange(selectedId)}>
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

const Chevron = ({ style }: { style: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    style={style}
  >
    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

export const WithIndicators = ({
  onChange,
}: {
  onChange: (selectedId: string | null) => void;
}) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <Accordion
      onChange={(selected) => {
        onChange(selected);
        setSelectedId(selected);
      }}
    >
      <Accordion.Title id="one">
        <div
          style={{
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <Chevron
            style={{
              transition: "all 0.2s ease",
              transform:
                (selectedId === "one" && "rotate(0.25turn)") || "rotate(0)",
            }}
          />
        </div>
        Title 1
      </Accordion.Title>
      <Accordion.Panel id="one">Panel 1</Accordion.Panel>
      <Accordion.Title id="two">
        <div
          style={{
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <Chevron
            style={{
              transition: "all 0.2s ease",
              transform:
                (selectedId === "two" && "rotate(0.25turn)") || "rotate(0)",
            }}
          />
        </div>
        Title 2
      </Accordion.Title>
      <Accordion.Panel id="two">Panel 2</Accordion.Panel>
    </Accordion>
  );
};
