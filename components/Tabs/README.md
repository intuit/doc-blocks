# @doc-blocks/tabs

Use to display a set of tabs for your docs.

## Installation

```sh
npm i @doc-blocks/tabs
# or with yarn
yarn add @doc-blocks/tabs
```

Then to use the component in your code just import it!

```js
import { Tabs } from "@doc-blocks/tabs";
// and with css-modules
import "@doc-blocks/tabs/dist/main.css";
```

## Usage

The `Tabs` component handles all state-related logic internally by default, meaning you get all basic tabs functionality out of the box. Remember to provide an `id` prop to tie the tab title to its content!
Feel free to add whatever classes or styles you want to any of the `Tabs.x` components - they'll be passed down to the div element.
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

Or with an `Array.map()`:

```jsx
const TabbedInterface = () => (
  <Tabs>
    {tabs.map((tab) => (
      <React.Fragment key={tab.id}>
        <Tabs.Title id="one">{tab.title}</Tabs.Title>
        <Tabs.Content id="one">{tab.content}</Tabs.Content>
      </React.Fragment>
    ))}
  </Tabs>
);
```

### State Handling

By default, all state is handled internally by the `Tabs` component.
If you'd like to further customize this behavior (e.g. change the default active tab), you can provide an `active` prop to the `Tabs` component. You will then have to manage the state outside of the tabs component using the `onChange` event. Like so:

```jsx
const ExampleDocs = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const [activeId, setActiveId] = React.useState(queryParams.get("default"));

  return (
    <Tabs active={activeId || undefined} onChange={setActiveId}>
      <Tabs.Title id="one">Title 1</Tabs.Title>
      <Tabs.Content id="one">Content for tab 1</Tabs.Content>
      <Tabs.Title id="two">Title 2</Tabs.Title>
      <Tabs.Content id="two">Content for tab 2</Tabs.Content>
    </Tabs>
  );
};
```

### onChange Handler

When a user clicks on a Tab, the `onChange` handler is called. You can make use of this functionality by adding an `onChange` prop to the `<Tabs>` wrapper like so:

```jsx
const TabbedInterface = () => (
  <Tabs onChange={(selectedId) => console.log(selectedId)}>...</Tabs>
);
```

### Active Class

You can apply an `activeClassName` to each `Tabs.Title` component. When that title is selected, the specified className will be applied.

```jsx
const TabbedInterface = () => (
  <Tabs>
    <Tabs.Title id="one" activeClassName={styles.blueBackground}>
      Title 1
    </Tabs.Title>
    <Tabs.Content id="one">Content for tab 1</Tabs.Content>
    <Tabs.Title id="two" activeClassName={styles.redBackground}>
      Title 2
    </Tabs.Title>
    <Tabs.Content id="two">Content for tab 2</Tabs.Content>
  </Tabs>
);
```

### Class Names

`className` props provided to any `Tab` component will be passed down to the render element.

A `className` provided to the `Tabs` component will be added to the `div` element which wraps the tab title group.
A `className` provided to the `Tabs.Title` component will be added to the `div` element which wraps an individual tab title.
A `className` provided to the `Tabs.Content` component will be added to the `div` element which wraps the tab content.
