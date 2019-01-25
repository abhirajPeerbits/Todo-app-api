//const  MongoClient =  require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');    




MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(error,client) => {
    if(error){
        console.log("database not connected");
        
    }
    else{
        console.log(`database connect sucessfully -->`);
        
    }

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text:null}).then((result)=>{
    //     console.log(result);
        
    // },(error)=>{
    //     console.log(error);
        
    // });
     
    // db.collection('Todos').deleteOne({text : 'codeing'}).then((result)=>{
    //     console.log(result);
        
    // },(error)=>{
    //     console.log(error);
        
    // });


    db.collection('Todos').findOneAndDelete({text:'something do'}).then((result)=>{
        console.log(result);
        
    },(error)=>{
        console.log(error);
        
    });



   



   // client.close();
});