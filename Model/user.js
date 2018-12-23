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
                eventEmitter.emit('not-get-ids');
            }
            else{
                console.log(result[0].ids); // user id
                console.log(result[1].ids); // exam id
                eventEmitter.emit('get-ids', result[0].ids, result[1].ids);
            }
        });
    },

    getUserID: function(eventEmitter, email){
        connection.query('SELECT user_id FROM user WHERE email = ? ', 
        [email], function (error, result, fileds) {
            if (error == 'null'){
                eventEmitter.emit('not-get-userid');
            }
            else{
                console.log(result[0].user_id); // user id
                eventEmitter.emit('get-userid', result[0].user_id);
            }
        });
    },

    setExam: function(eventEmitter, userID, examID){
        connection.query('INSERT INTO pass_exam SET user_id = ?, exam_id = ?',[userID, examID], function (error, result) {
            if (error == 'null'){
                eventEmitter.emit('not-set-exam');
            }
            else{
                eventEmitter.emit('set-exam');
            }
        });
    },

    checkAcceptance: function(eventEmitter, email){
        connection.query('SELECT approved FROM user WHERE email = ? ',[email], function (error, result, fileds) {
            if (error == 'null'){
                eventEmitter.emit('not-accept');
            }
            else{
                console.log(result[0]); 
                eventEmitter.emit('accept', result[0].approved);
            }
        });
    },

    getExamType: function(eventEmitter, email){
        connection.query('SELECT type FROM user, pass_exam JOIN exam ON exam.exam_id=pass_exam.exam_id WHERE email = ? and pass_exam.user_id = user.user_id', 
        [email], function (error, result, fileds) {
            if (error == 'null'){
                eventEmitter.emit('not-get-exam-type');
            }
            else{
                console.log(result[0].type); // exam type
                eventEmitter.emit('get-exam-type', result[0].type);
            }
        });
    },

    getQuestionsCorrectAns: function(eventEmitter, exam_type){
        connection.query('SELECT question.question_id, question.topic, question.correctAnswer, question.question_sentence FROM question, exam_question JOIN exam ON exam.exam_id=exam_question.exam_id WHERE type=? and exam_question.question_id = question.question_id',
            [exam_type], function (error, result, fileds) {
            if (error == 'null'){
                eventEmitter.emit('not-found-questions');
            }
            else{
                eventEmitter.emit('found-questions', result);
            }
        });
    },

    getWrongAnswers: function(eventEmitter, examID){
        connection.query('SELECT DISTINCT answer FROM question_answer, exam_question JOIN exam ON exam.exam_id=exam_question.exam_id where exam_question.exam_id = ?', 
        [examID], function (error, result, fileds) {
            if (error == 'null'){
                eventEmitter.emit('not-get-wrong-answers');
            }
            else{
                //console.log(result); 
                eventEmitter.emit('get-wrong-answers', result);
            }
        });
    },

    addUserAnswers : function(eventEmitter, u1, q1, q2, q3, a1, a2, a3){
      connection.query('INSERT INTO solve_question (user_id,question_id,user_answer) VALUES (?,?,?), (?,?,?), (?,?,?)',
        [u1, q1, a1, u1, q2, a2, u1, q3, a3], function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('not-set-answers');        
        }
        else{
            eventEmitter.emit('set-answers');
        }
      });
    }
};