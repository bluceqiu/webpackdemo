// 基于node， 使用node的语法
let path = require('path');
module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'build.js',
        path: path.resolve('./build')
    },
    devServer: {
        contentBase: '/build',
        port: 3000,
        compress: true, // 服务器压缩
        open: true // 自动打开浏览器
    },
    module: {},
    plugins: [],
    mode: 'development',
    resolve: {},
}