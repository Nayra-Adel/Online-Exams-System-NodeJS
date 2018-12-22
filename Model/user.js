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
      connection.query('SELECT cv, username, email, telephone FROM user where cv IS NOT NULL and approved = 0', function (error, result, fileds) {
        if (error == 'null'){
            eventEmitter.emit('not-selected-cv');
        }
        else{
            eventEmitter.emit('selected-cv', result);
        }
      });
    },

    updateUserApprovedCV : function(eventEmitter, email){
      connection.query('UPDATE user SET approved = 1 where email = ?', [email], function (error, result, fileds) {
        if (error == 'null'){
            eventEmitter.emit('not-approved-cv');
        }
        else{
            eventEmitter.emit('approved-cv');
        }
      });
    },

    getUserExamIDs: function(eventEmitter, email, exam_type){
        connection.query('SELECT user_id as ids FROM user WHERE email = ? UNION SELECT exam_id FROM exam WHERE type = ?', 
        [email, exam_type], function (error, result, fileds) {
            if (error == 'null'){
                eventEmitter.emit('not-get_ids');
            }
            else{
                console.log(result[0].ids); // user id
                console.log(result[1].ids); // exam id
                eventEmitter.emit('get_ids', result[0].ids, result[1].ids);
            }
        });
    },

    setExam: function(eventEmitter, userID, examID){
        connection.query('INSERT INTO pass_exam SET user_id = ?, exam_id = ?',[userID, examID], function (error, result) {
            if (error == 'null'){
                eventEmitter.emit('not-set_exam');
            }
            else{
                eventEmitter.emit('set_exam');
            }
        });
    }
};