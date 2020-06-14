// eslint-disable-next-line
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
  ],
};
// module.exports = {
//   presets: ['@babel/preset-env', '@babel/preset-react'],
//   plugins: ["@babel/plugin-proposal-class-properties"]
// };
