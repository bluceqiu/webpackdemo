// 基于node， 使用node的语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let Webpack = require('webpack');
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let PurgeCssWebpackPlugin = require("purgecss-webpack-plugin"); // 删除无用的css代码
const glob = require("glob");

const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
const cdnConfig = require('./cdn.config');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    // entry: './src/index.js', // 入口文件, 可以是数组， 同时打包多个没有饮用关系的文件, 还可以是对象
    entry: { // 多入口配置
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        // filename: 'build.[hash:8].js', // 多入口 对应  多出口
        filename: '[name].[hash:8].js', // 多入口 对应  多出口
        // path: path.resolve('./build')
        // filename: 'bundle.js',
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
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it uses publicPath in webpackOptions.output
                          publicPath: '../',
                          hmr: process.env.NODE_ENV === 'development',
                        },
                      }, 'css-loader'] // 需要将style-loader切换成插件
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
        // new Webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new HtmlWebpackPlugin({
            filename: 'first.html', // 指定build 输出多名字
            template: './src/index.html',
            title: 'webpack4.0',
            hash: true,
            chunks: ['index'], // 插入idx.html 的时候，寻找叫 index 的js 文件
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: false,
                collapseBooleanAttributes: true
            },
            inject: true, // add cdn set option
        }),
        new HtmlWebpackPlugin({
            filename: 'second.html', // 指定build 输出多名字
            template: './src/index.html',
            title: 'webpack4.0',
            hash: true,
            chunks: ['a'], // 插入idx.html 的时候，寻找叫 index 的js 文件
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: false,
                collapseBooleanAttributes: true
            },
            inject: true, // add cdn set option
        }),
        new AddAssetHtmlCdnWebpackPlugin(true, cdnConfig),
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
        // new PurgeCssWebpackPlugin({
        //     paths: glob.sync("./**/*", {nodir: true})
        // })
        new PurgeCssWebpackPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }), // 这里的PATHS.src 不能是 ./**/*,   打包会卡死不动
        }),
    ],
    mode: 'development',
    resolve: {},
}