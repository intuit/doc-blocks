# @doc-blocks/intended-usage

Welcome to my `IntendedUsage` component.

## Installation

```sh
npm i @doc-blocks/intended-usage
# or with yarn
yarn add @doc-blocks/intended-usage
```

## Usage

**Example:**

```jsx
import { BestFor, NotFor } from '@doc-blocks/intended-usage';

<BestFor>
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
</BestFor>

<NotFor>
  <ul>
    <li>four</li>
    <li>five</li>
    <li>six</li>
  </ul>
</NotFor>
```
