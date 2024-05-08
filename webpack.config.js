const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const terserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] // 配置文件后缀
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(ts|tsx)$/i,
                use: ["ts-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)/i,
                type: 'asset'
            },
            {
                test: /\.js/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '易购',
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || '/')
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new terserWebpackPlugin()]
    },
    devServer: {
        static: './dist',
        host: 'localhost',
        port: '3000',
    }
}