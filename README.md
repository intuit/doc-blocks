<div align="center">
  <h1>doc-blocks</h1>
</div>

> A design system for doc-blocks UI components, built on [@design-systems/cli](https://github.com/intuit/design-systems-cli).

## 👍 Philosophy

This repo contains a collection of components that make writing rich component documentation with `@storybook/addon-docs` a breeze!

## 🚀 Usage

To use a component from this repo you will first need to install the component into your project.

For an example we will try to use the `@doc-blocks/row` component.

```sh
npm i @doc-blocks/row
# or with yarn
yarn add @doc-blocks/row
```

Then to use the component in your code just import it!

```js
import { Row } from '@doc-blocks/row';
```

If you don't want to install all of the different components you can install [`doc-blocks`](./packages/doc-blocks/README.md).

## 🤝 Contributing

To create a new component:

```sh
yarn run create
```

Follow the prompts and you will have a new sub-package for your component!

```sh
# First link the package
yarn
# Then start developing
cd components/<Component Name>
yarn run dev
```

Before submitting a pull request ensure that all of the following work:

1. `yarn build`
2. `yarn lint`
3. `yarn test`

### How to use the `scripts`

Inside the package.json there are a bunch of scripts that this repo uses to run the project in development and to build the project.

Below you can read a description of scripts you should use while developing in this project.

- `yarn dev`: Builds everything and starts a storybook with all components
- `yarn test`: Run `jest` over the test files
- `yarn lint`: Lint all files using `eslint`
- `yarn clean`: Remove all dependencies, build files, and generated files from the project
- `yarn create`: Create a new components withing the repo
- `yarn create:package`: Create a new package withing the repo
- `yarn size`: Determine how your changes effect the size of all sub-packages

#### Package Level `scripts`

Every command works at both the monorepo and package level. The means you can run some script from just the package/component for a faster development experience.

- `yarn dev`: Build any dependency in the monorepo the component depends on, and start a storybook with just the component
- `yarn test`: Test just the component
- `yarn lint`: Lint just the component
- `yarn clean`: Clean the generated files for just the component
- `yarn size`: Determine how your changes effect the size of the component
