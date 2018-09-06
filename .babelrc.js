module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
    }],
    ["@babel/preset-react"],
  ],
  "plugins": [
    "@larsbs/babel-plugin-react-docgen",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-do-expressions",
  ],
};
