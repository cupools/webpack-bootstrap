'use strict';

var CONFIG = require('./config'),
    utils = require('../lib/utils'),
    webpack = require('webpack'),
    ImgSpritePlugin = require('img-sprite-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var prodConfig = {
    entry: utils.getEntrys(),
    output: {
        path: 'build/',
        filename: utils.name('[name].[hash].js'),
        publicPath: CONFIG.bundle.publicPath || '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            excludes: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url',
            query: {
                name: utils.name('[name].[hash].[ext]', 'image'),
                limit: CONFIG.optimize.limit
            }
        }, {
            test: /\.(ttf)$/,
            loader: 'url',
            query: {
                name: utils.name('[name].[hash].[ext]', 'font')
            }
        }, {
            test: /\.html$/,
            loader: 'html?-minimize&interpolate&root=../../../'
        }]
    },
    plugins: [
        new ImgSpritePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin(utils.name('[name].[contenthash].css')),
        new webpack.optimize.UglifyJsPlugin(CONFIG.optimize.uglifyjs)
    ],
    alias: {},
    externals: {},
    resolve: {},
    stats: {
        colors: true,
        modules: false,
        reasons: true
    }
};

module.exports = prodConfig;