connection = require('./../DB/config');

module.exports = {
    
    addHr : function(hrJsonObject, eventEmitter){
      connection.query('INSERT INTO user SET ?',hrJsonObject, function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('hr-not-registered');        
        }
        else{
            eventEmitter.emit('hr-registered');
        }
      });
    },

    showUserBasedOnType : function(eventEmitter, type){
      connection.query('SELECT user.user_id, username, email, cv, type, question_sentence, user_answer, correctAnswer FROM online_exams_db.user JOIN online_exams_db.pass_exam ON pass_exam.user_id = user.user_id JOIN online_exams_db.exam ON exam.exam_id=pass_exam.exam_id JOIN online_exams_db.exam_question ON exam.exam_id=exam_question.exam_id JOIN online_exams_db.question ON question.question_id=exam_question.question_id JOIN online_exams_db.solve_question ON exam_question.question_id=solve_question.question_id where user.user_id=solve_question.user_id and exam.type = ? order by user.user_id',
        [type], function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('not-search-type');       
        }
        else{
            eventEmitter.emit('search-type', result);
        }
      });
    },

    showUserBasedOnEmail : function(eventEmitter, email){
      connection.query('SELECT user.user_id, username, email, cv, type, question_sentence, user_answer, correctAnswer FROM online_exams_db.user JOIN online_exams_db.pass_exam ON pass_exam.user_id = user.user_id JOIN online_exams_db.exam ON exam.exam_id=pass_exam.exam_id JOIN online_exams_db.exam_question ON exam.exam_id=exam_question.exam_id JOIN online_exams_db.question ON question.question_id=exam_question.question_id JOIN online_exams_db.solve_question ON exam_question.question_id=solve_question.question_id where user.user_id=solve_question.user_id and user.email = ?',
        [email], function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('not-search-email');
        }
        else{
            eventEmitter.emit('search-email', result);
        }
      });
    },

    showUserBasedOnName : function(eventEmitter, name){
      connection.query('SELECT user.user_id, username, email, cv, type, question_sentence, user_answer, correctAnswer FROM online_exams_db.user JOIN online_exams_db.pass_exam ON pass_exam.user_id = user.user_id JOIN online_exams_db.exam ON exam.exam_id=pass_exam.exam_id JOIN online_exams_db.exam_question ON exam.exam_id=exam_question.exam_id JOIN online_exams_db.question ON question.question_id=exam_question.question_id JOIN online_exams_db.solve_question ON exam_question.question_id=solve_question.question_id where user.user_id=solve_question.user_id and user.username = ?',
        [name], function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('not-search-name');
        }
        else{
            eventEmitter.emit('search-name', result);
        }
      });
    }
};