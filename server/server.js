const express  = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoos');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
 

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// ================================== !!!!! USER !!!!! ====================================


app.post('/user',(req,res) => {
    
    // pick(where you need to pick,[what you need to pick]);
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    // OR    
    // var user = new User({
    //     email : req.body.email,
    //     password : req.body.password,
    //     tokens : req.body.tokens
    // });
 
    
    user.save()
        .then((user) => {return user.generateAuthToken();})
        .then((token) => {res.header('x-auth',token).send(user);})
        .catch((error) => {res.status(400).send(error);});    

    // user.save().then(   (user)=>{res.status(200).send(user)},
    //                     (error)=>{res.status(400).send(error)})
    //             .catch((error) => {res.status(400).send(error)});
});

app.post('/user/login', (req,res) => {
    // this fuction for login user and check user are valid or not 
    // when user go to login this function generate token and one copy save in DB and one send 
    // to user in a header part
    var body = _.pick(req.body,['email','password']);

    User.findByCridential(body.email,body.password)
        .then((user) => {
            return user.generateAuthToken()
                        .then((token) => {res.header('x-auth',token).send(user)});
        })
        .catch((error) => { res.status(400).send('password wrong')});

});


app.get('/users/me', authenticate, (req, res) => {
    // 8.5
    // middle were modify req. object here we recive req.  from middle were 
    // so we put that req.user here 
    res.send(req.user);
  });

app.delete('/users/me/token',authenticate,(req,res) => {
    // this function delete token
    console.log(`01-02-19-> `+req.token);
    
    req.user.removeToken(req.token)
            .then(() => 
                        {
                            res.status(200).send();
                        },
                  () =>
                        {
                            res.status(400).send();
                        });

});


// ================================== !!!!! TODO !!!!! ====================================





//post data in database
app.post('/todos',authenticate,(req,res)=>{
    console.log(req.body);  
    var todo = new Todo({
        text : req.body.text,
        _creator : req.user._id
    });

    todo.save().then((docs)=>{
        console.log(`data save sucess fully ${docs}`);
        res.status(200).send(docs);
    },(error)=>{
        console.log(`error is -> ${error}`);
        res.status(400).send(e);
    });
    
});

app.get('/todos',authenticate, (req,res) => {
    // here we need todo according to user id 
    // [find({_creator : req.user._id})] : here we get user object from "Authentication" meddlewere and it  match with _creator then it return todo other wise not return.
    // here we use Direct TOdo schema and _creator is object of it so we compaire with _creator. 
    Todo.find({_creator : req.user._id}).then(
                (todos)=>
                {
                    res.send({todos});
                },
                (error)=>{
                    res.send.status(400).send(error);
                });
});

 app.get('/todos/:id',authenticate,(req,res) => {
    
    let id  = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(400).send('object id is not valid');
    }else{
        //return res.status(200).send('object id is  valid');
        // if Todoid [ _id] and creator id [req.user._id] both same then show todo data

        Todo.findOne({_id : id,_creator : req.user._id})
        .then(  (todo) =>
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

app.delete('/Todos/:id',authenticate,(req,res)=> {
    let id  = req.params.id;
    
    if(!ObjectID.isValid(id)){
      return res.status(400).send('object id is not valid');
    }else{
        // return res.status(200).send('object id is  valid');
        Todo.findOneAndRemove({_id : id , _creator: req.user._id})
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


app.patch('/todos/:id',authenticate,(req,res) => {
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
    
        Todo.findOneAndUpdate({_id : id , _creator : req.user._id},{$set:body},{new:true})
            .then(  (todo) => 
                    {
                        if(!todo){
                            return res.status(404).send("404 id not found");    
                        }
                        console.log(`check update or not : ->  ${todo}` );
                        
                       return  res.send({todo});
                        // OR res.send({todo : todo});
                        
                    }, 
                    (error) => 
                    {
                        return res.send(error);
                    })
            .catch((error) => {res.status(400).send('bad request'+error);}); 
        }
     
    

});




app.listen(port,() => {
    console.log(`started on port ${port}`);
    
});


