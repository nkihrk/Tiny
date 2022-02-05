import * as path from 'path';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// configs
const config: Configuration = merge(common, {
  mode: 'development',
  entry: {
    index: './src/index.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'assets'),
    hot: true,
    compress: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tiny',
      template: path.resolve(__dirname, './assets/template.html'),
      filename: 'index.html',
    }),
  ],
});

export default config;
