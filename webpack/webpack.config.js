
const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');

const common = require('./webpack.common.js');


module.exports = merge(common, {
    devtool: 'inline-source-map',
    node: {
        fs: 'empty',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
});