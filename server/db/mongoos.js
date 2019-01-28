// Using Node.js `require()`
const mongoose = require('mongoose');
 


//its tell to mongoose we use ES6 promise OR thirdparty promise library[bluebird]
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


// console.log(module);
//console.log(global);


module.exports = {mongoose};
