const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique : true,
        validate :  {validator:validator.isEmail,
                     message : '{VALUE} is not valid email'   
                    }
        },
    
    password : {
        type : String,
        required:true,
        minlength : 6

    },

    tokens : [{
        access : {type:String,require : true},
        token : {type:String,required : true}
    }]

});




UserSchema.methods.toJSON = function(){
    // its override toJSON method its not send all deta to user its send only perticuler data
    // like token,password its not send to user for security purpose

    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function() {
    var User = this;
    var access = 'auth';

    //sign({data},secrate key) 
    var token = jwt.sign({_id: User._id.toHexString(),access},'abc123').toString();

    //user.tokens = user.tokens.concat([access,token]);
    User.tokens.push({access,token});
    // return token;
    return User.save().then(()=>{
        //we need to save current user other wise if we dont save current User that time token not save in data base.[this is save token in DB according to current  user.]
         return token;

         //this token return to serverfile for show in header.
    });

};

UserSchema.methods.removeToken = function(_token) {
    user = this;
    // $pull : if it find token then remove otherwise not remove anythings.
   return  user.update({
        $pull:{
            tokens:{token:_token}
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    // 8.5
    var User = this;
    var decoded;
  
    try {
      decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        //if error in  try block.
        // here fire promise bcoz we need to stop exicution [not run sucess case.]
      return Promise.reject();
        //   OR
        // return new Prmise((resolve,reject) => {
        //     reject();
        // });
        //OR
        // return e;
    }
  
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  };


UserSchema.pre('save',function(next){
    // when user enter password this function covert in to hash automatically
    // its middlewere 

    //pre('eventName' ,callbackFunctuon(next))
// pre : its load before  model 'save' event.  
// function for hashing password.
        var user = this;
        if(user.isModified('password'))
        {
            // when password is modified that time its load otherwise didnt load.
            // getSalt('algoloop',callbackfunction(error,salt))
            bcrypt.genSalt(10,(error,salt)=>{
                //hash(password,salt,callbackFunction(error,hash))
                bcrypt.hash(user.password,salt,(error,hash)=>{
                    //now update user docs
                    user.password= hash;
                    next();
                });
            });
        }
        else{
            next();
        }
});

UserSchema.statics.findByCridential = function(email,password) {
    // this function can compare user [try to login and entry avilable in db]
    // every password come as a hase formate so 
    let User = this;

    return User.findOne({email})
                .then((user) => {
                    if(!user) 
                    {
                        return Promise.reject();
                        // its execute catch bolck in server file
                    }

                    // bcrypt.compare : bcrypt js support call back function it not support promise
                    //but batter asychronouse code we need to  use Promise

                    return new Promise((resolve,reject) => {
            // bcrypt.compare(password from user,passwod from database,callback_function(err,resuk));
                        bcrypt.compare(password,user.password,(error,result) => {
                            if(result)
                            {
                                // its send user to server file which call in then() method
                                resolve(user)
                            }
                            else
                            {
                                reject();
                            }
                        });
                    });

                });
                 
};



var User = mongoose.model('User',UserSchema);

// module.exports.User = User;

module.exports = {User};