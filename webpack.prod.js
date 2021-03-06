const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'assets'),
};

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
    new HtmlCriticalPlugin({
      src: 'https://adler.michielkoning.nl/',
      dest: `${PATHS.dist}/css/critical.css`,
      minify: true,
      width: 1920,
      height: 1080,
    }),
  ],
});
