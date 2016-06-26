var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var version = require('./package.json').version;

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

var NODE_ENV = process.env.NODE_ENV;
var IS_PRO = NODE_ENV === 'production';
var filename = IS_PRO ? (version + '/[name]-' + version) : '[name]';

module.exports = {
  entry: {
    vendors: ['vue', 'whatwg-fetch', 'promise'],
    client: IS_PRO ? ['./src/client/index.js'] : [
      'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
      './src/client/index.js',
    ],
  },
  output: {
    path: path.resolve(IS_PRO ? './dist/client' : './src/client'),
    publicPath: '/',
    filename: filename + '.js',
  },
  resolveLoader: {
    root: path.resolve('./node_modules'),
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.resolve('./src/client'),
        ],
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('./src/client'),
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader?root=./src/client/',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
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
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + NODE_ENV + '"',
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
      template: 'handlebars!./src/server/views/index.html',
      filename: path.resolve('./dist/server/views/index.html'),
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
  ]),
};
