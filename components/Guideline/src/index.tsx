import React from "react";
import { css } from "emotion";
import styled from "@emotion/styled";
import { Element } from "@design-systems/utils";

interface LineProps {
  /** The color of the line */
  color: string;
}

const Line = styled.div<LineProps>`
  width: 100%;
  height: 10px;
  margin-bottom: 8px;
  background-color: ${(props) => props.color};
`;

interface CreateGuidelineProps {
  /** The label for the guideline */
  guidelineLabel: React.ReactNode;
  /** The color of the line */
  color: string;
}

interface GuidelineProps extends Element<"div"> {
  /** The label for the guideline */
  label: React.ReactNode;
}

/** A good thing to do with the component. */
const Guideline = ({
  color,
  guidelineLabel,
  label,
  children,
  ...html
}: GuidelineProps & CreateGuidelineProps) => (
  <div {...html}>
    <div
      className={css`
        border: 1px solid #d4d7dc;
        margin-bottom: 8px;
      `}
    >
      {children}
    </div>

    <Line color={color} />

    <div>
      <strong>{guidelineLabel}: </strong>
      {label}
    </div>
  </div>
);

/** A good thing to do with the component. */
export const Do = (props: GuidelineProps) => (
  <Guideline color="#2ca01c" guidelineLabel="Do" {...props} />
);

/** A bad thing to do with the component. */
export const Dont = (props: GuidelineProps) => (
  <Guideline color="#e43834" guidelineLabel="Don't" {...props} />
);
