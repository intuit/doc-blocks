interface IntrinsicAttributes {
  children: string;
  key: string;
  kind: string;
  story: string;
}
declare module "@storybook/addon-links/dist/esm/react" {
  export * from "@storybook/addon-links/dist/ts3.9/react";
  export default function LinkTo(attributes: IntrinsicAttributes): null;
}
