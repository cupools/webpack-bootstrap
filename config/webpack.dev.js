'use strict';

var CONFIG = require('./config'),
    utils = require('./utils'),
    webpack = require('webpack');


var devConfig = {
    entry: CONFIG.HMR ? utils.middleware(utils.getDevEntrys(), 'webpack-hot-middleware/client?reload=true', 'webpack/hot/dev-server') : utils.getEntrys(),
    output: {
        path: '/',
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            excludes: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus?sourceMap'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192'
        }, {
            test: /\.html$/,
            loader: 'html?interpolate'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
    alias: CONFIG.alias || {},
    externals: CONFIG.externals || {},
    resolve: {
        root: [process.cwd() + '/node_modules', process.cwd() + '/public']
    },
    devtool: 'cheap-module-eval-source-map'
};

utils.expandPlugins(devConfig);

module.exports = devConfig;