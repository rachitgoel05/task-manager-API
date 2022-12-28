const express = require('express')
const User = require('../models/Users')
const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user = new User(req.body)  
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch (e){
        res.status(400).send(e)
    }
})

router.get('/users', async (req,res)=>{
    try{
        const user = await User.find({})
        res.send(user)
    }
    catch (e){
        res.status(500).send(e)
    }
})

router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if (!user){
            res.status(404).send(user)
        }
        res.send(user)
    }
    catch (e){
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req,res)=>{
    const updateKeys = Object.keys(req.body)
    const allowedKeys = ['name','email','password']
    const isValidKeys = updateKeys.every((key)=>allowedKeys.includes(key))
    if (!isValidKeys)
        return res.status(400).send({'Error':'Invalid Keys Entered'})
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user)
            return res.status(404).send()
        res.send(user)
    }   
    catch(err){
        return res.status(400).send(err)
    }
})

router.delete('/users/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user){
            return res.status(404).send()
        }
        return res.send(user)
    }
    catch (err){
        res.status().send(err)
    }
})

module.exports = router
