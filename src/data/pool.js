var mysql = require('mysql');
var pool  = mysql.createPool({
  host            : 'sql.l245.vhostgo.com',
  user            : 'wuhaojfx',
  password        : 'wuhao1990',
  database        : 'wuhaojfx',
  connectionLimit:10
});
console.log("连接池创建完成,该连接池只会创建一次");
module.exports=pool;