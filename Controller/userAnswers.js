var userDB = require('./../Model/user');
events = require('events');

module.exports.answers=function(req,res){

    var eventEmitter  = new events.EventEmitter();
    var eventEmitter2 = new events.EventEmitter();

    a1 = req.body.answer1,
    a2 = req.body.answer2,
    a3 = req.body.answer3,
    q1 = req.session.question_list[0].question_id,
    q2 = req.session.question_list[1].question_id,
    q3 = req.session.question_list[2].question_id,

    userDB.getUserID(eventEmitter, req.session.email);

    eventEmitter.on('get-userid', function(userID){

        userDB.addUserAnswers(eventEmitter2, userID, q1, q2, q3, a1, a2, a3);
    })  
    
    eventEmitter.on('not-get-userid', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter2.on('set-answers', function(){
        res.redirect('/User-Home');
    })  
    
    eventEmitter2.on('not-set-answers', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}