### Sidea
- 模拟国外的一个网站getIdeas;
- 采用原生js开发,以练习为目的,强化原生js运用;
- 自定义方法动态更新根元素html的font-size大小,采用rem单位;
- 借助css3的媒体查询实现屏幕自适应;
- 数据库采用MariaDb,以Node为服务器端操作语言;
- webpack配置开发环境和生产环境,自动化打包html/css/js;

#### 使用方法
1. 克隆
`git clone git@github.com:haohome/Sidea.git`
2. 安装依赖
运行命令`npm install`
3. 导入数据库
在本地`localhost`的`phpAdmin`中运行`src/data` 中`sidea.sql` 文件,自动创建数据库和导入数据
4. 运行
  4.1 开发模式
  直接运行命令`npn run server`
  4.2 生产模式
  - 先运行`npm run build`,生成的项目文件在`dist`文件夹下;
  - 将dist文件夹整体拷贝到服务器根目录下;
  - 在本地服务器运行,记下服务器端口,找到`config`目录下`nodeServer.js`,添加允许访问域名和端口;
  - 运行`npm run nodeServer`,