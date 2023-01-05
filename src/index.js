const express = require('express')
require('./db/mongoose')
const Task = require('./models/Tasks')
const User= require('./models/Users')
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up on port" + port)
})

// const  main = async () => {
//     const task = await Task.findById('63b47e9c24b0e50ed5694b44')
//     await task.populate('owner')
//     console.log(task.owner)

//     // const user = await User.findById('63b47d4fe92dcdfbebe9658e')
//     // await user.populate('tasks')
//     // console.log(user.tasks)

// }
// main()