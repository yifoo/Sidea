const pool = require('../pool');
const express = require('express');
let router = express.Router();

router.get('/idea',function(req,res){
  pool.query("SELECT * FROM sidea_req ",function(err,result){
    var resp={};
    resp.data=result;
    res.json(resp)
  })
})

module.exports = router;