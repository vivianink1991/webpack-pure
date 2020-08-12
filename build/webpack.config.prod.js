const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        runtimeChunk: true
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/style/[name].[contenthash:8].css',
            chunkFilename: 'assets/style/[id].[contenthash:8].css'
        })
    ]
})