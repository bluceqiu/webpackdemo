// 基于node， 使用node的语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let Webpack = require('webpack');
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let PurgeCssWebpackPlugin = require("purgecss-webpack-plugin"); // 删除无用的css代码

const glob = require("glob");
// glob.sync("./**/*", {nodir: true});

module.exports = {
    entry: './src/index.js', // 入口文件, 可以是数组， 同时打包多个没有饮用关系的文件, 还可以是对象
    // entry: { // 多入口配置
    //     index: './src/index.js',
    //     a: './src/a.js'
    // },
    output: {
        // filename: 'build.[hash:8].js', // 多入口 对应  多出口
        // filename: '[name].[hash:8].js', // 多入口 对应  多出口
        // path: path.resolve('./build')
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: '/build',
        port: 8081,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //         use: [
            //             { loader: 'style-loader' }, 
            //             { loader: 'css-loader' }
            //         ]
            // },
            {
                test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'] // 需要将style-loader切换成插件
            }
            // {
            //     test: /\.less$/,use: [
            //         {loader: 'style-loader' }, 
            //         {loader: 'css-loader' },
            //         {loader: 'sass-loader' },
            //         {loader: 'node-sass' },
            //     ]
            // }
        ]
    },
    plugins: [
        // new ExtractTextWebpackPlugin({
        //     filename: 'css/index.css'
        // }),
        new Webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            // filename: 'idx.html', // 指定build 输出多名字
            template: './src/index.html',
            title: 'webpack4.0',
            hash: true,
            // chunks: ['index'] // 插入idx.html 的时候，寻找叫 index 的js 文件
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true,
            // }
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'a.html',
        //     template: './src/a.html',
        //     title: 'webpack4.0',
        //     hash:true,
        //     chunks: ['a']
        //     // minify: {
        //     //     removeAttributeQuotes: true,
        //     //     collapseWhitespace: true,
        //     // }
        // })
        new PurgeCssWebpackPlugin({
            paths: glob.sync("./**/*", {nodir: true})
        })
    ],
    mode: 'development',
    resolve: {},
}