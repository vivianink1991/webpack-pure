const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                include: path.resolve(__dirname, './src')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}