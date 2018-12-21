connection = require('./../DB/config');

module.exports = {
    
    addUser : function(userJsonObject, eventEmitter){
      connection.query('INSERT INTO user SET ?',userJsonObject, function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('user-not-registered');        
        }
        else{
            eventEmitter.emit('user-registered');
        }
      });
    },

    getUserCVandName : function(eventEmitter){
      connection.query('SELECT cv, username, email, phone FROM user where cv IS NOT NULL and approved = 0', function (error, result, fileds) {
        if (error == 'null'){
            eventEmitter.emit('not-selected-cv');
        }
        else{
            eventEmitter.emit('selected-cv', result);
        }
      });
    },

    updateUserApprovedCV : function(eventEmitter, examType, email){
      connection.query('UPDATE user SET approved = 1, examType = ? where email = ?', [examType, email], function (error, result, fileds) {
        if (error == 'null'){
            eventEmitter.emit('not-approved-cv');
        }
        else{
            eventEmitter.emit('approved-cv');
        }
      });
    }
};