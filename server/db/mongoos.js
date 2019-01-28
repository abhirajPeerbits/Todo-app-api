// Using Node.js `require()`
const mongoose_db = require('mongoose');
 


//its tell to mongoose we use ES6 promise OR thirdparty promise library[bluebird]
mongoose_db.Promise = global.Promise;
mongoose_db.connect('mongodb://localhost:27017/TodoApp');


// console.log(module);
//console.log(global);


module.exports = {mongoose_db};
