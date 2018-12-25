var userDB = require('./../Model/user');
events = require('events');

module.exports.approved=function(req,res){
    
    var eventEmitter = new events.EventEmitter();
    var eventEmitter2 = new events.EventEmitter();
    var eventEmitter3 = new events.EventEmitter();

    var email = req.body.acceptEmail;
    var qType = req.body.questionType;

    userDB.updateUserApprovedCV(eventEmitter, email);
    eventEmitter.on('approved-cv', function(){
        userDB.getUserExamIDs(eventEmitter2, email, qType);
    })  
    
    eventEmitter.on('not-approved-cv', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter2.on('get-ids', function(userID, examID){
        userDB.setExam(eventEmitter3, userID, examID);
    })

    eventEmitter2.on('not-get-ids', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter3.on('set-exam', function(){
        res.redirect('/HR-Home');
    })

    eventEmitter3.on('not-set-exam', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}