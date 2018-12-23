var userDB = require('./../Model/user');
events = require('events');

module.exports.show_exam=function(req,res){

    var eventEmitter = new events.EventEmitter();
    var eventEmitter2 = new events.EventEmitter();
    var eventEmitter3 = new events.EventEmitter();
    var eventEmitter4 = new events.EventEmitter();
    var eventEmitter5 = new events.EventEmitter();

    var examType = null;

    userDB.checkAcceptance(eventEmitter, req.session.email);

    eventEmitter.on('accept', function(user_approval){
        if(req.session.user_approval != user_approval){
            req.session.user_approval = user_approval
            res.locals.user_approval = req.session.user_approval;
        }
        if(user_approval == 1){
            userDB.getExamType(eventEmitter2, req.session.email);
        }
        else
            res.redirect('/show_exam');
    })  
    
    eventEmitter.on('not-accept', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter2.on('get-exam-type', function(exam_type){
        examType = exam_type;
        userDB.getQuestionsCorrectAns(eventEmitter3, exam_type);
    })  
    
    eventEmitter2.on('not-get-exam-type', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter3.on('found-questions', function(question_list){
        if(req.session.question_list != question_list){
            req.session.question_list = question_list
            res.locals.question_list = req.session.question_list;
        }
        userDB.getUserExamIDs(eventEmitter4, req.session.email, examType);
    })  
    
    eventEmitter3.on('not-found-questions', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter4.on('get-ids', function(userID, examID){
        userDB.getWrongAnswers(eventEmitter5, examID);
    })  
    
    eventEmitter4.on('not-get-ids', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })

    eventEmitter5.on('get-wrong-answers', function(wrong_answers){
        if(req.session.wrong_answers != wrong_answers){
            req.session.wrong_answers = wrong_answers
            res.locals.wrong_answers = req.session.wrong_answers;
        }
        res.redirect('/show_exam');
    })  
    
    eventEmitter5.on('not-get-wrong-answers', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}