const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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


// its override toJSON method its not send all deta to user its send only perticuler data
// like token,password its not send to user for security purpose


UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';

    //sign({data},secrate key) 
    var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

    //user.tokens = user.tokens.concat([access,token]);
    user.tokens.push({access,token});

     return user.save().then(()=>{
        return token;
    });

};
 
var User = mongoose.model('User',UserSchema);

// module.exports.User = User;

module.exports = {User};