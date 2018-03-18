const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const http=require("http");
const bodyParser=require("body-parser");
const routerReq = require('../src/data/router/req_idea');

let app = express();
const config = require('./webpack.common.js');
const compiler = webpack(config);

//告诉express去使用webpack-dev-middleware和webpack.config.js
// 配置一个基础文件
app.use(webpackDevMiddleware(compiler, {
  noInfo:true,
  publicPath: config.output.publicPath
}));
let server = http.createServer(app);
// Serve the files on port 3000.
server.listen(3000, function () {
  console.log('监听3000端口');
});
app.use( bodyParser.urlencoded({extended:false}) );

app.use('/req', routerReq);