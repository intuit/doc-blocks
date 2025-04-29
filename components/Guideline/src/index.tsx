import React from "react";

interface LineProps {
  /** The color of the line */
  color: string;
}

/** A line */
const Line = ({ color }: LineProps) => (
  <div
    style={{
      width: "100%",
      height: "10px",
      marginBottom: "8px",
      backgroundColor: color,
    }}
  />
);

export interface CreateGuidelineProps {
  /** The label for the guideline */
  guidelineLabel: React.ReactNode;
  /** The color of the line */
  color: string;
}

export interface GuidelineProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
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
      style={{
        border: "1px solid #d4d7dc",
        marginBottom: "8px",
      }}
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
