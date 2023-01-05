const express = require('express')
const Tasks = require('../models/Tasks')
const router = new express.Router()
const auth = require('../middleware/auth')
const e = require('express')


//Write Calls
router.post('/tasks', auth, async (req,res)=>{
    const task = new Tasks({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch (e){
        res.status(400).send(e)
    }
})

//Read Calls
router.get('/tasks', auth, async (req,res)=>{
    const match={}
    const sort={}
    if (req.query.completed)
        match.completed = (req.query.completed ==='true')
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)                
    }
    catch{
        res.status(500).send()
    }
})

//read task by id
router.get('/tasks/:id', auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const task = await Tasks.findOne({_id,owner: req.user._id})
        if(!task)
            return res.status(404).send()
        res.send(task)        
    }
    catch{
        res.status(500).send()
    }
})

//update Calls
router.patch('/tasks/:id', auth, async (req,res)=>{
    const updateKeys = Object.keys(req.body)
    const allowedKeys = ['description', 'completed']
    const isValidKeys = updateKeys.every((key)=>allowedKeys.includes(key))
    if (!isValidKeys)
        return res.status(400).send({'Error':'Invalid Keys Entered'})
    try{

        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task)
            return res.status(404).send()
        updateKeys.forEach((key) =>  task[key] = req.body[key] )
        await task.save()
        res.send(task)
    }   
    catch(err){
        return res.status(400).send(err)
    }
})

//Delete Requests
router.delete('/tasks/:id',auth, async (req,res)=>{
    try{
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
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