const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    index: path.resolve(__dirname,'../js/index.js'),
    main: path.resolve(__dirname,'../js/main.js'),
    detail: path.resolve(__dirname,'../js/detail.js'),
  },
  resolve: {
    alias: {  //别名,引入jQuery之后起的别名
      // jquery: path.resolve(__dirname,'../libs/jquery-3.2.1.js'),
    }
  },
  devtool: 'inline-source-map',//开发模式下追踪错误和警告
  plugins: [
    new CleanWebpackPlugin(
      ['*.js','*.map','*.png','*.css','*.html'],　 //匹配删除的文件,若为*则全部删除
      {
        root: path.resolve(__dirname,'../dist'),
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
      }),//清理文件夹
    new HtmlWebpackPlugin({  //指定模板输出
      filename: 'index.html',
      template: './index.html',
      chunks:['main','index']
    }),
    new HtmlWebpackPlugin({  //指定模板输出
      filename: 'detail.html',
      template: './index.html',
      chunks:['detail','index']
    }),
    // new webpack.ProvidePlugin({     //自动生成全局变量,一旦引用,就会打包
    //   $:"jquery",
    //   jQuery:"jquery",
    //   'window.jQuery':"jquery",
    //   'window.$':"jquery",
    // }),
    new webpack.HotModuleReplacementPlugin(),//热替换
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader?importLoaders=1',"postcss-loader",'less-loader']
      },
      { test: /\.js$/, 
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env"]
          }
        }
      },
      {test: /\.(ico|png|jpg|gif)$/,use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]}
    ]
  }, 
  output: {   //打包输出配置路径
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '' //上线的绝对地址  可以为http://www.haohome.top/
  },  
};