const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//代码压缩工具
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',	//调试源码(debug)和运行基准测试(benchmark tests)很有用
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: true		//如果配置了devtool则加改选项
    // })			
  ],
});