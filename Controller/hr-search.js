var hrDB = require('./../Model/hr');
events = require('events');

module.exports.search=function(req,res){

    var eventEmitter = new events.EventEmitter();

    var search    = req.body.search;
    var searchVal = req.body.searchValue;
    var done = null;
    var error = null;

    if (search == "type") {
        done = "search-type";
        error = "not-search-type";
        hrDB.showUserBasedOnType(eventEmitter, searchVal);
    }else if (search == "email") {
        done = "search-email";
        error = "not-search-email";
        hrDB.showUserBasedOnEmail(eventEmitter, searchVal);
    }else if (search == "name") {
        done = "search-name";
        error = "not-search-name";
        hrDB.showUserBasedOnName(eventEmitter, searchVal);
    }else if (search == "date") {
        done = "search-date";
        error = "not-search-date";
        hrDB.showUserBasedOnDate(eventEmitter, searchVal);
    }

    eventEmitter.on(done, function(show_users_answers){
        if(req.session.show_users_answers != show_users_answers){
            req.session.show_users_answers = show_users_answers
            res.locals.show_users_answers = req.session.show_users_answers;
        }
        res.redirect('/users_answers');
    })  
    
    eventEmitter.on(error, function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}