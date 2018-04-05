const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InjectAssetsWebpackPlugin = require('inject-assets-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'assets'),
};

const settings = {
  host: 'localhost',
  port: 3333,
  proxy: 'http://localhost/wordpress/',
};


module.exports = {
  entry: {
    main: `${PATHS.src}/scripts/main.js`,
    'service-worker': `${PATHS.src}/service-worker/service-worker.js`,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      // Run JS through Babel Loader before bundling it to `scripts.js`
      {
        test: '/scripts/(\w+).js$/',
        exclude: /node_modules/,
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
        test: /\.svg$/,
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
        filename: `${PATHS.dist}/service-worker.js`,
      },
      [{
        pattern: '{hash}',
        type: 'hash',
      }],
    ),
    new CleanWebpackPlugin(['assets']),
    new ExtractTextPlugin({
      filename: './../css/style.css',
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};

// const scripts = Object.assign({}, config, {
//   entry: {
//     main: `${PATHS.src}/scripts/main.js`,
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'assets'),
//   },
// });


// const serviceWorker = Object.assign({}, config, {
//   entry: {
//     'service-worker': `${PATHS.src}/service-worker/service-worker.js`,
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'assets'),
//   },
// });


