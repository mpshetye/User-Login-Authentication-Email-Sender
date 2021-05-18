const Schema = require('mongoose').Schema;
const {model} = require('mongoose');

const registerSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique: true
    },
    phone:{
        type:Number,
        required:true,
        unique: true
    },
    userName:{
        type:String,
        required:true,
        unique: true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required: true
    },
    password:{
        type:String
    },
    confirmPassword:{
        type: String
    }


});

const User = model('User', registerSchema);

module.exports = User;