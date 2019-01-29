const express  = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

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
        //return res.status(200).send('object id is  valid');

        Todo.findById(id)
        .then(  (todo)=>
                    {
                        if(!todo){
                            return res.status(404).send("404 id not found");    
                        }
                       return  res.status(200).send({todo});
                       
                    },
                (error)=>
                    {   
                        res.status(404).send('not found'+error);
                    })
        .catch((error)=>
                    {
                        res.status(400).send('bad request'+error);
                    });
        
    }
    
   
    
         
    
});

app.delete('/Todos/:id',(req,res)=> {
    let id  = req.params.id;
    
    if(!ObjectID.isValid(id)){
      return res.status(400).send('object id is not valid');
    }else{
        // return res.status(200).send('object id is  valid');
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
    }

    
});


app.patch('/todos/:id',(req,res) => {
    let id = req.params.id;
    // body veriable :it is use for pull data 
    // only user can update 'text' and 'completed' property in todo model
    // other property can not update only this two property can update by user.
    var body = _.pick(req.body,['text','complated']);


    if(!ObjectID.isValid(id)){
        return res.status(400).send('object id is not valid');
      }
      else{
        //   return res.status(200).send('object id is  valid');
        if(_.isBoolean(body.complated) && body.complated) {
            //if  complated property is boolean AND it is TRUE.
            body.complatedAt = new Date().getTime(); 
        }
        else{
            body.complated = false;
            body.complatedAt = null;
        }
    
        Todo.findByIdAndUpdate(id,{$set:body},{new:true})
            .then(  (todo) => 
                    {
                        if(!todo){
                            return res.status(404).send("404 id not found");    
                        }
                        console.log(`check update or not : ->  ${todo}` );
                        
                       return  res.send({todo});
                        // OR res.send({todo : todo});
                        
                    }, 
                    (error)=> 
                    {
                        return res.send(error);
                    })
            .catch((error) => {res.status(400).send('bad request'+error);}); 
        }
     
    

});

app.listen(port,() => {
    console.log(`started on port ${port}`);
    
});


