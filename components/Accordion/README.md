# @doc-blocks/accordion

Welcome to my `Accordion` component.

## Installation

```sh
npm i @doc-blocks/accordion
# or with yarn
yarn add @doc-blocks/accordion
```

Then to use the component in your code just import it!

```js
import Accordion from "@doc-blocks/accordion";
// and with css-modules
import "@doc-blocks/accordion/dist/main.css";
```

## Usage

The Accordion component handles all click events internally so all you have to worry about is the content you want to display.
Remember to provide an `id` prop to tie the accordion title to its panel!
Feel free to add whatever classes or styles you want to either `Accordion.Title` or `Accordion.Panel` - they will be applied to the respective DOM elements.
To use the `Accordion`, just do this:

```js
const AccordionInterface = () => (
  <Accordion>
    <Accordion.Title id="happy">Colors that make me happy</Accordion.Title>
    <Accordion.Panel id="happy">
      Black, Burgundy, Maroon, Mahogany
    </Accordion.Panel>
    <Accordion.Title id="angry">Colors that make me angry</Accordion.Title>
    <Accordion.Panel id="angry">Pink, Green, White, Orange</Accordion.Panel>
  </Accordion>
);
```

Or with an `Array.map()`:

```js
const AccordionInterface = () => (
  <Accordion>
    {accordionItems.map((accordion) => (
      <React.Fragment key={accordion.id}>
        <Accordion.Title id={accordion.id}>{accordion.title}</Accordion.Title>
        <Accordion.Panel id={accordion.id}>{accordion.content}</Accordion.Panel>
      </React.Fragment>
    ))}
  </Accordion>
);
```

### onChange Handler

When a user clicks on an Accordion title, the `onChange` handler is called. You can make use of this functionality by adding an `onChange` prop to the `<Accordion>` wrapper like so:

```jsx
const TabbedInterface = () => (
  <Accordion onChange={(selectedId) => console.log(selectedId)}>...</Accordion>
);
```

### Active Class

You can apply an `activeClassName` to each `Accordion.Title` and `Accordion.Panel` component. When that accordion item is selected, the specified classes will be applied.

```jsx
const AccordionInterface = () => (
  <Accordion>
    <Accordion.Title id="happy" activeClassName="selected-title-blue">
      Colors that make me happy
    </Accordion.Title>
    <Accordion.Panel id="happy" activeClassName="selected-panel">
      Black, Burgundy, Maroon, Mahogany
    </Accordion.Panel>
    <Accordion.Title id="angry" activeClassName="selected-title-red">
      Colors that make me angry
    </Accordion.Title>
    <Accordion.Panel id="angry" activeClassName="selected-panel">
      Pink, Green, White, Orange
    </Accordion.Panel>
  </Accordion>
);
```
