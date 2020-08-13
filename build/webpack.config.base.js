const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            '@assets': path.resolve(__dirname, '../src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader?cacheDirectory=true', // 缓存 loader 的执行结果, 避免从头编译
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? {
                        loader: MiniCssExtractPlugin.loader ,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    } : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    isProduction ? {
                        loader: MiniCssExtractPlugin.loader ,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    } : 'style-loader',                    
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 3*1024, // 3k
                        name: 'assets/images/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(eot|woff|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
                loader: 'url-loader',
                options: {
                    name: 'assets/medias/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new webpack.DefinePlugin({
            CURRENT_ENV: JSON.stringify(process.env.NODE_ENV)
        })
    ]
}