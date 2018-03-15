
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPlugin = require("html-webpack-plugin");


const APP = __dirname;
const APP_CONTEXT = '/everest';
module.exports = {
    entry: {
        'index':'./client/index/index.js',
        'admin':'./client/admin/index.js'
    },
    output: {
        path: path.resolve(APP, '/dist'),
        filename: 'public/[name].js',
        publicPath: APP_CONTEXT
    },
    plugins: [
        new CleanWebpackPlugin(['../dist']),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
        new ExtractTextPlugin('public/[name].css'),
        new HtmlWebpackPlugin({ 
            filename:'index.html',
            template:'./client/template.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({ 
            filename:'admin.html',
            template:'./client/template.html',
            chunks: ['admin']
        })
    ],
    module: {
        rules: [
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
                            if (process.env.NODE_ENV.trim() == 'development'){
                                return '[name].[md5:hash:hex:7].[ext]';
                            }
                            return '/public/fonts/[name].[md5:hash:hex:7].[ext]';
                        }
                    }
                },
            }
        ],
    },
};

