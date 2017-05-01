var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var jquery = require('jquery');
module.exports = {
  entry: {
    'polyfills': './client/polyfills.ts',
    'vendor': './client/vendor.ts',
    'app': './client/main.ts'
  },
  watch: true,
  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
      test: /\.ts$/,
      loaders: [{
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: helpers.root('client', 'tsconfig.json')
        }
      }, 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader:  'file-loader?name=assets/[name].[hash].[ext]'
    }, {
      test: /\.css$/,
      exclude: helpers.root('client', 'app'),
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?sourceMap'
      })
    }, {
      test: /\.css$/,
      include: helpers.root('client', 'app'),
      loader: 'raw-loader'
    }]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)client|client)(\\|\/)linker/,
      helpers.root('./client'), // location of your client
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
};