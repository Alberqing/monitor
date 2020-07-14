const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// user-agent把浏览器的userAgent变成一个对象 

module.exports = {
    entry: "./src/index.js",
    context: process.cwd(),   // 上下文目录
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "monitor.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head"
        })

    ]
}