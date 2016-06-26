var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var version = require('../package.json').version;
var config = require('../src/server/config');

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

var IS_PRO = config.IS_PRO;
var filename = IS_PRO ? (version + '/[name]-' + version) : '[name]';

module.exports = {
  entry: {
    vendors: ['vue', 'whatwg-fetch', 'promise'],
    app: IS_PRO ? ['./src/client/index.js'] : [
      'webpack-hot-middleware/client?path=http://localhost:' + config.port + '/__webpack_hmr',
      './src/client/index.js',
    ],
  },
  output: {
    path: path.resolve(IS_PRO ? 'dist/client' : 'src/client'),
    publicPath: config.publicPath,
    filename: filename + '.js',
  },
  resolveLoader: {
    root: path.resolve('node_modules'),
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.resolve('src/client'),
        ],
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src/client'),
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          name: filename + '.[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(xlsx|woff|woff2|eot(\?#iefix)?|ttf|svg\?#iconfont)$/i,
        loader: 'file-loader',
        query: {
          name: filename + '.[ext]',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: IS_PRO ? null : 'eval-source-map',
  eslint: {
    formatter: require('eslint-friendly-formatter'),
  },
  postcss: function () {
    return [require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }), require('precss')];
  },
  vue: {
    loaders: {
      js: 'babel-loader!eslint-loader?`{rules:{eol-last:0}}`',
      sass: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + config.ENV + '"',
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin(filename + '.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: filename + '.js',
    }),
  ].concat(IS_PRO ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'handlebars!src/server/views/index.html',
      filename: path.resolve('dist/server/views/index.html'),
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
  ]),
};
