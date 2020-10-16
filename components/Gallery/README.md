# @doc-blocks/gallery

The `Gallery` component lets you easily showcase an example from each on of your components.

## Installation

```sh
npm i @doc-blocks/gallery
# or with yarn
yarn add @doc-blocks/gallery
```

## Usage

### Create the Gallery page

Then create an MDX only story that renders the `Gallery` component.

```md
import { Meta } from '@storybook/addon-docs/blocks';
import { Gallery } from '@doc-blocks/gallery';

<Meta title='Getting Started/Gallery' />

# Gallery

A showcase of frequently-used components.

<Gallery />
```

### Add to webpack

If you want the components to have a description and link to the design spec add the following to your storybook's webpack configuration.

You must provide a function that will gather information about your components that the `Gallery` component uses to create the gallery.
This function should return an array of component specs that have the following data:

- `name` (required)
- `description`
- `type`
- `url`

```js
import { createGallerySpecs } from '@doc-blocks/gallery';

function getSpecs() {
  // Return and array of component specs
  return [{ name: 'Button', description: 'A button to go clicky clicky' }];
}

module.exports = async (config) => {
  config.plugins.push(await createGallerySpecs({ getSpecs }));
  return config;
};
```

## Intuit's `getOverviewSpecs`

This package also includes `getOverviewSpecs` which depends on the way we structure our stories.
This works wonderfully with [`@design-systems/cli`](https://github.com/intuit/design-systems-cli/) and [`@doc-blocks/design-spec`].
If the component follows the structure we define it is automatically included in the `Gallery` without any other configuration.

**Structure:**

1. All of your components are located in a directory named `components/`
2. Each component has a MDX only entry point named `Overview.stories.mdx`

For each `Overview.stories.mdx` that is found `createGallerySpecs` will gather the following information:

- `name` - The name of the component defined in `Meta.title`
- `description` - The first sentence from the component's `README.md`
- `type` - The type of design spec defined in the `DesignSpec` component
- `url` - The url of design spec defined in the `DesignSpec` component

**Example `Overview.stories.mdx`**

```md
import { Meta, Description, Title } from '@storybook/addon-docs/blocks';
import { Version, RelatedComponents, ShieldRow, DesignSpec, BundleSize } from 'storybook-doc-blocks';

import notes from '../../README.md';
import { version } from '../../package.json';
import BadgeDocs from './Badge.mdx';

<Meta title="Components/Badge/Overview" parameters={{ notes }} />

<Title>@cgds/badge</Title>

---

<ShieldRow>
  <Version current={version} url="https://github.intuit.com/design-systems/cgds/tree/master/components/Badge/CHANGELOG.md" />
  <DesignSpec type="figma" url="https://www.figma.com/file/MNGTnmfl5sRHSXoRI19t4D/CGDS---Badges?node-id=0%3A1" />
  <BundleSize size="12.27 kB " />
</ShieldRow>

<RelatedComponents components={['Components/Spinner/Overview']} />

<Description />

<BadgeDocs />
```

Just modify the webpack confuration to use this function:

```js
import { createGallerySpecs, getOverviewSpecs } from '@doc-blocks/gallery';

module.exports = async (config) => {
  config.plugins.push(await createGallerySpecs({ getSpecs: getOverviewSpecs }));
  return config;
};
```
