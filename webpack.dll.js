const path = require("path");
const DllPlugin = require("webpack").DllPlugin;
module.exports = {
    mode: 'production',
    // entry: './src/calc.js',
    entry: ['react', 'react-dom'],
    output: {
        // library: 'calc',
        library: ['react', 'react-dom'],
        // libraryTarget: 'commonjs2', // 默认为var模式，umd，this， commonjs
        // filename: 'calc.js',
        filename: 'react.dll.js',
        path: path.resolve(__dirname, 'dll')
    },
    plugins: [
        new DllPlugin({
            name: 'react',
            path: path.resolve(__dirname, 'dll/manifest.json')
        })
    ]

}

// 将calc打包成node可以使用的模块
// dll 可以用这生产环境
// 不能放这dist下， 因为有cleanwebpackplugin