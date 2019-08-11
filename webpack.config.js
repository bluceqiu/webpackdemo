// 基于node， 使用node的语法
let Path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let Webpack = require('webpack');
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // 入口文件, 可以是数组， 同时打包多个没有饮用关系的文件, 还可以是对象
    // entry: { // 多入口配置
    //     index: './src/index.js',
    //     a: './src/a.js'
    // },
    output: {
        path: Path.resolve('./build'),
        filename: 'build.[hash:8].js', // 多入口 对应  多出口
        // filename: '[name].[hash:8].js', // 多入口 对应  多出口
    },
    devServer: {
        contentBase: '/build',
        // contentBase: Path.join(__dirname, 'build'),
        port: 8081,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                    use: [
                        { loader: 'style-loader' }, 
                        { loader: 'css-loader' }
                    ]
            },
            {
                test: /\.less$/,use: [
                    {loader: 'style-loader' }, 
                    {loader: 'css-loader' },
                    {loader: 'sass-loader' },
                    {loader: 'node-sass' },
                ]
            }
        ]
    },
    plugins: [
        // new ExtractTextWebpackPlugin({
        //     filename: 'css/index.css'
        // }),
        new Webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
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
    ],
    resolve: {},
}