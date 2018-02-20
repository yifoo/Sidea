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
      jquery: path.resolve(__dirname,'../libs/jquery-3.2.1.js'),
    }
  },
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
      chunks:['index','main']
    }),
    new HtmlWebpackPlugin({  //指定模板输出
      filename: 'detail.html',
      template: './index.html',
      chunks:['detail']
    }),
    new webpack.ProvidePlugin({     //自动生成全局变量,一旦引用,就会打包
      $:"jquery",
      jQuery:"jquery",
      'window.jQuery':"jquery",
      'window.$':"jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?importLoaders=1',
        {
          loader:"postcss-loader",
          options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                  require('autoprefixer')({
                    broswers:['last 5 versions']
                  }), //CSS浏览器兼容
              ]
          }
        },
        'less-loader']
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