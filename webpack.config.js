const path = require('path');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    sfx: ['babel-polyfill', './js/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'dist/',
    filename: '[name].js',
  },

  devServer: {
    contentBase: './',
    historyApiFallback: true,
    inline: true,
    port: 9000
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [[
            'env', {
              useBuiltIns: true
            }
          ]]
        }
      }]
    }]
  },

  plugins: [
    new BrowserSyncPlugin({
      // See https://browsersync.io/docs/options/ for options
      host: 'localhost',
      port: 3000, // browsersync port (default)
      historyApiFallback: true,
      proxy: 'http://localhost:9000/', // our webpack server
      open: false // do not open browser automatically
    })
  ]
};
