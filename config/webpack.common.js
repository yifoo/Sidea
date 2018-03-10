const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    index: path.resolve(__dirname,'../src/index.js'),
    main: path.resolve(__dirname,'../src/js/main.js'),
    detail: path.resolve(__dirname,'../src/js/detail.js'),
    about: path.resolve(__dirname,'../src/js/about.js'),
    login: path.resolve(__dirname,'../src/js/login.js'),
    register: path.resolve(__dirname,'../src/js/register.js'),
    reqIdea: path.resolve(__dirname,'../src/js/reqIdea.js'),
    about: path.resolve(__dirname,'../src/js/about.js'),
    userCenter: path.resolve(__dirname,'../src/js/userCenter.js'),
  },
  output: {   //打包输出配置路径
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '' //上线的绝对地址  可以为http://www.haohome.top/
  },  
  resolve: {
    alias: {  //别名,引入jQuery之后起的别名
      // jquery: path.resolve(__dirname,'../libs/jquery-3.2.1.js'),
    }
  },
  devtool: 'inline-source-map',//开发模式下追踪错误和警告
  plugins: [
    /*清理文件夹*/
    new CleanWebpackPlugin(
      // ['dist'],
      ['*.js','*.map','*.png','*.css','*.html','*.ico','css','js','img'],　 //匹配删除的文件,若为*则全部删除
      {
        root: path.resolve(__dirname,'../dist'),
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
      }),
    /**
     * 指定模板输出
     */
    /*首页 */
    new HtmlWebpackPlugin({ 
      favicon: './src/img/favicon.ico',
      filename: 'index.html',
      template: './index.html',
      chunks:['main','index'], 
    }),
    /*详情 */
    new HtmlWebpackPlugin({  
      title:'详情',
      favicon: './src/img/favicon.ico',
      filename: 'detail.html',
      template: './src/page/detail.html',
      chunks:['detail','index']
    }),
    /*用户中心 */
    new HtmlWebpackPlugin({
      title:'用户中心',
      favicon: './src/img/favicon.ico',
      filename: 'userCenter.html',
      template: './src/page/userCenter.html',
      chunks:['userCenter','index']
    }),
    /*点子请求 */
    new HtmlWebpackPlugin({
      title:'点子请求',
      favicon: './src/img/favicon.ico',
      filename: 'reqIdea.html',
      template: './src/page/reqIdea.html',
      chunks:['reqIdea','index']
    }),
    /*关于 */
    new HtmlWebpackPlugin({
      title:'关于',
      favicon: './src/img/favicon.ico',
      filename: 'about.html',
      template: './src/page/about.html',
      chunks:['about','index']
    }),
    /*登录 */
    new HtmlWebpackPlugin({
      title:'登录',
      favicon: './src/img/favicon.ico',
      filename: 'login.html',
      template: './src/page/login.html',
      chunks:['login','index']
    }),
     /*注册 */
     new HtmlWebpackPlugin({
      title:'注册',
      favicon: './src/img/favicon.ico',
      filename: 'register.html',
      template: './src/page/register.html',
      chunks:['register','index']
    }),
    /*单独使用link标签加载css并设置路径，相对于output配置中的publickPath*/
    new ExtractTextPlugin({
      filename: "css/[name].bundle.css",
      disable: false,
      allChunks: true,
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
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader!postcss-loader!less-loader"})
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
      {test: /\.(ico|png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
        {
          loader: 'file-loader',
          options: {
            name:'[name].bundle.[ext]',
            outputPath: 'img/',
            publicPath:'../'
          }
        }
      ]}
    ]
  }, 
};