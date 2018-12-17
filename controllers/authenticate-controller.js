var connection = require('./../config');

module.exports.authenticate=function(req,res){

    var email=req.body.email;
    var password=req.body.password;
      
    connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }
      else{
        if(results.length >0){
            if(password == results[0].password){
              if(results[0].type == "hr")
                res.redirect('/hr.html');
              else
                res.redirect('/user.html');
            }
            else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}