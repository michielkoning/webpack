const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InjectAssetsWebpackPlugin = require('inject-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'assets'),
};

const settings = {
  host: 'localhost',
  port: 3333,
  proxy: 'http://localhost/site/',
};

module.exports = {
  entry: {
    main: `${PATHS.src}/scripts/main.js`,
    assets: `${PATHS.src}/scripts/assets.js`,
    'service-worker': `${PATHS.src}/service-worker/service-worker.js`,
  },
  output: {
    filename: '[name].js',
    path: `${PATHS.dist}/scripts`,
  },
  resolve: {
    alias: {
      sass: `${PATHS.src}/sass/`,
      favicons: `${PATHS.src}/favicons/`,
      icons: `${PATHS.src}/icons/`,
    },
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      // Run JS through Babel Loader before bundling it to `scripts.js`
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /service-worker/,
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', {
              modules: false, // nodig voor threeshaking
              targets: {
                browsers: ['last 2 versions', 'IE 11'],
              },
            }],
          ],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(svg|png|ico|xml|json|webmanifest)$/,
        loader: 'file-loader',
        include: /favicons/,
        options: {
          name: '[name].[ext]',
          outputPath: './../favicons',
        },
      },
      {
        test: /\.svg$/,
        exclude: /favicons/, // dit moet eigenlijk gewoon een regex worden
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: './../icons/icons.svg',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['assets']),
    // new BrowserSyncPlugin({
    //   host: settings.host,
    //   port: settings.port,
    //   proxy: settings.proxy,
    //   open: false,
    //   files: [
    //     `${PATHS.dist}assets/**/*`,
    //     './**/*.twig',
    //   ],
    // }),
    new InjectAssetsWebpackPlugin(
      {
        filename: `${PATHS.dist}/scripts/service-worker.js`,
      },
      [{
        pattern: '{hash}',
        type: 'hash',
      }],
    ),
    new StyleLintPlugin(),
    new ExtractTextPlugin({
      filename: './../css/style.css',
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};
