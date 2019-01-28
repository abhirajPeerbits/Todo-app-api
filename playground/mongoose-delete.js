const {ObjectID} = require('mongodb');


const {mongoose_db} = require('../server/db/mongoos');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

Todo.findByIdAndRemove('5c4e8fc5290930050c39efb8')
    .then(  (todo)=>
            {   
                console.log(todo);
                
            },
            (error)=>
            {
                console.log(error);
                
            });

Todo.findOneAndRemove({_id : '5c4e93187efb2e056147d1f0'})
    .then(  (todo)=>
            {
                console.log("\n remove => \n" + todo);
                
            },
            (error)=>
            {
                console.log("\n error is => \n" + error);
                
            });

Todo.remove({})
    .then(  (todos)=>
            {
                console.log("tosos \n ===> " + todos);
                
            },
            (error)=>
            {
                console.log("error \n ==> " + error);
                
            });