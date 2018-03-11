const express = require('express');
const http=require("http");
const bodyParser=require("body-parser");
const cors = require('cors');
const routerReq = require('../src/data/router/req_idea');

let app = express();

// 监听服务器
let server = http.createServer(app);
server.listen(3000, function () {
  console.log('监听3000端口');
});
app.use( bodyParser.urlencoded({extended:false}) );
/**设置跨域cors 服务器端header */
app.use( cors({
  origin:'*',
  // origin: ["http://localhost:8000","http://127.0.0.1:8000","http://localhost:8080","http://127.0.0.1:8080","http://localhost:8080","http://127.0.0.1:5500"],//可配置允许域名和端口["http://127.0.0.1","http://127.0.0.1:3000","http://127.0.0.1:8080","http://127.0.0.1:5500"]
  credentials: true
}) );
app.use('/req', routerReq);