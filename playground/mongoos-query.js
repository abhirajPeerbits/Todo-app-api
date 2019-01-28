const {ObjectID} = require('mongodb');


const {mongoose_db} = require('../server/db/mongoos');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');


const  id ='5c4e8fc5290930050c39efb8';
const user_id = '5c4ec19f6dd8dc0b3b824c5c';

// Todo.find({_id:id})
//     .then((todos) => 
//                 {
//                     console.log('Todos' + todos);
//                 },
//           (error) => 
//                 {
//                     console.log('error' + error);
                    
//                 });


// Todo.findOne({_id:id})
//     .then((todo)=>
//             {
//                 console.log('\n todo using FindOne ->' + todo);
                
//             },
//           (error)=>
//             {
//                 console.log('\n error in find one -> ' + error);
                
//             });

    if(!ObjectID.isValid(id)){
        console.log(`object id not valid`);
    }else{
        console.log(`object id is valid`);
        
    }

  Todo.findById(id)
      .then((todo)=>
            {
                if(!todo){
                    return console.log(`${id} not found ..!`);
                    
                }
                console.log('Todo by id' + todo);
                
            })
       .catch((error)=> {return console.log('error is ==>'+error)});


User.findById(user_id)
    .then((user) => 
            {
                // if(!user){
                //     return console.log('user not found');
                    
                // }
                console.log('user is => ' + user);
                
            },
           (error) => 
           {
               console.log(error);
               
           }
        )
    .catch((error) => 
            {
                console.log("error is ==> " + error);
                
            }
        );