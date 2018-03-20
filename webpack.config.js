const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const settings = {
  // The BrowserSync hostname
  host: 'localhost',
  // The port to run BrowserSync's server on
  port: 3333,

  // A target to proxy all BrowserSync requests to.
  // This can be a local web server, Vagrant or a docker container.
  // This is your local/VM WordPress development site.
  proxy: 'http://localhost/wordpress/',

  // If you have your Site URL for WordPress set to anything else other than the proxy address,
  // we need to override all URL. In this example I am overriding my site at http://training-ground.local
  // urlOverride: /training-ground\.local/g
};

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'functions.js',
    path: path.resolve(__dirname, 'assets/scripts'),
  },
  module: {
    rules: [
      // Run JS through Babel Loader before bundling it to `scripts.js`
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'IE 10'],
              },
            }],
          ],
        },
        // Run Sass through loaders before bundling into `style.css`
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        loader: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]),
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
        },
      },
    ],
  },
  plugins: [
    // new BrowserSyncPlugin({
    //   host: settings.host,
    //   port: settings.port,
    //   proxy: settings.proxy,
    //   open: false,
    //   files: [
    //     path.resolve(__dirname, 'assets/**/*'),
    //     path.resolve(__dirname, '**/*.twig'),
    //   ],
    // }),
    new ExtractTextPlugin({
      filename: './../css/style.css',
    }),
    new CleanWebpackPlugin(['assets']),
    new HtmlPlugin({
      filename: path.resolve(__dirname, 'assets/favicons.html'),
      template: path.resolve(__dirname, 'src/templates/favicons.html'),
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    // new StyleLintPlugin({
    //   syntax: 'scss',
    // }),
    // new FaviconsWebpackPlugin({
    //   logo: './logo.png',
    //   inject: false,
    // }),
    new BrotliPlugin({
      test: /\.(js|css)$/,
    }),
  ],
};
