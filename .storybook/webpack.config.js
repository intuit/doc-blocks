const webpack = require("webpack");
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");
const HtmlWebpackInsertPlugin = require("html-webpack-insert-text-plugin")
  .default;
const { createGallerySpecs } = require("@fattslug/gallery/specs");

function getSpecs() {
  // Return and array of component specs
  return [{ name: "Button", description: "A button to go clicky clicky" }];
}

module.exports = async ({ config, env }) => {
  config.plugins.push(await createGallerySpecs({ specs: getSpecs() }));

  config.plugins.push(
    new HtmlWebpackInsertPlugin([
      {
        target: "iframe.html",
        parent: "head",
        text: fs.readFileSync(path.join(__dirname, "preview-head.html"), {
          encoding: "utf8",
        }),
      },
    ])
  );

  return config;
};
