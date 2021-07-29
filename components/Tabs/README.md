# @doc-blocks/tabs

Welcome to my `Tabs` component.

## Installation

```sh
npm i @doc-blocks/tabs
# or with yarn
yarn add @doc-blocks/tabs
```

Then to use the component in your code just import it!

```js
import Tabs from "@doc-blocks/tabs";
// and with css-modules
import "@doc-blocks/tabs/dist/main.css";
```

## Usage

The tabs component is easy peasy to use. It handles all click events internally so all you have to do is worry about the content. Remember to provide an `id` prop to tie the tab title to its content!
Just do this:

```js
const TabbedInterface = () => (
  <Tabs>
    <Tabs.Title id="one">Title 1</Tabs.Title>
    <Tabs.Content id="one">Content for tab 1</Tabs.Content>
    <Tabs.Title id="two">Title 2</Tabs.Title>
    <Tabs.Content id="two">Content for tab 2</Tabs.Content>
  </Tabs>
);
```
