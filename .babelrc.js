module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "modules": false,
    }],
    ["@babel/preset-stage-0", {
      "decoratorsLegacy": true,
    }],
    ["@babel/preset-react"],
  ],
  "env": {
    "node": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    },
  },
};
