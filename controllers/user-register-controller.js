var userDB = require('./../Model/user');
events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports.candidateRegister=function(req,res){
    
    var user={
        "username":req.body.name,
        "password":req.body.password,
        "email":req.body.email,
        "phone":req.body.phone,
        "cv":null,
        "is_hr": 0,
        "approved": 0
    }
    userDB.addUser(user, eventEmitter);
    
    eventEmitter.on('user-registered', function(){
        res.redirect('/../View/login.html');
    })  
    
    eventEmitter.on('user-not-registered', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}