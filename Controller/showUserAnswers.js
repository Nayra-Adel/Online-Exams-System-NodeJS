var userDB = require('./../Model/user');
events = require('events');

module.exports.see_user_answers=function(req,res){

    var eventEmitter = new events.EventEmitter();

    userDB.showUserAnswers(eventEmitter);
    eventEmitter.on('users-answers', function(show_users_answers){
        if(req.session.show_users_answers != show_users_answers){
            req.session.show_users_answers = show_users_answers
            res.locals.show_users_answers = req.session.show_users_answers;
        }
        res.redirect('/users_answers');
    })  
    
    eventEmitter.on('not-users-answers', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}