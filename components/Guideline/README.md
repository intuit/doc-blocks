# @doc-blocks/guideline

Welcome to my `Guideline` component.

## Installation

```sh
npm i @doc-blocks/guideline
# or with yarn
yarn add @doc-blocks/guideline
```

## Usage

To use this component simply provide a label and some jsx to render.

**Example:**

```jsx
import { Do, Dont } from '@doc-blocks/guideline';


<Do label="Keep button text to 1-2 words">
  <Button>Click me</Button>
</Do>

<Dont label="Have buttons with more than 2 words">
  <Button>Click me to do the thing that is a</Button>
</Dont>
```
