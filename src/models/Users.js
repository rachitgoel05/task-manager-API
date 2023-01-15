const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jsontoken = require('jsonwebtoken')
const Task = require('../models/Tasks')

const userSchema = new mongoose.Schema({
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
        unique:true,
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
    },
    
    tokens:[{
        token:{
              type: String,
              required: true  
        }
    }],
    avatar:{
        type: Buffer
    }
},
{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}
userSchema.methods.createAuthToken = async function() {
        const user = this
        const token = jsontoken.sign({_id:user.id},process.env.JWT_SECRET)
        console.log(token)
        user.tokens = user.tokens.concat({token})
        await user.save()

        return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        throw new Error('Unable to login')
    return user
}

userSchema.pre('save',async function(next){

    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)    
    }
    next()
})

userSchema.pre('remove', async function(next){
    const user = this

    await Task.deleteMany({owner:user._id})
    next()
})
const User = mongoose.model('User',userSchema)

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