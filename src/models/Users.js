const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('User',{
    name:{
        type: String,
        required:true,
        trim:true,
        validate(){

        }
    },
    email:{
        type: String,
        required:true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.includes('password'))
                throw new Error('Password cannot contain string Password')
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if (value<0)
                throw new Error('Age must be greater than 0')
        }
    }
})

// const me = new User({
//     name: '   Mike       ',
//     age: 26,
//     password:'rachitgoel',
//     email:'     rachitgoel@gmail.com       '
// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })
module.exports = User