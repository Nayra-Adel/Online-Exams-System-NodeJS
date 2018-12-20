var hrDB = require('./../Model/hr');
events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports.hrRegister=function(req,res){
    
    var hr = {
        "username":req.body.name,
        "password":req.body.password,
        "email":req.body.email,
        "phone":req.body.phone,
        "cv":null,
        "is_hr": 1,
        "approved": 0
    }
    hrDB.addHr(hr, eventEmitter);
    
    eventEmitter.on('hr-registered', function(){
        res.redirect('/login');
    })  
    
    eventEmitter.on('hr-not-registered', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}