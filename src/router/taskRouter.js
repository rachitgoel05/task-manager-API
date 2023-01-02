const express = require('express')
const Tasks = require('../models/Tasks')
const router = new express.Router()


//Write Calls
router.post('/tasks',async (req,res)=>{
    const task = new Tasks(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch (e){
        res.status(400).send(e)
    }
})

//Read Calls
router.get('/tasks',async (req,res)=>{

    try{
        const task = await Tasks.find({})
        res.send(task)        
    }
    catch{
        res.status(500).send()
    }
})

router.get('/tasks/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const task = await Tasks.findById({_id})
        if (!task){
            return res.status(404).send()
        }
        res.send(task)        
    }
    catch{
        res.status(500).send()
    }
})

//update Calls
router.patch('/tasks/:id', async (req,res)=>{
    const updateKeys = Object.keys(req.body)
    const allowedKeys = ['description']
    const isValidKeys = updateKeys.every((key)=>allowedKeys.includes(key))
    if (!isValidKeys)
        return res.status(400).send({'Error':'Invalid Keys Entered'})
    try{
        const task = await Tasks.findById(req.params.id)
        updateKeys.forEach((key) =>  task[key] = req.body[key] )
        await task.save()
        // const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task)
            return res.status(404).send()
        res.send(task)
    }   
    catch(err){
        return res.status(400).send(err)
    }
})

//Delete Requests
router.delete('/tasks/:id',async (req,res)=>{
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if (!task){
            return res.status(404).send()
        }
        return res.send(task)
    }
    catch (err){
        res.status().send(err)
    }
})

module.exports = router