const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {

    lintOnSave: false,
  runtimeCompiler: true,
    // 修改webpack的入口为: examples/main.js
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack:(config)=>{
        config.plugins.push(
            //去掉打包之后的打印
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ["console.log"], // 移除console
                    },
                },
            })
        );
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.resolve.alias
        .set("examples", resolve("examples"))        
        .set("packages", resolve("packages"))
        
        config.module
            .rule('js')
            .include
            .add('/packages/')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    }
}