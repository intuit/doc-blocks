const base = require("@design-systems/test/jest.config.base");
const { name } = require("./package.json");

module.exports = {
  ...base,
  name,
  displayName: name,
  setupFiles: [],
  setupFilesAfterEnv: [require.resolve("@testing-library/jest-dom")],
};
