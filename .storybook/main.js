// const {
//   addons,
//   stories,
//   webpackFinal
// } = require('@design-systems/storybook/preset');
// const modifyWebpack = require("./webpack.config.js");

// module.exports = {
//   stories,
//   addons,
//   presets: ['@storybook/addon-docs/preset'],
//   webpackFinal: async config => modifyWebpack(await webpackFinal(config))
// };
module.exports = {
  presets: ["@storybook/addon-docs/preset", "@design-systems/storybook/preset"],
};
