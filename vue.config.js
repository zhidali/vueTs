/*
 * @author: zhidl
 * @Date: 2019-06-13 16:24:31
 * @description: 
 */
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? '/dist/' : './',
  productionSourceMap: false,
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      '/api': {
        target: 'http://test14bbs.comjia.com',
        changeOrigin: true,
        ws: true,
      }
    }
  },
  css: {
    extract: false
  },
  configureWebpack:{
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
    plugins:[
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      })
    ]
  }
}