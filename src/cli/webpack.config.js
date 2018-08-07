const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const initialMessage = require('initial-app-message');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const figures = require('figures');
const ansiEscapes = require('ansi-escapes');

const babelConfig = require('../../.babelrc');
const rehypePlayground = require('./utils/rehype-playground');


const WEBPACK_PORT = 5000;


module.exports = async ({ runningIn, docName, docDir }) => {
  const { green, grey, bold } = chalk;
  console.log(bold('Starting webpack...'));
  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    stats: 'errors-only',
    resolve: {
      extensions: [ '.js', '.jsx' ],
      alias: {
        'webpack-hot-client/client': path.dirname(require.resolve('webpack-hot-client/client'))
      },
      modules: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(runningIn, 'node_modules'),
      ],
    },
    entry: [
      'modern-normalize/modern-normalize.css',
      path.join(__dirname, '../../app/index.js'),
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
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DOC_PATH: docDir + '/' + docName,
      }),
      new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../../app/index.html'),
      }),
      new ProgressBarPlugin({
        incomplete: grey('─'),
        complete: green('═'),
        format: `${bold('Building')}  :bar  ${green(':percent')} ${grey(figures.arrowRight + ' :msg')}`,
        summary: false,
        customSummary: () => {
          process.stdout.write(ansiEscapes.clearScreen);
          process.stdout.write(initialMessage(WEBPACK_PORT, []).join('\n'));
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [ { loader: 'babel-loader', options: babelConfig } ],
        },
        {
          test: /\.css/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          test: /\.mdx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig,
            },
            {
              loader: '@mdx-js/loader',
              options: {
                hastPlugins: [ rehypePlayground ],
              },
            },
          ],
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