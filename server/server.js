const express  = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoos');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

 

var app = express();
app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
    console.log(req.body);  
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((docs)=>{
        console.log(`data save sucess fully ${docs}`);
        res.send(docs);
    },(error)=>{
        console.log(`error is -> ${error}`);
        res.status(400).send(e);
    });
    
});




app.listen(3000,() => {
    console.log(`started on port 3000`);
    
});


