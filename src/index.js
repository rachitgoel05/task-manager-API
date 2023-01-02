const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')

const app = express()
const port = process.env.PORT || 3000;


app.use((req,res,next) => {
    res.status(503).send('Site is under maintenance')
})
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up on port" + port)
})