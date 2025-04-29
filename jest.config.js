const base = require("@design-systems/test/jest.config.base");

module.exports = {
  ...base,
  roots: ["<rootDir>/components/", "<rootDir>/packages/"],
  coverageDirectory: "<rootDir>/coverage/",
  setupFiles: [],
  setupFilesAfterEnv: [require.resolve("@testing-library/jest-dom")],
};
