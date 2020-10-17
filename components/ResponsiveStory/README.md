# @doc-blocks/responsive-story

Welcome to my `ResponsiveStory` component.

## Installation

```sh
npm i @doc-blocks/responsive-story
# or with yarn
yarn add @doc-blocks/responsive-story
```

Add the following to your `preview-head.html`.

```html
<link
  rel="stylesheet"
  href="https://marvelapp.github.io/devices.css/assets/devices.min.css"
/>
```

## Usage

Provide the ID of a story to render in a iframe + mock device.

**Example:**

```jsx
import { ResponsiveStory } from "@doc-blocks/responsive-story";

<ResponsiveStory id="components-row--basic-usage" />;
```
