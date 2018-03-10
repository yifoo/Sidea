const express = require('express');
const http=require("http");
const bodyParser=require("body-parser");
const cors = require('cors');
const routerReq = require('../src/data/router/req_idea');

let app = express();

//告诉express去使用webpack-dev-middleware和webpack.config.js
// 配置一个基础文件
let server = http.createServer(app);
// Serve the files on port 3000.
server.listen(3000, function () {
  console.log('监听3000端口');
});
app.use( bodyParser.urlencoded({extended:false}) );
app.use( cors({
  origin: ["http://127.0.0.1:3000","http://127.0.0.1:5500"],
  credentials: true
}) );
app.use('/req', routerReq);