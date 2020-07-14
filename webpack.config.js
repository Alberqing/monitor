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
        // before配置路由 express服务器
        before(router) {
            router.get('/success', function(req, res) {
                res.json({id: 1})
            })
            router.post('/error', function(req, res) {
                res.sendStatus(500)
            })
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head"
        })

    ]
}