const path = require('path');
const webpack = require('webpack');


const DEV_MODE = process.env.NODE_ENV === 'development';


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: DEV_MODE ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rdw.js',
    sourceMapFilename: 'rdw.js.map',
    library: 'rdw',
    libraryTarget: 'umd',
  },
  externals: [
    'react',
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [ path.resolve(__dirname, 'src') ],
        use: [ 'babel-loader' ],
      },
    ],
  },
};
