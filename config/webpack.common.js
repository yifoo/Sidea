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
  /**打包输出配置路径 */
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '' //上线的绝对地址  可以为http://www.haohome.top/
  },  
  resolve: {
    /**别名,引入第三方库之后起的别名 */
    alias: {
      // jquery: path.resolve(__dirname,'../libs/jquery-3.2.1.js'),
    }
  },
  devtool: 'inline-source-map',//开发模式下追踪错误和警告
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})
      },
      /*编译less并添加浏览器前缀*/
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: 'css-loader!postcss-loader!less-loader'
        })
      },
      /*转换es6到es5语法*/
      { test: /\.js$/, 
        exclude: /(node_modules|bower_components)/,
        use: {loader: 'babel-loader',}
      },
      {test: /\.(ico|png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
        {loader: 'file-loader',
          options: {
            name:'[name].bundle.[ext]',
            outputPath: 'img/',
            publicPath:'../'
          }
        }
      ]}
    ]
  }, 
  plugins: [
    /**提取公共模块代码,减小打包体积 */
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',   //若为['common', 'manifest'] ,打包common的hash值不会变化(common没有改变)
      filename:'js/common.js',
      // chunks:['main','index']  //指定提取范围
    }),
    /**自动生成全局变量,会自动打包 */
    new webpack.ProvidePlugin({ 
    //   $:"jquery",
    //   jQuery:"jquery",
    //   'window.jQuery':"jquery",
    //   'window.$':"jquery",
    }),
    /*清理文件夹*/
    new CleanWebpackPlugin(
      // ['dist'],
      ['*.js','*.map','*.png','*.css','*.html','*.ico','css','js','img'],　 //匹配删除的文件,若为*则全部删除
      {
        root: path.resolve(__dirname,'../dist'),
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
      }),
   /**指定模板输出 */
    new HtmlWebpackPlugin({ 
      title:'首页',
      favicon: './src/img/favicon.ico',
      filename: 'index.html',
      template: './index.html',
      chunks:['main','index','common'], 
    }),
    new HtmlWebpackPlugin({  
      title:'详情',
      favicon: './src/img/favicon.ico',
      filename: 'detail.html',
      template: './src/page/detail.html',
      chunks:['detail','index','common']
    }),
    new HtmlWebpackPlugin({
      title:'用户中心',
      favicon: './src/img/favicon.ico',
      filename: 'userCenter.html',
      template: './src/page/userCenter.html',
      chunks:['userCenter','index']
    }),
    new HtmlWebpackPlugin({
      title:'点子请求',
      favicon: './src/img/favicon.ico',
      filename: 'reqIdea.html',
      template: './src/page/reqIdea.html',
      chunks:['reqIdea','index']
    }),
    new HtmlWebpackPlugin({
      title:'关于',
      favicon: './src/img/favicon.ico',
      filename: 'about.html',
      template: './src/page/about.html',
      chunks:['about','index']
    }),
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
    new webpack.HotModuleReplacementPlugin(),//热替换
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
