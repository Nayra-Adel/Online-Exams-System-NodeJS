var express=require("express");
var connection = require('./../config');
 
module.exports.register=function(req,res){
    var today = new Date();
    var user={
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "phone":req.body.phone,
        "type":"user"
    }
    connection.query('INSERT INTO user SET ?',user, function (error, results) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
        res.redirect('/login.html');
      }
    });
}