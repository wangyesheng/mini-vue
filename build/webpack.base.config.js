const path = require("path");

// 在打包输出前清空上次打包的文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 抽离 css 插件 -- 改成 link 标签引入的形式
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 自动引入打包好的 js/css 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  // @babel-polyfill 是解决 babel-loader 不能对新的 api(ES9+) 进行转换为当前环境添加一个垫片，但是这样引入的话打包过后的体积很大，所以不推荐
  // entry: ['@babel-polyfill',path.resolve(__dirname, "../src/index.js")],
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js|jsx$/,
        // 排除解析 node_modules 的 js 文件
        exclude: /node_modules/,
        // 只解析 src 文件夹下的文件
        include: path.resolve(__dirname, "../src"),
        use: {
          // cacheDirectory 是用来缓存的，下次编译加速
          loader: "babel-loader?cacheDirectory=true",
          options: {
            // 解析 ES6/7/8 与 react 语法
            presets: [
              [
                "@babel/preset-env",
                {
                  // 按需引入 @babel-polyfill 解决打包体积过大的问题
                  useBuiltIns: "usage",
                  // 声明 core-js 的版本
                  corejs: 2,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-runtime",
              "babel-plugin-transform-vue-jsx",
              // 让 class 支持装饰器的写法
              // 装饰器的顺序要写在类之前
              ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器
              ["@babel/plugin-proposal-class-properties", { loose: true }], // 类
            ],
          },
        },
      },
      {
        test: /\.(c|le)ss$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "vue-style-loader", // 插入至 style 标签中
          },
          // {
          //   loader: MiniCssExtractPlugin.loader // 以 link 方式引入，此方式在开发环境更改样式时不会热更新
          // },
          {
            loader: "css-loader",
          }, // 解析 @import 语法、路径,
          {
            // 自动添加各种浏览器前缀
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "url-loader",
            options: {
              // 做一个限制，当图片小于 20k 时，用 base64 来转化（不会走网络请求），否则用 file-loader 产生真实的图片
              limit: 20 * 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "url-loader",
            options: {
              // 做一个限制，当音频文件小于多少 200M 时，用 base64 来转化（不会走网络请求），否则用 file-loader 产生真实的音频文件
              limit: 200 * 1024 * 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: ["*", ".js", ".json", ".vue", ".less"],
  },
};
