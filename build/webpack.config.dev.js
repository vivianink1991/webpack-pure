const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/' 
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        inline: true,
        proxy: { // 解决本地开发跨域问题，也可联调时使用
            '/api': {
                target: 'http://baidu.com'
            }
        },
        before(app, server) { // 可当做mockserver使用
            app.get('/api/mock.json', (req, res) => {
                res.json({custom: 'response'});
            });
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})