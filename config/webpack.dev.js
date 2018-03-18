const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  devServer: {  //提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
    host: '127.0.0.1',
    port: 8000,
    inline: true,
    hot: true, //热启动
    contentBase:path.resolve(__dirname, "../"),  //服务器的位置
  },
});