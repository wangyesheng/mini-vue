1. yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react -D

## babel-loader 是将 ES6 等高级语法转换为能让浏览器能够解析的低级语法

## @babel/core 是 babel 的核心模块，编译器。提供转换的 API

## @babel/preset-env 可以根据配置的目标浏览器或者运行环境来自动将 ES2015+ 的代码转换为 es5

## @babel/preset-react 用于解析 JSX

2. npm install @babel/polyfill -S

## babel-loader 只会将 ES6/7/8 等高级语法转换为 ES5 语法。

## 但是对新 api 并不会转换。比如 Promise、Iterator、Set、Proxy、Symbol 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。

## 此时，我们必须使用 babel-polyfill，为当前环境提供一个垫片。

## IE11 如果不用 @babel/polyfill 就不支持 Promise

## 直接在 webpack.config.js -> entry: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")],

3. npm install @babel/runtime @babel/plugin-transform-runtime @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D

## 当我们执行打包后，打包的文件里含有大量的重复代码，那么我们需要提供统一的模块化的 helper 来减少这些 helper 函数的重复输出

## @babel/runtime 提供统一的模块化的 helper, 使用能大大减少打包编译后的体积

## @babel/plugin-transform-runtime 自动动态 require @babel/runtime 中的内容

## @babel/plugin-proposal-decorators 将 es6+ 中更高级的特性转化---装饰器

## @babel/plugin-proposal-class-properties 将 es6 中更高级的 API 进行转化---类

4. npm install less less-loader css-loader style-loader postcss-loader autoprefixer -D

## less 是 CSS 的常见预处理器

## less-loader 主要是将其对应的语法转换成 css 语法

## css-loader 主要的作用是解析 css 文件, 像@import 等动态语法

## style-loader 主要的作用是解析的 css 文件渲染到 html 的 style 标签内

## CSS3 的许多特性来说，需要添加各种浏览器兼容前缀，开发过程中，这样加太麻烦，postcss 帮你自动添加各种浏览器前缀

5. npm install file-loader url-loader -D

## 解析字体 font、图片(jpg、png...)等静态资源

## file-loader 可以用来帮助 webpack 打包处理一系列的图片文件；比如：.png 、 .jpg 、.jepg 等格式的图片。打包的图片会给每张图片都生成一个随机的 hash 值作为图片的名字

## url-loader 封装了 file-loader,它的工作原理：

1.文件大小小于limit参数，url-loader将会把文件转为Base64；
2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader

6. yarn add webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D 
## webpack-merge 合并配置
## copy-webpack-plugin 拷贝静态资源
## optimize-css-assets-webpack-plugin 压缩css
## uglifyjs-webpack-plugin 压缩js
## webpack mode设置production的时候会自动压缩js代码。原则上不需要引入uglifyjs-webpack-plugin进行重复工作。但是optimize-css-assets-webpack-plugin压缩css的同时会破坏原有的js压缩，所以这里我们引入uglifyjs进行压缩
