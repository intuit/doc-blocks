# @doc-blocks/version

Welcome to my `Version` component.

## Installation

```sh
npm i @doc-blocks/version
# or with yarn
yarn add @doc-blocks/version
```

## Usage

**Example:**

```jsx
import { Version } from "@fattslug/version";
import { version } from "../package.json";

<Version current={version} url="link to changelog" />;
```
