const express  = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoos');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

 

var app = express();
app.use(bodyParser.json());

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


app.listen(3000,() => {
    console.log(`started on port 3000`);
    
});


