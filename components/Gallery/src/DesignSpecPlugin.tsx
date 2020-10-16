import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import webpack from 'webpack';

import { ComponentSpec } from './types';

/** Gather all of the design specs */
export const getOverviewSpecs = async (): Promise<ComponentSpec[]> => {
  const overviews = await glob(
    path.resolve(path.join(__dirname, '../components/**/Overview.stories.mdx'))
  );

  return overviews
    .map((overview) => {
      const contents = fs.readFileSync(overview, { encoding: 'utf-8' });
      const [, componentName] =
        overview.match(/\/components\/([^\\/]+)\//) || [];

      const [, title] =
        contents.match(/title=['"]\S+\/([^\\/]+)\/Overview/) || [];
      const [, type, url] =
        contents.match(/<DesignSpec\s+type="(\S+)"\s+url="(\S+)"/) || [];

      const readMe = fs.readFileSync(
        path.join(__dirname, '../components/', componentName, 'README.md'),
        { encoding: 'utf-8' }
      );
      const [, description] = readMe.match(/# .*\n\n(.*)/m) || [];

      if (!type) {
        if (description) {
          return { name: title, description } as ComponentSpec;
        }

        return;
      }

      return { name: title, type, url, description } as ComponentSpec;
    })
    .filter((spec: ComponentSpec | undefined): spec is ComponentSpec =>
      Boolean(spec)
    );
};

interface DesignSpecsPluginOptions {
  /** A function that gets all of the components spec information for the Gallery to use */
  getSpecs: () => ComponentSpec[] | Promise<ComponentSpec[]>;
}

/** Create the webpack plugin that provides the design specs */
export const createGallerySpecs = async ({
  getSpecs,
}: DesignSpecsPluginOptions) => {
  const designSpecs = await getSpecs();

  return new webpack.DefinePlugin({
    'process.env': {
      DESIGN_SPECS: JSON.stringify(designSpecs),
    },
  });
};
