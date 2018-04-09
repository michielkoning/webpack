const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    concatenateModules: true,
    nodeEnv: 'production',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        enforce: 'pre',
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        }),

      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BrotliPlugin({
      test: /\.(js|css)$/,
    }),
  ],
});
