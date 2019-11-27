// 基于node， 使用node的语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次build 都删除dist目录
let Webpack = require('webpack');
// let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let PurgeCssWebpackPlugin = require("purgecss-webpack-plugin"); // 删除无用的css代码
const glob = require("glob");

const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
const cdnConfig = require('./cdn.config');

const DllReferencePlugin = require('webpack').DllReferencePlugin;
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
    src: path.join(__dirname, 'src')
}


// console.log("***", process.env);
module.exports = {
    // mode: process.env,
    // entry: './src/index.js', // 入口文件, 可以是数组， 同时打包多个没有饮用关系的文件, 还可以是对象
    entry: { // 多入口配置
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        // filename: 'build.[hash:8].js', // 多入口 对应  多出口
        filename: '[name].[hash:8].js', // 多入口 对  应  多出口,  会影响chunkFileName
        // path: path.resolve('./build')
        // filename: 'bundle.js',
        chunkFilename: '[name].min.js',
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
    optimization: {
        usedExports: true, // 表明使用了哪个模块
        splitChunks: {// 不和dllPlugin 同时使用
            chunks: 'all', // 异步代码分割-async  initial-同步   all,  默认async   
            minSize: 30000, //大小超过30000 就分割 
            // minRemainingSize: 0,
            maxSize: 0,
            minChunks: 1, // 最少模块引用一次才抽离
            maxAsyncRequests: 6, // 最大6个请求
            maxInitialRequests: 4, // 首屏最多请求
            automaticNameDelimiter: '~',  // 分割符
            automaticNameMaxLength: 30, // 最长名字不超过30个字节 
            cacheGroups: {
                jquery: {
                    test: /[\\/]node_modules\/jquery[\\/]/,
                    priority: 0
                },
                react: {
                    test: /[\\/]node_modules[\\/](react)|(react-dom)/,
                    priority: -2
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10 // 优先级
                },
                commons: { // common~a~b
                    minChunks: 2,
                    minSize: 1000, // 最小抽离字节
                    priority: -20,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 1, // 至少引用两次
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        // new ExtractTextWebpackPlugin({
        //     filename: 'css/index.css'
        // }),
        // new Webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
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
            chunks: ['index', 'a'], // 插入idx.html 的时候，寻找叫 index 的js 文件
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
            chunksSortMode: "manual", // 打包chunk使用自己的引入顺序
            chunks: ['a', 'index'], // 插入idx.html 的时候，寻找叫 index 的js 文件
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
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }), // 这里的PATHS.src 不能是 ./**/*,   打包会卡死不动
        }),
        new DllReferencePlugin({ // 不和splitChunk 同时使用， 这个作用是加快编译速度
            manifest: path.resolve(__dirname, 'dll/manifest.json') // 主要作用是找manifest.json
        }),
        new AddAssetHtmlWebpackPlugin({ filepath: require.resolve('./dll/react.dll.js') }), // 引入react.dll.js, 能把react.dll.js 拷贝到dist下，这个插件只是在编译阶段有益，提升编译速度，一般用于开发模式
        process.env !== 'development' && new BundleAnalyzerPlugin()
    ].filter(Boolean),
    mode: process.env, // 这个地方的值才是最终决定是什么环境的值
    resolve: {},
}