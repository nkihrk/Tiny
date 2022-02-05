import * as path from 'path';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

// configs
const config: Configuration = merge(common, {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    clean: true,
    path: path.resolve(__dirname, 'build'),
    library: 'tiny',
    libraryTarget: 'umd',
  },
  plugins: [],
});

export default config;
