const {
  createWebpackConfigForProduction,
} = require('@commercetools-frontend/mc-scripts/webpack');

// Create the default config
const config = createWebpackConfigForProduction();

// Customize the config
config.module.rules = config.module.rules.concat({
  test: /\.scss$/,
  use: [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    require.resolve('sass-loader'),
  ],
});

// Export the config
module.exports = config;
