//const  MongoClient =  require('mongodb').MongoClient;
 
const {MongoClient,ObjectId} = require('mongodb');








MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser:true},(error,client) => {
    if(error){
        console.log("database not connected");
        
    }
    else{
        console.log(`database connect sucessfully -->`);
        
    }

    const db = client.db('TodoApp');

    db.collection('Todos')
    .findOneAndUpdate(
                         {completed: true},
                         {
                             $set:{text :'enjoy holiday..'}
                         },
                         {returnOriginal:true}
                            
                     ).then((result)=> {
                         console.log(result);
                         
                     },(error)=>{
                         console.log(error);
                         //throw error;
                     });

        db.collection('user')
        .updateMany(
                            {name:'hema'},
                            {
                                $inc : {age : 1},
                                $set : {location : 'bapunagar'}
                            },
                            {returnOriginal:false}
                         ).then((result)=>{
                           return console.log(result);
                            
                         },(error)=>{
                             return console.log("error ->"+error);
                             
                         });

    client.close();
});


