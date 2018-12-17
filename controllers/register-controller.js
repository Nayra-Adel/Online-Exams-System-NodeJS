var express=require("express");
var connection = require('./../config');
 
module.exports.register=function(req,res){
    var today = new Date();
    var hr={
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password
    }
    connection.query('INSERT INTO hr SET ?',hr, function (error, results) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}