// 开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap

const webpack = require("webpack");
const baseWebpackConfig = require("./webpack.base.config.js");
const WebpackMerge = require("webpack-merge");

module.exports = WebpackMerge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    port: 8800,
    hot: true,
    open: true,
    contentBase: "../dist",
    proxy: {
      "/api": {
        target: "http://localhost:3000/"
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
