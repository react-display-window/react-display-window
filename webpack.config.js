const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const betterWebpackProgress = require('better-webpack-progress');
const initialMessage = require('initial-app-message');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const checkEnv = require('@drawbotics/check-env');
const dotenv = require('dotenv');


dotenv.config();


const WEBPACK_PORT = 4000;


module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: [ '.js', '.jsx', '.less' ],
    alias: {
      '@root': path.resolve(__dirname, 'app'),
    },
  },
  entry: [
    'modern-normalize/modern-normalize.css',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      APP_ENV: process.env.APP_ENV,
      NODE_ENV: process.env.NODE_ENV,
    }),
    new ProgressPlugin(betterWebpackProgress({
      mode: 'compact',
    })),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: initialMessage(WEBPACK_PORT, [
        ]),
      },
    }),
    new HTMLPlugin({
      filename: 'index.html',
      template: 'app/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.less/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|ico|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: WEBPACK_PORT,
    publicPath: '/',
    inline: true,
    hot: true,
    stats: false,
    quiet: true,
    noInfo: true,
    clientLogLevel: 'none',
    overlay: true,
    historyApiFallback: true,
  },
};
