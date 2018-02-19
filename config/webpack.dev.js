const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  devtool: 'inline-source-map',//追踪错误和警告
  devServer: {  //提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
    contentBase:path.resolve(__dirname, "../"),  //服务器的位置
  },
});