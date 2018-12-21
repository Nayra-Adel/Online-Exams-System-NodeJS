var userDB = require('./../Model/user');
events = require('events');

module.exports.approved=function(req,res){
    
    var eventEmitter = new events.EventEmitter();

    userDB.updateUserApprovedCV(eventEmitter, req.body.questionType, req.body.email);
    eventEmitter.on('approved-cv', function(){
        res.redirect('/HR-Home');
    })  
    
    eventEmitter.on('not-approved-cv', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}