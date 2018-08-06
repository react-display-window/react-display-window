const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const betterWebpackProgress = require('better-webpack-progress');
const initialMessage = require('initial-app-message');

const babelConfig = require('./.babelrc.js');


const WEBPACK_PORT = 5000;


module.exports = async ({ runningIn, docName, docDir }) => {
  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    stats: 'errors-only',
    resolve: {
      extensions: [ '.js', '.jsx', '.less' ],
      alias: {
        '~': path.resolve(__dirname, 'app'),
        'webpack-hot-client/client': path.dirname(require.resolve('webpack-hot-client/client'))
      },
      modules: [
        'node_modules',
      ],
    },
    entry: [
      path.join(__dirname, './app/index.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'rdw.js',
      sourceMapFilename: 'rdw.js.map',
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new ProgressPlugin(betterWebpackProgress({ mode: 'compact' })),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DOC_PATH: docDir + '/' + docName,
      }),
      new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './app/index.html'),
      }),
      // new FriendlyErrorsWebpackPlugin({
      //   clearConsole: true,
      //   compilationSuccessInfo: {
      //     messages: initialMessage(WEBPACK_PORT, [
      //     ]),
      //   },
      // }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [ { loader: 'babel-loader', options: babelConfig } ],
        },
        {
          test: /\.mdx?$/,
          exclude: /node_modules/,
          use: [ { loader: 'babel-loader', options: babelConfig }, '@mdx-js/loader' ],
        },
      ],
    },
    serve: {
      host: '0.0.0.0',
      port: WEBPACK_PORT,
      logLevel: 'error',
      stats: 'errors-only',
      devMiddleware: {
        logLevel: 'error',
      },
      hotClient: {
        logLevel: 'error',
      },
    },
  };
};
