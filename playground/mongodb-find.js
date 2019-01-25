 const  MongoClient =  require('mongodb').MongoClient;
 




MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client) => {
    if(error){
        console.log("database not connected");
        
    }
    else{
        console.log(`database connect sucessfully -->`);
        
    }

    const db = client.db('TodoApp');

    db.collection('user').find({name:'hema'}).toArray().then((docs)=> {
        console.log('docs -> ' , docs);
       
        
    },(error) => {
        console.log('error -> ',error);
        
    });
     




    client.close();
});