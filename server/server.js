const express  = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoos');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
 
 

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


//post data in database
app.post('/todos',(req,res)=>{
    console.log(req.body);  
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((docs)=>{
        console.log(`data save sucess fully ${docs}`);
        res.status(200).send(docs);
    },(error)=>{
        console.log(`error is -> ${error}`);
        res.status(400).send(e);
    });
    
});

//get data from data base

app.get('/todos', (req,res) => {
    Todo.find().then(
                (todos)=>
                {
                    res.send({todos});
                },
                (error)=>{
                    res.send.status(400).send(error);
                });
});


app.get('/todos/:id',(req,res) => {
    
    let id  = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(400).send('object id is not valid');
    }else{
        return res.status(200).send('object id is  valid');
        
    }
    
    Todo.findById(id)
        .then(  (todo)=>
                    {
                        if(!todo){
                            return res.status(404).send("404 id not found");    
                        }
                        res.send({todo});
                    },
                (error)=>
                    {   
                        res.status(404).send('not found'+error);
                    })
        .catch((error)=>
                    {
                        res.status(400).send('bad request'+error);
                    });
    
        
    
});

app.delete('/Todos/:id',(req,res)=> {
    let id  = req.params.id;
    
    if(!ObjectID.isValid(id)){
      return res.status(400).send('object id is not valid');
    }else{
        return res.status(200).send('object id is  valid');
        
    }

    Todo.findByIdAndRemove(id)
        .then(  (todo)=>
                    {
                        if(!todo){
                            return res.status(404).send("404 id not found");    
                        }
                        res.send({todo});
                           res.send('data deleted.. !');
                    },
                (error)=>
                    {   
                        res.status(404).send('not found'+error);
                    })
        .catch((error)=>
                    {
                        res.status(400).send('bad request'+error);
                    });
});

app.listen(port,() => {
    console.log(`started on port ${port}`);
    
});


