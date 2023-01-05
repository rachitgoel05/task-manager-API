const mongoose = require('mongoose')
const validator = require('validator')
const taskSchema = mongoose.Schema({
    description:{
        type: String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
},{
    timestamps:true
},)
const Tasks = mongoose.model('Tasks',taskSchema)
// const newTask = new Tasks({
//     description:"new House",
//     completed:false
// })
// newTask.save().then((result)=>{
//     console.log(result)
// }).catch(error=>{
//     console.log(error)
// })
module.exports = Tasks