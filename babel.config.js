const { LIBRARY_OUTPUT } = process.env;

module.exports = (api) => {
  /* 
    alternatively, you can utilize api.env() to get the current NODE_ENV:
    const inProduction = api.env("production");
    const inDevevelopment = api.env("development");

    if using api.env(), then these must be defined before invoking the cache
  */
  api.cache.using(() => LIBRARY_OUTPUT);

  if (LIBRARY_OUTPUT === 'es6') {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
    };
  } else {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
            modules: 'umd',
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
    };
  }
};

// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         modules: false,
//       },
//     ],
//     '@babel/preset-react',
//   ],
//   plugins: [
//     '@babel/plugin-proposal-class-properties',
//     '@babel/plugin-transform-runtime',
//   ],
// };
// module.exports = {
//   presets: ['@babel/preset-env', '@babel/preset-react'],
//   plugins: ["@babel/plugin-proposal-class-properties"]
// };
