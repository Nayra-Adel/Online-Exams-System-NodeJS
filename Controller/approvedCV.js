var userDB = require('./../Model/user');
events = require('events');

module.exports.approved=function(req,res){
    
    var eventEmitter = new events.EventEmitter();
    var eventEmitter2 = new events.EventEmitter();
    var eventEmitter3 = new events.EventEmitter();

    userDB.updateUserApprovedCV(eventEmitter, req.body.email);
    eventEmitter.on('approved-cv', function(){
        userDB.getUserExamIDs(eventEmitter2, req.body.email, req.body.questionType);
    })  
    
    eventEmitter.on('not-approved-cv', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter2.on('get_ids', function(userID, examID){
        userDB.setExam(eventEmitter3, userID, examID);
    })

    eventEmitter2.on('not-get_ids', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter3.on('set_exam', function(){
        res.redirect('/HR-Home');
    })

    eventEmitter3.on('not-set_exam', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}