const pool = require('../pool');
const express = require('express');
let router = express.Router();

router.get('/idea',function(req,res){
  var pno=parseInt(req);
  console.log(pno);
  pool.query("SELECT * FROM sidea_req ",function(err,result){
    var resp={};
    resp.list=result;
    res.json(resp)
  })
})

module.exports = router;