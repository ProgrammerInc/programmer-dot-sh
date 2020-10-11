"use strict";

/*
  Reusable Webpack config elements
  Initial goal: avoid config duplication between the main webpack config and the storybook webpack config
*/

const helpers = require("./helpers");

/*
  Tailwind config
*/
const tailwindWebpackRule = {
  test: /\.scss$/,
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    syntax: "postcss-scss",
    plugins: () => [
      require("tailwindcss")(helpers.root("tailwind.config.js")), // We use the helper to ensure that the path is always relative to the workspace root
      require('autoprefixer'),
    ],
  },
};

exports.tailwindWebpackRule = tailwindWebpackRule;
