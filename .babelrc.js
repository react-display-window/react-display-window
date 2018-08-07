module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
    }],
    ["@babel/preset-stage-0", {
      "decoratorsLegacy": true,
    }],
    ["@babel/preset-react"],
  ],
};
