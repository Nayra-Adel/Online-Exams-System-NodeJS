var connection = require('./../DB/config');

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

              if (req.session.username != results[0].username) {
                req.session.username = results[0].username;
                req.session.email = results[0].email;
                res.locals.username = req.session.username;
                res.locals.email = req.session.email;
              }

              if(results[0].is_hr == 1)
                res.redirect('/HR-Home');
              else
                res.redirect('/User-Home');
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