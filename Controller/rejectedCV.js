var userDB = require('./../Model/user');
events = require('events');

module.exports.rejected=function(req,res){

    var eventEmitter = new events.EventEmitter();
    var email=req.body.rejectEmail;

    userDB.rejectUser(eventEmitter, email);
    eventEmitter.on('reject-user', function(cvs_names){
        if(req.session.cvs_names != cvs_names){
            req.session.cvs_names = cvs_names
            res.locals.cvs_names = req.session.cvs_names;
        }
        res.redirect('/HR-Home');
    })  
    
    eventEmitter.on('not-reject-user', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}