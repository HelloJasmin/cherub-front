
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const webpack = require("webpack");

process.env.NODE_ENV = 'production';

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
});