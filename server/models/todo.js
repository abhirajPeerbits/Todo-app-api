var mongoose = require('mongoose');

//when user add any todo so that time we store his id in todo for uniqness 

var Todo = mongoose.model('Todo',{
    text : {type:String,required:true,minlength:1,trim:true},
    complated : {type:Boolean,default:false},
    complatedAt : {type:Number,default:null},
    _creator : {type:mongoose.Schema.Types.ObjectId,require:true}


});


 //module.exports.Todo = Todo; 

 module.exports = {Todo};