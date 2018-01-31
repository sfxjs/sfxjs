const webpack = require('webpack');
const path = require('path');

module.exports = {

  devtool: 'source-map',

  context: path.resolve(__dirname, './'),

  entry: {
    sfx: './src/index.js',
    test: './test/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'dist/',
    filename: '[name].js',
    library: 'sfxjs',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
