const pool = require('../pool');
const express = require('express');
let router = express.Router();

router.get('/idea',function(req,res){
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  console.log(pno,pageSize);
  let data={
    pageResponse:{
      count:0,                //idea总条数
      pageSize:pageSize,       //页面显示条数
      pageCount:0,            //总页数
      pno:pno,                //当前页码
    },
    list:[],                //当前页新闻数据
  }
  pool.query("SELECT COUNT(*) AS c FROM sidea_req",function(err,result){
    if(err)throw err;
    data.pageResponse.count=result[0]['c']
    data.pageResponse.pageCount=Math.ceil(data.pageResponse.count/pageSize);
    var start=(pno-1)*pageSize;
    var sCount=pageSize;
    console.log(start,sCount);
    pool.query("SELECT * FROM sidea_req ORDER BY rid DESC LIMIT "+start+','+sCount,function(err,result){
      if(err)throw err;
      data.list=result;
      console.log(data);
      res.json(data)
    })
  })
  
})

module.exports = router;