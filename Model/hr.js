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
    }
};