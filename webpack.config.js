var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        // "proxy": {
        //     "/api": {
        //     "target": 'http://192.168.1.239:15000',
        //     "pathRewrite": { '^/api': '' },
        //     "changeOrigin": true,
        //     "secure": false
        //     }
        //   }
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://192.168.1.239:15000'
        })
    }
}