//const  MongoClient =  require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');    




MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client) => {
    if(error){
        console.log("database not connected");
        
    }
    else{
        console.log(`database connect sucessfully -->`);
        
    }

    const db = client.db('TodoApp');

    
     

   db.collection('Todos').insertOne({},(error,result)=>{})

   db.collection('Todos').insertOne({
       text : 'something do',
       completed : false

   },(error,result)=>{
        if(error)
        {
            return console.log(`unable to insert to do error is --> ${error}`);
            
        }
        else{
            console.log(` data is -->  ${JSON.stringify(result.ops)}`);
            //console.log(JSON.stringify(result.ops));
            //ops store all document which is in result
        }

   });


    db.collection('user').insertOne({
        name : 'hema',
        age: 21,
        location : 'Ahmedabad', 

    },(error,result)=> {
        if(error)
        {
             console.log(`Data not inserted error is --> ${error}`);
            
        }
        else{
            console.log(`data is --> ${JSON.stringify(result.ops)}`);
            console.log(result.ops);
            console.log(` fetch id ${result.ops[0]._id}`);
            console.log(`fetch time strap using _id --> ${result.ops[0]._id.getTimestamp()}`);
        }
    });



    client.close();
});