const mongoose = require('mongoose')
const validator = require('validator')

const Tasks = mongoose.model('Tasks',{
    description:{
        type: String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
    }
})
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