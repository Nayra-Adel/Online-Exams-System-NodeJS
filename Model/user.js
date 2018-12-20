connection = require('./../DB/config');

module.exports = {
    
    addUser : function(userJsonObject, eventEmitter){
      connection.query('INSERT INTO user SET ?',userJsonObject, function (error, result) {
        if (error == 'null'){
            eventEmitter.emit('user-not-registered');        }
        else{
            eventEmitter.emit('user-registered');
        }
      });
    }
};