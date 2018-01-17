const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src/'),
  devtool: debug ? 'cheap-module-source-map' : false,
  // watch: true,
  cache: true,
  entry: './js/index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread'],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'src/'),
    filename: 'bundle.js',
  },
  plugins: debug ? [] : [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      name: 'vendor',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

