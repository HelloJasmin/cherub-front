import path =  require('path');
import ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP = __dirname;
const APP_CONTEXT = '/everest';
const entry = {
  'cherub':'./client/cherub/index.js',
  'admin':'./client/admin/index.js'
}
const output = {
  path: path.resolve(APP, '/dist'),
  filename: 'public/[name].js',
  publicPath: APP_CONTEXT
}

const rules = [
  {
      test: /\.(png|jpg|gif)$/,
      use: {
          loader:'file-loader',
          options: {
              name(file) {
                  if (process.env.NODE_ENV.trim() == 'development'){
                      return '[name].[ext]?[hash]';
                  }
                  return '/public/images/[name].[md5:hash:hex:7].[ext]';
              }
          }
      },
  },
  {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',  
      }),
  },
  {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
      }),
  },
  {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
          { loader: 'babel-loader' },
      ],
  },
  {
      test: /\.(woff|ttf|eot|svg|woff2)/,
      use: {
          loader:'file-loader',
          options: {
              name(file) {
                  if (process.env.NODE_ENV == 'development'){
                      return '[name].[md5:hash:hex:7].[ext]';
                  }
                  return '/public/fonts/[name].[md5:hash:hex:7].[ext]';
              }
          }
      },
  }
]

const port = '3001';
export default {
  entry,

  output,

  module: {
    // rules
  },

  // resolve,

  // resolveLoader,

  devServer: {
    https: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port
  }
}