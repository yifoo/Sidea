const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./config/webpack.common.js');
const compiler = webpack(config);

//告诉express去使用webpack-dev-middleware和webpack.config.js
// 配置一个基础文件
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('监听3000端口');
});